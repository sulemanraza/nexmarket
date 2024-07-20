"use client";
import { BiLinkExternal } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";

export const columns = [
  {
    accessorKey: "product",
    header: "Image",
    cell: (row: any) => {
      return (
        <div className="w-20 h-20 flex items-center justify-center">
          <Link
            href={`/${row.getValue("product").category.slug}/${
              row.getValue("product").slug
            }`}
          >
            <Image
              width={80}
              height={80}
              src={row.getValue("product").thumbnail}
              alt={row.getValue("product").name}
              className="w-full h-full object-cover rounded-sm cursor-pointer"
            />
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "product",
    header: "Name",
    cell: (row: any) => {
      return (
        <div className="font-semibold min-w-max">
          <Link
            href={`/${row.getValue("product").category.slug}/${
              row.getValue("product").slug
            }`}
            className="hover:text-brand flex items-center gap-1"
          >
            {row.getValue("product").name}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "review",
    header: "Review",
    cell: (row: any) => {
      return (
        <div className="text-sm text-gray-600 dark:text-gray-400 text-justify">
          {row.getValue("review").length > 275
            ? row.getValue("review").slice(0, 275) + "..."
            : row.getValue("review")}
        </div>
      );
    },
  },
  {
    accessorKey: "star",
    header: "Rating",
    cell: (row: any) => {
      return (
        <div className="flex items-center space-x-1">
          {renderStars(row.getValue("star"))}
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Created ",
    cell: (row: any) => {
      return (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {row.getValue("createdAt")}
        </div>
      );
    },
  },
];

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
