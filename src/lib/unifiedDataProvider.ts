import { 
  Product, 
  Destination, 
  Category, 
  Hub, 
  ProductReview, 
  DataResponse 
} from '@/types';
import { sampleProducts } from './productData';

// Mock data based on CSV structure but simplified for easy management
const mockDestinations: Destination[] = [
  {
    id: '12C8310D-7F94-488C-9514-468F5CCA6E9C',
    name: 'Melbourne',
    url: 'https://www.urbanadventures.com/en/melbourne',
    slug: '/melbourne',
    type: 'City',
    country: 'Australia',
    continent: 'Oceania',
    description: "Melbourne is home to more than 140 different cultures and filled with stunning Victorian arcades, theatres, and government buildings.",
    heroImage: 'https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=800&h=600&fit=crop',
    tripadvisor: {
      url: 'https://www.tripadvisor.com.au/Melbourne_Urban_Adventures',
      rating: 4.8,
      reviewTotal: 1250
    }
  },
  {
    id: 'A9CEEB47-41AD-4CBA-93FC-E4EE0E7EA63E',
    name: 'Kangaroo Island',
    url: 'https://www.urbanadventures.com/en/kangarooisland',
    slug: '/kangarooisland',
    type: 'City',
    country: 'Australia',
    continent: 'Oceania',
    description: "Discover Australia's iconic nature-based destination with untamed landscapes and friendly locals.",
    heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'
  },
  {
    id: '595AAABB-EAA1-44F9-A707-AEDEFD288020',
    name: 'Barcelona',
    url: 'https://www.urbanadventures.com/en/barcelona',
    slug: '/barcelona',
    type: 'City',
    country: 'Spain',
    continent: 'Europe',
    description: "A melting pot of traditional Catalan culture and international trends, one of Europe's most dynamic cities.",
    heroImage: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=800&h=600&fit=crop',
    tripadvisor: {
      url: 'https://www.tripadvisor.com.au/Barcelona_Urban_Adventures',
      rating: 4.9,
      reviewTotal: 241
    }
  },
  {
    id: '02A3DAF2-B585-4C55-B7B8-B074BADC6B82',
    name: 'Paris',
    url: 'https://www.urbanadventures.com/en/paris',
    slug: '/paris',
    type: 'City',
    country: 'France',
    continent: 'Europe',
    description: "From back streets to bakeries, something to delight the senses around every corner in Paris.",
    heroImage: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
    video: 'https://www.youtube.com/watch?v=7cjNf_6Tkw8',
    tripadvisor: {
      url: 'https://www.tripadvisor.com.au/Paris_Urban_Adventures',
      rating: 4.9,
      reviewTotal: 1108
    }
  }
];

const mockCategories: Category[] = [
  {
    id: 'active',
    name: 'Active',
    url: 'https://www.urbanadventures.com/en/active',
    slug: '/active',
    description: 'Get your heart pumping with active adventures'
  },
  {
    id: 'culture',
    name: 'Art & Culture & History',
    url: 'https://www.urbanadventures.com/en/art-culture-history',
    slug: '/art-culture-history',
    description: 'Immerse yourself in local art, culture, and history'
  },
  {
    id: 'highlights',
    name: 'City Highlights',
    url: 'https://www.urbanadventures.com/en/city-highlights',
    slug: '/city-highlights',
    description: 'Discover must-see attractions and hidden gems'
  },
  {
    id: 'food',
    name: 'Food & Drink',
    url: 'https://www.urbanadventures.com/en/food-drink',
    slug: '/food-drink',
    description: 'Savor local flavors and culinary traditions'
  },
  {
    id: 'private',
    name: 'Private',
    url: 'https://www.urbanadventures.com/en/private',
    slug: '/private',
    description: 'Exclusive private tours tailored to you'
  }
];

const mockHubs: Hub[] = [
  {
    id: 'melbourne-active',
    name: 'Melbourne Active',
    displayName: 'Melbourne Active Adventures',
    url: '/melbourne/active',
    destination: 'Melbourne',
    category: 'Active',
    description: 'Active adventures in Melbourne'
  },
  {
    id: 'melbourne-food',
    name: 'Melbourne Food & Drink',
    displayName: 'Melbourne Food Scene',
    url: '/melbourne/food-drink',
    destination: 'Melbourne',
    category: 'Food & Drink',
    description: 'Culinary experiences in Melbourne'
  },
  {
    id: 'barcelona-culture',
    name: 'Barcelona Culture',
    displayName: 'Barcelona Art & Culture',
    url: '/barcelona/art-culture-history',
    destination: 'Barcelona',
    category: 'Art & Culture & History',
    description: 'Cultural experiences in Barcelona'
  }
];

const mockReviews: ProductReview[] = [
  {
    id: 'review-1',
    productId: 'MEL-BIKE-001',
    reviewSource: 'Trip Advisor',
    travellerName: 'Sarah M',
    rating: 5,
    ratingOutOf: 5,
    title: 'Amazing Melbourne Experience',
    body: 'Our guide was fantastic and showed us parts of Melbourne we never would have found on our own.',
    travelledDate: 'November 2024',
    travellerType: 'Couples',
    submittedDate: '2024-11-15'
  },
  {
    id: 'review-2',
    productId: 'MEL-BIKE-001',
    reviewSource: 'Trip Advisor',
    travellerName: 'Mike R',
    rating: 4,
    ratingOutOf: 5,
    title: 'Great Local Knowledge',
    body: 'Really enjoyed the tour. Our guide knew all the best spots.',
    travelledDate: 'October 2024',
    travellerType: 'Solo',
    submittedDate: '2024-10-28'
  }
];

