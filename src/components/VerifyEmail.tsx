"use client";
import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";

const VerifyEmail = ({ token }: { token: string }) => {
  const { data, isError, isLoading } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="flex items-center gap-2 flex-col">
        <XCircle className="w-8 h-8 text-red-600" />
        <h3 className="text-xl font-semibold">There was a problem</h3>
        <p className="text-muted-foreground text-sm">
          This token might not be valid or has expired
        </p>
      </div>
    );
  }
  if (data?.success)
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          <Image alt="hippo email sent" fill src="/hippo-email-sent.png" />
        </div>

        <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
        <p className="text-muted-foreground text-center mt-l">
          Thank you for verifying your mail
        </p>
        <Link
          href="/sign-in"
          className={buttonVariants({
            className: "mt-4",
          })}
        >
          Sign in
        </Link>
      </div>
    );

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 flex-col">
        <Loader2 className=" animate-spin w-8 h-8 text-zinc-300" />
        <h3 className="text-xl font-semibold">Verifying...</h3>
        <p className="text-muted-foreground text-sm">
          This won&apos;t take long.
        </p>
      </div>
    );
  }
};

export default VerifyEmail;
