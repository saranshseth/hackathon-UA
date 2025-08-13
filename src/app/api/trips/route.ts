import { NextRequest, NextResponse } from 'next/server';
import { mockTrips } from '@/lib/mockData';
import { filterTrips } from '@/utils';
import { SearchFilters } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters into filters
    const filters: SearchFilters = {};
    
    const destination = searchParams.get('destination');
    if (destination) filters.destination = destination;
    
    const tripTypes = searchParams.get('tripTypes');
    if (tripTypes) filters.tripTypes = tripTypes.split(',');
    
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');
    if (priceMin || priceMax) {
      filters.priceRange = [
        priceMin ? parseInt(priceMin) : 0,
        priceMax ? parseInt(priceMax) : 999999
      ];
    }
    
    const durationMin = searchParams.get('durationMin');
    const durationMax = searchParams.get('durationMax');
    if (durationMin || durationMax) {
      filters.durationRange = [
        durationMin ? parseInt(durationMin) : 1,
        durationMax ? parseInt(durationMax) : 365
      ];
    }
    
    const difficulty = searchParams.get('difficulty');
    if (difficulty) filters.difficulty = difficulty.split(',');
    
    const availability = searchParams.get('availability');
    if (availability) filters.availability = availability.split(',');
    
    const tags = searchParams.get('tags');
    if (tags) filters.tags = tags.split(',');
    
    // Filter trips based on the provided filters
    const filteredTrips = filterTrips(mockTrips, filters);
    
    // Sort by relevance/rating
    const sortedTrips = filteredTrips.sort((a, b) => b.rating - a.rating);
    
    return NextResponse.json({
      trips: sortedTrips,
      total: sortedTrips.length,
      filters: filters
    });
    
  } catch (error) {
    console.error('Error fetching trips:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // In a real application, this would save to a database
    console.log('Creating new trip:', body);
    
    return NextResponse.json(
      { message: 'Trip created successfully', id: Date.now().toString() },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error creating trip:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}