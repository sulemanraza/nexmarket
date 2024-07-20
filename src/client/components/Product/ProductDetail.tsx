"use client";
import { DeliveryIcon, HeartIcon, StarFill, StarHalf } from "@/client/icon";
import { FC } from "react";
import Image from "next/image";
import "react-rater/lib/react-rater.css";
import "react-image-gallery/styles/css/image-gallery.css"; // Importing the CSS for the gallery
import { ImageGalleryComponent } from "../CarouselNext/ImageGalleryComponent";
import { ItemPicker } from "../reuseable/ItemPicker";
import { IProduct } from "@/server/models/Product";
import { ICategory } from "@/server/models/Category";
import { AddToCartButton } from "../reuseable/AddToCartButton";
import { FaRegStarHalfStroke, FaStar } from "react-icons/fa6";

interface ProductDetailProps {
  product: Omit<IProduct, "category"> & { category: ICategory };
}

export const ProductDetail: FC<ProductDetailProps> = ({ product }) => {
  const {
    _id,
    name,
    description,
    thumbnail,
    slug,
    category,
    numReviews,
    rating,
    price,
    images,
    colors,
    sizes,
  } = product || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Images */}
      {images?.length < 1 ? (
        <div className="w-full max-w-screen-lg overflow-hidden mx-auto bg-gray-50 p-5">
          <Image
            src={thumbnail}
            alt={name}
            width={800}
            height={800}
            objectFit="contain"
          />
        </div>
      ) : (
        <ImageGalleryComponent imageGallery={images} />
      )}

      {/* Product Details */}
      <div className="space-y-2">
        <h1 className="text-xl lg:text-2xl font-semibold">{name}</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {renderStars(rating)}
            <span>({numReviews} Reviews)</span>
          </div>

          <span className="text-sm text-green-500">In Stock</span>
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

        <div className="border w-full lg:w-[400px] rounded-md">
          <div className="flex items-center gap-4 border-b p-4">
            <DeliveryIcon />
            <div className="space-y-2">
              <span className="text-black font-semibold">Free Delivery</span>
              <p className="text-xs text-black underline font-semibold">
                Enter your postal code for Delivery Availability
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4">
            <DeliveryIcon />
            <div className="space-y-2">
              <span className="text-black font-semibold">Free Delivery</span>
              <p className="text-xs text-black underline font-semibold">
                Enter your postal code for Delivery Availability
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const renderStars = (rating: any) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <>
      {Array.from({ length: fullStars }).map((_, index) => (
        <FaStar key={`full-${index}`} className="fill-yellow-400" />
      ))}
      {Array.from({ length: halfStars }).map((_, index) => (
        <FaRegStarHalfStroke
          key={`half-${index}`}
          className="fill-yellow-400"
        />
      ))}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <FaStar key={`empty-${index}`} className="fill-gray-300 stroke-black" />
      ))}
    </>
  );
};
