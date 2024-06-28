import React from "react";

interface props {
  searchParams: {
    session_id: string;
  };
}

const CheckoutSuccess = ({ searchParams }: props) => {
  const { session_id } = searchParams;
  console.log("CheckoutSuccess", { session_id });
  return <div></div>;
};

export default CheckoutSuccess;
