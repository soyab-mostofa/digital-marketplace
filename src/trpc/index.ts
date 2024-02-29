import { z } from "zod";
import { authRouter } from "./auth-router";
import { publicProcedure, router } from "./trpc";
import { QueryValidator } from "../lib/validators/query-validator";
import { getPayloadClient } from "../get-payload";
import { paymentRouter } from "./payment-router";

export const appRouter = router({
  // define your API
  auth: authRouter,
  payment: paymentRouter,
  anyApiRoute: publicProcedure.query(() => {
    return { data: "Hello World" };
  }),
  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.string().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input;
      const { limit, sort, ...queryProperties } = query;
      const payload = await getPayloadClient();

      const parsedQueryOpts: Record<string, { equals: string }> = {};

      Object.entries(queryProperties).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value,
        };
      });
      const page = cursor ? Number(cursor) : 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "products",
        where: {
          approvedForSale: { equals: "approved" },
          ...parsedQueryOpts,
        },
        sort,
        limit,
        depth: 1,
        page,
      });

      return { items, nextPage: hasNextPage ? nextPage : null };
    }),
});

export type AppRouter = typeof appRouter;
