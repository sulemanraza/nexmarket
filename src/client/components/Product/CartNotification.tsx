"use client";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/client/components/ui/dropdown-menu";
import axios from "axios";

import Link from "next/link";
import { ShoppingCartItem } from "@/client/icon";
import { setCartItems } from "@/client/redux/store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/client/redux/store";
import Image from "next/image";

export function CartNotification() {
  const cartItems: any = useSelector((state: RootState) => state.cart.items);

  console.log({ cartItems });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className=" w-10 cursor-pointer">
          <ShoppingCartItem count={cartItems?.length ? cartItems.length : 0} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit mr-4">
        <DropdownMenuLabel className="text-center">Cart</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* last 3 items show only */}

        {cartItems?.slice(0, 3).map((item: any, index: number) => (
          <NotificationItem
            key={index}
            title={item.product.name}
            description={`$${item.product.price}`}
            thumbnail={item.product.thumbnail}
            path={`/product/${item.product.id}`}
          />
        ))}

        <DropdownMenuSeparator />

        {/* See all notification */}
        <div className="flex items-center w-full p-2 group">
          <Link
            href={"/cart"}
            className="text-[#B5B5B5] group-hover:text-brand  w-full  text-center text-xs font-semibold"
          >
            View all items
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const NotificationItem = ({
  title,
  description,
  thumbnail,
  path,
}: {
  title: string;
  description: string;
  thumbnail?: string;
  path?: string;
}) => {
  return (
    <div className="hover:bg-gray-100 rounded-md dark:hover:bg-gray-800 block">
      <div className="flex items-center gap-4 p-2">
        {/* thumbnail */}

        <div className="w-12 h-12 bg-gray-100 dark:bg-[#313D4F] rounded-md grid place-items-center">
          {thumbnail && (
            <Image
              width={60}
              height={60}
              src={thumbnail}
              alt={title}
              className="rounded-md p-2"
            />
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[#404040] dark:text-white">
            {title?.length > 20 ? `${title?.substring(0, 20)}...` : title}
          </h3>
          <p className="text-[#B5B5B5] text-xs font-semibold">{description}</p>
        </div>
      </div>
    </div>
  );
};

const IconItem = ({
  icon,
  color,
}: {
  icon: React.ReactNode;
  color: string;
}) => {
  return (
    <div
      className={`w-9 h-9 ${
        color ? color : "bg-[#4880FF]"
      } grid place-items-center rounded-full`}
    >
      {icon}
    </div>
  );
};
