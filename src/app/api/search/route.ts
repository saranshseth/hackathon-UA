import { NextRequest, NextResponse } from 'next/server';
import { mockTrips } from '@/lib/mockData';
import { TRIP_TYPES } from '@/lib/constants';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';
    
    if (!query) {
      return NextResponse.json({
        suggestions: [],
        trips: [],
        countries: [],
        tripTypes: []
      });
    }
    
    // Search trips
    const matchingTrips = mockTrips.filter(trip => 
      trip.name.toLowerCase().includes(query) ||
      trip.description.toLowerCase().includes(query) ||
      trip.location.city.toLowerCase().includes(query) ||
      trip.location.country.toLowerCase().includes(query) ||
      trip.tags.some(tag => tag.toLowerCase().includes(query))
    );
    
    // Get unique countries that match
    const matchingCountries = Array.from(new Set(
      mockTrips
        .filter(trip => trip.location.country.toLowerCase().includes(query))
        .map(trip => trip.location.country)
    ));
    
    // Get matching trip types
    const matchingTripTypes = TRIP_TYPES.filter(type => 
      type.toLowerCase().includes(query)
    );
    
    // Create suggestions for autocomplete
    const suggestions = [
      ...matchingTrips.slice(0, 3).map(trip => ({
        type: 'trip',
        value: trip.name,
        subtitle: `${trip.location.city}, ${trip.location.country}`
      })),
      ...matchingCountries.slice(0, 3).map(country => ({
        type: 'country',
        value: country,
        subtitle: 'Country'
      })),
      ...matchingTripTypes.slice(0, 2).map(type => ({
        type: 'trip_type',
        value: type,
        subtitle: 'Trip Type'
      }))
    ].slice(0, 8);
    
    return NextResponse.json({
      suggestions,
      trips: matchingTrips.slice(0, 20),
      countries: matchingCountries,
      tripTypes: matchingTripTypes
    });
    
  } catch (error) {
    console.error('Error performing search:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}