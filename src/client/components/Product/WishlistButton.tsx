"use client";
import { DeleteBox, HeartIcon } from "@/client/icon";
import { FC } from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

interface props {
  onSubmit: any;
  hasWishlist: boolean;
  showDelete?: boolean;
  className?: string;
}

export const WishlistButton: FC<props> = ({
  showDelete,
  onSubmit,
  hasWishlist,
  className,
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleWishlistItem = async () => {
    const response = await onSubmit();

    if (response.error) {
      toast({
        title: "Error",
        description: response.error,
        variant: "error",
      });
    }

    if (response) {
      toast({
        title: "Update wishlist",
        description: "You can view your wishlist in the wishlist page",
        variant: "success",
      });

      router.refresh();
    }
  };
  return (
    <>
      <form action={handleWishlistItem}>
        {hasWishlist && showDelete ? (
          <button
            type="submit"
            className="w-[34px] h-[34px] rounded-full bg-white grid place-items-center cursor-pointer"
          >
            <DeleteBox />
          </button>
        ) : (
          <button
            type="submit"
            className={` ${hasWishlist ? "bg-brand text-white" : "bg-white"} ${
              className
                ? className
                : "w-[34px] h-[34px] rounded-full hover:text-white hover:bg-brand grid place-items-center cursor-pointer group"
            } `}
          >
            <HeartIcon />
          </button>
        )}
      </form>
    </>
  );
};
