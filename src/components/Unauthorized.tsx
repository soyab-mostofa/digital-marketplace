import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LockIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Component() {
  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 md:px-6">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-6 text-center">
        <div className="animate-pulse">
          <LockIcon className="h-16 w-16 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Unauthorized Access
          </h1>
          <p className="text-muted-foreground md:text-lg">
            You do not have permission to access this page. Please return to the
            home page.
          </p>
          <span className="text-sm text-muted-foreground">Error Code: 403</span>
        </div>
        <LoginLink>
          <Button variant="default">Login to continue</Button>
        </LoginLink>
      </div>
    </div>
  );
}
