"use client";
import React, { useState, useEffect } from "react";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import OrderFilter from "./orderFilter";
import { columns } from "./columns";
import { TableComponent } from "@/client/components/reuseable/Table";

// Define types for the data and filter states
interface OrderData {
  id: string;
  name: string;
  address: string;
  paymentMethod: string;
  total: number;
  status: string;
  createdAt: string;
}

interface StatusFilter {
  Pending: boolean;
  Processing: boolean;
  Shipped: boolean;
  Delivered: boolean;
  Cancelled: boolean;
  Refunded: boolean;
  Returned: boolean;
}

// Normalize date to UTC midnight
const normalizeDateToUTC = (date: Date): string => {
  const normalized = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return normalized.toISOString().split("T")[0];
};

interface OrderTableProps {
  data: OrderData[];
}

export const OrderTable: React.FC<OrderTableProps> = ({ data }) => {
  const [filterData, setData] = useState<OrderData[]>(data ?? []);
  const [date, setDate] = useState<Date[]>([]);
  const [status, setStatus] = useState<StatusFilter>({
    Pending: false,
    Processing: false,
    Shipped: false,
    Delivered: false,
    Cancelled: false,
    Refunded: false,
    Returned: false,
  });

  const [applyFilters, setApplyFilters] = useState<boolean>(false);

  const table = useReactTable<OrderData>({
    data: filterData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  useEffect(() => {
    if (!applyFilters) return;

    let filteredData = data;

    const activeStatuses = Object.keys(status).filter(
      (key) => status[key as keyof StatusFilter]
    );
    if (activeStatuses.length > 0) {
      filteredData = filteredData.filter((item) =>
        activeStatuses.includes(item.status)
      );
    }

    if (date.length > 0) {
      const dateStrings = date.map(normalizeDateToUTC);
      filteredData = filteredData.filter((item) => {
        const itemDate = normalizeDateToUTC(new Date(item.createdAt));
        return dateStrings.includes(itemDate);
      });
    }

    setData(filteredData);
    setApplyFilters(false);
  }, [applyFilters, status, date, data]);

  return (
    <div className="mt-5 space-y-4">
      <OrderFilter
        date={date}
        setDate={setDate}
        status={status}
        setStatus={setStatus}
        applyFilters={() => setApplyFilters(true)}
        setData={setData}
        data={data}
      />
      <TableComponent
        tableHeadProps="bg-[#FCFDFD] font-extrabold text-sm text-[#202224] dark:text-white dark:bg-[#313D4F]"
        columns={columns}
        data={filterData}
        tableHook={table}
      />
    </div>
  );
};
