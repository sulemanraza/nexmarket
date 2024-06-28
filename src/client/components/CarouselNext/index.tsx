"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";

const carouselItems = [
  { id: 1, title: "title 1", image: "/images/silder-1.png" },
  { id: 2, title: "title 2", image: "/images/silder-2.jpg" },
  { id: 3, title: "title 3", image: "/images/18218007_Kerfin7_NEA_2406.jpg" },
  { id: 4, title: "title 4", image: "/images/silder-4.jpg" },
];

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

export const CarouselNext = () => (
  <Carousel
    autoPlay
    arrows={false}
    autoPlaySpeed={5000}
    infinite
    keyBoardControl
    pauseOnHover
    responsive={responsive}
    showDots
    swipeable
  >
    {carouselItems.map((item) => (
      <div key={item.id} className="lg:h-[444px] w-full relative bg-white">
        <Image
          src={item.image}
          alt={item.title}
          layout="responsive"
          width={1920}
          height={344}
          className="object-cover w-full lg:h-full h-auto"
        />
      </div>
    ))}
  </Carousel>
);
