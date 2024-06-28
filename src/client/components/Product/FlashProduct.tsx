"use client";
import { DeleteBox, HeartIcon, StarFill, StarHalf } from "@/client/icon";
import Image from "next/image";
import { FC } from "react";
import { useToast } from "../ui/use-toast";
import Link from "next/link";
import ProductModel from "./ProductModel";
import { IProduct } from "@/server/models/Product";
import { AddToCartButton } from "@/client/components/reuseable/AddToCartButton";

interface Props {
  item: IProduct;
  showOldPrice?: boolean;
  deleteItem?: (product: any) => void;
  createWishlistItem?: (product: any) => void;
  addToCart?: (product: any) => void;
  showDelete?: boolean;
  quickView?: boolean;
}

export const FlashProduct: FC<Props> = ({
  item,
  showOldPrice = true,
  showDelete = false,
  deleteItem,
  createWishlistItem,
  addToCart,
  quickView = true,
}: any) => {
  const {
    thumbnail,
    name,
    slug,
    price,
    oldPrice,
    numReviews,
    category,
    stock,
  } = item;

  const { toast } = useToast();

  const getDiscount = (price: number, oldPrice: number) => {
    return ((oldPrice - price) / oldPrice) * 100;
  };

  const handleCreateWishlistItem = async () => {
    await createWishlistItem({
      ...item,
    });

    toast({
      title: "Item added to wishlist",
      description: "You can view your wishlist in the wishlist page",
      variant: "success",
    });
  };

  const handleDeleteItem = async () => {
    await deleteItem({
      ...item,
    });

    toast({
      title: "Item removed from wishlist",
      description: "You can view your wishlist in the wishlist page",
      variant: "error",
    });
  };

  return (
    <div className="h-[350px] w-full sm:w-[270px] space-y-3">
      <div className="bg-[#F5F5F5] p-10 w-full h-[250px] relative rounded-md group">
        {oldPrice && (
          <span className="bg-discount absolute left-4 top-4 max-w-max rounded-md h-[26px] px-2 text-white font-thin text-xs grid place-items-center">
            -{getDiscount(price, oldPrice).toFixed(0)}%
          </span>
        )}
        <Image
          src={thumbnail || "/images/gamingPad.png"}
          alt="gamepad"
          width={270}
          height={200}
          className="object-contain w-full h-[200px]"
        />

        <div className=" absolute right-4 top-4 flex flex-col gap-3">
          <div>
            {showDelete ? (
              <form action={handleDeleteItem}>
                <button
                  type="submit"
                  className="w-[34px] h-[34px] rounded-full bg-white grid place-items-center cursor-pointer"
                >
                  <DeleteBox />
                </button>
              </form>
            ) : (
              <form action={handleCreateWishlistItem}>
                <button
                  type="submit"
                  className="w-[34px] h-[34px] rounded-full bg-white hover:text-white hover:bg-brand grid place-items-center cursor-pointer group"
                >
                  <HeartIcon />
                </button>
              </form>
            )}
          </div>
          <div className="hidden lg:block">
            <ProductModel product={item} />
          </div>
        </div>

        <AddToCartButton
          productId={item._id}
          quantity={1}
          className="hidden group-hover:flex  justify-center items-center text-white bg-black absolute left-0 bg-opacity-85 bottom-0 w-full h-10 cursor-pointer"
        />
      </div>
      <div className="bg-white">
        <Link
          href={`/${category.slug}/${slug}`}
          className="hover:text-[var(--brand)]"
        >
          <h3>{name.length > 20 ? name.slice(0, 20) + "..." : name}</h3>
        </Link>

        <div className="flex items-center gap-4">
          <span
            className="
            text-brand font-semibold 
          
        
          "
          >
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(price)}
          </span>

          {showOldPrice && oldPrice && (
            <span className="text-gray-500 text-sm line-through">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(oldPrice)}
            </span>
          )}
        </div>

        {/* reviews */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <StarFill />
            <StarFill />
            <StarFill />
            <StarFill />
            <StarHalf />
          </div>
          <div>({numReviews})</div>
        </div>
      </div>
    </div>
  );
};
