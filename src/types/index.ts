export interface Trip {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  duration: number; // in days
  location: {
    lat: number;
    lng: number;
    country: string;
    city: string;
  };
  tripType: string[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  badges: Badge[];
  images: string[];
  availability: 'Available' | 'Limited' | 'Sold Out';
  rating: number;
  reviewCount: number;
  tags: string[];
  itinerary: ItineraryDay[];
  createdAt: string;
  updatedAt: string;
}

// Enhanced interface based on CSV data structure
export interface Product {
  id: string;
  name: string;
  url: string;
  slug: string;
  baseUrl: string;
  destination: {
    name: string;
    country: string;
    continent: string;
  };
  duration: {
    hours: number;
    days?: number;
  };
  isPrivate: boolean;
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  meetingPoint: string;
  endPoint: string;
  moreInformation: string;
  localImpact: string;
  pricing: {
    currency: string;
    adult: number;
    child: number;
    infant: number;
  };
  categories: string[];
  images: {
    hero: string;
    gallery: string[];
  };
  tripadvisor: {
    url: string;
    rating: number;
    reviewCount: number;
    reviewLink: string;
    recommendation: string;
    description: string;
    freeCancellation: boolean;
    reservePayLater: boolean;
    lowestPriceGuarantee: boolean;
    highlights: string[];
    itinerary: string;
  };
  faq: {
    groupSize: string;
    findingGuide: string;
    dietary: string;
    cancellations: string;
    accessibility: string;
    walkingDistance: string;
    childPolicy: string;
    importantInfo: string;
  };
}

// New interfaces for additional CSV data - Contentstack ready
export interface Destination {
  id: string;
  name: string;
  url: string;
  slug: string;
  type: 'City' | 'Region' | 'Country';
  country: string;
  continent: string;
  description: string;
  video?: string;
  heroImage: string;
  tripadvisor?: {
    url: string;
    rating?: number;
    reviewTotal?: number;
    reviewUrl?: string;
    description?: string;
  };
  // Contentstack fields (for future migration)
  contentstack?: {
    uid: string;
    content_type: 'destination';
    locale: string;
    tags: string[];
    created_at: string;
    updated_at: string;
  };
}

export interface Category {
  id: string;
  name: string;
  url: string;
  slug: string;
  description?: string;
  // Contentstack fields
  contentstack?: {
    uid: string;
    content_type: 'category';
    locale: string;
    tags: string[];
    created_at: string;
    updated_at: string;
  };
}

export interface Hub {
  id: string;
  name: string;
  displayName: string;
  url: string;
  destination: string;
  category: string;
  description?: string;
  // Contentstack fields
  contentstack?: {
    uid: string;
    content_type: 'hub';
    locale: string;
    tags: string[];
    created_at: string;
    updated_at: string;
  };
}

export interface ProductReview {
  id?: string;
  productId: string;
  reviewSource: 'Trip Advisor' | 'Google' | 'Internal' | 'Booking.com';
  travellerName: string;
  rating: number;
  ratingOutOf: number;
  title: string;
  body: string;
  travelledDate: string;
  travellerType: 'Solo' | 'Couples' | 'Family' | 'Friends' | 'Business';
  link?: string;
  submittedDate: string;
  fullReview?: string;
  // Contentstack fields
  contentstack?: {
    uid: string;
    content_type: 'review';
    locale: string;
    tags: string[];
    created_at: string;
    updated_at: string;
  };
}

export interface ProductCategoryMapping {
  id: string;
  code: string;
  name: string;
  sequence: number;
  productId: string;
  categoryName: string;
}

// Contentstack-ready base interface
export interface ContentstackEntity {
  uid: string;
  content_type: string;
  locale: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  publish_details?: {
    environment: string;
    locale: string;
    time: string;
  };
}

// Unified data response interface for API compatibility
export interface DataResponse<T> {
  data: T[];
  meta: {
    total: number;
    count: number;
    page?: number;
    limit?: number;
  };
  source: 'csv' | 'contentstack' | 'api';
}

export interface Badge {
  type: 'new' | 'popular' | 'likely_to_sell_out';
  label: string;
  color: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  stops: ItineraryStop[];
}

export interface ItineraryStop {
  id: string;
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  duration: number; // in minutes
  activityType: string;
  images?: string[];
}

export interface Review {
  id: string;
  tripId: string;
  rating: number;
  content: string;
  author: string;
  date: string;
  source: 'tripadvisor' | 'internal';
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  aiSummary: string;
  highlights: string[];
}

export interface SocialMediaPost {
  id: string;
  tripId: string;
  platform: 'instagram' | 'tiktok' | 'facebook';
  url: string;
  mediaType: 'photo' | 'video';
  caption: string;
  thumbnail?: string;
}

export interface User {
  id: string;
  auth0Id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: {
    tripTypes: string[];
    budgetRange: [number, number];
    preferredDuration: [number, number];
  };
  wishlist: string[]; // trip IDs
}

export interface SearchFilters {
  destination?: string;
  tripTypes?: string[];
  priceRange?: [number, number];
  durationRange?: [number, number];
  difficulty?: string[];
  availability?: string[];
  tags?: string[];
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}