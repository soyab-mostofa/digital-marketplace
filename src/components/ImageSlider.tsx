"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import type SwiperType from "swiper";
import { Pagination } from "swiper/modules";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface ImageSliderProps {
  url: string[];
}

const activeStyle =
  "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300";

const inactiveStyles = "hidden text-gray-400";

const ImageSlider = ({ url }: ImageSliderProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperConfig, setSwiperConfig] = useState({
    isBegining: true,
    isEnd: activeIndex === (url.length ?? 0) - 1,
  });

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSwiperConfig({
        isBegining: activeIndex === 0,
        isEnd: activeIndex === (url.length ?? 0) - 1,
      });
    });
  }, [swiper, url]);
  return (
    <div className="relative group aspect-square bg-zinc-100 rounded-xl overflow-hidden">
      <div className="absolute z-50 group-hover:opacity-100 opacity-0 inset-0">
        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slideNext();
          }}
          className={cn(activeStyle, "right-3 transition", {
            [inactiveStyles]: swiperConfig.isEnd,
            "hover:bg-primary-300 hover:text-purple-800 opacity-100":
              !swiperConfig.isEnd,
          })}
        >
          <ChevronRight
            className="h-4 w-4 text-zinc-700"
            aria-label="Next image"
          />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slidePrev();
          }}
          className={cn(activeStyle, "left-3 transition", {
            [inactiveStyles]: swiperConfig.isBegining,
            "hover:bg-primary-300 hover:text-purple-800 opacity-100":
              !swiperConfig.isBegining,
          })}
        >
          <ChevronLeft className="h-4 w-4 text-zinc-700" />
        </button>
      </div>
      <Swiper
        pagination={{
          renderBullet(_, className) {
            return `<span class="rounded-full transition  ${className}"></span>`;
          },
        }}
        slidesPerView={1}
        spaceBetween={50}
        modules={[Pagination]}
        onSwiper={(swiper) => setSwiper(swiper)}
        className="w-full h-full"
      >
        {url.map((link, i) => {
          return (
            <SwiperSlide className="'-z-10 h-full w-full" key={i}>
              <Image
                fill
                loading="eager"
                className="-z-10 h-full w-full object-cover object-center"
                src={link}
                alt="Product image"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
