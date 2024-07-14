"use client";
import { useDispatch } from "react-redux";
import { setCartItems } from "../../redux/store/slices/cartSlice";
import { FC } from "react";
import { useToast } from "../ui/use-toast";
import { addToCartItem } from "@/server/action/CartAction";
import { useSession } from "next-auth/react";

interface AddToCartButtonProps {
  productId: string;
  quantity?: number;
  className?: string;
}

export const AddToCartButton: FC<AddToCartButtonProps> = ({
  productId,
  quantity = 1,
  className,
}) => {
  const session = useSession();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const addToCart = async () => {
    try {
      if (session.status !== "loading" && !session.data?.user) {
        return window.location.replace("/auth/login");
      }

      const formData = new FormData();
      formData.append("productId", productId);
      formData.append("quantity", quantity.toString());

      // Add item to cart
      const response: any = await addToCartItem(formData);

      // Dispatch action to update cart state
      dispatch(setCartItems(response.items));

      toast({
        title: "Item added to cart",
        description: "You can view your cart on the cart page",
        variant: "success",
      });
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "error",
      });
    }
  };

  return (
    <button onClick={addToCart} className={className ?? ""}>
      Add to Cart
    </button>
  );
};
