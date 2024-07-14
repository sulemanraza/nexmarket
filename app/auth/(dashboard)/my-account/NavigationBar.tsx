"use client";
import { SiteBreadcrumb } from "@/client/components/reuseable/SiteBreadcrumb";
import { Button } from "@/client/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface Menu {
  menus: {
    title: string;
    href: string;
  }[];

  children?: React.ReactNode;
}

export const NavigationBar: FC<Menu> = ({ menus, children }) => {
  const pathName = usePathname();
  return (
    <div className=" space-y-6">
      <div className="flex items-center justify-between">
        <SiteBreadcrumb
          links={[
            { title: "My Account" },
            ...menus.filter(({ href }) => pathName === href),
          ]}
        />

        {children}
      </div>
      <nav className="flex items-center justify-between p-4 bg-gray-100 border">
        <div className="flex items-center justify-between w-3/4">
          {menus.map(({ title, href }, index) => {
            return (
              <Link
                key={index}
                href={href}
                className={`${
                  pathName === href ? "text-brand" : "text-gray-500 "
                } hover:text-brand uppercase font-medium text-sm`}
              >
                {title}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center space-x-4">
          <Button
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
            className="bg-brand text-white hover:bg-transparent border hover:border-brand uppercase   hover:text-brand"
          >
            Log out
          </Button>
        </div>
      </nav>
    </div>
  );
};
