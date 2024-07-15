"use server";
import { StarFill, StarHalf } from "@/client/icon";
import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
import ProductModel from "./ProductModel";
import { IProduct } from "@/server/models/Product";
import { AddToCartButton } from "@/client/components/reuseable/AddToCartButton";
import { addToWishlist } from "@/server/action/wishlist/addToWishlist";
import { WishlistButton } from "./WishlistButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/client/lib/authOption";
import { redirect } from "next/navigation";

interface Props {
  item: IProduct;
  showOldPrice?: boolean;
  deleteItem?: (product: any) => void;
  createWishlistItem?: (product: any) => void;
  addToCart?: (product: any) => void;
  showDelete?: boolean;
  quickView?: boolean;
}

export const FlashProduct: FC<Props> = async ({
  item,
  showOldPrice = true,
  showDelete = false,
  addToCart,
  quickView = true,
}: any) => {
  const {
    _id,
    thumbnail,
    name,
    slug,
    price,
    oldPrice,
    numReviews,
    category,
    stock,
    isInWishlist,
  } = item;
  const session = await getServerSession(authOptions); // Validate the session
  const getDiscount = (price: number, oldPrice: number) => {
    return ((oldPrice - price) / oldPrice) * 100;
  };

  const handleWishlistItem = async () => {
    "use server";

    if (!session) {
      return redirect("/auth/login");
    }

    const formData = new FormData();
    formData.append("productId", _id);

    const response = await addToWishlist(formData);

    return response;
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
          {/* <div>
            {showDelete ? (
              <form
                action={async () => {
                  const formData = new FormData();
                  formData.append("productId", _id);
                  await addToWishlist(formData);
                }}
              >
                <button
                  type="submit"
                  className="w-[34px] h-[34px] rounded-full bg-white grid place-items-center cursor-pointer"
                >
                  <DeleteBox />
                </button>
              </form>
            ) : (
              <form
                action={async () => {
                  const formData = new FormData();
                  formData.append("productId", _id);
                  await addToWishlist(formData);
                }}
              >
                <button
                  type="submit"
                  className="w-[34px] h-[34px] rounded-full bg-white hover:text-white hover:bg-brand grid place-items-center cursor-pointer group"
                >
                  <HeartIcon />
                </button>
              </form>
            )}
          </div> */}

          <WishlistButton
            showDelete={showDelete}
            hasWishlist={isInWishlist}
            onSubmit={handleWishlistItem}
          />
          <div className="hidden lg:block">
            <ProductModel
              product={item}
              hasWishlist={isInWishlist}
              onSubmit={handleWishlistItem}
            />
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
