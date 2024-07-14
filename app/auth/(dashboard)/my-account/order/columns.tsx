"use client";
import { BiLinkExternal } from "react-icons/bi";
import Link from "next/link";

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: (row: any) => {
      return (
        <Link
          href={`/auth/my-account/order/${row.getValue("id")}`}
          className="font-semibold hover:text-brand flex items-center gap-1"
        >
          <span>#{row.getValue("id").slice(0, 8)}</span> <BiLinkExternal />
        </Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: (row: any) => {
      return (
        <div className="font-semibold min-w-max">{row.getValue("name")}</div>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: (row: any) => {
      return (
        <div className="font-semibold  min-w-max">
          {row.getValue("address")}
        </div>
      );
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: (row: any) => {
      return (
        <div className="font-semibold  min-w-max capitalize">
          {row.getValue("paymentMethod")}
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: (row: any) => {
      return (
        <div className="font-semibold  min-w-max text-brand">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(row.getValue("total"))}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (row: any) => {
      return (
        <div className="font-semibold  min-w-max">{row.getValue("date")}</div>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: (row: any) => {
      return (
        <span
          className={`
            inline-block w-[93px] h-[27px] rounded-[5px] text-white text-xs font-bold text-center py-1 px-2
 
            ${
              row.getValue("status") === "Delivered"
                ? "bg-[#00B69B]"
                : row.getValue("status") === "Processing"
                ? "bg-[#FF8743]"
                : row.getValue("status") === "Shipped"
                ? "bg-[#4880FF]"
                : row.getValue("status") === "Pending"
                ? "bg-[#FFC107]"
                : row.getValue("status") === "Cancelled"
                ? "bg-[#F44336]"
                : row.getValue("status") === "Refunded"
                ? "bg-[#FFC107]"
                : row.getValue("status") === "Returned"
                ? "bg-[#FF8743]"
                : ""
            }
            `}
        >
          {row.getValue("status")}
        </span>
      );
    },
  },
];
