"use client";

import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "./EmblaCarousel";

interface TourCarouselProps {
  slides: React.ReactNode[];
  showNavigation?: boolean;
  showDots?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  slidesToShow?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  className?: string;
}

const TourCarousel: React.FC<TourCarouselProps> = ({
  slides,
  showNavigation = true,
  showDots = true,
  autoplay = false,
  autoplayDelay = 5000,
  slidesToShow = { mobile: 1, tablet: 2, desktop: 3 },
  className = "",
}) => {
  const options: EmblaOptionsType = {
    align: "start",
    skipSnaps: false,
    dragFree: false,
    containScroll: "trimSnaps",
    loop: true,
  };

  // Create slides with responsive flex basis
  const responsiveSlides = slides.map((slide, index) => {
    let responsiveClasses = "embla__slide px-2 md:px-3 lg:px-4 min-w-0";

    // Mobile: always 100%
    responsiveClasses += " flex-[0_0_100%]";

    // Tablet
    if (slidesToShow.tablet === 2) {
      responsiveClasses += " md:flex-[0_0_50%]";
    } else if (slidesToShow.tablet === 3) {
      responsiveClasses += " md:flex-[0_0_33.33%]";
    }

    // Desktop
    if (slidesToShow.desktop === 2) {
      responsiveClasses += " lg:flex-[0_0_50%]";
    } else if (slidesToShow.desktop === 3) {
      responsiveClasses += " lg:flex-[0_0_33.33%]";
    } else if (slidesToShow.desktop === 4) {
      responsiveClasses += " lg:flex-[0_0_25%]";
    } else if (slidesToShow.desktop === 5) {
      responsiveClasses += " lg:flex-[0_0_20%]";
    }

    return (
      <div key={index} className={responsiveClasses}>
        {slide}
      </div>
    );
  });

  return (
    <div className={className}>
      <EmblaCarousel
        slides={responsiveSlides}
        options={options}
        showNavigation={showNavigation}
        showDots={showDots}
        autoplay={autoplay}
        autoplayDelay={autoplayDelay}
        className="embla-tour-carousel"
      />
    </div>
  );
};

export default TourCarousel;
