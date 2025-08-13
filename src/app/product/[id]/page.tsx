"use client";

import React, { useState } from "react";
import {
  Star,
  Clock,
  Users,
  Shield,
  MapPin,
  Camera,
  Calendar,
  CheckCircle,
  Info,
  Phone,
  Mail,
  HelpCircle,
  Share2,
  Heart,
  X,
  Utensils,
  MapIcon,
  Palette,
  CalendarX2,
  UserCheck,
  Activity,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Header from "@/components/Layout/Header";
import MapboxMap from "@/components/Map/MapboxMap";
import ErrorBoundary from "@/components/ErrorBoundary";
import PriceDisplay from "@/components/Currency/PriceDisplay";

interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showMoreReviews, setShowMoreReviews] = useState(false);
  const [selectedStop, setSelectedStop] = useState<number | null>(null);
  const [expandedStop, setExpandedStop] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data - in real app this would come from API/data provider
  const productData = {
    pricing: {
      currency: "AUD",
      adult: 89,
      child: 65,
      infant: 0,
    },
  };

  const images = [
    "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=500&fit=crop",
  ];

  const itineraryStops = [
    {
      number: "start",
      title: "Melbourne Museum",
      address: "Nicholson St #11",
      duration: "",
      description: "Meet your local guide at the main entrance",
      isStart: true,
      coordinates: [144.9711, -37.8031] as [number, number],
      details: {
        highlights: [
          "Meet your expert local guide",
          "Introduction to Melbourne's history",
          "Tour overview and safety briefing",
        ],
        whatToExpect:
          "Begin your journey at one of Melbourne's most iconic cultural landmarks. Your guide will share insights into the city's multicultural heritage.",
        tips: "Arrive 10 minutes early. Comfortable walking shoes recommended.",
      },
    },
    {
      number: 1,
      title: "Fitzroy",
      address: "Brunswick Street",
      duration: "30 minutes",
      description:
        "Explore Melbourne's cultural heart with street art and vintage shops",
      coordinates: [144.9789, -37.7983] as [number, number],
      details: {
        highlights: [
          "Street art viewing",
          "Local boutique shopping",
          "Bohemian atmosphere",
          "Cultural history",
        ],
        whatToExpect:
          "Discover Fitzroy's transformation from working-class suburb to cultural hub. Browse unique stores and admire world-class street art.",
        tips: "Perfect photo opportunities. Many shops accept card payments only.",
      },
    },
    {
      number: 2,
      title: "Fitzroy Gardens",
      address: "Wellington Parade",
      duration: "30 minutes",
      description: "Beautiful heritage gardens in the heart of the city",
      coordinates: [144.9801, -37.8097] as [number, number],
      details: {
        highlights: [
          "Historic Cook's Cottage",
          "Ornamental lake",
          "Conservatory displays",
          "Tree-lined pathways",
        ],
        whatToExpected:
          "Stroll through Melbourne's most beautiful formal gardens, featuring English elm trees and Victorian-era landscaping.",
        tips: "Great for photos. Benches available for rest breaks.",
      },
    },
    {
      number: 3,
      title: "Gertrude Street",
      address: "Gertrude Street",
      duration: "30 minutes",
      description: "Trendy cafes and boutique shopping district",
      coordinates: [144.9823, -37.7965] as [number, number],
      details: {
        highlights: [
          "Specialty coffee tasting",
          "Independent boutiques",
          "Local designer shops",
          "Foodie culture",
        ],
        whatToExpect:
          "Experience Melbourne's famous coffee culture firsthand. Sample locally roasted beans and explore unique fashion boutiques.",
        tips: "Coffee tasting included. Dietary requirements can be accommodated.",
      },
    },
    {
      number: 4,
      title: "Collingwood",
      address: "Smith Street",
      duration: "45 minutes",
      description: "Local food scene and artisan markets",
      coordinates: [144.9891, -37.7999] as [number, number],
      details: {
        highlights: [
          "Artisan food market",
          "Local produce tasting",
          "Craft vendors",
          "Community atmosphere",
        ],
        whatToExpect:
          "Dive into Melbourne's thriving local food scene. Meet artisan producers and sample fresh, locally-sourced products.",
        tips: "Food tastings included. Various payment methods accepted by vendors.",
      },
    },
    {
      number: 5,
      title: "Fitzroy",
      address: "Johnston Street",
      duration: "45 minutes",
      description: "Final stop for craft beer and local cuisine",
      coordinates: [144.9834, -37.7971] as [number, number],
      details: {
        highlights: [
          "Craft brewery visit",
          "Local cuisine sampling",
          "Cultural exchange",
          "Tour recap",
        ],
        whatToExpected:
          "End your tour with a visit to a local craft brewery where you can sample Melbourne's renowned beer culture and reflect on your journey.",
        tips: "Non-alcoholic options available. Great place to ask final questions.",
      },
    },
    {
      number: "end",
      title: "Brunswick Street & Johnston Street",
      address: "Corner intersection",
      duration: "",
      description: "Tour ends at the vibrant corner intersection",
      isEnd: true,
      coordinates: [144.9832, -37.7969] as [number, number],
      details: {
        highlights: [
          "Tour conclusion",
          "Local recommendations",
          "Photo opportunities",
          "Optional extensions",
        ],
        whatToExpected:
          "Your guide will provide personalized recommendations for exploring Melbourne further, plus great photo opportunities at this iconic intersection.",
        tips: "Perfect spot to continue exploring on your own. Many restaurants and bars nearby.",
      },
    },
  ];

  const highlights = [
    "Small group experience (max 12 people)",
    "Local expert guide with insider knowledge",
    "Taste authentic Melbourne coffee culture",
    "Discover hidden street art and laneways",
    "Visit local markets and artisan shops",
    "Learn about Melbourne's cultural history",
  ];

  const faqs = [
    {
      question: "What is the group size for this tour?",
      answer:
        "We keep our groups small and intimate with a maximum of 12 people. This ensures personalized attention from your guide and creates a more authentic, local experience. Our average group size is 8-10 people, making it easy to interact with fellow travelers and ask questions throughout the tour.",
    },
    {
      question: "How do I find my guide and meeting point?",
      answer:
        "Your guide will meet you at the main entrance of Melbourne Museum on Nicholson Street. Look for someone holding an Urban Adventure sign with your tour name. Please arrive 10 minutes before the scheduled start time. If you're running late, call the emergency number provided in your confirmation email immediately.",
    },
    {
      question: "Can dietary restrictions be accommodated?",
      answer:
        "Absolutely! We can accommodate most dietary requirements including vegetarian, vegan, gluten-free, dairy-free, and nut allergies. Please inform us of any dietary restrictions when booking or at least 24 hours before your tour. We'll work with our venue partners to ensure suitable options are available at each food stop.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "You can cancel free of charge up to 24 hours before the experience starts for a full refund. Cancellations made less than 24 hours before the start time are non-refundable. If we need to cancel due to extreme weather or unforeseen circumstances, we'll provide a full refund or reschedule option. We also offer the option to transfer your booking to another date up to 48 hours in advance.",
    },
    {
      question: "Is this tour accessible for people with mobility issues?",
      answer:
        "The tour involves approximately 2.5km of walking over 3 hours on mostly flat terrain with some gentle inclines. We make frequent stops for tastings and rest breaks. While we cannot accommodate wheelchairs due to some venue constraints, we can modify the route for guests with limited mobility. Please contact us before booking to discuss your specific needs and we'll work to create the best possible experience.",
    },
    {
      question: "How much walking is involved in this tour?",
      answer:
        "This is a leisurely walking tour covering approximately 2.5km over 3 hours. The pace is relaxed with plenty of stops for food tastings, coffee breaks, and exploration. Most of the route is on flat, paved streets with only gentle inclines. We recommend comfortable walking shoes and let us know if you have any concerns about the walking distance.",
    },
    {
      question: "What is the minimum age and child policy?",
      answer:
        "The minimum age for this tour is 15 years old. The tour includes visits to venues that serve alcohol and the content is designed for adult interests including food and cultural experiences. For families with younger children, please check our family-friendly tour options which are specifically designed for all ages.",
    },
    {
      question: "What should I bring and other important information?",
      answer:
        "Please wear comfortable walking shoes and dress for the weather - Melbourne can be unpredictable! Bring a light jacket or umbrella as tours run rain or shine. A camera is recommended for capturing street art and food experiences. Coffee tastings and some food samples are included, but alcoholic beverages are available for purchase. Water will be provided throughout the tour. Please arrive well-hydrated and having eaten a light meal beforehand.",
    },
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah Mitchell",
      date: "Travelled August 2024",
      rating: 5,
      text: "This was an amazing trip in a very interesting country. The people of Melbourne and our guide Thuy made sure our guide was organised and having heaps of fun!",
    },
    {
      id: 2,
      name: "James Wilson",
      date: "Travelled July 2024",
      rating: 5,
      text: "Melbourne food tour was AWESOME, our guide made sure everyone was organised and we had an incredible time exploring the local food scene. Highly recommend!",
    },
    {
      id: 3,
      name: "Emma Thompson",
      date: "Travelled July 2024",
      rating: 5,
      text: "Great tour, packed with amazing experiences! Food, culture and scenery - this trip had it all. Our guide was knowledgeable and made the experience wonderful.",
    },
    {
      id: 4,
      name: "Michael Chen",
      date: "Travelled June 2024",
      rating: 5,
      text: "Fantastic experience exploring Melbourne's food culture. The small group size made it personal and our guide's local knowledge was invaluable. Would definitely do this again!",
    },
    {
      id: 5,
      name: "Lisa Rodriguez",
      date: "Travelled June 2024",
      rating: 4,
      text: "Really enjoyed the tour! Great variety of food stops and learned so much about Melbourne's history. Only wish it was a bit longer - time flew by so quickly.",
    },
    {
      id: 6,
      name: "David Park",
      date: "Travelled May 2024",
      rating: 5,
      text: "Exceeded all expectations! The guide was passionate about Melbourne and it showed. Amazing food discoveries and great company. Perfect introduction to the city.",
    },
  ];

  const displayedReviews = showMoreReviews ? reviews : reviews.slice(0, 4);

  const ReviewsContent = () => (
    <div className="space-y-8">
      {/* Overall Rating */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
          <Star className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-yellow-400 fill-yellow-400" />
          <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            4.98
          </span>
        </div>
        <p className="text-gray-600 mb-8">from 1,254 reviews submitted</p>

        {/* Achievement Summary */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 mx-auto max-w-2xl">
          <p className="text-gray-700 leading-relaxed">
            This is in our top 5% of reviewed trips and is in our{" "}
            <span className="font-semibold text-blue-600">
              &ldquo;Best tours in Australia&rdquo;
            </span>
            . Our tour leaders have also won{" "}
            <span className="font-semibold text-blue-600">
              4 industry awards
            </span>{" "}
            for this tour.
          </p>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-8">
        {displayedReviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-200 pb-8 last:border-b-0"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium text-xs sm:text-sm">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 sm:gap-4 mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium text-gray-900">
                    {review.name}
                  </span>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.text}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Review submitted {review.date.split(" ")[1]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Reviews Button */}
      {!showMoreReviews && reviews.length > 4 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowMoreReviews(true)}
            className="px-8 py-2"
          >
            Load more reviews
          </Button>
        </div>
      )}

      {showMoreReviews && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowMoreReviews(false)}
            className="px-8 py-2"
          >
            Show fewer reviews
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <Header />

        {/* Sale Banner */}
        <div className="bg-red-50 border-b border-red-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-red-700 font-medium">
                  Black Friday Sale
                </span>
                <span className="text-red-600">
                  get up to 20% off* trips worldwide
                </span>
              </div>
              <div className="flex items-center space-x-2 text-red-700">
                <Clock className="w-4 h-4" />
                <span className="font-medium">Ends: 29 Nov 2025</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="xl:col-span-2">
              {/* Title and Rating */}
              <div className="mb-6 sm:mb-8 sticky top-16 bg-white z-10 py-3 sm:py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-800"
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-1"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Melbourne, Australia
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: "Multicultural Markets of Melbourne Tour",
                            text: "Check out this amazing Melbourne food tour!",
                            url: window.location.href,
                          });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          alert("Link copied to clipboard!");
                        }
                      }}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`hover:text-red-700 ${
                        isWishlisted ? "text-red-600" : "text-red-600"
                      }`}
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart
                        className={`w-4 h-4 mr-2 ${
                          isWishlisted ? "fill-red-600" : ""
                        }`}
                      />
                      {isWishlisted ? "Saved" : "Save"}
                    </Button>
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-gray-900 pt-4 sm:pt-6 leading-tight tracking-tight font-sans">
                  Multicultural Markets of Melbourne Tour
                </h1>
              </div>

              {/* Photo Gallery */}
              <div className="mb-6 sm:mb-8">
                <div className="relative mb-3 sm:mb-4">
                  <img
                    src={images[selectedImage]}
                    alt="Trip highlight"
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-white/90 hover:bg-white text-black"
                    onClick={() => {
                      // Open photo gallery modal
                      alert("Photo gallery would open here!");
                    }}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    All photos
                  </Button>
                </div>
                <div className="grid grid-cols-4 gap-1 sm:gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-16 sm:h-20 rounded-md overflow-hidden transition-all duration-200 ${
                        selectedImage === index ? "ring-2 ring-red-500" : ""
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="mb-8">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-5 bg-white border-b border-gray-200 rounded-none p-0 h-auto">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:text-red-600 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 rounded-none py-4 px-2 font-medium text-sm transition-colors"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="details"
                      className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:text-red-600 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 rounded-none py-4 px-2 font-medium text-sm transition-colors"
                    >
                      Details
                    </TabsTrigger>
                    <TabsTrigger
                      value="itinerary"
                      className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:text-red-600 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 rounded-none py-4 px-2 font-medium text-sm transition-colors"
                    >
                      Itinerary
                    </TabsTrigger>
                    <TabsTrigger
                      value="faqs"
                      className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:text-red-600 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 rounded-none py-4 px-2 font-medium text-sm transition-colors"
                    >
                      FAQs
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:text-red-600 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 rounded-none py-4 px-2 font-medium text-sm transition-colors"
                    >
                      Reviews
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-8">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-900 font-sans">
                          About
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-base">
                          Take the guesswork out of exploring Melbourne&apos;s
                          food and cafe culture on this street food tour of the
                          inner North suburbs. Follow your local guide as they
                          show you great places to get coffee and food in the
                          lively suburbs of Fitzroy and Collingwood. Discover
                          hidden gems, learn about Melbourne&apos;s cultural
                          history, and taste authentic local flavors.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-100">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-green-800">
                              Free cancellation
                            </p>
                            <p className="text-sm text-green-700">
                              Full refund if cancelled up to 24 hours before the
                              experience starts
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-800">
                              Reserve now & pay later
                            </p>
                            <p className="text-sm text-blue-700">
                              Secure your spot while staying flexible
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
                          <Shield className="w-5 h-5 text-purple-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-purple-800">
                              Lowest price guarantee
                            </p>
                            <p className="text-sm text-purple-700">
                              Find a lower price online? Get the difference
                              refunded!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="itinerary" className="mt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Itinerary List */}
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-900 font-sans">
                          Itinerary
                        </h3>
                        <div className="space-y-4">
                          {itineraryStops.map((stop, index) => (
                            <div
                              key={index}
                              className={`relative transition-all duration-200 cursor-pointer hover:bg-gray-50 ${
                                selectedStop === index
                                  ? "bg-blue-50 -mx-4 px-4 py-2 rounded-lg border border-blue-200"
                                  : "-mx-4 px-4 py-2"
                              }`}
                              onClick={() =>
                                setSelectedStop(
                                  selectedStop === index ? null : index
                                )
                              }
                            >
                              <div className="relative flex items-start space-x-4">
                                {/* Connecting line */}
                                {index < itineraryStops.length - 1 && (
                                  <div
                                    className="absolute left-4 top-8 w-px bg-gray-300 z-0"
                                    style={{ height: "calc(100% + 16px)" }}
                                  ></div>
                                )}

                                <div
                                  className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 !ml-0 ${
                                    selectedStop === index
                                      ? "bg-blue-600 text-white ring-2 ring-blue-300"
                                      : stop.isStart || stop.isEnd
                                      ? "bg-gray-100 border-2 border-gray-300"
                                      : "bg-black text-white"
                                  }`}
                                >
                                  {stop.isStart ? (
                                    <MapPin className="w-4 h-4 text-black" />
                                  ) : stop.isEnd ? (
                                    <MapPin className="w-4 h-4 text-black" />
                                  ) : (
                                    stop.number
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-medium text-gray-900">
                                      {stop.isStart
                                        ? "You'll start at 6:00pm"
                                        : stop.isEnd
                                        ? "You'll end at 8:00pm"
                                        : ""}{" "}
                                      {stop.title}
                                    </h4>
                                    {stop.duration && (
                                      <span className="text-sm text-gray-500">
                                        Stop: {stop.duration}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 mb-1">
                                    {stop.address}
                                  </p>
                                  <p className="text-sm text-gray-700">
                                    {stop.description}
                                  </p>

                                  {/* See Details Button */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setExpandedStop(
                                        expandedStop === index ? null : index
                                      );
                                    }}
                                    className="text-sm text-blue-600 hover:underline mt-1"
                                  >
                                    {expandedStop === index
                                      ? "Hide details"
                                      : "See details"}
                                  </button>

                                  {/* Accordion Details */}
                                  {expandedStop === index && stop.details && (
                                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 space-y-4">
                                      <div>
                                        <h5 className="font-medium text-gray-900 mb-2">
                                          Highlights
                                        </h5>
                                        <ul className="space-y-1">
                                          {stop.details.highlights.map(
                                            (highlight, idx) => (
                                              <li
                                                key={idx}
                                                className="flex items-center gap-2 text-sm text-gray-700"
                                              >
                                                <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                                                <span>{highlight}</span>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      </div>

                                      <div>
                                        <h5 className="font-medium text-gray-900 mb-2">
                                          What to Expect
                                        </h5>
                                        <p className="text-sm text-gray-700">
                                          {stop.details.whatToExpect}
                                        </p>
                                      </div>

                                      <div>
                                        <h5 className="font-medium text-gray-900 mb-2">
                                          Tips
                                        </h5>
                                        <p className="text-sm text-gray-700">
                                          {stop.details.tips}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Interactive Map */}
                      <div className="lg:sticky lg:top-8">
                        <ErrorBoundary
                          fallback={({ error, reset }) => (
                            <div className="h-96 rounded-lg bg-gray-100 flex items-center justify-center">
                              <div className="text-center">
                                <p className="text-gray-600 mb-2">
                                  Map temporarily unavailable
                                </p>
                                <button
                                  onClick={reset}
                                  className="text-blue-600 hover:underline text-sm"
                                >
                                  Try again
                                </button>
                              </div>
                            </div>
                          )}
                        >
                          <MapboxMap
                            stops={itineraryStops}
                            selectedStop={selectedStop}
                            onStopSelect={setSelectedStop}
                            className="h-96 rounded-lg"
                          />
                        </ErrorBoundary>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="mt-8">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-900 font-sans">
                          Trip Highlights
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {highlights.map((highlight, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 sm:gap-4"
                            >
                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                              <span className="text-gray-700">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-900 font-sans">
                          What&apos;s Included
                        </h3>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>Professional local guide</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>Food tastings at 4-5 locations</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>Coffee tasting</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>Small group experience</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="faqs" className="mt-8">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 mb-8">
                        <HelpCircle className="w-6 h-6 text-gray-600" />
                        <h3 className="text-xl font-semibold text-gray-900">
                          Frequently Asked Questions
                        </h3>
                      </div>

                      <Accordion
                        type="single"
                        collapsible
                        className="space-y-2"
                      >
                        {faqs.map((faq, index) => (
                          <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="border border-gray-200 rounded-lg px-4 hover:bg-gray-50 transition-colors duration-200"
                          >
                            <AccordionTrigger className="text-left hover:no-underline py-4 [&[data-state=open]>svg]:rotate-180">
                              <span className="font-medium text-gray-900">
                                {faq.question}
                              </span>
                              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-300" />
                            </AccordionTrigger>
                            <AccordionContent className="pb-4 text-gray-700 leading-relaxed transition-all duration-300 ease-in-out data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>

                      <div className="mt-8 p-8 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Still have questions?
                        </h4>
                        <p className="text-gray-700 mb-4">
                          Can&rsquo;t find the answer you&rsquo;re looking for?
                          Our friendly customer support team is here to help.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center"
                            onClick={() => window.open("tel:+61-3-9123-4567")}
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call us
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center"
                            onClick={() =>
                              window.open(
                                "mailto:support@urbanadevntures.com?subject=Melbourne Tour Inquiry"
                              )
                            }
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Send email
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-8">
                    <ReviewsContent />
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              <Card className="sticky top-[6rem] sm:top-[8rem] z-30 bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      {/* Reviews Display */}
                      <div className="flex items-end gap-2 mb-4">
                        <Star className="w-6 h-6 sm:w-8 sm:h-8 fill-yellow-400 text-yellow-400" />
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-sans text-black">
                          4.9
                        </span>
                        <button
                          onClick={() => setActiveTab("reviews")}
                          className="text-blue-600 underline text-base hover:text-blue-800"
                        >
                          97 reviews
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <Badge variant="destructive" className="bg-red-600">
                          3 spots left
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-800"
                        >
                          Selling fast
                        </Badge>
                      </div>

                      {/* Key Trip Details Grid */}
                      <div className="grid grid-cols-1 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            Duration: 3 hours
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            Walking: 1km
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            Private tour available
                          </span>
                        </div>
                      </div>

                      {/* Category Tags */}
                      <div className="flex flex-wrap gap-2">
                        <div
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-white border border-gray-200"
                          style={{ color: "#374151" }}
                        >
                          <span className="mr-2">🎨</span>
                          Art
                        </div>
                        <div
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-white border border-gray-200"
                          style={{ color: "#374151" }}
                        >
                          <span className="mr-2">🏛️</span>
                          Culture
                        </div>
                        <div
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-white border border-gray-200"
                          style={{ color: "#374151" }}
                        >
                          <span className="mr-2">🍷</span>
                          Food & drink
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="border-t pt-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold text-black">
                        TOTAL
                      </span>
                      <div className="text-right">
                        <div className="text-xl sm:text-2xl font-bold font-sans text-black">
                          <PriceDisplay
                            price={productData.pricing.adult}
                            fromCurrency={productData.pricing.currency}
                          />
                        </div>
                        <div className="text-sm text-gray-500">per person</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Button
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => {
                          // Scroll to booking section or open booking modal
                          alert(
                            "Booking functionality would be implemented here!"
                          );
                        }}
                      >
                        View dates and book
                      </Button>
                      <Button
                        variant="outline"
                        className={`w-full border-gray-300 hover:bg-gray-50 ${
                          isWishlisted
                            ? "text-red-600 border-red-300 bg-red-50"
                            : "text-gray-700"
                        }`}
                        onClick={() => setIsWishlisted(!isWishlisted)}
                      >
                        <Heart
                          className={`w-4 h-4 mr-2 ${
                            isWishlisted ? "fill-red-600" : ""
                          }`}
                        />
                        {isWishlisted
                          ? "Remove from wishlist"
                          : "Add to wishlist"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Information - Sticky to bottom */}
              <div
                className="hidden xl:block sticky bottom-0 bg-white pt-8 pb-4 z-20 border-t border-gray-100"
                style={{ position: "relative", top: "3rem" }}
              >
                <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-800">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <CalendarX2
                      className="w-4 h-4 mt-0.5"
                      style={{ color: "#202020" }}
                    />
                    <div>
                      <div style={{ fontWeight: 500 }}>Free cancellation</div>
                      <div>
                        Cancel up to 24 hours in advance for a full refund
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <Calendar
                      className="w-4 h-4 mt-0.5"
                      style={{ color: "#202020" }}
                    />
                    <div>
                      <div style={{ fontWeight: 500 }}>
                        Reserve now, pay later
                      </div>
                      <div>Secure your spot while staying flexible</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <Shield
                      className="w-4 h-4 mt-0.5"
                      style={{ color: "#202020" }}
                    />
                    <div>
                      <div style={{ fontWeight: 500 }}>
                        Lowest price guarantee
                      </div>
                      <div>
                        Find a lower price online? Get the difference refunded
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
