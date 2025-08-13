import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { enhancedDataProvider } = await import('@/lib/enhancedDataProvider');
    const categories = enhancedDataProvider.getAllCategories();
    
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error loading categories:', error);
    
    // Return fallback categories
    const fallbackCategories = [
      { id: '1', name: 'Active', slug: 'active', description: 'Physical activities and outdoor adventures' },
      { id: '2', name: 'Art & Culture & History', slug: 'art-culture-history', description: 'Cultural experiences' },
      { id: '3', name: 'City Highlights', slug: 'city-highlights', description: 'Must-see attractions' },
      { id: '4', name: 'Food & Drink', slug: 'food-drink', description: 'Culinary experiences' },
      { id: '5', name: 'Private', slug: 'private', description: 'Exclusive private tours' }
    ];
    
    return NextResponse.json(fallbackCategories);
  }
}