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

interface ProductClientProps {
  id: string;
}

export default function ProductClient({ id }: ProductClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showMoreReviews, setShowMoreReviews] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock data for demonstration
  const experience = {
    id: id,
    title: "Historical Lisbon Walking Tour with Food Tasting",
    category: "Walking & Biking Tours",
    location: "Lisbon, Portugal",
    price: 49,
    originalPrice: 89,
    discountPercentage: 45,
    rating: 4.8,
    totalReviews: 2436,
    duration: "3 hours",
    groupSize: "Max 12 people",
    languages: ["English", "Spanish", "Portuguese"],
    nextAvailable: "Today at 2:00 PM",
    instantConfirmation: true,
    freeCancellation: true,
    mobileTicket: true,
    highlights: [
      "Explore historic neighborhoods of Alfama and Baixa",
      "Taste authentic Portuguese pastéis de nata and port wine",
      "Learn about Lisbon's earthquake and reconstruction",
      "Visit hidden viewpoints with panoramic city views",
      "Small group experience with local expert guide",
    ],
    description: `Discover the soul of Lisbon on this intimate walking tour that combines history, culture, and gastronomy. 
    Your journey begins in the historic Rossio Square, where you'll meet your passionate local guide who will share stories that bring the city to life.
    
    Wander through the charming streets of Alfama, Lisbon's oldest neighborhood, where Fado music drifts from traditional taverns and laundry hangs from colorful balconies. 
    Stop at a family-run bakery to taste the famous pastéis de nata, learning the secrets behind this iconic Portuguese pastry.
    
    As you climb to stunning viewpoints, you'll understand why Lisbon is called the City of Seven Hills. Your guide will reveal hidden gems and local spots that most tourists never discover.`,
    images: [
      "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800",
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800",
      "https://images.unsplash.com/photo-1588795945-b9c8d6b6d9b9?w=800",
      "https://images.unsplash.com/photo-1573479667665-12e1d0d0b8b6?w=800",
    ],
    itinerary: [
      {
        time: "2:00 PM",
        title: "Meeting Point",
        description: "Meet at Rossio Square near the fountain",
      },
      {
        time: "2:15 PM",
        title: "Historic Downtown",
        description: "Walk through Baixa district and learn about the 1755 earthquake",
      },
      {
        time: "3:00 PM",
        title: "Alfama Neighborhood",
        description: "Explore winding streets and hidden squares",
      },
      {
        time: "3:45 PM",
        title: "Food Tasting",
        description: "Enjoy pastéis de nata and port wine tasting",
      },
      {
        time: "4:30 PM",
        title: "Panoramic Viewpoint",
        description: "Visit Miradouro da Senhora do Monte for sunset views",
      },
      {
        time: "5:00 PM",
        title: "Tour Ends",
        description: "End at a central location with recommendations for dinner",
      },
    ],
    included: [
      "Expert local guide",
      "Food tastings (pastéis de nata and port wine)",
      "Small group experience",
      "City map and recommendations",
      "Photo opportunities at best viewpoints",
    ],
    notIncluded: [
      "Hotel pickup and drop-off",
      "Additional food and drinks",
      "Gratuities",
      "Personal expenses",
    ],
    reviews: [
      {
        id: "1",
        author: "Sarah M.",
        avatar: "https://via.placeholder.com/50",
        rating: 5,
        date: "2 weeks ago",
        verified: true,
        title: "Perfect introduction to Lisbon!",
        comment:
          "João was an amazing guide! His knowledge of history and local culture made the tour fascinating. The food stops were delicious and the viewpoints were breathtaking. Highly recommend for first-time visitors.",
        helpful: 42,
      },
      {
        id: "2",
        author: "Michael K.",
        avatar: "https://via.placeholder.com/50",
        rating: 5,
        date: "1 month ago",
        verified: true,
        title: "Hidden gems and great stories",
        comment:
          "This tour exceeded expectations. Our guide showed us parts of Lisbon we would never have found on our own. The pastéis de nata tasting was a highlight - still dreaming about them!",
        helpful: 38,
      },
      {
        id: "3",
        author: "Emma L.",
        avatar: "https://via.placeholder.com/50",
        rating: 4,
        date: "1 month ago",
        verified: true,
        title: "Great tour but a bit rushed",
        comment:
          "Very informative and enjoyable tour. The only reason for 4 stars instead of 5 is that we felt a bit rushed at some stops. Would have loved more time at the viewpoints.",
        helpful: 23,
      },
    ],
    cancellationPolicy: {
      freeCancellation: true,
      deadline: "24 hours before start time",
      description: "Full refund if cancelled at least 24 hours before the experience starts",
    },
    importantInfo: [
      "Wear comfortable walking shoes - tour involves hills and cobblestone streets",
      "Tour runs rain or shine - bring appropriate weather gear",
      "Please inform us of any dietary restrictions for food tastings",
      "Not wheelchair accessible due to steep hills and stairs",
      "Children under 12 join free when accompanied by an adult",
    ],
    covidMeasures: [
      "Small group sizes for social distancing",
      "Hand sanitizer provided",
      "Regular sanitization of equipment",
      "Contactless payment available",
    ],
    meetingPoint: {
      address: "Rossio Square, 1100-200 Lisboa, Portugal",
      coordinates: [38.7139, -9.1394],
      instructions: "Meet at the fountain in the center of the square. Look for the guide with the red umbrella.",
    },
    availability: {
      today: ["2:00 PM", "5:00 PM"],
      tomorrow: ["10:00 AM", "2:00 PM", "5:00 PM"],
      week: {
        Monday: ["10:00 AM", "2:00 PM", "5:00 PM"],
        Tuesday: ["10:00 AM", "2:00 PM", "5:00 PM"],
        Wednesday: ["10:00 AM", "2:00 PM", "5:00 PM"],
        Thursday: ["10:00 AM", "2:00 PM", "5:00 PM"],
        Friday: ["10:00 AM", "2:00 PM", "5:00 PM", "7:00 PM"],
        Saturday: ["10:00 AM", "2:00 PM", "5:00 PM", "7:00 PM"],
        Sunday: ["10:00 AM", "2:00 PM"],
      },
    },
    faqs: [
      {
        question: "Is this tour suitable for children?",
        answer:
          "Yes! Children under 12 join free with an adult. The tour is family-friendly, though it does involve walking on hills.",
      },
      {
        question: "What happens if it rains?",
        answer:
          "The tour runs rain or shine. Lisbon is beautiful in all weather! We recommend bringing an umbrella or raincoat if rain is forecast.",
      },
      {
        question: "Can I join if I have dietary restrictions?",
        answer:
          "Absolutely! Please let us know about any dietary restrictions when booking, and we'll arrange alternative tastings.",
      },
      {
        question: "How much walking is involved?",
        answer:
          "The tour covers about 2.5 km (1.5 miles) with some uphill sections. We take regular breaks and the pace is relaxed.",
      },
      {
        question: "Do I need to book in advance?",
        answer:
          "We recommend booking at least 24 hours in advance, especially during peak season. Same-day booking may be available subject to availability.",
      },
    ],
    seller: {
      name: "Lisbon Explorers",
      rating: 4.9,
      totalTours: 1250,
      responseTime: "Within 1 hour",
      languages: ["English", "Spanish", "Portuguese", "French"],
      about:
        "Local company specializing in authentic Lisbon experiences since 2015. Our passionate guides are all Lisbon natives who love sharing their city's secrets.",
      verified: true,
      badges: ["Top Rated", "Quick Response", "Local Expert"],
    },
  };

  const similarExperiences = [
    {
      id: "2",
      title: "Sintra and Cascais Day Trip",
      price: 79,
      rating: 4.7,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=400",
      duration: "8 hours",
    },
    {
      id: "3",
      title: "Fado Night with Dinner",
      price: 65,
      rating: 4.9,
      reviews: 445,
      image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400",
      duration: "3 hours",
    },
    {
      id: "4",
      title: "Belém Food and Culture Tour",
      price: 35,
      rating: 4.6,
      reviews: 678,
      image: "https://images.unsplash.com/photo-1588795945-b9c8d6b6d9b9?w=400",
      duration: "2.5 hours",
    },
  ];

  const handleBooking = () => {
    setShowBookingModal(true);
    // In a real app, this would handle the booking process
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      "Walking & Biking Tours": MapIcon,
      "Food & Drink": Utensils,
      "Art & Culture": Palette,
      "Adventure & Nature": Activity,
    };
    return icons[category as keyof typeof icons] || MapIcon;
  };

  const CategoryIcon = getCategoryIcon(experience.category);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section with Images */}
      <div className="relative h-[500px] bg-gray-900">
        <div className="absolute inset-0 grid grid-cols-4 gap-2 p-2">
          <div className="col-span-2 row-span-2">
            <img
              src={experience.images[selectedImage]}
              alt={experience.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {experience.images.slice(1, 4).map((img, idx) => (
            <div
              key={idx}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setSelectedImage(idx + 1)}
            >
              <img
                src={img}
                alt={`View ${idx + 2}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
        
        {/* Overlay Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button variant="secondary" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Basic Info */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">
                      <CategoryIcon className="h-3 w-3 mr-1" />
                      {experience.category}
                    </Badge>
                    {experience.instantConfirmation && (
                      <Badge variant="default">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Instant Confirmation
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold mb-2">{experience.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {experience.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-900">{experience.rating}</span>
                      <span>({experience.totalReviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="font-semibold">{experience.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Group Size</p>
                    <p className="font-semibold">{experience.groupSize}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Next Available</p>
                    <p className="font-semibold text-green-600">{experience.nextAvailable}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Cancellation</p>
                    <p className="font-semibold text-green-600">Free</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs for Overview, Itinerary, Reviews */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                {/* Highlights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Highlights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {experience.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>About This Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 whitespace-pre-line">{experience.description}</p>
                  </CardContent>
                </Card>

                {/* What's Included */}
                <Card>
                  <CardHeader>
                    <CardTitle>What's Included</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-green-600">Included</h4>
                        <ul className="space-y-2">
                          {experience.included.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-red-600">Not Included</h4>
                        <ul className="space-y-2">
                          {experience.notIncluded.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Meeting Point Map */}
                <Card>
                  <CardHeader>
                    <CardTitle>Meeting Point</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{experience.meetingPoint.instructions}</p>
                    <ErrorBoundary>
                      <div className="h-[300px] rounded-lg overflow-hidden">
                        <MapboxMap
                          stops={[
                            {
                              name: "Meeting Point",
                              description: experience.meetingPoint.address,
                              coordinates: experience.meetingPoint.coordinates as [number, number],
                            },
                          ]}
                        />
                      </div>
                    </ErrorBoundary>
                    <p className="text-sm text-gray-500 mt-2">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      {experience.meetingPoint.address}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="itinerary" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tour Itinerary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {experience.itinerary.map((stop, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-sm font-semibold text-blue-600">{idx + 1}</span>
                            </div>
                          </div>
                          <div className="flex-grow pb-6 border-b last:border-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-500">{stop.time}</span>
                            </div>
                            <h4 className="font-semibold mb-1">{stop.title}</h4>
                            <p className="text-sm text-gray-600">{stop.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="text-2xl font-bold">{experience.rating}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Based on {experience.totalReviews} reviews
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {experience.reviews.map((review) => (
                        <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <img
                                src={review.avatar}
                                alt={review.author}
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold">{review.author}</span>
                                  {review.verified && (
                                    <Badge variant="secondary" className="text-xs">
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 ${
                                          i < review.rating
                                            ? "text-yellow-400 fill-current"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span>{review.date}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <h4 className="font-semibold mb-1">{review.title}</h4>
                          <p className="text-sm text-gray-600">{review.comment}</p>
                          <div className="flex items-center gap-4 mt-3">
                            <button className="text-sm text-gray-500 hover:text-gray-700">
                              Helpful ({review.helpful})
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {!showMoreReviews && (
                      <Button
                        variant="outline"
                        className="w-full mt-4"
                        onClick={() => setShowMoreReviews(true)}
                      >
                        Show More Reviews
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {experience.faqs.map((faq, idx) => (
                        <AccordionItem key={idx} value={`item-${idx}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Important Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Important Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {experience.importantInfo.map((info, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5 rotate-270" />
                      <span className="text-sm">{info}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* COVID Measures */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Health & Safety Measures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {experience.covidMeasures.map((measure, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{measure}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Seller Information */}
            <Card>
              <CardHeader>
                <CardTitle>About the Organizer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      {experience.seller.name}
                      {experience.seller.verified && (
                        <Badge variant="default">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{experience.seller.rating}</span>
                      </div>
                      <span>{experience.seller.totalTours} tours</span>
                      <span>Responds {experience.seller.responseTime}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{experience.seller.about}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {experience.seller.badges.map((badge, idx) => (
                    <Badge key={idx} variant="secondary">
                      {badge}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold">
                        <PriceDisplay amount={experience.price} />
                      </span>
                      {experience.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          <PriceDisplay amount={experience.originalPrice} />
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">per person</p>
                    {experience.discountPercentage && (
                      <Badge variant="destructive" className="mt-2">
                        Save {experience.discountPercentage}%
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Select Date</label>
                      <select className="w-full p-2 border rounded-lg">
                        <option>Today - {experience.nextAvailable}</option>
                        <option>Tomorrow - Multiple times</option>
                        <option>This Weekend</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Number of Travelers</label>
                      <select className="w-full p-2 border rounded-lg">
                        <option>1 Traveler</option>
                        <option>2 Travelers</option>
                        <option>3 Travelers</option>
                        <option>4 Travelers</option>
                        <option>5+ Travelers</option>
                      </select>
                    </div>
                  </div>

                  <Button className="w-full mb-3" size="lg" onClick={handleBooking}>
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Add to Wishlist
                  </Button>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Free cancellation up to 24 hours</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Instant confirmation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Mobile ticket accepted</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Similar Experiences */}
              <Card>
                <CardHeader>
                  <CardTitle>Similar Experiences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {similarExperiences.map((exp) => (
                      <a
                        key={exp.id}
                        href={`/product/${exp.id}`}
                        className="flex gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                      >
                        <img
                          src={exp.image}
                          alt={exp.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-grow">
                          <h4 className="font-medium text-sm line-clamp-2">{exp.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-xs">{exp.rating}</span>
                            </div>
                            <span className="text-xs text-gray-500">({exp.reviews})</span>
                          </div>
                          <div className="flex items-baseline gap-1 mt-1">
                            <span className="font-semibold text-sm">
                              <PriceDisplay amount={exp.price} />
                            </span>
                            <span className="text-xs text-gray-500">/ {exp.duration}</span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Need Help Card */}
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <HelpCircle className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <h3 className="font-semibold mb-1">Need Help?</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Our travel experts are here to assist you
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Phone className="h-4 w-4 mr-2" />
                        +1 (555) 123-4567
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Support
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Complete Your Booking</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{experience.title}</h4>
                <p className="text-sm text-gray-600">
                  {experience.nextAvailable} • 1 Traveler
                </p>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>
                    <PriceDisplay amount={experience.price} />
                  </span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>
                    <PriceDisplay amount={experience.price} />
                  </span>
                </div>
              </div>
              <Button className="w-full" onClick={() => alert("Booking confirmed!")}>
                Confirm Booking
              </Button>
              <p className="text-xs text-gray-500 text-center">
                By booking, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}