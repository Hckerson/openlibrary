"use client";
// Import Swiper React components
import CustomImage from "./custom-image";
import { Autoplay } from "swiper/modules";
import { mockPDFs } from "@/lib/placeholder_data";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
export default function Slider() {
  return (
    <Swiper
      className="h-full"
      spaceBetween={50}
      loop={true}
      autoplay={{ delay: 2000 }}
      modules={[Autoplay]}
      slidesPerView={1}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {mockPDFs.map((pdf, idx) => {
        return (
          <SwiperSlide key={idx} className="">
            <CustomImage
              image={{
                src: pdf.thumbnail,
                alt: pdf.subject,
                class: "h-full w-full",
                aspectRatio: "16/14",
                className: "max-w-full h-full rounded-lg bg-cover",
              }}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
