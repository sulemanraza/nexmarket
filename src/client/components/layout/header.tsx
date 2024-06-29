"use client";
import { SearchIcon } from "@/client/icon";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import { CartNotification } from "../Product/CartNotification";
import UserProfile from "./UserProfile";
import { Button } from "../ui/button";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { setCartItems } from "@/client/redux/store/slices/cartSlice";

interface props {
  session: any;
}

export const Header: FC<props> = ({ session }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchCartItems = async () => {
      const request = await fetch("http://localhost:3000/api/cart"); // Fetch cart items from server
      const data = await request.json();

      dispatch(setCartItems(data || []));
    };

    session && fetchCartItems();
  }, [dispatch, session]);

  return (
    <div className="border-b">
      <div className="container pt-10  pb-4 flex items-center justify-between relative">
        <Link href="/" className="text-2xl font-bold">
          <span>Nex</span>
          <span className="text-brand">Market</span>
        </Link>

        <div className="flex items-center justify-between w-1/2">
          <div className="flex items-center border-[1px] h-[38px] bg-inputBg  w-2/3">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="h-full border-0 outline-none placeholder:text-xs placeholder:text-black w-11/12 bg-transparent pl-4 text-sm text-gray-500"
            />
            <SearchIcon className="w-1/12" />
          </div>

          {session && (
            <div className="flex items-center gap-4">
              <Button
                variant={"link"}
                className="bg-transparent hover:bg-transparent px-1"
              >
                <Link href="/auth/my-account/wishlist">
                  <HeartIcon />
                </Link>
              </Button>

              <CartNotification />
            </div>
          )}

          {session ? (
            <UserProfile />
          ) : (
            <Button className="bg-brand text-white  no-underline hover:bg-brand hover:opacity-80 px-4 py-2">
              <Link href="/auth/login" className="">
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
