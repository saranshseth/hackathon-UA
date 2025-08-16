"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import PriceDisplay from "@/components/Currency/PriceDisplay";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Clock,
  Users,
  Heart,
} from "lucide-react";

// Mock data matching the Figma design
const melbourneTours = [
  {
    id: 1,
    title: "Private Melbourne: Bikes & Sights tour Melbourne...",
    image:
      "https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 127,
    duration: "4 hours",
    groupSize: "Max 8",
    price: 798,
    location: "Melbourne, Australia",
  },
  {
    id: 2,
    title: "Private Melbourne: Bikes & Sights tour Melbourne...",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 89,
    duration: "3.5 hours",
    groupSize: "Max 6",
    price: 649,
    location: "Melbourne, Australia",
  },
  {
    id: 3,
    title: "Private Melbourne: Bikes & Sights tour Melbourne...",
    image:
      "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 203,
    duration: "5 hours",
    groupSize: "Max 10",
    price: 899,
    location: "Melbourne, Australia",
  },
];

const popularTours = [
  {
    id: 4,
    title: "Private Melbourne: Bikes & Sights tour Melbourne...",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    rating: 4.9,
    reviews: 156,
    duration: "Full day",
    groupSize: "Max 12",
    price: 798,
    location: "Melbourne",
  },
  {
    id: 5,
    title: "Explore Melbourne & Laneways tour",
    image:
      "https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=600&h=400&fit=crop",
    rating: 4.8,
    reviews: 92,
    duration: "3 hours",
    groupSize: "Max 8",
    price: 549,
    location: "Melbourne",
  },
  {
    id: 6,
    title: "Melbourne Food & Culture walking tour",
    image:
      "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=600&h=400&fit=crop",
    rating: 4.7,
    reviews: 178,
    duration: "4 hours",
    groupSize: "Max 15",
    price: 679,
    location: "Melbourne",
  },
];

interface TourCardProps {
  tour: (typeof melbourneTours)[0];
  variant?: "small" | "large";
}

const TourCard: React.FC<TourCardProps> = ({ tour, variant = "small" }) => {
  const isLarge = variant === "large";

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div className={`relative ${isLarge ? "h-64" : "h-48"} overflow-hidden`}>
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/90 hover:bg-white text-brand-primary-midnight p-0 h-8 w-8"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute bottom-3 left-3 bg-white rounded-full px-3 py-1">
          <PriceDisplay 
            price={tour.price} 
            fromCurrency="AUD"
            className="text-sm font-semibold text-brand-primary-midnight"
          />
        </div>
      </div>

      <CardContent className={`${isLarge ? "p-6" : "p-4"}`}>
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{tour.rating}</span>
          <span className="text-sm text-ui-grey-strong">({tour.reviews})</span>
        </div>

        <h3
          className={`font-semibold text-brand-primary-midnight mb-3 line-clamp-2 ${
            isLarge ? "text-lg" : "text-base"
          }`}
        >
          {tour.title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-ui-grey-strong">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{tour.groupSize}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-2 text-sm text-ui-grey-strong">
          <MapPin className="h-4 w-4" />
          <span>{tour.location}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default function MelbourneExplorer() {
  return (
    <div className="min-h-screen bg-brand-primary-sand">
      {/* Header Navigation - matching Figma design */}
      <div className="bg-white border-b border-ui-grey-weak py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-brand-primary-intrepid-red">
                  Intrepid
                </span>
              </div>
              <nav className="hidden md:flex items-center space-x-6 text-sm">
                <a
                  href="#"
                  className="text-brand-primary-midnight hover:text-brand-primary-intrepid-red"
                >
                  Destinations
                </a>
                <a
                  href="#"
                  className="text-brand-primary-midnight hover:text-brand-primary-intrepid-red"
                >
                  Popular Tours
                </a>
                <a
                  href="#"
                  className="text-brand-primary-midnight hover:text-brand-primary-intrepid-red"
                >
                  Deals
                </a>
                <a
                  href="#"
                  className="text-brand-primary-midnight hover:text-brand-primary-intrepid-red"
                >
                  About
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Search
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb & Filters */}
      <div className="bg-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-ui-grey-strong">
                <span>Australia</span>
                <span>›</span>
                <span>VIC</span>
                <span>›</span>
                <span className="text-brand-primary-midnight font-medium">
                  Melbourne
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-ui-grey-strong">
                  City highlights
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-brand-primary-midnight text-white"
                >
                  Best value
                </Button>
                <span className="text-sm text-ui-grey-strong">
                  All the bucket...
                </span>
                <span className="text-sm text-ui-grey-strong">Outdoors</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-ui-grey-strong">Private tours</span>
              <div className="w-12 h-6 bg-brand-primary-intrepid-red rounded-full flex items-center justify-end px-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Main Hero Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-5xl font-bold text-brand-primary-midnight mb-4">
                Explore
                <br />
                <span className="text-4xl">Melbourne</span>
              </h1>
              <Button variant="default" size="lg" className="rounded-full px-8">
                View more
              </Button>
            </div>
          </div>

          {/* Three Tour Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {melbourneTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          {/* Carousel Navigation */}
          <div className="flex items-center justify-center space-x-4">
            <Button variant="ghost" size="sm" className="p-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex space-x-2">
              <div className="w-12 h-1 bg-brand-primary-intrepid-red rounded-full"></div>
              <div className="w-4 h-1 bg-ui-grey-weak rounded-full"></div>
              <div className="w-4 h-1 bg-ui-grey-weak rounded-full"></div>
            </div>
            <Button variant="ghost" size="sm" className="p-2">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Discover Popular Tours Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-brand-primary-midnight">
              Discover our <span className="font-normal">popular tours</span>
            </h2>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="p-2">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Large Card */}
            <div className="lg:col-span-2">
              <TourCard tour={popularTours[0]} variant="large" />
            </div>

            {/* Side Cards */}
            <div className="space-y-6">
              {popularTours.slice(1).map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </section>

        {/* Travel the World Section */}
        <section>
          <h2 className="text-3xl font-bold text-brand-primary-midnight mb-8">
            Travel the world
          </h2>
          {/* This section would contain additional content based on the design */}
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-ui-grey-strong">
              Explore destinations around the globe with our curated travel
              experiences.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
