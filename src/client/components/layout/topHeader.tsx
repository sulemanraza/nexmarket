import Link from "next/link";

export const TopHeader = () => {
  return (
    <div className="bg-black  flex items-center justify-center h-12 text-[#FAFAFA]">
      <div className="text-xs md:text-sm text-center p-3">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
        <Link href={""} className="text-sm font-semibold underline">
          ShopNow
        </Link>
      </div>
    </div>
  );
};
