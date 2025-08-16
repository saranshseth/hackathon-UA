import { EnhancedProduct, Destination, Category, Review } from './enhancedDataProvider';

// Contentstack content types interfaces
export interface ContentstackProduct {
  uid: string;
  title: string;
  url: string;
  slug: string;
  destination: {
    title: string;
    country: string;
    continent: string;
  };
  duration_hours: number;
  is_private: boolean;
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  base_currency: string;
  base_price: number;
  categories: {
    title: string;
    slug: string;
  }[];
  hero_image: {
    url: string;
    title: string;
  };
  gallery_images: {
    url: string;
    title: string;
  }[];
  rating: number;
  review_count: number;
  tripadvisor_url?: string;
  tripadvisor_rating?: number;
  tripadvisor_review_count?: number;
  created_at: string;
  updated_at: string;
  locale: string;
  tags: string[];
}

export interface ContentstackDestination {
  uid: string;
  title: string;
  url: string;
  slug: string;
  type: string;
  country: string;
  continent: string;
  description: string;
  hero_image: {
    url: string;
    title: string;
  };
  tripadvisor_url?: string;
  tripadvisor_rating?: number;
  tripadvisor_review_total?: number;
  created_at: string;
  updated_at: string;
  locale: string;
}

export interface ContentstackCategory {
  uid: string;
  title: string;
  slug: string;
  description: string;
  icon?: {
    url: string;
    title: string;
  };
  color_code?: string;
  created_at: string;
  updated_at: string;
  locale: string;
}

export interface ContentstackReview {
  uid: string;
  product: {
    uid: string;
    title: string;
  };
  reviewer_name: string;
  rating: number;
  title: string;
  content: string;
  review_date: string;
  traveller_type: string;
  verified: boolean;
  helpful_count: number;
  created_at: string;
  updated_at: string;
  locale: string;
}

// Data adapter to convert between CSV/Contentstack and our unified interface
export class UnifiedDataAdapter {
  
  // Convert Contentstack product to our enhanced product interface
  static contentstackToEnhancedProduct(csProduct: ContentstackProduct): EnhancedProduct {
    return {
      id: csProduct.uid,
      name: csProduct.title,
      slug: csProduct.slug,
      destinationName: csProduct.destination.title,
      destinationCountry: csProduct.destination.country,
      destinationContinent: csProduct.destination.continent,
      duration: this.formatDuration(csProduct.duration_hours),
      durationHours: csProduct.duration_hours,
      private: csProduct.is_private,
      overview: csProduct.overview,
      highlights: csProduct.highlights || [],
      inclusions: csProduct.inclusions || [],
      exclusions: csProduct.exclusions || [],
      currency: csProduct.base_currency || 'AUD',
      pricing: {
        adult: csProduct.base_price,
        child: Math.round(csProduct.base_price * 0.7),
        infant: Math.round(csProduct.base_price * 0.1),
      },
      categories: csProduct.categories?.map(cat => cat.title) || [],
      images: {
        hero: csProduct.hero_image?.url || '',
        gallery: csProduct.gallery_images?.map(img => img.url) || [],
      },
      rating: csProduct.rating || 4.5,
      reviewCount: csProduct.review_count || 0,
      tripAdvisorUrl: csProduct.tripadvisor_url,
      tripAdvisorRating: csProduct.tripadvisor_rating,
      tripAdvisorReviewCount: csProduct.tripadvisor_review_count,
    };
  }

  // Convert Contentstack destination to our destination interface
  static contentstackToDestination(csDestination: ContentstackDestination): Destination {
    return {
      id: csDestination.uid,
      name: csDestination.title,
      slug: csDestination.slug,
      type: csDestination.type,
      country: csDestination.country,
      continent: csDestination.continent,
      description: csDestination.description,
      heroImage: csDestination.hero_image?.url || '',
      tripAdvisorUrl: csDestination.tripadvisor_url,
      tripAdvisorRating: csDestination.tripadvisor_rating,
      tripAdvisorReviewTotal: csDestination.tripadvisor_review_total,
    };
  }

  // Convert Contentstack category to our category interface
  static contentstackToCategory(csCategory: ContentstackCategory): Category {
    return {
      id: csCategory.uid,
      name: csCategory.title,
      slug: csCategory.slug,
      description: csCategory.description,
    };
  }

