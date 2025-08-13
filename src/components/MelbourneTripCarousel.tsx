import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Clock, Users, Star, Heart, MapPin } from "lucide-react";
import PriceDisplay from "@/components/Currency/PriceDisplay";
import { EnhancedProduct } from "@/lib/enhancedDataProvider";
import { clientDataProvider } from "@/lib/clientDataProvider";
import TourCarousel from "./ui/TourCarousel";

// Enhanced data for Melbourne trips with fallback
const fallbackTrips = [
  {
    id: 1,
    title: "Melbourne Food & Culture Walking Tour",
    duration: "3h",
    groupSize: "Max 12",
    price: "AUD $89",
    rating: 4.9,
    reviewCount: 247,
    category: "Food & Culture",
    image:
      "https://images.unsplash.com/photo-1514515511788-fafb6278dafe?w=800&h=600&fit=crop",
    featured: true,
    highlight: "Hidden laneways",
  },
  {
    id: 2,
    title: "Street Art & Coffee Culture Tour",
    duration: "2.5h",
    groupSize: "Max 8",
    price: "AUD $75",
    rating: 4.8,
    reviewCount: 189,
    category: "Art & Culture",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
    featured: false,
    highlight: "Local artists",
  },
  {
    id: 3,
    title: "Melbourne by Night Experience",
    duration: "4h",
    groupSize: "Max 16",
    price: "AUD $125",
    rating: 4.7,
    reviewCount: 156,
    category: "Nightlife",
    image:
      "https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=800&h=600&fit=crop",
    featured: false,
    highlight: "Rooftop bars",
  },
];

export function MelbourneTripCarousel() {
  const [products, setProducts] = useState<EnhancedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Load real CSV data
  useEffect(() => {
    async function loadMelbourneTrips() {
      try {
        const melbourneProducts =
          await clientDataProvider.getProductsByDestination("Melbourne");
        if (melbourneProducts.length > 0) {
          setProducts(melbourneProducts.slice(0, 6)); // Limit to 6 for performance
        } else {
          // Convert fallback data to products if no CSV data
          const fallbackProducts = fallbackTrips.map((trip, index) => ({
            id: trip.id.toString(),
            name: trip.title,
            overview: trip.highlight,
            destinationName: "Melbourne",
            destinationCountry: "Australia",
            duration: trip.duration,
            pricing: { adult: parseInt(trip.price.replace(/[^0-9]/g, "")) },
            currency: "AUD",
            rating: trip.rating,
            reviewCount: trip.reviewCount,
            categories: [trip.category],
            private: false,
            images: { hero: trip.image },
          })) as EnhancedProduct[];
          setProducts(fallbackProducts);
        }
      } catch (error) {
        console.error("Error loading CSV data, using fallback:", error);
        // Convert fallback data to products
        const fallbackProducts = fallbackTrips.map((trip, index) => ({
          id: trip.id.toString(),
          name: trip.title,
          overview: trip.highlight,
          destinationName: "Melbourne",
          destinationCountry: "Australia",
          duration: trip.duration,
          pricing: { adult: parseInt(trip.price.replace(/[^0-9]/g, "")) },
          currency: "AUD",
          rating: trip.rating,
          reviewCount: trip.reviewCount,
          categories: [trip.category],
          private: false,
          images: { hero: trip.image },
        })) as EnhancedProduct[];
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    }

    loadMelbourneTrips();
  }, []);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  if (loading) {
    return (
      <div className="w-full">
        {/* Hide Popular in Melbourne section for now */}
        {false && (
          <div className="text-center mb-6 lg:mb-8">
            <p className="text-sm lg:text-base text-gray-600">
              Popular experiences in your area
            </p>
          </div>
        )}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-sm mx-auto">
            <div className="bg-gray-200 rounded-xl w-full h-[400px] animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-gray-500">No Melbourne experiences available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hide Popular in Melbourne section for now */}
      {false && (
        <div className="text-center mb-6 lg:mb-8">
          <p className="text-sm lg:text-base text-gray-600">
            Popular experiences in your area
          </p>
        </div>
      )}

      {/* Responsive Carousel Container */}
      <div className="relative flex items-center justify-center">
        <div className={`relative ${isMobile ? 'w-full max-w-sm mx-auto' : 'w-[360px] lg:w-[400px]'} h-[400px] sm:h-[450px] md:h-[480px] lg:h-[500px]`}>
          {isMobile ? (
            // Mobile: Simple centered card
            <div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-out"
              style={{
                width: '100%',
                maxWidth: '320px',
                zIndex: 30,
              }}
            >
              <TourCard product={products[currentIndex]} />
            </div>
          ) : (
            // Desktop: Show multiple cards
            products.slice(0, 3).map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-out cursor-pointer"
                style={{
                  transform: `translateX(calc(-50% + ${(index - 1) * 120}px)) scale(${index === 1 ? 1 : 0.9})`,
                  opacity: index === 1 ? 1 : 0.7,
                  zIndex: index === 1 ? 30 : 25,
                  width: '350px',
                }}
                onClick={() => setCurrentIndex(index)}
              >
                <TourCard product={product} />
              </div>
            ))
          )}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevCard}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-[35] hover:shadow-2xl"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextCard}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-[35] hover:shadow-2xl"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="flex justify-center mt-8 md:mt-12">
        <div className="flex space-x-2 md:space-x-3">
          {products.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex
                  ? 'w-12 md:w-16 bg-[#FF2828]'
                  : 'w-6 md:w-8 bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface CleanTripCardProps {
  id: number;
  title: string;
  duration: string;
  groupSize: string;
  price: string;
  rating: number;
  reviewCount: number;
  category: string;
  image: string;
  featured: boolean;
  highlight: string;
}

