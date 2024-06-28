import { setCartItems } from "@/client/redux/store/slices/cartSlice";
import { removeCartItem } from "@/server/action/CartAction";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "../ui/use-toast";
import { useSession } from "next-auth/react";

interface Props {
  productId: string;
  className?: string;
  children?: React.ReactNode;
}

export const RemoveCartItemButton: FC<Props> = ({
  productId,
  className,
  children,
}) => {
  const session = useSession();
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(session.data?.user, session.status);

  const handleRemoveItem = async () => {
    if (session.status !== "loading" && !session.data?.user) {
      return window.location.replace("/auth/login");
    }

    try {
      const formData = new FormData();
      formData.append("productId", productId);

      // Remove item from cart
      const data: any = await removeCartItem(formData);

      console.log("Remove item response", data);

      if (data) {
        dispatch(setCartItems(data.items));

        toast({
          title: "Item removed from cart",
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  return (
    <button onClick={handleRemoveItem} className={className || ""}>
      {children || "Remove"}
    </button>
  );
};