  // Convert Contentstack review to our review interface
  static contentstackToReview(csReview: ContentstackReview): Review {
    return {
      id: csReview.uid,
      productId: csReview.product.uid,
      source: 'Contentstack',
      travellerName: csReview.reviewer_name,
      rating: csReview.rating,
      ratingOutOf: 5,
      title: csReview.title,
      body: csReview.content,
      travelledDate: csReview.review_date,
      travellerType: csReview.traveller_type,
      submittedDate: csReview.created_at,
    };
  }

  private static formatDuration(hours: number): string {
    if (hours <= 1) return '1 hour';
    if (hours < 2) return '1.5 hours';
    if (hours < 4) return `${Math.round(hours)} hours`;
    if (hours < 8) return `${Math.round(hours)} hours`;
    if (hours < 12) return `${Math.round(hours)} hours`;
    if (hours >= 12) return 'Full day';
    
    return `${Math.round(hours)} hours`;
  }
}

// Unified data provider that can work with both CSV and Contentstack
export class UnifiedDataProvider {
  private dataSource: 'csv' | 'contentstack' = 'csv';
  private contentstackConfig?: {
    apiKey: string;
    deliveryToken: string;
    environment: string;
    region?: string;
  };

  constructor(config?: {
    dataSource?: 'csv' | 'contentstack';
    contentstackConfig?: {
      apiKey: string;
      deliveryToken: string;
      environment: string;
      region?: string;
    };
  }) {
    this.dataSource = config?.dataSource || 'csv';
    this.contentstackConfig = config?.contentstackConfig;
  }

  async getAllProducts(): Promise<EnhancedProduct[]> {
    if (this.dataSource === 'contentstack') {
      return this.getProductsFromContentstack();
    } else {
      // Import CSV data provider dynamically to avoid issues in browser
      const { enhancedDataProvider } = await import('./enhancedDataProvider');
      return enhancedDataProvider.getAllProducts();
    }
  }

  async getProductsByDestination(destinationName: string): Promise<EnhancedProduct[]> {
    if (this.dataSource === 'contentstack') {
      return this.getProductsFromContentstack({ destination: destinationName });
    } else {
      const { enhancedDataProvider } = await import('./enhancedDataProvider');
      return enhancedDataProvider.getProductsByDestination(destinationName);
    }
  }

  async getProductsByCategory(categoryName: string): Promise<EnhancedProduct[]> {
    if (this.dataSource === 'contentstack') {
      return this.getProductsFromContentstack({ category: categoryName });
    } else {
      const { enhancedDataProvider } = await import('./enhancedDataProvider');
      return enhancedDataProvider.getProductsByCategory(categoryName);
    }
  }

  async getFeaturedProducts(limit: number = 12): Promise<EnhancedProduct[]> {
    if (this.dataSource === 'contentstack') {
      return this.getProductsFromContentstack({ featured: true, limit });
    } else {
      const { enhancedDataProvider } = await import('./enhancedDataProvider');
      return enhancedDataProvider.getFeaturedProducts(limit);
    }
  }

  async getAllDestinations(): Promise<Destination[]> {
    if (this.dataSource === 'contentstack') {
      return this.getDestinationsFromContentstack();
    } else {
      const { enhancedDataProvider } = await import('./enhancedDataProvider');
      return enhancedDataProvider.getAllDestinations();
    }
  }

  async getAllCategories(): Promise<Category[]> {
    if (this.dataSource === 'contentstack') {
      return this.getCategoriesFromContentstack();
    } else {
      const { enhancedDataProvider } = await import('./enhancedDataProvider');
      return enhancedDataProvider.getAllCategories();
    }
  }

  async searchProducts(query: string): Promise<EnhancedProduct[]> {
    if (this.dataSource === 'contentstack') {
      return this.searchProductsInContentstack(query);
    } else {
      const { enhancedDataProvider } = await import('./enhancedDataProvider');
      return enhancedDataProvider.searchProducts(query);
    }
  }

