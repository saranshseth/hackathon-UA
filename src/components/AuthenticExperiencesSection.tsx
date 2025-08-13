"use client";

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, MapPin, Clock, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import PriceDisplay from '@/components/Currency/PriceDisplay';
import { EnhancedProduct } from '@/lib/enhancedDataProvider';
import { clientDataProvider } from '@/lib/clientDataProvider';
import { useCurrency } from '@/contexts/CurrencyContext';

// Intrepid Travel destinations with unique countries and specific URLs
const intrepidDestinations = [
  {
    id: "australia-intrepid",
    name: "Australia Outback Explorer",
    destinationName: "Sydney",
    destinationCountry: "Australia",
    countryCode: "AU",
    duration: "12 days",
    pricing: { adult: 2899 },
    currency: "AUD",
    rating: 4.8,
    reviewCount: 523,
    categories: ["Adventure"],
    images: { hero: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=80" },
    overview: "Red centre, coastal adventures and unique wildlife",
    intrepidUrl: "https://www.intrepidtravel.com/au/australia",
    size: "large",
    isUserCountry: true
  },
  {
    id: "japan-intrepid",
    name: "Japan Real Food Adventure",
    destinationName: "Tokyo",
    destinationCountry: "Japan",
    countryCode: "JP",
    duration: "14 days",
    pricing: { adult: 3299 },
    currency: "AUD",
    rating: 4.9,
    reviewCount: 312,
    categories: ["Cultural"],
    images: { hero: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&h=800&fit=crop&q=80" },
    overview: "Traditional temples, authentic cuisine, and local artisans",
    intrepidUrl: "https://www.intrepidtravel.com/au/japan",
    size: "medium"
  },
  {
    id: "egypt-intrepid",
    name: "Egypt Pyramids & Nile",
    destinationName: "Cairo",
    destinationCountry: "Egypt",
    countryCode: "EG",
    duration: "10 days",
    pricing: { adult: 2499 },
    currency: "AUD",
    rating: 4.7,
    reviewCount: 445,
    categories: ["Cultural"],
    images: { hero: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c0e?w=1200&h=800&fit=crop&q=80" },
    overview: "Ancient wonders and Nile river adventures",
    intrepidUrl: "https://www.intrepidtravel.com/au/egypt",
    size: "medium"
  },
  {
    id: "antarctica-intrepid",
    name: "Antarctica Expedition",
    destinationName: "Antarctic Peninsula",
    destinationCountry: "Antarctica",
    countryCode: "AQ",
    duration: "11 days",
    pricing: { adult: 8999 },
    currency: "AUD",
    rating: 4.9,
    reviewCount: 156,
    categories: ["Adventure"],
    images: { hero: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&q=80" },
    overview: "Ultimate polar expedition with wildlife encounters",
    intrepidUrl: "https://www.intrepidtravel.com/au/antarctica",
    size: "small"
  },
  {
    id: "vietnam-intrepid",
    name: "Vietnam Real Food Adventure",
    destinationName: "Ho Chi Minh City",
    destinationCountry: "Vietnam",
    countryCode: "VN",
    duration: "12 days",
    pricing: { adult: 1599 },
    currency: "AUD",
    rating: 4.8,
    reviewCount: 367,
    categories: ["Food & Drink"],
    images: { hero: "https://images.unsplash.com/photo-1559592413-7cec4d0d2638?w=1200&h=800&fit=crop&q=80" },
    overview: "Street food and cultural immersion",
    intrepidUrl: "https://www.intrepidtravel.com/au/vietnam",
    size: "small"
  },
  {
    id: "india-intrepid",
    name: "Golden Triangle & Beyond",
    destinationName: "Delhi",
    destinationCountry: "India",
    countryCode: "IN",
    duration: "15 days",
    pricing: { adult: 2499 },
    currency: "AUD",
    rating: 4.7,
    reviewCount: 445,
    categories: ["Cultural"],
    images: { hero: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&h=800&fit=crop&q=80" },
    overview: "Palaces, temples and vibrant culture",
    intrepidUrl: "https://www.intrepidtravel.com/au/india",
    size: "large"
  }
];

export function AuthenticExperiencesSection() {
  const [trips, setTrips] = useState<EnhancedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { userLocation } = useCurrency();

  useEffect(() => {
    async function loadTrips() {
      try {
        const products = await clientDataProvider.getAllProducts();
        if (products.length > 0) {
          // Use real data and add size property for bento layout
          let selectedTrips = products
            .filter(product => product.reviewCount > 0)
            .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
            .slice(0, 6)
            .map((trip, index) => ({
              ...trip,
              size: index === 0 || index === 5 ? 'large' : index === 1 || index === 3 ? 'medium' : 'small'
            }));
          setTrips(selectedTrips as EnhancedProduct[]);
        } else {
          // Use Intrepid destinations and prioritize user's country
          let arrangedDestinations = [...intrepidDestinations];
          
          // If we have user location, prioritize their country as the first large card
          if (userLocation?.country) {
            const userCountryDestination = arrangedDestinations.find(dest => 
              dest.countryCode === userLocation.countryCode || 
              dest.destinationCountry.toLowerCase() === userLocation.country.toLowerCase()
            );
            
            if (userCountryDestination) {
              // Remove user's country from array and put it first
              arrangedDestinations = arrangedDestinations.filter(dest => dest.id !== userCountryDestination.id);
              arrangedDestinations.unshift({...userCountryDestination, size: 'large'});
            }
          }
          
          setTrips(arrangedDestinations as EnhancedProduct[]);
        }
      } catch (error) {
        console.error('Error loading trips:', error);
        setTrips(intrepidDestinations as EnhancedProduct[]);
      } finally {
        setLoading(false);
      }
    }

    loadTrips();
  }, [userLocation]);

  if (loading) {
    return (
      <section className="relative py-16 md:py-24 lg:py-32 bg-white overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Travel the world with<br />
              <span className="text-[#FF2828]">authentic experiences</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover genuine connections and unforgettable moments with small group adventures 
              that take you beyond the tourist trail
            </p>
          </div>
          
          {/* Loading skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-auto">
            {/* Row 1 */}
            <div className="col-span-2 md:col-span-2 h-64 md:h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="col-span-1 md:col-span-1 h-64 md:h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="col-span-1 md:col-span-1 h-64 md:h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
            
            {/* Row 2 */}
            <div className="col-span-1 md:col-span-1 h-48 md:h-60 bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="col-span-1 md:col-span-1 h-48 md:h-60 bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="col-span-2 md:col-span-2 h-48 md:h-60 bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-white overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Travel the world with<br />
            <span className="text-[#FF2828]">authentic experiences</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover genuine connections and unforgettable moments with small group adventures 
            that take you beyond the tourist trail
          </p>
        </div>

        {/* Bento Grid */}
        {trips.length >= 6 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-auto">
            {/* Row 1 */}
            <div className="col-span-2 md:col-span-2 h-64 md:h-80">
              <BentoCard trip={trips[0]} index={0} />
            </div>
            <div className="col-span-1 md:col-span-1 h-64 md:h-80">
              <BentoCard trip={trips[1]} index={1} />
            </div>
            <div className="col-span-1 md:col-span-1 h-64 md:h-80">
              <BentoCard trip={trips[2]} index={2} />
            </div>
            
            {/* Row 2 */}
            <div className="col-span-1 md:col-span-1 h-48 md:h-60">
              <BentoCard trip={trips[3]} index={3} />
            </div>
            <div className="col-span-1 md:col-span-1 h-48 md:h-60">
              <BentoCard trip={trips[4]} index={4} />
            </div>
            <div className="col-span-2 md:col-span-2 h-48 md:h-60">
              <BentoCard trip={trips[5]} index={5} />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading destinations...</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12 md:mt-16">
          <a href="https://www.intrepidtravel.com/au" target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#FF2828] hover:bg-[#E61E1E] text-white px-8 py-4 rounded-xl shadow-lg shadow-[#FF2828]/25 hover:shadow-xl hover:shadow-[#FF2828]/30 transition-all duration-300 text-lg">
              Explore all experiences
              <ArrowUpRight className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

interface BentoCardProps {
  trip: EnhancedProduct;
  index: number;
}

function BentoCard({ trip, index }: BentoCardProps) {
  if (!trip) return null;

  // Get country-specific Intrepid URL if available
  const intrepidUrl = (trip as any).intrepidUrl || "https://www.intrepidtravel.com/au";

  return (
    <a 
      href={intrepidUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block w-full h-full"
    >
      <div className="group relative w-full h-full overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl bg-gray-200">
        {/* Background Image */}
        <img
          src={trip.images?.hero || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop&q=80'}
          alt={trip.destinationCountry || 'Travel destination'}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          onError={(e) => {
            console.log('Image failed to load:', trip.images?.hero);
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop&q=80';
          }}
        />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Country Name at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <h3 className="font-bold text-white text-lg md:text-xl lg:text-2xl leading-tight">
            {trip.destinationCountry || 'Unknown Destination'}
          </h3>
        </div>
      </div>
    </a>
  );
}