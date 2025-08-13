'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import SearchInput from '@/components/Search/SearchInput';
import Header from '@/components/Layout/Header';
import { mockTrips } from '@/lib/mockData';
import { formatPrice, formatDuration } from '@/utils';
import { 
  MapPin, 
  Heart, 
  Star, 
  Users, 
  Clock, 
  Compass,
  TrendingUp,
  Award,
  ChevronRight,
  Play
} from 'lucide-react';

export default function Home() {
  const [featuredTrips, setFeaturedTrips] = useState(mockTrips.slice(0, 6));
  const [popularDestinations] = useState([
    { name: 'Tokyo', country: 'Japan', trips: 12, image: 'from-blue-500 to-purple-600' },
    { name: 'Barcelona', country: 'Spain', trips: 8, image: 'from-orange-500 to-red-600' },
    { name: 'New York', country: 'USA', trips: 15, image: 'from-gray-500 to-blue-600' },
    { name: 'Bangkok', country: 'Thailand', trips: 10, image: 'from-green-500 to-teal-600' },
  ]);

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-brand-primary-midnight via-brand-secondary-drake to-brand-primary-midnight flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Urban Adventures
              <span className="block text-brand-primary-intrepid-red mt-2">
                Made Local
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Discover authentic local experiences in cities worldwide. 
              Small groups, big adventures.
            </p>
            
            {/* Hero Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <SearchInput 
                placeholder="Where do you want to explore?"
                className="h-14 text-lg bg-white/95 backdrop-blur-sm"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-4">
                <Compass className="h-5 w-5 mr-2" />
                Explore Adventures
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Play className="h-5 w-5 mr-2" />
                Watch Video
              </Button>
            </div>
          </div>
        </div>
        
        {/* Hero Stats */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <div className="text-3xl font-bold text-brand-primary-intrepid-red">50+</div>
                <div className="text-sm opacity-90">Cities</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-primary-intrepid-red">500+</div>
                <div className="text-sm opacity-90">Adventures</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-primary-intrepid-red">16</div>
                <div className="text-sm opacity-90">Max Group Size</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-primary-intrepid-red">4.8</div>
                <div className="text-sm opacity-90">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Adventures */}
      <section className="py-16 bg-brand-primary-sand">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-primary-midnight mb-4">
              Featured Adventures
            </h2>
            <p className="text-lg text-brand-primary-midnight-weak max-w-2xl mx-auto">
              Handpicked experiences that showcase the best of each destination
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredTrips.map((trip, index) => (
              <Card key={trip.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-64 bg-gradient-to-r from-brand-secondary-santorini to-brand-secondary-glacier">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <div className="flex gap-2">
                      {trip.badges.map((badge, badgeIndex) => (
                        <Badge key={badgeIndex} badge={badge} />
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white text-brand-primary-midnight">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-2xl font-bold">{formatPrice(trip.price)}</div>
                    <div className="text-sm opacity-90">per person</div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-brand-primary-midnight leading-tight">
                      {trip.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center text-brand-primary-midnight-weak mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{trip.location.city}, {trip.location.country}</span>
                  </div>
                  
                  <p className="text-brand-primary-midnight-weak text-sm mb-4 line-clamp-2">
                    {trip.shortDescription}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-brand-primary-midnight-weak mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatDuration(trip.duration)}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Max 16
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400" />
                      {trip.rating}
                    </div>
                  </div>
                  
                  <a href={`/trips/${trip.id}`}>
                    <Button className="w-full group">
                      View Adventure
                      <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <a href="/map">
              <Button variant="outline" size="lg">
                View All Adventures
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-primary-midnight mb-4">
              Popular Destinations
            </h2>
            <p className="text-lg text-brand-primary-midnight-weak">
              Explore our most loved cities around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination, index) => (
              <Card key={index} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
                <div className={`h-48 bg-gradient-to-br ${destination.image} relative`}>
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                      <p className="text-sm opacity-90 mb-2">{destination.country}</p>
                      <div className="inline-flex items-center bg-white/20 rounded-full px-3 py-1 text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {destination.trips} adventures
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Urban Adventures */}
      <section className="py-16 bg-brand-primary-sand">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-primary-midnight mb-4">
              Why Urban Adventures?
            </h2>
            <p className="text-lg text-brand-primary-midnight-weak max-w-2xl mx-auto">
              We're not just another tour company. Here's what makes us different.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-primary-intrepid-red rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-primary-midnight mb-3">
                Small Groups
              </h3>
              <p className="text-brand-primary-midnight-weak">
                Maximum 16 people means more personal attention and authentic local interactions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-secondary-okvango rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-primary-midnight mb-3">
                Local Experts
              </h3>
              <p className="text-brand-primary-midnight-weak">
                Our guides are locals who know the hidden gems and stories behind each destination.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-secondary-santorini rounded-full flex items-center justify-center mx-auto mb-4">
                <Compass className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-brand-primary-midnight mb-3">
                Unique Experiences
              </h3>
              <p className="text-brand-primary-midnight-weak">
                Skip the tourist traps. We'll show you the real city through a local's eyes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-primary-midnight">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who've discovered the real side of cities with Urban Adventures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/map">
              <Button size="lg" className="text-lg px-8 py-4">
                Explore All Adventures
              </Button>
            </a>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-brand-primary-midnight">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}