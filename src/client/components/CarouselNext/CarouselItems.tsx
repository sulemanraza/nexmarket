import { AppleIcon, ArrowRight } from "@/client/icon";
import Image from "next/image";
import Link from "next/link";

const AppleOffer = () => {
  return (
    <div className="bg-black text-white flex p-5 h-[344px]">
      <div className="flex flex-col p-8 space-y-8 w-1/2">
        <div className="flex items-center gap-4">
          <AppleIcon />
          <span>iPhone 14 Series</span>
        </div>

        <h2 className="font-semibold text-5xl space-y-3">
          <div>Up to 10% </div>
          <div>off Voucher</div>
        </h2>

        <div>
          <Link href={""} className="flex items-center gap-2">
            <span className=" underline underline-offset-8 text-[16px]">
              Shop Now
            </span>
            <ArrowRight />
          </Link>
        </div>
      </div>

      <div className="w-1/2">
        <Image
          width={456}
          height={344}
          className="object-cover w-full h-full"
          src="/images/apple-mobile.png"
          alt="iPhone 13"
        />
      </div>
    </div>
  );
};

export const CarouselItems = [AppleOffer];
