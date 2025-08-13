import { 
  Product, 
  Destination, 
  Category, 
  Hub, 
  ProductReview, 
  DataResponse 
} from '@/types';
import { dataService } from './csvParsers';
import { sampleProducts } from './productData';

// Data source configuration
type DataSource = 'csv' | 'contentstack' | 'mock';

interface DataProviderConfig {
  source: DataSource;
  contentstackConfig?: {
    apiKey: string;
    deliveryToken: string;
    environment: string;
  };
}

// Abstract data provider interface
export interface IDataProvider {
  getProducts(filters?: ProductFilters): Promise<DataResponse<Product>>;
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

export interface ProductFilters {
  destination?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  duration?: number;
  isPrivate?: boolean;
  rating?: number;
  search?: string;
}

// CSV Data Provider
class CSVDataProvider implements IDataProvider {
  async getProducts(filters?: ProductFilters): Promise<DataResponse<Product>> {
    // For now, use sample products until CSV is moved to public folder
    let products = [...sampleProducts];
    
    if (filters) {
      products = this.applyFilters(products, filters);
    }

    return {
      data: products,
      meta: { total: products.length, count: products.length },
      source: 'csv'
    };
  }

  async getDestinations(): Promise<DataResponse<Destination>> {
    return await dataService.getDestinations();
  }

  async getCategories(): Promise<DataResponse<Category>> {
    return await dataService.getCategories();
  }

  async getHubs(): Promise<DataResponse<Hub>> {
    return await dataService.getHubs();
  }

  async getProductReviews(productId?: string): Promise<DataResponse<ProductReview>> {
    const allReviews = await dataService.getProductReviews();
    
    if (productId) {
      const filteredReviews = allReviews.data.filter(review => review.productId === productId);
      return {
        data: filteredReviews,
        meta: { total: filteredReviews.length, count: filteredReviews.length },
        source: allReviews.source
      };
    }

    return allReviews;
  }

  async getProductsByDestination(destination: string): Promise<DataResponse<Product>> {
    const allProducts = await this.getProducts();
    const filtered = allProducts.data.filter(product => 
      product.destination.name.toLowerCase().includes(destination.toLowerCase()) ||
      product.destination.country.toLowerCase().includes(destination.toLowerCase())
    );

    return {
      data: filtered,
      meta: { total: filtered.length, count: filtered.length },
      source: allProducts.source
    };
  }

  async getProductsByCategory(category: string): Promise<DataResponse<Product>> {
    const allProducts = await this.getProducts();
    const filtered = allProducts.data.filter(product =>
      product.categories.some(cat => cat.toLowerCase().includes(category.toLowerCase()))
    );

    return {
      data: filtered,
      meta: { total: filtered.length, count: filtered.length },
      source: allProducts.source
    };
  }

  async getDestinationBySlug(slug: string): Promise<Destination | null> {
    return await dataService.getDestinationBySlug(slug);
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return await dataService.getCategoryBySlug(slug);
  }

  async getProductById(id: string): Promise<Product | null> {
    const allProducts = await this.getProducts();
    return allProducts.data.find(product => product.id === id) || null;
  }

  private applyFilters(products: Product[], filters: ProductFilters): Product[] {
    return products.filter(product => {
      if (filters.destination) {
        const destMatch = product.destination.name.toLowerCase().includes(filters.destination.toLowerCase()) ||
                         product.destination.country.toLowerCase().includes(filters.destination.toLowerCase());
        if (!destMatch) return false;
      }

      if (filters.category) {
        const catMatch = product.categories.some(cat => 
          cat.toLowerCase().includes(filters.category!.toLowerCase())
        );
        if (!catMatch) return false;
      }

      if (filters.priceMin !== undefined && product.pricing.adult < filters.priceMin) {
        return false;
      }

      if (filters.priceMax !== undefined && product.pricing.adult > filters.priceMax) {
        return false;
      }

      if (filters.duration !== undefined && product.duration.hours !== filters.duration) {
        return false;
      }

      if (filters.isPrivate !== undefined && product.isPrivate !== filters.isPrivate) {
        return false;
      }

      if (filters.rating !== undefined && product.tripadvisor.rating < filters.rating) {
        return false;
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchMatch = product.name.toLowerCase().includes(searchTerm) ||
                           product.overview.toLowerCase().includes(searchTerm) ||
                           product.destination.name.toLowerCase().includes(searchTerm) ||
                           product.highlights.some(h => h.toLowerCase().includes(searchTerm));
        if (!searchMatch) return false;
      }

      return true;
    });
  }
}

// Contentstack Data Provider (for future implementation)
class ContentstackDataProvider implements IDataProvider {
  private config: DataProviderConfig['contentstackConfig'];

  constructor(config: DataProviderConfig['contentstackConfig']) {
    this.config = config;
  }

