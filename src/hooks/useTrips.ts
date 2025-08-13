import { useState, useEffect } from 'react';
import { Trip, SearchFilters } from '@/types';

interface UseTripsResult {
  trips: Trip[];
  loading: boolean;
  error: string | null;
  total: number;
  refetch: () => void;
}

export const useTrips = (filters?: SearchFilters): UseTripsResult => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query string from filters
      const params = new URLSearchParams();
      
      if (filters?.destination) params.set('destination', filters.destination);
      if (filters?.tripTypes?.length) params.set('tripTypes', filters.tripTypes.join(','));
      if (filters?.priceRange) {
        params.set('priceMin', filters.priceRange[0].toString());
        params.set('priceMax', filters.priceRange[1].toString());
      }
      if (filters?.durationRange) {
        params.set('durationMin', filters.durationRange[0].toString());
        params.set('durationMax', filters.durationRange[1].toString());
      }
      if (filters?.difficulty?.length) params.set('difficulty', filters.difficulty.join(','));
      if (filters?.availability?.length) params.set('availability', filters.availability.join(','));
      if (filters?.tags?.length) params.set('tags', filters.tags.join(','));
      
      const response = await fetch(`/api/trips?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch trips');
      }
      
      const data = await response.json();
      setTrips(data.trips);
      setTotal(data.total);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [JSON.stringify(filters)]);

  return {
    trips,
    loading,
    error,
    total,
    refetch: fetchTrips
  };
};

export const useTrip = (id: string) => {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/trips/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch trip');
        }
        
        const data = await response.json();
        setTrip(data.trip);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTrip();
    }
  }, [id]);

  return { trip, loading, error };
};