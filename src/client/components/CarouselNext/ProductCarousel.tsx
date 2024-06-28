"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Ensure to import the necessary CSS
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "@/client/icon";

interface ProductProps {
  responsive?: any;
  children: any;
  className?: string;
}

export const ProductCarousel = ({ className, responsive, children }: any) => {
  return (
    <Carousel
      arrows={false}
      renderButtonGroupOutside={true}
      customButtonGroup={<ButtonGroup />}
      className={className ?? "relative"}
      responsive={
        responsive ?? {
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 4,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
          },
        }
      }
      rewind={true}
      rewindWithAnimation={true}
      rtl={false}
      shouldResetAutoplay
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {children}
    </Carousel>
  );
};

export const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div
      className="carousel-button-group mb-4 gap-4 flex justify-end 
        items-center w-full absolute top-[-63px] right-0"
    >
      <button
        className=" bg-[#F5F5F5] w-8 h-8 md:w-[46px] md:h-[46px] rounded-full grid place-items-center"
        onClick={() => previous()}
      >
        <ArrowLeft className="w-4 h-4 md:w-auto md:h-auto" />
      </button>
      <button onClick={() => next()}>
        <span className=" bg-[#F5F5F5] w-8 h-8 md:w-[46px] md:h-[46px] rounded-full grid place-items-center">
          <ArrowRight className="w-4 h-4 md:w-auto md:h-auto" />
        </span>
      </button>
    </div>
  );
};
