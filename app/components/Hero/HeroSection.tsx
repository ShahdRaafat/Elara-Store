"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import HeroSlide from "./HeroSlide";

const slides = [
  {
    id: 1,
    badge: "New Collection",
    title: "Fall - Winter Collections 2025",
    description:
      "Discover the latest fashion trends with our brand-new winter collection. Style meets comfort.",
    buttonText: "Shop Now",
    image: "/hero-1.webp",
  },
  {
    id: 2,
    badge: "New Arrival",
    title: "Premium Quality Fashion",
    description:
      "Experience luxury and elegance with our carefully curated selection. Quality meets affordability.",
    buttonText: "Explore More",
    image: "/hero-2.webp",
  },
];

function HeroSection() {
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-[calc(100vh-90px)] -my-6 sm:-my-8  lg:-my-12 bg-[#F4F2EE] flex items-center">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          stopOnLastSlide: false,
        }}
        speed={1000}
        allowTouchMove={true}
        watchSlidesProgress={true}
        spaceBetween={0}
        slidesPerView={1}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <HeroSlide slide={slide} key={slide.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default HeroSection;
