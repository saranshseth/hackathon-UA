import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { enhancedDataProvider } = await import('@/lib/enhancedDataProvider');
    const destinations = enhancedDataProvider.getAllDestinations();
    
    return NextResponse.json(destinations);
  } catch (error) {
    console.error('Error loading destinations:', error);
    
    // Return fallback destinations
    const fallbackDestinations = [
      {
        id: 'melbourne',
        name: 'Melbourne',
        slug: 'melbourne',
        type: 'City',
        country: 'Australia',
        continent: 'Oceania',
        description: 'Melbourne is home to more than 140 different cultures.',
        heroImage: 'https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=800&h=600&fit=crop',
        tripAdvisorRating: 4.8,
        tripAdvisorReviewTotal: 1234
      }
    ];
    
    return NextResponse.json(fallbackDestinations);
  }
}