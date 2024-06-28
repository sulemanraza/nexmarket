import React, { FC } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "outline"
    | "disabled";
}

const Button: FC<ButtonProps> = ({ className, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md focus:outline-none ${className}
      
      
      ${
        className === "primary"
          ? "bg-brand text-white"
          : className === "secondary"
          ? "bg-secondary text-white"
          : className === "danger"
          ? "bg-danger text-white"
          : className === "success"
          ? "bg-success text-white"
          : className === "warning"
          ? "bg-warning text-white"
          : className === "outline"
          ? "border border-gray-300 text-gray-700"
          : className === "disabled"
          ? "bg-gray-300 text-white"
          : "bg-brand text-white"
      }
      
      
      `}
    >
      {children}
    </button>
  );
};

export default Button;
