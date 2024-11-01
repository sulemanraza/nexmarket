import React from "react";

export const HeartItem = (props: any) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11 7C8.239 7 6 9.23669 6 11.9962C6 14.2238 6.875 19.5107 15.488 24.8551C15.6423 24.9499 15.8194 25 16 25C16.1806 25 16.3577 24.9499 16.512 24.8551C25.125 19.5107 26 14.2238 26 11.9962C26 9.23669 23.761 7 21 7C18.239 7 16 10.028 16 10.028C16 10.028 13.761 7 11 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="9" r="8" fill="#DB4444" />
      <path
        d="M20.2066 11.068V10.24L24.4186 4.408H25.7266V10.12H26.9266V11.068H25.7266V13H24.6466V11.068H20.2066ZM24.6946 5.548L21.4666 10.12H24.6946V5.548Z"
        fill="#FAFAFA"
      />
    </svg>
  );
};
