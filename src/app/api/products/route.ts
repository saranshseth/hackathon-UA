import { NextResponse } from 'next/server';

// For now, we'll return the enhanced data directly
// Later this can be connected to the actual CSV parsing
export async function GET() {
  try {
    // Import the server-side data provider
    const { enhancedDataProvider } = await import('@/lib/enhancedDataProvider');
    const products = enhancedDataProvider.getAllProducts();
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error loading products:', error);
    
    // Return fallback products for Melbourne
    const fallbackProducts = [
      {
        id: '1',
        name: 'Private Melbourne: Bikes & Sights tour Melbourne highlights',
        slug: 'melbourne-bikes-sights-highlights',
        destinationName: 'Melbourne',
        destinationCountry: 'Australia',
        destinationContinent: 'Oceania',
        duration: '4 hours',
        durationHours: 4,
        private: true,
        overview: 'Explore Melbourne\'s highlights on this private bike tour.',
        highlights: ['See street art', 'Visit Federation Square', 'Explore Botanic Gardens'],
        inclusions: ['Guide', 'Bike rental', 'Helmet'],
        exclusions: ['Food', 'Tips'],
        currency: 'AUD',
        pricing: { adult: 798, child: 559, infant: 80 },
        categories: ['Private', 'Active'],
        images: {
          hero: 'https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=800&h=600&fit=crop',
          gallery: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop']
        },
        rating: 4.8,
        reviewCount: 127
      },
      {
        id: '2',
        name: 'Melbourne Laneways & Street Art Walking Tour',
        slug: 'melbourne-laneways-street-art',
        destinationName: 'Melbourne',
        destinationCountry: 'Australia',
        destinationContinent: 'Oceania',
        duration: '3 hours',
        durationHours: 3,
        private: false,
        overview: 'Discover Melbourne\'s vibrant street art scene.',
        highlights: ['Hosier Lane', 'Street art history', 'Hidden bars'],
        inclusions: ['Expert guide', 'Small group'],
        exclusions: ['Food', 'Transport'],
        currency: 'AUD',
        pricing: { adult: 449, child: 314, infant: 45 },
        categories: ['Art & Culture & History'],
        images: {
          hero: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
          gallery: ['https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=800&h=600&fit=crop']
        },
        rating: 4.6,
        reviewCount: 241
      }
    ];
    
    return NextResponse.json(fallbackProducts);
  }
}