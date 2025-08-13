export const TRIP_TYPES = [
  'cycling',
  'hiking',
  'cultural',
  'culinary',
  'photography',
  'architecture',
  'nightlife',
  'shopping',
  'nature',
  'history'
] as const;

export const DIFFICULTIES = [
  'Easy',
  'Moderate', 
  'Challenging'
] as const;

export const AVAILABILITY_STATUS = [
  'Available',
  'Limited',
  'Sold Out'
] as const;

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export const API_ENDPOINTS = {
  trips: '/api/trips',
  reviews: '/api/reviews',
  social: '/api/social',
  wishlist: '/api/wishlist',
  search: '/api/search'
} as const;

export const DEFAULT_MAP_CENTER = {
  lat: 40.7128,
  lng: -74.0060,
  zoom: 2
};