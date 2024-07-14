"use client";

import "react-day-picker/dist/style.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/client/components/ui/dialog";
import { DayPicker } from "react-day-picker";
import { Button } from "@/client/components/ui/button";

interface Props {
  date: Date[];
  setDate: (date: Date[]) => void;
  status: any;
  setStatus: (status: any) => void;
  applyFilters: () => void;
  setData: (data: any) => void;
  data: any;
}

const OrderFilter = ({
  date,
  setDate,
  status,
  setStatus,
  applyFilters,
  setData,
  data,
}: Props) => {
  const handleStatusToggle = (key: any) => {
    setStatus((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="lg:h-14 lg:w-[55%] text-[#273142] dark:text-white bg-[#F9F9FB] dark:bg-[#273142] dark:border-[#313D4F] border-[1px] rounded-md flex flex-col lg:flex-row items-center">
      <div className="w-full lg:w-[calc(10%)] h-full flex items-center lg:grid lg:grid-cols-2 gap-3 p-5 lg:p-0 border-b-[1px] lg:border-b-0">
        <div className="grid place-items-center w-full lg:w-[70px] h-full dark:border-r-[#313D4F] lg:border-r-[1px]">
          <svg
            width="22"
            height="24"
            viewBox="0 0 22 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 9.75C16.3848 9.75 20.75 7.73528 20.75 5.25C20.75 2.76472 16.3848 0.75 11 0.75C5.61522 0.75 1.25 2.76472 1.25 5.25C1.25 7.73528 5.61522 9.75 11 9.75Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.25 5.25C1.25253 9.76548 4.35614 13.688 8.75 14.729V21C8.75 22.2426 9.75736 23.25 11 23.25C12.2426 23.25 13.25 22.2426 13.25 21V14.729C17.6439 13.688 20.7475 9.76548 20.75 5.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* date */}
      <Dialog>
        <DialogTrigger className="min-w-[100px] w-full lg:w-1/3 p-3 lg:p-0  h-full dark:border-r-[#313D4F] lg:border-r-[1px] border-b-[1px] lg:border-b-0 gird place-items-center">
          <DropDownButton name="Date" />
        </DialogTrigger>
        <DialogContent className="dark:bg-[#313D4F] rounded-[50px] w-fit">
          <DialogHeader className="space-y-2">
            <DialogDescription className="">
              <DayPicker
                mode="multiple"
                selected={date}
                onSelect={(dates) => setDate(dates || [])}
              />
            </DialogDescription>

            <hr />
            <p className="dark:text-[#BFC2C6] text-[#434343] text-sm">
              *You can choose multiple Order Dates
            </p>
            <div className="flex items-center justify-center">
              <button
                title="Apply"
                className="w-full h-9 bg-[#4880FF] text-white sm:w-[129px] rounded-md text-xs font-bold"
                onClick={applyFilters} // Apply filters on button click
              >
                Apply Now
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Order Status */}
      <Dialog>
        <DialogTrigger className="min-w-[100px] w-full lg:w-1/3 p-3 lg:p-0  h-full dark:border-r-[#313D4F] lg:border-r-[1px] border-b-[1px] lg:border-b-0">
          <DropDownButton name="Order Status" />
        </DialogTrigger>
        <DialogContent className="dark:bg-[#313D4F] rounded-[50px]">
          <DialogHeader className="space-y-4">
            <DialogTitle className="mb-4">Select Order Status</DialogTitle>
            <DialogDescription className="grid gap-2 grid-cols-3">
              {Object.keys(status).map((key: any) => (
                <FilterButton
                  key={key}
                  name={
                    key === "onHold"
                      ? "On Hold"
                      : key === "inTransit"
                      ? "In Transit"
                      : key
                  }
                  onClick={() => handleStatusToggle(key)}
                  isActive={
                    status[key] ? "bg-[#4880FF] text-white" : "dark:text-white"
                  }
                />
              ))}
            </DialogDescription>

            <hr />
            <p className="dark:text-[#BFC2C6] text-[#434343] text-sm">
              *You can choose multiple Order Statuses
            </p>
            <div className="flex items-center justify-center">
              <button
                title="Apply"
                className="w-full h-9 bg-[#4880FF] text-white sm:w-[129px] rounded-md text-xs font-bold"
                onClick={applyFilters} // Apply filters on button click
              >
                Apply Now
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <button
        title="reset"
        className="min-w-[100px] w-full lg:w-1/3 p-3 lg:p-0 h-full text-[#FF8743] flex items-center gap-4 justify-center"
        onClick={() => {
          setDate([]);
          setStatus({
            Delivered: false,
            Processing: false,
            Rejected: false,
          });

          setData(data);
        }}
      >
        <span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 3.75V0.75L5.25 4.5L9 8.25V5.25C11.4825 5.25 13.5 7.2675 13.5 9.75C13.5 12.2325 11.4825 14.25 9 14.25C6.5175 14.25 4.5 12.2325 4.5 9.75H3C3 13.065 5.685 15.75 9 15.75C12.315 15.75 15 13.065 15 9.75C15 6.435 12.315 3.75 9 3.75Z"
              fill="#FF8743"
            />
          </svg>
        </span>
        <span>Reset Filter</span>
      </button>
    </div>
  );
};

export default OrderFilter;

const DropDownButton = ({ name }: { name: string }) => {
  return (
    <div className="flex items-center justify-between lg:justify-center gap-4">
      <span>{name}</span>
      <span>
        <svg
          width="12"
          height="9"
          viewBox="0 0 12 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.415 0.709999L6 5.295L10.585 0.709999L12 2.125L6 8.125L0 2.125L1.415 0.709999Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </div>
  );
};

const FilterButton = ({
  name,
  onClick,
  isActive,
  props,
}: {
  name: string;
  isActive?: string;
  onClick?: () => void;
  props?: any;
}) => {
  return (
    <Button
      variant="outline"
      className={`w-full h-9 bg-transparent  rounded-full border-[#979797] capitalize text-[#202224] text-xs font-bold text-center ${isActive}`}
      onClick={onClick}
      {...props}
    >
      {name}
    </Button>
  );
};
