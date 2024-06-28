"use client";
import Link from "next/link";
import { useState } from "react";

const menus = [
  {
    label: "Woman’s Fashion",
    path: "",
    children: [
      { label: "Clothing", path: "/clothing" },
      { label: "Accessories", path: "/accessories" },
      { label: "Footwear", path: "/footwear" },
      { label: "Watches", path: "/watches" },
      { label: "Jewelry", path: "/jewelry" },
      { label: "Bags", path: "/bags" },
    ],
  },
  {
    label: "Men’s Fashion",
    path: "",
    children: [
      { label: "Clothing", path: "/clothing" },
      { label: "Accessories", path: "/accessories" },
      { label: "Footwear", path: "/footwear" },
      { label: "Watches", path: "/watches" },
      { label: "Jewelry", path: "/jewelry" },
      { label: "Bags", path: "/bags" },
    ],
  },
  {
    label: "Electronics",
    path: "/electronics",
    children: [],
  },
  {
    label: "Home & Lifestyle",
    path: "/home-lifestyle",
    children: [],
  },
  {
    label: "Medicine",
    path: "/medicine",
    children: [],
  },
  {
    label: "Sports & Outdoor",
    path: "/sports-outdoor",
    children: [],
  },
  {
    label: "Baby’s & Toys",
    path: "/babies-toys",
    children: [],
  },
  {
    label: "Groceries & Pets",
    path: "/groceries-pets",
    children: [],
  },
  {
    label: "Health & Beauty",
    path: "/health-beauty",
    children: [],
  },
];

export const Navigation = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full border-b hidden lg:block">
      <div className="container flex items-center h-full gap-6">
        {menus.map((item, index) => {
          if (item.children.length > 0) {
            return (
              <div key={index} className="relative group">
                <div className="cursor-pointer py-4">{item.label}</div>
                <div className="absolute hidden left-0 top-14 z-50 group-hover:flex flex-col gap-4 bg-white border p-5">
                  {item.children.map((child, i) => (
                    <Link
                      key={i}
                      href={child.path}
                      className="text-sm hover:text-brand"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <Link
              key={index}
              href={item.path}
              className="text-sm hover:text-brand py-4"
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
