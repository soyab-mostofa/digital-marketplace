import Link from "next/link";
import React from "react";
import NavbarLinks from "./NavbarLinks";
import { Button } from "./ui/button";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <div className="relative max-w-7xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7">
      <div className="md:col-span-3">
        <Link href="/" className="text-2xl font-semibold">
          Marshal <span className="text-violet-600 font-extrabold">UI</span>
        </Link>
      </div>
      <NavbarLinks />
      <div className="flex items-center ms-auto gap-x-2 md:col-span-3">
        <Button> Get Started</Button>
        <Button variant="outline">Sign in</Button>
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
