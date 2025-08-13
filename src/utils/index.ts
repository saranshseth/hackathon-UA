import { Trip, SearchFilters } from '@/types';

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatDuration = (duration: number): string => {
  return duration === 1 ? '1 day' : `${duration} days`;
};

export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const filterTrips = (trips: Trip[], filters: SearchFilters): Trip[] => {
  return trips.filter(trip => {
    // Destination filter
    if (filters.destination) {
      const destination = filters.destination.toLowerCase();
      const matchesDestination = 
        trip.location.city.toLowerCase().includes(destination) ||
        trip.location.country.toLowerCase().includes(destination) ||
        trip.name.toLowerCase().includes(destination);
      if (!matchesDestination) return false;
    }

    // Trip type filter
    if (filters.tripTypes && filters.tripTypes.length > 0) {
      const hasMatchingType = trip.tripType.some(type => 
        filters.tripTypes!.includes(type)
      );
      if (!hasMatchingType) return false;
    }

    // Price range filter
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      if (trip.price < minPrice || trip.price > maxPrice) return false;
    }

    // Duration filter
    if (filters.durationRange) {
      const [minDuration, maxDuration] = filters.durationRange;
      if (trip.duration < minDuration || trip.duration > maxDuration) return false;
    }

    // Difficulty filter
    if (filters.difficulty && filters.difficulty.length > 0) {
      if (!filters.difficulty.includes(trip.difficulty)) return false;
    }

    // Availability filter
    if (filters.availability && filters.availability.length > 0) {
      if (!filters.availability.includes(trip.availability)) return false;
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = trip.tags.some(tag => 
        filters.tags!.includes(tag)
      );
      if (!hasMatchingTag) return false;
    }

    return true;
  });
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};