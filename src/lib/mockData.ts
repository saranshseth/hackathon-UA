import { Trip, Badge } from '@/types';

const generateBadges = (trip: Partial<Trip>): Badge[] => {
  const badges: Badge[] = [];
  
  if (trip.createdAt && new Date(trip.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) {
    badges.push({
      type: 'new',
      label: 'New Trip',
      color: '#50b464'
    });
  }
  
  if (trip.reviewCount && trip.reviewCount > 50) {
    badges.push({
      type: 'popular',
      label: 'Popular',
      color: '#ffc828'
    });
  }
  
  if (trip.availability === 'Limited') {
    badges.push({
      type: 'likely_to_sell_out',
      label: 'Likely to Sell Out',
      color: '#ff2828'
    });
  }
  
  return badges;
};

export const mockTrips: Trip[] = [
  {
    id: '1',
    name: 'Tokyo Street Food Adventure',
    description: 'Dive deep into Tokyo\'s incredible street food scene, from hidden alleys in Shibuya to traditional markets in Tsukiji.',
    shortDescription: 'Explore Tokyo\'s amazing street food culture',
    price: 189,
    duration: 1,
    location: {
      lat: 35.6762,
      lng: 139.6503,
      country: 'Japan',
      city: 'Tokyo'
    },
    tripType: ['culinary', 'cultural'],
    difficulty: 'Easy',
    badges: [],
    images: [
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800'
    ],
    availability: 'Available',
    rating: 4.8,
    reviewCount: 127,
    tags: ['food', 'local culture', 'walking'],
    itinerary: [
      {
        day: 1,
        title: 'Tokyo Food Discovery',
        description: 'A full day exploring Tokyo\'s best street food spots',
        stops: [
          {
            id: 'stop1',
            name: 'Tsukiji Outer Market',
            description: 'Start with fresh sushi and traditional breakfast',
            location: { lat: 35.6654, lng: 139.7706 },
            duration: 120,
            activityType: 'food tasting'
          },
          {
            id: 'stop2',
            name: 'Shibuya Food Alleys',
            description: 'Explore hidden yakitori and ramen spots',
            location: { lat: 35.6598, lng: 139.7006 },
            duration: 90,
            activityType: 'food tasting'
          }
        ]
      }
    ],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Barcelona Architecture Walk',
    description: 'Discover Gaudí\'s masterpieces and Barcelona\'s unique architectural heritage through the Gothic Quarter and Eixample.',
    shortDescription: 'Architectural wonders of Barcelona',
    price: 145,
    duration: 1,
    location: {
      lat: 41.3851,
      lng: 2.1734,
      country: 'Spain',
      city: 'Barcelona'
    },
    tripType: ['architecture', 'cultural', 'history'],
    difficulty: 'Moderate',
    badges: [],
    images: [
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800',
      'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=800'
    ],
    availability: 'Limited',
    rating: 4.9,
    reviewCount: 89,
    tags: ['architecture', 'Gaudí', 'walking', 'history'],
    itinerary: [
      {
        day: 1,
        title: 'Gaudí and Gothic Wonders',
        description: 'Exploring Barcelona\'s architectural gems',
        stops: [
          {
            id: 'stop1',
            name: 'Sagrada Família',
            description: 'Gaudí\'s unfinished masterpiece',
            location: { lat: 41.4036, lng: 2.1744 },
            duration: 90,
            activityType: 'sightseeing'
          },
          {
            id: 'stop2',
            name: 'Gothic Quarter',
            description: 'Medieval streets and hidden squares',
            location: { lat: 41.3828, lng: 2.1761 },
            duration: 120,
            activityType: 'walking tour'
          }
        ]
      }
    ],
    createdAt: '2024-02-10T00:00:00Z',
    updatedAt: '2024-02-10T00:00:00Z'
  },
  {
    id: '3',
    name: 'New York Photography Tour',
    description: 'Capture the essence of NYC through your lens with professional photography guidance in iconic and hidden locations.',
    shortDescription: 'Professional photography tour of NYC',
    price: 225,
    duration: 1,
    location: {
      lat: 40.7589,
      lng: -73.9851,
      country: 'USA',
      city: 'New York'
    },
    tripType: ['photography', 'cultural'],
    difficulty: 'Easy',
    badges: [],
    images: [
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
      'https://images.unsplash.com/photo-1538264789-bea5d2136d21?w=800'
    ],
    availability: 'Available',
    rating: 4.7,
    reviewCount: 156,
    tags: ['photography', 'urban', 'skyline', 'street art'],
    itinerary: [
      {
        day: 1,
        title: 'NYC Through the Lens',
        description: 'Professional photography workshop',
        stops: [
          {
            id: 'stop1',
            name: 'Brooklyn Bridge',
            description: 'Golden hour skyline shots',
            location: { lat: 40.7061, lng: -73.9969 },
            duration: 60,
            activityType: 'photography'
          },
          {
            id: 'stop2',
            name: 'DUMBO Waterfront',
            description: 'Manhattan Bridge framing techniques',
            location: { lat: 40.7033, lng: -73.9903 },
            duration: 90,
            activityType: 'photography'
          }
        ]
      }
    ],
    createdAt: '2024-03-05T00:00:00Z',
    updatedAt: '2024-03-05T00:00:00Z'
  }
];

// Add badges to trips
mockTrips.forEach(trip => {
  trip.badges = generateBadges(trip);
});

export const mockReviews = [
  {
    id: '1',
    tripId: '1',
    rating: 5,
    content: 'Amazing food tour! Our guide knew all the best hidden spots.',
    author: 'Sarah M.',
    date: '2024-01-20',
    source: 'tripadvisor' as const
  },
  {
    id: '2',
    tripId: '1',
    rating: 4,
    content: 'Great experience, though it was quite busy at some locations.',
    author: 'John D.',
    date: '2024-01-18',
    source: 'internal' as const
  }
];