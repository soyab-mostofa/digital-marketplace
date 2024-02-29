import VerifyEmail from "@/components/VerifyEmail";
import Image from "next/image";
import React from "react";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const page = ({ searchParams: { token, to } }: PageProps) => {
  return (
    <div className="container flex items-center justify-center pt-20 lg:px-0">
      <div className="mx-auto flex flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-7">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image src="/hippo-email-sent.png" fill alt="hippo sent image" />
            </div>

            <h3 className="font-semibold text-2xl"> Check your email</h3>
            {to ? (
              <p className="text-center text-muted-foreground">
                We have sent a verification email to <strong>{to}</strong>.
                Please check your email and click on the link to verify your
                email.
              </p>
            ) : (
              <p className="text-center text-muted-foreground">
                We have sent a verification email to your email. Please check
                your email and click on the link to verify your email.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
