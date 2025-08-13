'use client';

import { useTrip } from '@/hooks/useTrips';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Header from '@/components/Layout/Header';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import MapContainer from '@/components/Map/MapContainer';
import { formatPrice, formatDuration } from '@/utils';
import { 
  Heart, 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Calendar,
  Share2,
  ExternalLink
} from 'lucide-react';

interface TripPageProps {
  params: { id: string };
}

export default function TripPage({ params }: TripPageProps) {
  const { trip, loading, error } = useTrip(params.id);
  const { data: session } = useSession();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviews, setReviews] = useState<any>(null);

  useEffect(() => {
    if (trip) {
      // Fetch reviews
      fetch(`/api/reviews/${trip.id}`)
        .then(res => res.json())
        .then(data => setReviews(data))
        .catch(console.error);
    }
  }, [trip]);

  const handleWishlistToggle = () => {
    if (!session) {
      // Redirect to login
      window.location.href = '/auth/signin';
      return;
    }
    
    setIsWishlisted(!isWishlisted);
    // In real app, this would make API call to update wishlist
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-brand-primary-sand flex items-center justify-center">
          <div className="text-brand-primary-midnight">Loading trip details...</div>
        </div>
      </>
    );
  }

  if (error || !trip) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-brand-primary-sand flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-brand-primary-midnight mb-2">
              Trip Not Found
            </h1>
            <p className="text-brand-primary-midnight-weak mb-4">
              The trip you're looking for doesn't exist or has been removed.
            </p>
            <a href="/">
              <Button>Back to Home</Button>
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-primary-sand">
        {/* Hero Section */}
        <div className="relative h-96 bg-gradient-to-r from-brand-secondary-santorini to-brand-secondary-glacier">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <div className="flex items-end justify-between">
                <div className="text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    {trip.badges.map((badge, index) => (
                      <Badge key={index} badge={badge} />
                    ))}
                  </div>
                  <h1 className="text-4xl font-bold mb-2">{trip.name}</h1>
                  <div className="flex items-center space-x-4 text-lg">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-1" />
                      {trip.location.city}, {trip.location.country}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-1" />
                      {formatDuration(trip.duration)}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 mr-1" />
                      {trip.rating} ({trip.reviewCount} reviews)
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-3xl font-bold text-white mb-2">
                    {formatPrice(trip.price)}
                  </div>
                  <div className="text-white text-sm opacity-90">per person</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-bold text-brand-primary-midnight">
                    Overview
                  </h2>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-primary-midnight-weak leading-relaxed">
                    {trip.description}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="text-center">
                      <Clock className="h-8 w-8 mx-auto text-brand-primary-intrepid-red mb-2" />
                      <div className="text-sm font-medium text-brand-primary-midnight">
                        Duration
                      </div>
                      <div className="text-xs text-brand-primary-midnight-weak">
                        {formatDuration(trip.duration)}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Users className="h-8 w-8 mx-auto text-brand-primary-intrepid-red mb-2" />
                      <div className="text-sm font-medium text-brand-primary-midnight">
                        Group Size
                      </div>
                      <div className="text-xs text-brand-primary-midnight-weak">
                        Max 16 people
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Calendar className="h-8 w-8 mx-auto text-brand-primary-intrepid-red mb-2" />
                      <div className="text-sm font-medium text-brand-primary-midnight">
                        Difficulty
                      </div>
                      <div className="text-xs text-brand-primary-midnight-weak">
                        {trip.difficulty}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Star className="h-8 w-8 mx-auto text-brand-primary-intrepid-red mb-2" />
                      <div className="text-sm font-medium text-brand-primary-midnight">
                        Rating
                      </div>
                      <div className="text-xs text-brand-primary-midnight-weak">
                        {trip.rating}/5 stars
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Itinerary */}
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-bold text-brand-primary-midnight">
                    Itinerary
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {trip.itinerary.map((day) => (
                      <div key={day.day} className="border-l-2 border-brand-primary-intrepid-red pl-4">
                        <h3 className="font-semibold text-brand-primary-midnight mb-2">
                          Day {day.day}: {day.title}
                        </h3>
                        <p className="text-brand-primary-midnight-weak mb-3">
                          {day.description}
                        </p>
                        
                        <div className="space-y-2">
                          {day.stops.map((stop) => (
                            <div key={stop.id} className="bg-brand-primary-sand p-3 rounded">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium text-brand-primary-midnight">
                                    {stop.name}
                                  </h4>
                                  <p className="text-sm text-brand-primary-midnight-weak">
                                    {stop.description}
                                  </p>
                                </div>
                                <div className="text-xs text-brand-primary-midnight-weak">
                                  {stop.duration} min
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              {reviews && (
                <Card>
                  <CardHeader>
                    <h2 className="text-2xl font-bold text-brand-primary-midnight">
                      Reviews & Highlights
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="text-3xl font-bold text-brand-primary-midnight">
                          {reviews.summary.averageRating}
                        </div>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-5 w-5 ${
                                i < Math.floor(reviews.summary.averageRating) 
                                  ? 'fill-current' 
                                  : ''
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-brand-primary-midnight-weak">
                          ({reviews.summary.totalReviews} reviews)
                        </span>
                      </div>
                      
                      <p className="text-brand-primary-midnight-weak italic mb-4">
                        {reviews.summary.aiSummary}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {reviews.summary.highlights.map((highlight: string, index: number) => (
                          <span 
                            key={index}
                            className="bg-brand-secondary-sa-pa bg-opacity-20 text-brand-secondary-okvango px-3 py-1 rounded-full text-sm"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {reviews.reviews.slice(0, 3).map((review: any) => (
                        <div key={review.id} className="border-t border-ui-grey-weak pt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-brand-primary-midnight">
                              {review.author}
                            </span>
                            <div className="flex items-center space-x-2">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${
                                      i < review.rating ? 'fill-current' : ''
                                    }`} 
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-brand-primary-midnight-weak">
                                {review.date}
                              </span>
                            </div>
                          </div>
                          <p className="text-brand-primary-midnight-weak">
                            {review.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-brand-primary-midnight mb-1">
                      {formatPrice(trip.price)}
                    </div>
                    <div className="text-brand-primary-midnight-weak">per person</div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => window.open('https://www.urbanadventures.com', '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Book Now
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={handleWishlistToggle}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? 'fill-current text-brand-primary-intrepid-red' : ''}`} />
                      {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </Button>
                    
                    <Button variant="ghost" className="w-full">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Trip
                    </Button>
                  </div>
                  
                  <div className="text-xs text-brand-primary-midnight-weak text-center">
                    Free cancellation up to 24 hours before departure
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-brand-primary-midnight">
                    Location
                  </h3>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-64">
                    <MapContainer
                      trips={[trip]}
                      className="w-full h-full rounded-b-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}