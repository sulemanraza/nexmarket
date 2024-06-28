"use client";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/client/components/ui/table";

interface DataTableProps<TData, TValue> {
  tableHook: any;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableHeadProps?: string;
  tableFilterProps?: string;
  tableFilter?: boolean;
  filterInputProps?: string;
  filterInput?: boolean;
  filterBy?: string;
  filterInputPlaceholder?: string;
  showPagination?: boolean;
  children?: React.ReactNode;
}

export function TableComponent<TData, TValue>({
  tableHook,
  data,
  columns,
  tableHeadProps,
  tableFilterProps,
  tableFilter,
  filterInputProps,
  filterInput,
  filterBy,
  filterInputPlaceholder,
  showPagination = true,
  children,
}: DataTableProps<TData, TValue>) {
  return (
    <>
      {tableFilter && (
        <div
          className={`flex justify-between items-center flex-wrap mb-4 ${
            tableFilterProps ?? ""
          }`}
        >
          {children}
          {filterInput && (
            <div
              className={`flex items-center space-x-2 border border-gray-400 h-10 w-64 px-2 rounded-full bg-white dark:bg-gray-700 ${
                filterInputProps ?? ""
              }`}
            >
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.5">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.69292 12.5352C12.4228 11.375 13.6952 8.22157 12.5351 5.49174C11.3749 2.7619 8.22147 1.48942 5.49164 2.64957C2.7618 3.80972 1.48932 6.96318 2.64947 9.69302C3.80963 12.4229 6.96309 13.6953 9.69292 12.5352Z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.3906 11.3896L15.556 15.5556"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </span>
              <input
                placeholder={filterInputPlaceholder ?? "Search..."}
                className="bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-sm placeholder:text-gray-900 dark:placeholder:text-gray-400"
                value={
                  tableHook.getColumn(filterBy ?? "")?.getFilterValue() ?? ""
                }
                onChange={(event) =>
                  tableHook
                    .getColumn(filterBy ?? "")
                    ?.setFilterValue(event.target.value)
                }
              />
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="border rounded-md overflow-x-auto bg-white dark:bg-gray-800">
        <Table>
          <TableHeader>
            {tableHook.getHeaderGroups().map((headerGroup: any) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => (
                  <TableHead
                    key={header.id}
                    className={`bg-gray-100 font-bold text-sm text-gray-900 dark:text-white ${
                      tableHeadProps ?? ""
                    }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {tableHook.getRowModel().rows?.length ? (
              tableHook.getRowModel().rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell: any) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className="flex items-center justify-between mt-2">
          <div className="flex-1 text-sm font-semibold text-gray-500">
            Showing {tableHook.getRowModel().rows.length} of {data.length}
          </div>
          <div className="space-x-2">
            <div className="grid grid-cols-2 w-24 h-9 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600">
              <button
                title="Previous"
                onClick={() => tableHook.previousPage()}
                disabled={!tableHook.getCanPreviousPage()}
                className="text-gray-900 cursor-pointer grid place-items-center border-r border-gray-300 dark:border-gray-600 disabled:bg-gray-200 dark:disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l-md"
              >
                <svg
                  width="8"
                  height="12"
                  viewBox="0 0 8 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.41 10.4064L2.83 5.99999L7.41 1.59359L6 0.23999L0 5.99999L6 11.76L7.41 10.4064Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <button
                title="Next"
                onClick={() => tableHook.nextPage()}
                disabled={!tableHook.getCanNextPage()}
                className="text-gray-900 disabled:bg-gray-200 dark:disabled:bg-gray-600 disabled:cursor-not-allowed cursor-pointer grid place-items-center hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r-md"
              >
                <svg
                  width="8"
                  height="12"
                  viewBox="0 0 8 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.59 10.4064L5.17 5.99999L0.59 1.59359L2 0.23999L8 5.99999L2 11.76L0.59 10.4064Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