  // Contentstack-specific methods
  private async getProductsFromContentstack(filters?: {
    destination?: string;
    category?: string;
    featured?: boolean;
    limit?: number;
  }): Promise<EnhancedProduct[]> {
    if (!this.contentstackConfig) {
      throw new Error('Contentstack configuration not provided');
    }

    try {
      // This would be replaced with actual Contentstack SDK calls
      const response = await this.makeContentstackRequest('content_types/products/entries', {
        include_count: true,
        ...filters,
      });

      return response.entries.map((entry: ContentstackProduct) => 
        UnifiedDataAdapter.contentstackToEnhancedProduct(entry)
      );
    } catch (error) {
      console.error('Error fetching products from Contentstack:', error);
      // Fallback to CSV data
      const { enhancedDataProvider } = await import('./enhancedDataProvider');
      return enhancedDataProvider.getAllProducts();
    }
  }

  private async getDestinationsFromContentstack(): Promise<Destination[]> {
    if (!this.contentstackConfig) {
      throw new Error('Contentstack configuration not provided');
    }

    try {
      const response = await this.makeContentstackRequest('content_types/destinations/entries');
      
      return response.entries.map((entry: ContentstackDestination) => 
        UnifiedDataAdapter.contentstackToDestination(entry)
      );
    } catch (error) {
      console.error('Error fetching destinations from Contentstack:', error);
      const { enhancedDataProvider } = await import('./enhancedDataProvider');
      return enhancedDataProvider.getAllDestinations();
    }
  }

  private async getCategoriesFromContentstack(): Promise<Category[]> {
    if (!this.contentstackConfig) {
      throw new Error('Contentstack configuration not provided');
    }

    try {
      const response = await this.makeContentstackRequest('content_types/categories/entries');
      
      return response.entries.map((entry: ContentstackCategory) => 
        UnifiedDataAdapter.contentstackToCategory(entry)
      );
    } catch (error) {
      console.error('Error fetching categories from Contentstack:', error);
      const { enhancedDataProvider } = await import('./enhancedDataProvider');
      return enhancedDataProvider.getAllCategories();
    }
  }

  private async searchProductsInContentstack(query: string): Promise<EnhancedProduct[]> {
    if (!this.contentstackConfig) {
      throw new Error('Contentstack configuration not provided');
    }

    try {
      const response = await this.makeContentstackRequest('content_types/products/entries', {
        query: {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { overview: { $regex: query, $options: 'i' } },
            { 'destination.title': { $regex: query, $options: 'i' } },
          ]
        }
      });

      return response.entries.map((entry: ContentstackProduct) => 
        UnifiedDataAdapter.contentstackToEnhancedProduct(entry)
      );
    } catch (error) {
      console.error('Error searching products in Contentstack:', error);
      const { enhancedDataProvider } = await import('./enhancedDataProvider');
      return enhancedDataProvider.searchProducts(query);
    }
  }

  private async makeContentstackRequest(endpoint: string, params?: any): Promise<any> {
    if (!this.contentstackConfig) {
      throw new Error('Contentstack configuration not provided');
    }

    const { apiKey, deliveryToken, environment, region = 'us' } = this.contentstackConfig;
    const baseUrl = `https://${region === 'eu' ? 'eu-' : ''}cdn.contentstack.io/v3`;
    
    const url = new URL(`${baseUrl}/stacks/${apiKey}/${endpoint}`);
    
    // Add query parameters
    if (params) {
      Object.keys(params).forEach(key => {
        if (typeof params[key] === 'object') {
          url.searchParams.append(key, JSON.stringify(params[key]));
        } else {
          url.searchParams.append(key, params[key]);
        }
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        'api_key': apiKey,
        'access_token': deliveryToken,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Contentstack API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

// Environment-based data provider factory
export function createDataProvider(): UnifiedDataProvider {
  // Check if we have Contentstack environment variables
  const contentstackConfig = {
    apiKey: process.env.CONTENTSTACK_API_KEY,
    deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    environment: process.env.CONTENTSTACK_ENVIRONMENT || 'production',
    region: process.env.CONTENTSTACK_REGION || 'us',
  };

  const hasContentstackConfig = contentstackConfig.apiKey && contentstackConfig.deliveryToken;

  return new UnifiedDataProvider({
    dataSource: hasContentstackConfig ? 'contentstack' : 'csv',
    contentstackConfig: hasContentstackConfig ? {
      apiKey: contentstackConfig.apiKey!,
      deliveryToken: contentstackConfig.deliveryToken!,
      environment: contentstackConfig.environment,
      region: contentstackConfig.region,
    } : undefined,
  });
}

export const unifiedDataProvider = createDataProvider();