// TourCard component for enhanced products
interface TourCardProps {
  product: EnhancedProduct;
}

function TourCard({ product }: TourCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Card className="group relative overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 rounded-2xl shadow-lg shadow-black/5">
      <div className="relative">
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
          <img
            src={product.images.hero}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm hover:bg-white p-2.5 rounded-full shadow-lg border-0 transition-all duration-300 z-10"
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              isWishlisted ? "fill-[#FF2828] text-[#FF2828]" : "text-gray-600"
            }`}
          />
        </Button>

        {/* Category Badge */}
        <Badge className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full px-3 py-1 font-medium shadow-lg border-0">
          {product.categories[0] || "Adventure"}
        </Badge>
      </div>

      <CardContent className="p-6">
        {/* Location */}
        <div className="flex items-center gap-1 pt-3 mb-3">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500 font-medium">
            {product.destinationName}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-4 line-clamp-2 leading-tight text-lg group-hover:text-[#FF2828] transition-colors duration-300">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-900 text-sm">
              {product.rating}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Tour Details */}
        <div className="grid grid-cols-2 gap-0 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 font-medium">
              {product.duration}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 font-medium">
              {product.private ? "Private" : "Small group"}
            </span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-sm text-gray-500">From</span>
            <div className="font-bold text-gray-900 text-xl">
              <PriceDisplay
                price={product.pricing.adult}
                fromCurrency={product.currency}
                className="font-bold text-gray-900 text-xl"
              />
            </div>
          </div>
          <Button className="bg-[#FF2828] hover:bg-[#E61E1E] text-white px-6 py-2 rounded-xl shadow-lg shadow-[#FF2828]/25 hover:shadow-xl hover:shadow-[#FF2828]/30 transition-all duration-300">
            Book now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CleanTripCard({
  title,
  duration,
  groupSize,
  price,
  rating,
  reviewCount,
  category,
  image,
  featured,
  highlight,
}: CleanTripCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Card className="group relative overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 rounded-2xl shadow-lg shadow-black/5 h-full min-h-[420px]">
      <div className="relative">
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm hover:bg-white p-2.5 rounded-full shadow-lg border-0 transition-all duration-300 z-10"
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              isWishlisted ? "fill-[#FF2828] text-[#FF2828]" : "text-gray-600"
            }`}
          />
        </Button>


        {/* Category Badge */}
        <Badge className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-gray-800 rounded-full px-3 py-1 font-medium border-0 shadow-md">
          {category}
        </Badge>
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-900 text-sm">
              {rating}
            </span>
          </div>
          <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
        </div>

        {/* Title */}
        <h4 className="font-semibold text-gray-900 mb-3 line-clamp-2 leading-snug text-base group-hover:text-[#FF2828] transition-colors duration-300">
          {title}
        </h4>

        {/* Tour Details */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 font-medium">
              {duration}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 font-medium">
              {groupSize}
            </span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100">
          <div>
            <span className="text-sm text-gray-500">From</span>
            <div className="font-bold text-gray-900 text-xl">{price}</div>
          </div>
          <Button className="bg-[#FF2828] hover:bg-[#E61E1E] text-white px-4 py-2 rounded-xl shadow-lg shadow-[#FF2828]/25 hover:shadow-xl hover:shadow-[#FF2828]/30 transition-all duration-300 text-sm">
            Book now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
