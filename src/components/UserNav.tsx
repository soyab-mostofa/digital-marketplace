import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

interface iUserNavProps {
  name: string;
  avatar: string | undefined;
  email: string;
}

const UserNav: FC<iUserNavProps> = ({ name, avatar, email }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-10 rounded-full">
          <Avatar className="size-10">
            <AvatarImage src={avatar} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p>{name}</p>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/sell">Sell your product</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Test</DropdownMenuItem>
          <DropdownMenuItem>Test</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <DropdownMenuItem asChild>
            <LogoutLink>
              <Button variant="ghost">Logout</Button>
            </LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
