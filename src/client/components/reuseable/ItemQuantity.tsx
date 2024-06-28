"use client";

import { setCartItems } from "@/client/redux/store/slices/cartSlice";
import { updateCartItemQuantity } from "@/server/action/CartAction";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface props {
  productId: string;
  max?: number;
  min?: number;
  qty: number;
}

export const ItemQuantity: React.FC<props> = ({
  max = 10,
  min = 1,
  productId,
  qty,
}) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(qty);

  const handleUpdateQuantity = async (newQuantity: number) => {
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("quantity", newQuantity.toString());

    const data: any = await updateCartItemQuantity(formData);
    dispatch(setCartItems(data.items));
  };

  const handleIncrement = async () => {
    if (count < max) {
      const newQuantity = count + 1;
      setCount(newQuantity);
      await handleUpdateQuantity(newQuantity);
    }
  };

  const handleDecrement = async () => {
    if (count > min) {
      const newQuantity = count - 1;
      setCount(newQuantity);
      await handleUpdateQuantity(newQuantity);
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border w-40 h-11">
      <button
        onClick={handleDecrement}
        className="w-11 h-full rounded-r-none border-r rounded-lg text-lg font-semibold hover:bg-gray-100"
      >
        -
      </button>
      <span className="w-16 text-center">{count}</span>
      <button
        onClick={handleIncrement}
        className="w-11 h-full rounded-l-none border-l text-white hover:bg-opacity-85 rounded-lg text-lg font-semibold bg-brand"
      >
        +
      </button>
    </div>
  );
};
