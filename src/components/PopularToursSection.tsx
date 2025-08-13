"use client";

import React, { useState, useEffect } from 'react';
import { Star, Clock, MapPin, ArrowRight, Users, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import PriceDisplay from '@/components/Currency/PriceDisplay';
import { EnhancedProduct } from '@/lib/enhancedDataProvider';
import { clientDataProvider } from '@/lib/clientDataProvider';

export function PopularToursSection() {
  const [popularTours, setPopularTours] = useState<EnhancedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    async function loadPopularTours() {
      try {
        const products = await clientDataProvider.getAllProducts();
        // Get tours marked as popular, fallback to high-rated tours if none are marked
        let popular = products.filter(product => product.popular);
        
        if (popular.length === 0) {
          // Fallback: select top 5 global tours by rating and review count for carousel
          // Exclude Melbourne to make them different from Melbourne carousel
          popular = products
            .filter(product => 
              product.reviewCount > 0 && 
              !product.destinationName.toLowerCase().includes('melbourne')
            )
            .sort((a, b) => {
              if (b.rating !== a.rating) {
                return b.rating - a.rating;
              }
              return b.reviewCount - a.reviewCount;
            })
            .slice(0, 5);
        } else {
          // Limit to 5 popular tours for carousel and exclude Melbourne
          popular = popular
            .filter(product => !product.destinationName.toLowerCase().includes('melbourne'))
            .slice(0, 5);
        }
        
        setPopularTours(popular);
      } catch (error) {
        console.error('Error loading popular tours:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPopularTours();
  }, []);

  // Remove auto-play functionality per user request

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
    setCurrentIndex((prev) => (prev + 1) % popularTours.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + popularTours.length) % popularTours.length);
  };

  const getVisibleCards = () => {
    if (popularTours.length === 0) return [];
    
    if (isMobile) {
      // Mobile: Show only current card
      return [{
        ...popularTours[currentIndex],
        position: 0,
        index: currentIndex,
        isActive: true,
        stackOrder: 1
      }];
    }
    
    // Desktop: Create infinite carousel effect - show all cards with proper wrapping
    return popularTours.map((tour, index) => {
      let distanceFromCenter = index - currentIndex;
      
      // Handle infinite wrapping for smoother transitions
      if (distanceFromCenter > popularTours.length / 2) {
        distanceFromCenter -= popularTours.length;
      } else if (distanceFromCenter < -popularTours.length / 2) {
        distanceFromCenter += popularTours.length;
      }
      
      const isActive = index === currentIndex;
      
      return {
        ...tour,
        position: distanceFromCenter,
        index: index,
        isActive,
        stackOrder: popularTours.length - Math.abs(distanceFromCenter)
      };
    });
  };

  if (loading) {
    return (
      <section className="pt-16 md:pt-24 lg:pt-32 pb-12 md:pb-16 lg:pb-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 md:mb-12 lg:mb-16">
            <div className="max-w-2xl mb-6 lg:mb-0">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
                Discover our popular tours
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 font-light leading-relaxed">
                Join thousands of travelers who have explored the world with our most loved experiences
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-5xl overflow-visible">
              <div className="flex items-center justify-center h-[400px] sm:h-[450px] md:h-[480px] lg:h-[500px] px-4 sm:px-8">
                <div className="bg-gray-200 rounded-xl w-[260px] sm:w-[300px] lg:w-80 h-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (popularTours.length === 0) {
    return null;
  }

  return (
    <section className="relative pt-16 md:pt-24 lg:pt-32 pb-12 md:pb-16 lg:pb-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 md:mb-12 lg:mb-16">
          <div className="max-w-2xl mb-6 lg:mb-0">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
              Discover our popular tours
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 font-light leading-relaxed">
              Join thousands of travelers who have explored the world with our most loved experiences
            </p>
          </div>
          
          <Button 
            variant="outline" 
            className="hidden lg:flex items-center gap-2 border-[#FF2828] text-[#FF2828] hover:bg-[#FF2828] hover:text-white px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#FF2828]/25"
          >
            <Link href="/search" className="flex items-center gap-2">
              View all tours
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Carousel Container - Responsive Design */}
        <div className="relative flex items-center justify-center" style={!isMobile ? { perspective: '1000px' } : {}}>
          <div 
            className={`relative ${isMobile ? 'w-full max-w-sm mx-auto' : 'w-[360px] lg:w-[400px]'} h-[400px] sm:h-[450px] md:h-[480px] lg:h-[500px]`} 
            style={!isMobile ? { transformStyle: 'preserve-3d' } : {}}
          >
            {getVisibleCards().map((card, cardIndex) => {
              const { position, isActive, stackOrder } = card;
              
              if (isMobile) {
                // Mobile: Simple centered card
                return (
                  <div
                    key={`${card.id}-${card.index}`}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-out"
                    style={{
                      width: '100%',
                      maxWidth: '320px',
                      zIndex: 30,
                    }}
                    onClick={() => setCurrentIndex(card.index)}
                  >
                    <PopularTourCard tour={card} featured={true} />
                  </div>
                );
              }
              
              // Desktop: Playing cards deck effect
              const rotation = isActive ? 0 : position * 15;
              const translateX = isActive ? 0 : position * 80;
              const translateY = isActive ? 0 : Math.abs(position) * 30;
              const translateZ = isActive ? 0 : -Math.abs(position) * 50;
              const scale = isActive ? 1 : Math.max(0.7, 0.95 - Math.abs(position) * 0.1);
              const opacity = isActive ? 1 : Math.max(0.4, 1 - Math.abs(position) * 0.15);
              const zIndex = isActive ? 30 : Math.max(10, 25 - Math.abs(position) * 3);
              const tiltY = isActive ? 0 : position * 5;
              
              return (
                <div
                  key={`${card.id}-${card.index}`}
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-out cursor-pointer hover:z-[45]"
                  style={{
                    transform: `translateX(calc(-50% + ${translateX}px)) translateY(${translateY}px) translateZ(${translateZ}px) rotateZ(${rotation}deg) rotateY(${tiltY}deg) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    width: '350px',
                    transformOrigin: 'center bottom',
                    transformStyle: 'preserve-3d',
                  }}
                  onClick={() => setCurrentIndex(card.index)}
                  onMouseEnter={() => {
                    // Add subtle hover effect without disrupting the deck
                    if (!isActive) {
                      const el = document.querySelector(`[data-card-id="${card.id}"]`) as HTMLElement;
                      if (el) {
                        el.style.transform += ' translateY(-5px) scale(1.02)';
                      }
                    }
                  }}
                  onMouseLeave={() => {
                    // Reset hover effect
                    if (!isActive) {
                      const el = document.querySelector(`[data-card-id="${card.id}"]`) as HTMLElement;
                      if (el) {
                        el.style.transform = `translateX(calc(-50% + ${translateX}px)) translateY(${translateY}px) translateZ(${translateZ}px) rotateZ(${rotation}deg) rotateY(${tiltY}deg) scale(${scale})`;
                      }
                    }
                  }}
                  data-card-id={card.id}
                >
                  <div className={`transition-all duration-700 ${isActive ? 'shadow-2xl shadow-black/25' : 'shadow-lg shadow-black/15'}`}>
                    <PopularTourCard tour={card} featured={isActive} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevCard}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-[35] hover:shadow-2xl"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-700" />
          </button>
          
          <button
            onClick={nextCard}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-[35] hover:shadow-2xl"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-700" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-8 md:mt-12">
          <div className="flex space-x-2 md:space-x-3">
            {popularTours.map((_, index) => (
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

        {/* Mobile CTA */}
        <div className="flex justify-center mt-8 md:mt-12 lg:hidden">
          <Link href="/search">
            <Button className="bg-[#FF2828] hover:bg-[#E61E1E] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl shadow-lg shadow-[#FF2828]/25 text-sm sm:text-base">
              View all tours
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Individual tour card component
function PopularTourCard({ tour, featured = false }: { tour: EnhancedProduct; featured?: boolean }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <Card
      className={`group relative overflow-hidden bg-white transition-all duration-700 transform rounded-2xl ${
        featured 
          ? "shadow-2xl shadow-black/20 hover:shadow-3xl hover:-translate-y-1" 
          : "shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5"
      }`}
    >
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
          <img
            src={tour.images.hero}
            alt={tour.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm hover:bg-white p-2.5 rounded-full shadow-lg border-0 transition-all duration-300 z-10"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              isWishlisted ? "fill-[#FF2828] text-[#FF2828]" : "text-gray-600"
            }`}
          />
        </Button>


        {/* Category Badge */}
        {tour.categories[0] && (
          <Badge className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full px-3 py-1 font-medium shadow-lg border-0">
            {tour.categories[0]}
          </Badge>
        )}
      </div>

      <CardContent className="p-6">
        {/* Location */}
        <div className="flex items-center gap-1 mb-3 pt-3">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500 font-medium">{tour.destinationName}</span>
        </div>

        {/* Title */}
        <Link href={`/product/${tour.id}`}>
          <h3 className="font-semibold text-gray-900 mb-4 line-clamp-2 leading-tight text-lg group-hover:text-[#FF2828] transition-colors duration-300 cursor-pointer">
            {tour.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          {tour.reviewCount > 0 ? (
            <>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900 text-sm">
                  {tour.rating}
                </span>
              </div>
              <span className="text-sm text-gray-500">({tour.reviewCount} reviews)</span>
            </>
          ) : (
            <span className="text-sm text-gray-500">No reviews yet</span>
          )}
        </div>

        {/* Tour Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 font-medium">
              {tour.duration}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 font-medium">
              Max 16
            </span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-sm text-gray-500">From</span>
            <div className="font-bold text-gray-900 text-xl">
              <PriceDisplay 
                price={tour.pricing.adult} 
                fromCurrency={tour.currency}
              />
            </div>
          </div>
          <Link href={`/product/${tour.id}`}>
            <Button className="bg-[#FF2828] hover:bg-[#E61E1E] text-white px-6 py-2 rounded-xl shadow-lg shadow-[#FF2828]/25 hover:shadow-xl hover:shadow-[#FF2828]/30 transition-all duration-300">
              Book now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}