"use client";
import { HeartIcon, StarFill, StarHalf, ViewIcon } from "@/client/icon";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/client/components/ui/dialog";
import { Button } from "../ui/button";
import { ItemPicker } from "../reuseable/ItemPicker";

import { useToast } from "../ui/use-toast";
import { AddToCartButton } from "../reuseable/AddToCartButton";

interface Props {
  product: any;
}

const ProductModel = ({ product }: Props) => {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const {
    _id,
    thumbnail,
    name,
    slug,
    price,
    oldPrice,
    numReviews,
    category,
    description,
    colors,
    sizes,
    stock,
  } = product;

  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-[34px] h-[34px]  rounded-full bg-white grid place-items-center cursor-pointer">
          <ViewIcon />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:min-w-[60%]">
        <div className="grid  grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-full grid place-items-center bg-neutral-50 rounded-md">
            <div className="w-full  max-w-screen-lg mx-auto bg-gray-50">
              <Image
                src={thumbnail}
                alt={name}
                width={800}
                height={800}
                objectFit="contain"
              />
            </div>
          </div>
          <div className="flex flex-col justify-around">
            <div className="space-y-6">
              <DialogDescription className=" space-y-2">
                <div className="space-y-2">
                  <h1 className="text-xl lg:text-2xl font-semibold">{name}</h1>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <StarFill className="w-4 h-4 text-[#FFC700]" />
                        <StarFill className="w-4 h-4 text-[#FFC700]" />
                        <StarFill className="w-4 h-4 text-[#FFC700]" />
                        <StarFill className="w-4 h-4 text-[#FFC700]" />
                        <StarHalf className="w-4 h-4 text-[#FFC700]" />
                      </div>
                      <span>({numReviews} Reviews)</span>
                    </div>
                    <span
                      className={stock > 0 ? "text-green-500" : "text-red-500"}
                    >
                      {stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  <div className="text-2xl">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(price)}
                  </div>

                  {/* short description */}
                  <div className="text-sm w-4/5  py-4">{description}</div>
                  <hr />

                  {/* colors */}
                  {colors && colors.length > 0 && (
                    <div className="flex items-center gap-4">
                      <h3>Colors:</h3>
                      <ItemPicker items={colors} />
                    </div>
                  )}

                  {/* sizes */}
                  {sizes && sizes.length > 0 && (
                    <div className="flex items-center gap-4">
                      <h3>Size:</h3>
                      <div className="flex items-center gap-2">
                        <ItemPicker items={sizes} showLabel={true} />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 py-4">
                    <AddToCartButton
                      productId={_id as string}
                      className="bg-brand min-w-[165px] w-full max-w-[55%] h-11 hover:bg-brand hover:bg-opacity-90 rounded-md text-white"
                    />

                    <div className="w-10 h-10 border hover:border-brand hover:bg-brand cursor-pointer group border-black rounded-md grid place-items-center">
                      <HeartIcon className="w-6 h-6 group-hover:text-white" />
                    </div>
                  </div>
                </div>
              </DialogDescription>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModel;
