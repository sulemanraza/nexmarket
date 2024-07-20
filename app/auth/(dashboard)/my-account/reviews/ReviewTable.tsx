"use client";
import React from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { columns } from "./columns";
import { TableComponent } from "@/client/components/reuseable/Table";

// Define types for the data
interface review {
  id: string;
  product: {
    name: string;
    slug: string;
    category: {
      name: string;
      slug: string;
    };
    thumbnail: string;
  };
  createdAt: string;
}

interface reviewTableProps {
  data: review[];
}

export const ReviewsTable: React.FC<reviewTableProps> = ({ data }) => {
  const table = useReactTable<review>({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="mt-5 space-y-4">
      <TableComponent
        tableHeadProps="bg-[#FCFDFD] font-extrabold text-sm text-[#202224] dark:text-white dark:bg-[#313D4F]"
        columns={columns}
        data={data}
        tableHook={table}
      />
    </div>
  );
};
