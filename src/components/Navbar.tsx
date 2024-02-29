import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";
import { cookies } from "next/headers";
import { getServerSideUser } from "@/lib/payload-utils";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);
  return (
    <div className="bg-white z-50 sticky top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="h-16 flex items-center">
              {/* mobile nav */}
              <div className="ml-4 lg:ml-0 flex">
                <Link href="/">
                  <Icons.logo className="h-10 w-10" />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-l lg:items-center lg:justify-end space-x-6">
                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Sign in
                    </Link>
                  )}

                  {user ? null : <span className="h-6 bg-gray-600 w-px" />}

                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (
                    <Link
                      href="/sign-up"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Create account
                    </Link>
                  )}

                  {user ? (
                    <span className="h-6 bg-gray-600 w-px" aria-hidden />
                  ) : null}

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span className="h-6 bg-gray-600 w-px" aria-hidden />
                    </div>
                  )}

                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