  async getProducts(filters?: ProductFilters): Promise<DataResponse<Product>> {
    // Future Contentstack implementation
    throw new Error('Contentstack provider not yet implemented');
  }

  async getDestinations(): Promise<DataResponse<Destination>> {
    // Future Contentstack implementation
    throw new Error('Contentstack provider not yet implemented');
  }

  async getCategories(): Promise<DataResponse<Category>> {
    // Future Contentstack implementation
    throw new Error('Contentstack provider not yet implemented');
  }

  async getHubs(): Promise<DataResponse<Hub>> {
    // Future Contentstack implementation
    throw new Error('Contentstack provider not yet implemented');
  }

  async getProductReviews(productId?: string): Promise<DataResponse<ProductReview>> {
    // Future Contentstack implementation
    throw new Error('Contentstack provider not yet implemented');
  }

  async getProductsByDestination(destination: string): Promise<DataResponse<Product>> {
    // Future Contentstack implementation
    throw new Error('Contentstack provider not yet implemented');
  }

  async getProductsByCategory(category: string): Promise<DataResponse<Product>> {
    // Future Contentstack implementation
    throw new Error('Contentstack provider not yet implemented');
  }

  async getDestinationBySlug(slug: string): Promise<Destination | null> {
    // Future Contentstack implementation
    throw new Error('Contentstack provider not yet implemented');
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    // Future Contentstack implementation
    throw new Error('Contentstack provider not yet implemented');
  }

  async getProductById(id: string): Promise<Product | null> {
    // Future Contentstack implementation
    throw new Error('Contentstack provider not yet implemented');
  }
}

// Mock Data Provider (for testing)
class MockDataProvider implements IDataProvider {
  async getProducts(filters?: ProductFilters): Promise<DataResponse<Product>> {
    return {
      data: sampleProducts,
      meta: { total: sampleProducts.length, count: sampleProducts.length },
      source: 'csv'
    };
  }

  async getDestinations(): Promise<DataResponse<Destination>> {
    return {
      data: [],
      meta: { total: 0, count: 0 },
      source: 'csv'
    };
  }

  async getCategories(): Promise<DataResponse<Category>> {
    return {
      data: [],
      meta: { total: 0, count: 0 },
      source: 'csv'
    };
  }

  async getHubs(): Promise<DataResponse<Hub>> {
    return {
      data: [],
      meta: { total: 0, count: 0 },
      source: 'csv'
    };
  }

  async getProductReviews(): Promise<DataResponse<ProductReview>> {
    return {
      data: [],
      meta: { total: 0, count: 0 },
      source: 'csv'
    };
  }

  async getProductsByDestination(destination: string): Promise<DataResponse<Product>> {
    const filtered = sampleProducts.filter(p => 
      p.destination.name.toLowerCase().includes(destination.toLowerCase())
    );
    return {
      data: filtered,
      meta: { total: filtered.length, count: filtered.length },
      source: 'csv'
    };
  }

  async getProductsByCategory(category: string): Promise<DataResponse<Product>> {
    const filtered = sampleProducts.filter(p => 
      p.categories.some(c => c.toLowerCase().includes(category.toLowerCase()))
    );
    return {
      data: filtered,
      meta: { total: filtered.length, count: filtered.length },
      source: 'csv'
    };
  }

  async getDestinationBySlug(slug: string): Promise<Destination | null> {
    return null;
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return null;
  }

  async getProductById(id: string): Promise<Product | null> {
    return sampleProducts.find(p => p.id === id) || null;
  }
}

// Data Provider Factory
export class DataProviderFactory {
  static create(config: DataProviderConfig): IDataProvider {
    switch (config.source) {
      case 'csv':
        return new CSVDataProvider();
      case 'contentstack':
        return new ContentstackDataProvider(config.contentstackConfig);
      case 'mock':
        return new MockDataProvider();
      default:
        throw new Error(`Unknown data source: ${config.source}`);
    }
  }
}

// Global data provider instance
const defaultConfig: DataProviderConfig = {
  source: 'csv' // Will change to 'contentstack' in the future
};

export const dataProvider = DataProviderFactory.create(defaultConfig);

// Convenience functions for easy migration
export const getProducts = (filters?: ProductFilters) => dataProvider.getProducts(filters);
export const getDestinations = () => dataProvider.getDestinations();
export const getCategories = () => dataProvider.getCategories();
export const getHubs = () => dataProvider.getHubs();
export const getProductReviews = (productId?: string) => dataProvider.getProductReviews(productId);
export const getProductsByDestination = (destination: string) => dataProvider.getProductsByDestination(destination);
export const getProductsByCategory = (category: string) => dataProvider.getProductsByCategory(category);
export const getDestinationBySlug = (slug: string) => dataProvider.getDestinationBySlug(slug);
export const getCategoryBySlug = (slug: string) => dataProvider.getCategoryBySlug(slug);
export const getProductById = (id: string) => dataProvider.getProductById(id);