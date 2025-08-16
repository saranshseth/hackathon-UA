"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import TourCarousel from "@/components/ui/TourCarousel";
import PriceDisplay from "@/components/Currency/PriceDisplay";
import { clientDataProvider } from "@/lib/clientDataProvider";
import { EnhancedProduct } from "@/lib/enhancedDataProvider";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Clock,
  Users,
  Heart,
} from "lucide-react";

// Product interfaces for component compatibility
interface TourProduct {
  id: string;
  title: string;
  image: string;
  rating: number;
  reviews: number;
  duration: string;
  groupSize?: string;
  price: number;
  category: string;
}

interface TourCardProps {
  tour: TourProduct;
  className?: string;
}

const TourCard: React.FC<TourCardProps> = ({ tour, className = "" }) => (
  <Card
    className={`group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 ${className}`}
  >
    {/* Image Container */}
    <div className="relative h-36 overflow-hidden rounded-t-lg">
      <img
        src={tour.image}
        alt={tour.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `
              <div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span class="text-white font-medium">Tour Image</span>
              </div>
            `;
          }
        }}
      />

      {/* Wishlist Heart */}
      <div className="absolute top-2 right-2">
        <Button
          variant="ghost"
          size="icon"
          className="bg-white/90 hover:bg-white text-brand-primary-midnight p-0 h-6 w-6 rounded-full shadow-sm"
        >
          <Heart className="h-3 w-3" />
        </Button>
      </div>
    </div>

    {/* Content */}
    <CardContent className="p-3">
      {/* Title */}
      <div className="mb-3 h-10 overflow-hidden">
        <h3 className="font-semibold text-brand-primary-midnight text-sm leading-tight line-clamp-2">
          {tour.title}
        </h3>
      </div>

      {/* Duration */}
      <div className="flex items-center gap-1 mb-2">
        <Clock className="h-3 w-3 text-ui-grey-strong" />
        <span className="text-xs text-ui-grey-strong">{tour.duration}</span>
      </div>

      {/* Category Tag */}
      <div className="mb-3">
        <span className="inline-block bg-gray-100 text-xs text-ui-grey-strong px-2 py-1 rounded tracking-wide">
          {tour.category}
        </span>
      </div>

      {/* Price Section with Border */}
      <div className="border-t border-gray-200 pt-2">
        <div className="flex justify-end items-center">
          <div className="text-right">
            <span className="text-xs text-ui-grey mr-2">From</span>
            <PriceDisplay 
              price={tour.price} 
              fromCurrency="AUD"
              className="text-sm font-semibold text-brand-primary-midnight"
            />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

interface LargeTourCardProps {
  tour: TourProduct;
}

// Helper function to convert EnhancedProduct to TourProduct
function enhancedProductToTourProduct(product: EnhancedProduct): TourProduct {
  return {
    id: product.id,
    title: product.name,
    image: product.images.hero,
    rating: product.rating,
    reviews: product.reviewCount,
    duration: product.duration,
    groupSize: product.private ? 'Private' : 'Small group',
    price: product.pricing.adult,
    category: product.categories[0] || 'Adventure',
  };
}

