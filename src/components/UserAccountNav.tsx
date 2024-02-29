"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { User } from "@/payload-types";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const UserAccountNav = ({ user }: { user: User }) => {
  const { signOut } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button variant="ghost" size="sm" className="relative">
          My account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white w-60">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            {user.email}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href="/sell">Seller Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
