import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HeroSlideProps {
  slide: {
    id: number;
    badge: string;
    title: string;
    description: string;
    buttonText: string;
    image: string;
  };
}

function HeroSlide({ slide }: HeroSlideProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-14  gap-8 px-6 md:px-12 lg:px-20 pt-12 lg:pt-19">
      <div className="space-y-6 text-center my-auto md:text-left">
        <h3 className="text-sm font-medium uppercase tracking-wide text-brand-500">
          {slide.badge}
        </h3>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-grey-900">
          {slide.title}
        </h2>
        <p className="text-grey-600 max-w-md mx-auto md:mx-0">
          {slide.description}
        </p>
        <Button className="mt-4 ">
          <Link href="/products" className="flex items-center">
            {slide.buttonText}
            <span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </Link>
        </Button>
      </div>

      <div className="relative flex justify-center  ">
        <div className="relative w-64 h-64 md:w-[500px] md:h-[570px]">
          <div className="absolute -top-6 -left-6 md:top-20 md:left-10 h-64 w-64 md:h-[400px] md:w-[400px] rounded-full bg-brand-500/20"></div>
          <Image
            src={slide.image}
            alt="Hero image"
            fill
            className="object-cover"
            quality={100}
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSlide;
