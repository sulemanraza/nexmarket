import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface FeaturedProps {
  image: string;
  title: string;
  description: string;
  width?: number;
  height?: number;
}

export const FeaturedCard: FC<FeaturedProps> = ({
  image,
  title,
  description,
  width,
  height,
}) => {
  return (
    <div className="bg-[#000000] relative overflow-hidden rounded-sm">
      <div className="absolute bottom-0 left-0 w-full h-full">
        <Image
          src={image}
          width={width || 511}
          height={height || 511}
          className="object-cover w-full h-full"
          alt={title}
        />
      </div>

      <div className="absolute bottom-0 space-y-4 left-0 z-50 bg-black w-full p-8 bg-opacity-50 backdrop-filter">
        <h1 className="text-white text-2xl font-semibold">{title}</h1>
        <p className="text-white text-sm">{description}</p>
        <Link href="#" className="underline text-white py-2 mt-4 rounded-md">
          Shop Now
        </Link>
      </div>
    </div>
  );
};
