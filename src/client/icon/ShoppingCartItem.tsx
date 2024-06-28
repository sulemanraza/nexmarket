import React from "react";

interface ShoppingCartItemProps {
  count: number;
  props?: React.SVGProps<SVGSVGElement>;
}

export const ShoppingCartItem: React.FC<ShoppingCartItemProps> = ({
  count,
  ...props
}) => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M9.25 28.25C9.66421 28.25 10 27.9142 10 27.5C10 27.0858 9.66421 26.75 9.25 26.75C8.83579 26.75 8.5 27.0858 8.5 27.5C8.5 27.9142 8.83579 28.25 9.25 28.25Z"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.75 28.25C20.1642 28.25 20.5 27.9142 20.5 27.5C20.5 27.0858 20.1642 26.75 19.75 26.75C19.3358 26.75 19 27.0858 19 27.5C19 27.9142 19.3358 28.25 19.75 28.25Z"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.25 11.75H6.25L8.5 24.5H20.5"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 20.5H20.1925C20.2792 20.5001 20.3633 20.4701 20.4304 20.4151C20.4975 20.3601 20.5434 20.2836 20.5605 20.1986L21.9105 13.4486C21.9214 13.3942 21.92 13.338 21.9066 13.2841C21.8931 13.2303 21.8679 13.1801 21.8327 13.1372C21.7975 13.0943 21.7532 13.0597 21.703 13.036C21.6528 13.0122 21.598 13 21.5425 13H7"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {count > 0 && (
        <span className=" absolute top-1 right-0 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full bg-red-500">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </div>
  );
};
