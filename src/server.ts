import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import { inferAsyncReturnType } from "@trpc/server";
import bodyParser from "body-parser";
import { IncomingMessage } from "http";
import { stripeWebhookHandler } from "./webhooks";
import nextBuild from "next/dist/build";
import path from "path";
const PORT = process.env.PORT || 3000;
const app = express();

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });

export type ExpressContext = inferAsyncReturnType<typeof createContext>;
export type WebhookRequest = IncomingMessage & { rawBody: Buffer };
const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`);
      },
    },
  });
  const webhookMiddleware = bodyParser.json({
    verify: (req: WebhookRequest, _, buffer) => {
      req.rawBody = buffer;
    },
  });

  app.use("api/webhook/stripe", webhookMiddleware, stripeWebhookHandler);
  if (process.env.NEXT_BUILD) {
    app.listen(PORT, () => {
      payload.logger.info("Nextjs is building");
      //@ts-expect-error
      return nextBuild(path.join(__dirname, "../"));
      process.exit();
    });
    return;
  }

  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.use((req, res) => nextHandler(req, res));
  nextApp.prepare().then(() => {
    payload.logger.info("Next js started");
    app.listen(PORT, () => {
      payload.logger.info(
        `Nextjs app url ${process.env.NEXT_PUBLIC_SERVER_URL}`
      );
    });
  });
};
start();
