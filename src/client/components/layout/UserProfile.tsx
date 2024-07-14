"use client";
import { Button } from "@/client/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/client/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/client/components/ui/avatar";
import { KeyRound, LogOut, User } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const menuItems = [
  {
    title: "Manage Account",
    path: "/auth/my-account/profile",
    icon: <User />,
  },
  {
    title: "Change Password",
    path: "/auth/profile/my-account/change-password",
    icon: <KeyRound />,
  },
];

const UserProfile = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent hover:bg-transparent flex items-center px-2">
          <Avatar className="hidden sm:block">
            <AvatarImage src="https://avatar.iran.liara.run/public" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[205px] rounded-md">
        {menuItems.map(({ title, path, icon }, index) => (
          <Link
            key={index}
            href={path ? path : "#"}
            className="block hover:bg-gray-100 w-full last:border-b-0 border-b-[1px] dark:border-gray-600 dark:hover:bg-gray-800"
          >
            <div className="flex items-center w-full gap-4 h-[40px] p-2 px-4  ">
              {/* icon */}
              {icon}
              <h3 className="text-sm font-semibold text-[#404040] dark:text-white">
                {title}
              </h3>
            </div>
          </Link>
        ))}

        <Button
          onClick={() =>
            signOut({
              callbackUrl: "/auth/login",
            })
          }
          className="text-black bg-transparent hover:bg-gray-100  w-full  dark:hover:bg-gray-800 flex items-center gap-4 h-[40px] p-2 px-4 justify-start rounded-none"
        >
          <LogOut />
          <h3 className="text-sm font-semibold text-[#404040] dark:text-white">
            Logout
          </h3>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
