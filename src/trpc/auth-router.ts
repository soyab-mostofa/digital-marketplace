import { AuthCredentialsValitator } from "../lib/validators/account-credentials-validator";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValitator)
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const payload = await getPayloadClient();

      // check if user exists
      const { docs: user } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (user.length !== 0) {
        throw new TRPCError({ code: "CONFLICT" });
      }
      await payload.create({
        collection: "users",
        data: {
          email,
          password,
          role: "user",
        },
      });
      return {
        success: true,
        sentToMail: email,
      };
    }),

  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;
      const payload = await getPayloadClient();

      const isVerified = await payload.verifyEmail({
        collection: "users",
        token,
      });

      if (!isVerified) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return {
        success: true,
      };
    }),
  signIn: publicProcedure
    .input(AuthCredentialsValitator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;
      const payload = await getPayloadClient();
      try {
        await payload.login({
          collection: "users",
          data: {
            email,
            password,
          },
          res,
        });
        return {
          success: true,
        };
      } catch (error) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }),
});
