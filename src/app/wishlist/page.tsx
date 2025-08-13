"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/Layout/Header";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockTrips } from "@/lib/mockData";
import { formatPrice, formatDuration } from "@/utils";
import { Heart, MapPin, Star, ExternalLink } from "lucide-react";

export default function WishlistPage() {
  const { data: session, status } = useSession();
  const [wishlistTrips, setWishlistTrips] = useState<any[]>([]);

  useEffect(() => {
    if (session) {
      // In a real app, this would fetch from API
      // For demo, just show first 2 trips
      setWishlistTrips(mockTrips.slice(0, 2));
    }
  }, [session]);

  const removeFromWishlist = (tripId: string) => {
    setWishlistTrips((prev) => prev.filter((trip) => trip.id !== tripId));
  };

  if (status === "loading") {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-brand-primary-sand flex items-center justify-center">
          <div className="text-brand-primary-midnight">Loading...</div>
        </div>
      </>
    );
  }

  if (!session) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-brand-primary-sand flex items-center justify-center">
          <div className="text-center">
            <Heart className="h-16 w-16 mx-auto text-ui-grey mb-4" />
            <h1 className="text-2xl font-bold text-brand-primary-midnight mb-2">
              Sign in to view your wishlist
            </h1>
            <p className="text-brand-primary-midnight-weak mb-6">
              Save your favorite trips and access them from any device
            </p>
            <a href="/auth/signin">
              <Button>Sign In</Button>
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
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-brand-primary-midnight mb-2">
              My Wishlist
            </h1>
            <p className="text-brand-primary-midnight-weak">
              {wishlistTrips.length} saved adventures
            </p>
          </div>

          {wishlistTrips.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="h-16 w-16 mx-auto text-ui-grey mb-4" />
              <h2 className="text-xl font-semibold text-brand-primary-midnight mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-brand-primary-midnight-weak mb-6">
                Start exploring and save your favorite adventures
              </p>
              <a href="/map">
                <Button>Explore Adventures</Button>
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistTrips.map((trip) => (
                <Card key={trip.id} className="overflow-hidden group">
                  <div className="h-48 bg-gradient-to-r from-brand-secondary-santorini to-brand-secondary-glacier relative">
                    <button
                      onClick={() => removeFromWishlist(trip.id)}
                      className="absolute top-3 right-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
                    >
                      <Heart className="h-4 w-4 fill-current text-brand-primary-intrepid-red" />
                    </button>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-brand-primary-midnight mb-2">
                          {trip.name}
                        </h3>
                        <div className="flex items-center text-brand-primary-midnight-weak mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {trip.location.city}, {trip.location.country}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-brand-primary-midnight-weak">
                          <span>{formatDuration(trip.duration)}</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-400" />
                            {trip.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      {trip.badges.length > 0 && (
                        <Badge badge={trip.badges[0]} />
                      )}
                      <span className="text-brand-primary-intrepid-red font-bold text-lg">
                        {formatPrice(trip.price)}
                      </span>
                    </div>

                    <p className="text-brand-primary-midnight-weak text-sm mb-4">
                      {trip.shortDescription}
                    </p>

                    <div className="flex space-x-2">
                      <a href={`/trips/${trip.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </a>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() =>
                          window.open(
                            "https://www.urbanadventures.com",
                            "_blank"
                          )
                        }
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Book
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
