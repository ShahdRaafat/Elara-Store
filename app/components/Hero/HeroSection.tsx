"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

function HeroSection() {
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-[calc(100vh-90px)]  lg:-my-12 bg-[#F4F2EE] flex items-center">
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
        <SwiperSlide>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-8 px-6 md:px-12 lg:px-20 pt-12 lg:pt-19">
            <div className="space-y-6 text-center my-auto md:text-left">
              <h3 className="text-sm font-medium uppercase tracking-wide text-brand-500">
                New Collection
              </h3>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight text-grey-900">
                Fall - Winter Collections 2025
              </h2>
              <p className="text-grey-600 max-w-md mx-auto md:mx-0">
                Discover the latest fashion trends with our brand-new winter
                collection. Style meets comfort.
              </p>
              <Button className="mt-4">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="relative flex justify-center  ">
              <div className="relative w-64 h-64 md:w-[500px] md:h-[570px]">
                <div className="absolute -top-6 -left-6 md:top-20 md:left-10 h-64 w-64 md:h-[400px] md:w-[400px] rounded-full bg-brand-500/20"></div>
                <Image
                  src="/hero-1.png"
                  alt="Hero image 1"
                  fill
                  className="object-cover"
                  quality={100}
                  priority
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-8 px-6 md:px-12 lg:px-20 pt-12 lg:pt-19">
            <div className="space-y-6 text-center my-auto md:text-left">
              <h3 className="text-sm font-medium uppercase tracking-wide text-brand-500">
                New Arrival
              </h3>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight text-grey-900">
                Premium Quality Fashion
              </h2>
              <p className="text-grey-600 max-w-md mx-auto md:mx-0">
                Experience luxury and elegance with our carefully curated
                selection. Quality meets affordability.
              </p>
              <Button className="mt-4">
                Discover More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="relative flex justify-center  ">
              <div className="relative w-64 h-64 md:w-[500px] md:h-[570px]">
                <div className="absolute -top-6 -left-6 md:top-20 md:left-10 h-64 w-64 md:h-[400px] md:w-[400px] rounded-full bg-brand-500/20"></div>
                <Image
                  src="/hero-2.png"
                  alt="Hero image 2"
                  fill
                  className="object-cover"
                  quality={100}
                  priority
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default HeroSection;

// "use client";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import { Button } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";
// import Image from "next/image";

// function HeroSection() {
//   return (
//     <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-[calc(100vh-90px)] lg:-my-12 bg-[#F4F2EE] flex items-center overflow-hidden">
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         navigation
//         pagination={{ clickable: true }}
//         loop={true}
//         autoplay={{
//           delay: 4000,
//           disableOnInteraction: false,
//         }}
//         speed={1000}
//         slidesPerView={1}
//         className="w-full"
//       >
//         {/* ===== Slide 1 ===== */}
//         <SwiperSlide>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-12 lg:px-20 pt-12 lg:pt-19 relative">
//             <div className="space-y-6 text-center my-auto md:text-left z-10">
//               <h3 className="text-sm font-medium uppercase tracking-wide text-brand-500">
//                 Summer Collection
//               </h3>
//               <h2 className="text-3xl md:text-5xl font-bold leading-tight text-grey-900">
//                 Fall - Winter Collections 2025
//               </h2>
//               <p className="text-grey-600 max-w-md mx-auto md:mx-0">
//                 Discover the latest fashion trends with our brand-new winter
//                 collection. Style meets comfort.
//               </p>
//               <Button className="mt-4">
//                 Shop now
//                 <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>
//             </div>

//             <div className="relative flex justify-center">
//               <div className="relative w-64 h-64 md:w-[500px] md:h-[570px]">
//                 <div className="absolute -top-6 -left-6 md:top-20 md:left-10 h-64 w-64 md:h-[400px] md:w-[400px] rounded-full bg-brand-500/20 animate-pulse"></div>
//                 <Image
//                   src="/hero-1.png"
//                   alt="Hero image 1"
//                   fill
//                   className="object-cover"
//                   quality={100}
//                   priority
//                 />
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>

//         {/* ===== Slide 2 ===== */}
//         <SwiperSlide>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-12 lg:px-20 pt-12 lg:pt-19 relative">
//             <div className="space-y-6 text-center my-auto md:text-left z-10">
//               <h3 className="text-sm font-medium uppercase tracking-wide text-brand-500">
//                 New Arrival
//               </h3>
//               <h2 className="text-3xl md:text-5xl font-bold leading-tight text-grey-900">
//                 Spring - Summer 2025
//               </h2>
//               <p className="text-grey-600 max-w-md mx-auto md:mx-0">
//                 Fresh colors, light fabrics, and timeless elegance. Explore our
//                 latest summer outfits now.
//               </p>
//               <Button className="mt-4 bg-grey-900 hover:bg-grey-800 text-white">
//                 Explore now
//                 <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>
//             </div>

//             <div className="relative flex justify-center">
//               <div className="relative w-64 h-64 md:w-[500px] md:h-[570px]">
//                 <div className="absolute bottom-0 right-0 h-48 w-48 md:h-[300px] md:w-[300px] rounded-full bg-brand-400/30 animate-bounce"></div>
//                 <Image
//                   src="/hero-2.png"
//                   alt="Hero image 2"
//                   fill
//                   className="object-cover"
//                   quality={100}
//                   priority
//                 />
//               </div>
//             </div>
//           </div>
//         </SwiperSlide>
//       </Swiper>

//       {/* decoration dots */}
//       <div className="absolute top-15 right-10 hidden md:block opacity-20">
//         <svg width="120" height="120">
//           <defs>
//             <pattern
//               id="dots"
//               x="0"
//               y="0"
//               width="20"
//               height="20"
//               patternUnits="userSpaceOnUse"
//             >
//               <circle cx="3" cy="3" r="3" fill="#8c1c13" />
//             </pattern>
//           </defs>
//           <rect width="120" height="120" fill="url(#dots)" />
//         </svg>
//       </div>
//     </section>
//   );
// }

// export default HeroSection;