const LargeTourCard: React.FC<LargeTourCardProps> = ({ tour }) => (
  <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
    <div className="relative h-64 overflow-hidden">
      <img
        src={tour.image}
        alt={tour.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `
              <div class="w-full h-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <span class="text-white font-medium text-lg">Featured Tour</span>
              </div>
            `;
          }
        }}
      />

      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="sm"
          className="bg-white/90 hover:bg-white text-brand-primary-midnight p-2 h-8 w-8"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute bottom-4 left-4 bg-white rounded-full px-4 py-2">
        <PriceDisplay 
          price={tour.price} 
          fromCurrency="AUD"
          className="font-semibold text-brand-primary-midnight"
        />
      </div>
    </div>

    <CardContent className="p-6">
      <div className="flex items-center gap-1 mb-3">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{tour.rating}</span>
        <span className="text-ui-grey-strong">({tour.reviews})</span>
      </div>

      <h3 className="text-lg font-semibold text-brand-primary-midnight mb-4">
        {tour.title}
      </h3>

      <div className="flex items-center gap-4 text-ui-grey-strong">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{tour.duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>Melbourne</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function ExploreMelbourneSection() {
  const [featuredTours, setFeaturedTours] = useState<TourProduct[]>([]);
  const [popularTours, setPopularTours] = useState<TourProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Load Melbourne-specific products
        const melbourneProducts = await clientDataProvider.getProductsByDestination('Melbourne');
        const allProducts = await clientDataProvider.getFeaturedProducts(20);
        
        // Convert to TourProduct format
        const melbourneTours = melbourneProducts
          .slice(0, 9)
          .map(enhancedProductToTourProduct);
        
        const popularToursData = allProducts
          .slice(0, 8)
          .map(enhancedProductToTourProduct);

        setFeaturedTours(melbourneTours);
        setPopularTours(popularToursData);
      } catch (error) {
        console.error('Error loading tour data:', error);
        // Set empty arrays as fallback
        setFeaturedTours([]);
        setPopularTours([]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="bg-brand-primary-sand py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-primary-intrepid-red mx-auto"></div>
            <p className="mt-4 text-brand-primary-midnight">Loading amazing tours...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-primary-sand py-16">
      <div className="container mx-auto px-4">
        {/* Explore Melbourne Hero */}
        <section className="mb-16 flex flex-row justify-between align-middle">
          <div className="mb-8">
            <h1 className="text-[4.5rem] font-regular text-brand-primary-midnight leading-[5.06rem] mb-6">
              Explore
              <br />
              <span className="text-[4.5rem] font-bold italic text-brand-primary-midnight leading-[5.06rem]">
                Melbourne
              </span>
            </h1>
            <Button variant="default" size="lg" className="!rounded-full px-8">
              Learn more
              <ChevronRight className="ml-4 w-4 h-4" />
            </Button>
          </div>

          {/* Featured Tours Carousel */}
          {featuredTours.length > 0 ? (
            <TourCarousel
              slides={featuredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
              showNavigation={true}
              showDots={true}
              autoplay={true}
              autoplayDelay={6000}
              slidesToShow={{ mobile: 1, tablet: 2, desktop: 3 }}
              className="mb-8 max-w-[60%]"
            />
          ) : (
            <div className="mb-8 max-w-[60%] text-center">
              <p className="text-brand-primary-midnight">No tours available at the moment.</p>
            </div>
          )}
        </section>

        {/* Popular Tours Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-brand-primary-midnight">
              Discover our <span className="font-normal">popular tours</span>
            </h2>
          </div>

          {popularTours.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Large Featured Card */}
              <div className="lg:col-span-2">
                <LargeTourCard tour={popularTours[0]} />
              </div>

              {/* Smaller Side Cards Carousel */}
              <div className="lg:col-span-1">
                {popularTours.length > 1 ? (
                  <TourCarousel
                    slides={popularTours.slice(1).map((tour) => (
                      <Card
                        key={tour.id}
                        className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex">
                          <div className="relative w-32 h-24 flex-shrink-0 bg-ui-grey-weaker">
                            <img
                              src={tour.image}
                              alt={tour.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `
                                    <div class="w-full h-full bg-gradient-to-br from-brand-secondary-laguna to-brand-secondary-plum-dark flex items-center justify-center">
                                      <span class="text-white text-xs">Tour</span>
                                    </div>
                                  `;
                                }
                              }}
                            />
                          </div>
                          <CardContent className="flex-1 p-4">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-medium">
                                {tour.rating}
                              </span>
                              <span className="text-xs text-ui-grey-strong">
                                ({tour.reviews})
                              </span>
                            </div>
                            <h4 className="text-sm font-semibold text-brand-primary-midnight mb-2 line-clamp-2">
                              {tour.title}
                            </h4>
                            <div className="flex items-center justify-between text-xs text-ui-grey-strong">
                              <span>{tour.duration}</span>
                              <PriceDisplay 
                                price={tour.price} 
                                fromCurrency="AUD"
                                className="font-semibold text-brand-primary-midnight text-xs"
                              />
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                    showNavigation={false}
                    showDots={true}
                    autoplay={false}
                    slidesToShow={{ mobile: 1, tablet: 1, desktop: 1 }}
                    className="lg:max-h-none"
                  />
                ) : (
                  <div className="text-center">
                    <p className="text-brand-primary-midnight">More tours coming soon!</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-brand-primary-midnight">No popular tours available at the moment.</p>
            </div>
          )}
        </section>

        {/* Travel the World Section */}
        <section>
          <h2 className="text-3xl font-bold text-brand-primary-midnight mb-8">
            Travel the world
          </h2>
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-ui-grey-strong text-lg">
              Explore destinations around the globe with our curated travel
              experiences.
            </p>
            <Button variant="outline" className="mt-4">
              Explore Destinations
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
