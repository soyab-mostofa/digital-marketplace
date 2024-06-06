"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import MobileMenu from "./MobileMenu";

export const navbarLinks = [
  {
    id: 1,
    name: "Home",
    href: "/",
  },
  {
    id: 2,
    name: "Templates",
    href: "/templates",
  },
  {
    id: 3,
    name: "UI Kits",
    href: "/ui-kits",
  },
  {
    id: 4,
    name: "Icons",
    href: "/icons",
  },
];

const NavbarLinks = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex justify-center items-center col-span-6 gap-x-6 ">
      {navbarLinks.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            pathname === item.href
              ? "bg-muted"
              : "hover:bg-muted  hover:bg-opacity-75",
            "group flex items-center p-2 rounded-md"
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default NavbarLinks;
