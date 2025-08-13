"use client";

import { EnhancedProduct, Destination, Category, Review } from './enhancedDataProvider';

// Client-side compatible data provider
export class ClientDataProvider {
  private products: EnhancedProduct[] = [];
  private destinations: Destination[] = [];
  private categories: Category[] = [];
  private reviews: Review[] = [];
  private loaded = false;

  async loadData() {
    if (this.loaded) return;

    try {
      // Load data from API endpoints instead of direct file access
      const [productsRes, destinationsRes, categoriesRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/destinations'), 
        fetch('/api/categories')
      ]);

      if (productsRes.ok) {
        this.products = await productsRes.json();
      }
      if (destinationsRes.ok) {
        this.destinations = await destinationsRes.json();
      }
      if (categoriesRes.ok) {
        this.categories = await categoriesRes.json();
      }

      this.loaded = true;
    } catch (error) {
      console.error('Failed to load data from API, using fallback data:', error);
      this.loadFallbackData();
    }
  }

  private loadFallbackData() {
    // Fallback data with enhanced products for Melbourne
    this.products = [
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
        overview: 'Explore Melbourne\'s highlights on this private bike tour that takes you through the city\'s most iconic sights and hidden gems.',
        highlights: [
          'See Melbourne\'s street art and laneways',
          'Visit Federation Square and Flinders Street Station',
          'Explore the Royal Botanic Gardens',
          'Learn about Melbourne\'s coffee culture'
        ],
        inclusions: [
          'Professional local guide',
          'Bike and helmet rental',
          'Small group experience',
          'Photo opportunities'
        ],
        exclusions: [
          'Food and drinks',
          'Personal expenses',
          'Tips'
        ],
        currency: 'AUD',
        pricing: {
          adult: 798,
          child: 559,
          infant: 80
        },
        categories: ['Private', 'Active', 'City Highlights'],
        images: {
          hero: 'https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=800&h=600&fit=crop',
          gallery: [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop'
          ]
        },
        rating: 4.8,
        reviewCount: 127,
        tripAdvisorRating: 4.8,
        tripAdvisorReviewCount: 127
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
        overview: 'Discover Melbourne\'s vibrant street art scene and hidden laneways on this guided walking tour.',
        highlights: [
          'Explore famous Hosier Lane',
          'See works by Banksy and local artists',
          'Learn about Melbourne\'s street art history',
          'Visit hidden bars and cafes'
        ],
        inclusions: [
          'Expert street art guide',
          'Small group tour',
          'Photography tips'
        ],
        exclusions: [
          'Food and drinks',
          'Transportation'
        ],
        currency: 'AUD',
        pricing: {
          adult: 449,
          child: 314,
          infant: 45
        },
        categories: ['Art & Culture & History', 'City Highlights'],
        images: {
          hero: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
          gallery: [
            'https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
          ]
        },
        rating: 4.6,
        reviewCount: 241,
        tripAdvisorRating: 4.6,
        tripAdvisorReviewCount: 241
      },
      {
        id: '3',
        name: 'Melbourne Coffee Culture & Roastery Tour',
        slug: 'melbourne-coffee-culture',
        destinationName: 'Melbourne',
        destinationCountry: 'Australia',
        destinationContinent: 'Oceania',
        duration: '2.5 hours',
        durationHours: 2.5,
        private: false,
        overview: 'Experience Melbourne\'s renowned coffee culture with visits to specialty roasteries and hidden cafes.',
        highlights: [
          'Visit 3-4 specialty coffee roasteries',
          'Learn about coffee brewing techniques',
          'Taste different coffee varieties',
          'Meet local baristas and roasters'
        ],
        inclusions: [
          'Coffee expert guide',
          'Coffee tastings',
          'Small group experience'
        ],
        exclusions: [
          'Additional food',
          'Transportation'
        ],
        currency: 'AUD',
        pricing: {
          adult: 389,
          child: 272,
          infant: 39
        },
        categories: ['Food & Drink', 'City Highlights'],
        images: {
          hero: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
          gallery: [
            'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=800&h=600&fit=crop'
          ]
        },
        rating: 4.9,
        reviewCount: 156,
        tripAdvisorRating: 4.9,
        tripAdvisorReviewCount: 156
      },
      {
        id: '4',
        name: 'Melbourne Food Culture Walking Tour',
        slug: 'melbourne-food-culture',
        destinationName: 'Melbourne',
        destinationCountry: 'Australia',
        destinationContinent: 'Oceania',
        duration: '4 hours',
        durationHours: 4,
        private: false,
        overview: 'Taste your way through Melbourne\'s diverse food scene on this culinary walking tour.',
        highlights: [
          'Sample foods from 5-6 different venues',
          'Learn about Melbourne\'s multicultural cuisine',
          'Visit Queen Victoria Market',
          'Meet local food producers'
        ],
        inclusions: [
          'Food expert guide',
          'All food tastings',
          'Market visit'
        ],
        exclusions: [
          'Additional drinks',
          'Transportation'
        ],
        currency: 'AUD',
        pricing: {
          adult: 679,
          child: 475,
          infant: 68
        },
        categories: ['Food & Drink', 'City Highlights'],
        images: {
          hero: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&h=600&fit=crop',
          gallery: [
            'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=800&h=600&fit=crop'
          ]
        },
        rating: 4.7,
        reviewCount: 178,
        tripAdvisorRating: 4.7,
        tripAdvisorReviewCount: 178
      },
      {
        id: '5',
        name: 'Royal Botanic Gardens & Yarra River Cruise',
        slug: 'botanic-gardens-yarra-cruise',
        destinationName: 'Melbourne',
        destinationCountry: 'Australia',
        destinationContinent: 'Oceania',
        duration: '4.5 hours',
        durationHours: 4.5,
        private: false,
        overview: 'Explore Melbourne\'s beautiful botanic gardens and enjoy a scenic cruise along the Yarra River.',
        highlights: [
          'Guided tour of Royal Botanic Gardens',
          'Scenic Yarra River cruise',
          'Learn about native Australian plants',
          'See Melbourne skyline from the water'
        ],
        inclusions: [
          'Garden guide',
          'River cruise',
          'Transportation between venues'
        ],
        exclusions: [
          'Food and drinks',
          'Hotel pickup'
        ],
        currency: 'AUD',
        pricing: {
          adult: 569,
          child: 398,
          infant: 57
        },
        categories: ['Active', 'City Highlights'],
        images: {
          hero: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
          gallery: [
            'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=600&fit=crop'
          ]
        },
        rating: 4.5,
        reviewCount: 98,
        tripAdvisorRating: 4.5,
        tripAdvisorReviewCount: 98
      },
      {
        id: '6',
        name: 'Great Ocean Road Day Trip from Melbourne',
        slug: 'great-ocean-road-day-trip',
        destinationName: 'Melbourne',
        destinationCountry: 'Australia',
        destinationContinent: 'Oceania',
        duration: 'Full day',
        durationHours: 12,
        private: false,
        overview: 'Experience one of the world\'s most scenic coastal drives on this full-day tour to the Great Ocean Road.',
        highlights: [
          'See the famous Twelve Apostles',
          'Visit Port Campbell National Park',
          'Stop at Loch Ard Gorge',
          'Scenic coastal drive'
        ],
        inclusions: [
          'Professional guide',
          'Comfortable coach transport',
          'National park entry fees'
        ],
        exclusions: [
          'Lunch',
          'Personal expenses'
        ],
        currency: 'AUD',
        pricing: {
          adult: 1299,
          child: 909,
          infant: 130
        },
        categories: ['Active', 'Off The Beaten Path'],
        images: {
          hero: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
          gallery: [
            'https://images.unsplash.com/photo-1551041777-7a85d2e5aa3c?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=600&fit=crop'
          ]
        },
        rating: 4.7,
        reviewCount: 312,
        tripAdvisorRating: 4.7,
        tripAdvisorReviewCount: 312
      }
    ];

    this.destinations = [
      {
        id: 'melbourne',
        name: 'Melbourne',
        slug: 'melbourne',
        type: 'City',
        country: 'Australia',
        continent: 'Oceania',
        description: 'Melbourne is home to more than 140 different cultures and filled with stunning Victorian arcades, theatres, and government buildings.',
        heroImage: 'https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=800&h=600&fit=crop',
        tripAdvisorRating: 4.8,
        tripAdvisorReviewTotal: 1234
      }
    ];

    this.categories = [
      { id: '1', name: 'Active', slug: 'active', description: 'Physical activities and outdoor adventures' },
      { id: '2', name: 'Art & Culture & History', slug: 'art-culture-history', description: 'Cultural experiences and historical tours' },
      { id: '3', name: 'City Highlights', slug: 'city-highlights', description: 'Must-see attractions and landmarks' },
      { id: '4', name: 'Food & Drink', slug: 'food-drink', description: 'Culinary experiences and local cuisine' },
      { id: '5', name: 'Off The Beaten Path', slug: 'off-the-beaten-path', description: 'Unique and lesser-known experiences' },
      { id: '6', name: 'Private', slug: 'private', description: 'Exclusive private tours and experiences' }
    ];

    this.loaded = true;
  }

  async getAllProducts(): Promise<EnhancedProduct[]> {
    await this.loadData();
    return this.products;
  }

  async getProductsByDestination(destinationName: string): Promise<EnhancedProduct[]> {
    await this.loadData();
    return this.products.filter(p => 
      p.destinationName.toLowerCase().includes(destinationName.toLowerCase())
    );
  }

  async getProductsByCategory(categoryName: string): Promise<EnhancedProduct[]> {
    await this.loadData();
    return this.products.filter(p => 
      p.categories.some(cat => cat.toLowerCase().includes(categoryName.toLowerCase()))
    );
  }

  async getFeaturedProducts(limit: number = 12): Promise<EnhancedProduct[]> {
    await this.loadData();
    return this.products
      .sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount))
      .slice(0, limit);
  }

  async getPopularProducts(limit: number = 8): Promise<EnhancedProduct[]> {
    await this.loadData();
    return this.products
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, limit);
  }

  async getAllDestinations(): Promise<Destination[]> {
    await this.loadData();
    return this.destinations;
  }

  async getAllCategories(): Promise<Category[]> {
    await this.loadData();
    return this.categories;
  }

  async searchProducts(query: string): Promise<EnhancedProduct[]> {
    await this.loadData();
    const searchTerm = query.toLowerCase();
    return this.products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.destinationName.toLowerCase().includes(searchTerm) ||
      p.overview.toLowerCase().includes(searchTerm) ||
      p.categories.some(cat => cat.toLowerCase().includes(searchTerm))
    );
  }
}

export const clientDataProvider = new ClientDataProvider();