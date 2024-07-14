import React from "react";
import { Skeleton } from "@/client/components/ui/skeleton";

export function SkeletonOrderSummary() {
  return (
    <div className="space-y-4 w-full lg:w-2/5">
      <div className="w-full space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">
            <Skeleton className="h-6 w-1/4" />
          </h2>
          <div className="flex justify-between border-b pb-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/6" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b py-2"
              >
                <div className="min-w-16 h-16 bg-gray-100 dark:bg-[#313D4F] rounded-md grid place-items-center">
                  <Skeleton className="h-16 w-16 rounded-md" />
                </div>
                <Skeleton className="h-4 w-1/6" />
                <Skeleton className="h-4 w-1/6" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between border-b pb-1">
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-4 w-1/6" />
        </div>
        <div className="flex justify-between border-b pb-1">
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-4 w-1/6" />
        </div>
        <div className="flex justify-between border-b pb-1">
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-4 w-1/6" />
        </div>
        <div className="flex justify-between border-b pb-1">
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-4 w-1/6" />
        </div>
        <div className="flex justify-between pb-1">
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-4 w-1/6" />
        </div>
        <div className="flex border h-fit w-full">
          <Skeleton className="h-10 w-4/5" />
          <Skeleton className="h-10 w-1/5" />
        </div>
      </div>
    </div>
  );
}
