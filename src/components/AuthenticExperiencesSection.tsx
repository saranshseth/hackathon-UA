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
    name: "Great Barrier Reef & Sydney",
    destinationName: "Sydney",
    destinationCountry: "Australia",
    countryCode: "AU",
    duration: "12 days",
    pricing: { adult: 2899 },
    currency: "AUD",
    rating: 4.8,
    reviewCount: 523,
    categories: ["Adventure"],
    images: { hero: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1200&h=800&fit=crop&q=80" },
    overview: "Iconic Opera House, pristine beaches and reef diving",
    intrepidUrl: "https://www.intrepidtravel.com/au/australia",
    size: "large",
    isUserCountry: true
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
    images: { hero: "https://images.unsplash.com/photo-1539650116574-8f9b9de69264?w=1200&h=800&fit=crop&q=80" },
    overview: "Ancient pyramids, Sphinx and Nile river cruise",
    intrepidUrl: "https://www.intrepidtravel.com/au/egypt",
    size: "medium"
  },
  {
    id: "vietnam-intrepid",
    name: "Vietnam Street Food Tour",
    destinationName: "Hanoi",
    destinationCountry: "Vietnam",
    countryCode: "VN",
    duration: "12 days",
    pricing: { adult: 1599 },
    currency: "AUD",
    rating: 4.8,
    reviewCount: 367,
    categories: ["Food & Drink"],
    images: { hero: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=1200&h=800&fit=crop&q=80" },
    overview: "Ha Long Bay, street food and cultural immersion",
    intrepidUrl: "https://www.intrepidtravel.com/au/vietnam",
    size: "medium"
  },
  {
    id: "italy-intrepid",
    name: "Best of Italy",
    destinationName: "Rome",
    destinationCountry: "Italy",
    countryCode: "IT",
    duration: "15 days",
    pricing: { adult: 3299 },
    currency: "AUD",
    rating: 4.9,
    reviewCount: 412,
    categories: ["Cultural"],
    images: { hero: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&h=800&fit=crop&q=80" },
    overview: "Colosseum, Venice canals and Tuscan countryside",
    intrepidUrl: "https://www.intrepidtravel.com/au/italy",
    size: "small"
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
    images: { hero: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop&q=80" },
    overview: "Penguins, icebergs and polar expedition",
    intrepidUrl: "https://www.intrepidtravel.com/au/antarctica",
    size: "small"
  },
  {
    id: "morocco-intrepid",
    name: "Morocco Kasbahs & Desert",
    destinationName: "Marrakech",
    destinationCountry: "Morocco",
    countryCode: "MA",
    duration: "8 days",
    pricing: { adult: 1899 },
    currency: "AUD",
    rating: 4.7,
    reviewCount: 289,
    categories: ["Adventure"],
    images: { hero: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1200&h=800&fit=crop&q=80" },
    overview: "Sahara desert camping and ancient medinas",
    intrepidUrl: "https://www.intrepidtravel.com/au/morocco",
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
        // Always use our curated Intrepid destinations for the bento grid
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