// Unified Data Provider Interface
export interface UnifiedDataProvider {
  getProducts(filters?: any): Promise<DataResponse<Product>>;
  getDestinations(): Promise<DataResponse<Destination>>;
  getCategories(): Promise<DataResponse<Category>>;
  getHubs(): Promise<DataResponse<Hub>>;
  getProductReviews(productId?: string): Promise<DataResponse<ProductReview>>;
  
  // Specific queries
  getProductsByDestination(destination: string): Promise<DataResponse<Product>>;
  getProductsByCategory(category: string): Promise<DataResponse<Product>>;
  getDestinationBySlug(slug: string): Promise<Destination | null>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  getProductById(id: string): Promise<Product | null>;
}

// Mock Data Provider (using CSV-inspired data)
class MockDataProvider implements UnifiedDataProvider {
  async getProducts(filters?: any): Promise<DataResponse<Product>> {
    let products = [...sampleProducts];
    
    // Apply basic filters if provided
    if (filters?.destination) {
      products = products.filter(p => 
        p.destination.name.toLowerCase().includes(filters.destination.toLowerCase())
      );
    }
    
    if (filters?.category) {
      products = products.filter(p => 
        p.categories.some(c => c.toLowerCase().includes(filters.category.toLowerCase()))
      );
    }

    return {
      data: products,
      meta: { total: products.length, count: products.length },
      source: 'csv'
    };
  }

  async getDestinations(): Promise<DataResponse<Destination>> {
    return {
      data: mockDestinations,
      meta: { total: mockDestinations.length, count: mockDestinations.length },
      source: 'csv'
    };
  }

  async getCategories(): Promise<DataResponse<Category>> {
    return {
      data: mockCategories,
      meta: { total: mockCategories.length, count: mockCategories.length },
      source: 'csv'
    };
  }

  async getHubs(): Promise<DataResponse<Hub>> {
    return {
      data: mockHubs,
      meta: { total: mockHubs.length, count: mockHubs.length },
      source: 'csv'
    };
  }

  async getProductReviews(productId?: string): Promise<DataResponse<ProductReview>> {
    const reviews = productId 
      ? mockReviews.filter(r => r.productId === productId)
      : mockReviews;
    
    return {
      data: reviews,
      meta: { total: reviews.length, count: reviews.length },
      source: 'csv'
    };
  }

  async getProductsByDestination(destination: string): Promise<DataResponse<Product>> {
    const products = await this.getProducts({ destination });
    return products;
  }

  async getProductsByCategory(category: string): Promise<DataResponse<Product>> {
    const products = await this.getProducts({ category });
    return products;
  }

  async getDestinationBySlug(slug: string): Promise<Destination | null> {
    return mockDestinations.find(d => d.slug === slug) || null;
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return mockCategories.find(c => c.slug === slug) || null;
  }

  async getProductById(id: string): Promise<Product | null> {
    return sampleProducts.find(p => p.id === id) || null;
  }
}

// Contentstack Data Provider (future implementation)
class ContentstackDataProvider implements UnifiedDataProvider {
  private apiKey: string;
  private deliveryToken: string;
  private environment: string;

  constructor(config: { apiKey: string; deliveryToken: string; environment: string }) {
    this.apiKey = config.apiKey;
    this.deliveryToken = config.deliveryToken;
    this.environment = config.environment;
  }

  // Future Contentstack implementations
  async getProducts(): Promise<DataResponse<Product>> {
    throw new Error('Contentstack integration not yet implemented');
  }

  async getDestinations(): Promise<DataResponse<Destination>> {
    throw new Error('Contentstack integration not yet implemented');
  }

  async getCategories(): Promise<DataResponse<Category>> {
    throw new Error('Contentstack integration not yet implemented');
  }

  async getHubs(): Promise<DataResponse<Hub>> {
    throw new Error('Contentstack integration not yet implemented');
  }

  async getProductReviews(): Promise<DataResponse<ProductReview>> {
    throw new Error('Contentstack integration not yet implemented');
  }

  async getProductsByDestination(): Promise<DataResponse<Product>> {
    throw new Error('Contentstack integration not yet implemented');
  }

  async getProductsByCategory(): Promise<DataResponse<Product>> {
    throw new Error('Contentstack integration not yet implemented');
  }

  async getDestinationBySlug(): Promise<Destination | null> {
    throw new Error('Contentstack integration not yet implemented');
  }

  async getCategoryBySlug(): Promise<Category | null> {
    throw new Error('Contentstack integration not yet implemented');
  }

  async getProductById(): Promise<Product | null> {
    throw new Error('Contentstack integration not yet implemented');
  }
}

// Data Provider Factory
export class DataProviderFactory {
  static createMockProvider(): UnifiedDataProvider {
    return new MockDataProvider();
  }

  static createContentstackProvider(config: { 
    apiKey: string; 
    deliveryToken: string; 
    environment: string 
  }): UnifiedDataProvider {
    return new ContentstackDataProvider(config);
  }
}

// Global provider instance - easily switchable
export const dataProvider = DataProviderFactory.createMockProvider();

// Convenience export functions for easy use in components
export const getProducts = (filters?: any) => dataProvider.getProducts(filters);
export const getDestinations = () => dataProvider.getDestinations();
export const getCategories = () => dataProvider.getCategories();
export const getHubs = () => dataProvider.getHubs();
export const getProductReviews = (productId?: string) => dataProvider.getProductReviews(productId);
export const getProductsByDestination = (destination: string) => dataProvider.getProductsByDestination(destination);
export const getProductsByCategory = (category: string) => dataProvider.getProductsByCategory(category);
export const getDestinationBySlug = (slug: string) => dataProvider.getDestinationBySlug(slug);
export const getCategoryBySlug = (slug: string) => dataProvider.getCategoryBySlug(slug);
export const getProductById = (id: string) => dataProvider.getProductById(id);