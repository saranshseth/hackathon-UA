import { 
  Destination, 
  Category, 
  Hub, 
  ProductReview, 
  ProductCategoryMapping,
  Product,
  DataResponse 
} from '@/types';
import { parseCSVLine } from './csvParser';

// Generic CSV parser utility
export function parseCSVToObjects<T>(
  csvData: string, 
  mapper: (headers: string[], values: string[]) => T | null
): T[] {
  const lines = csvData.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];

  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());
  const objects: T[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < headers.length) continue;

    try {
      const obj = mapper(headers, values);
      if (obj) {
        objects.push(obj);
      }
    } catch (error) {
      console.warn(`Error parsing row ${i}:`, error);
    }
  }

  return objects;
}

// Helper function to get value by column name
function getValue(headers: string[], values: string[], key: string): string {
  const index = headers.indexOf(key);
  return index >= 0 ? (values[index] || '').trim() : '';
}

function getNumericValue(headers: string[], values: string[], key: string): number {
  const value = getValue(headers, values, key);
  return value ? parseFloat(value.replace(/[^\d.-]/g, '')) || 0 : 0;
}

function getBooleanValue(headers: string[], values: string[], key: string): boolean {
  const value = getValue(headers, values, key).toLowerCase();
  return value === 'true' || value === '1' || value === 'yes';
}

// Destination CSV Parser
export function parseDestinations(csvData: string): Destination[] {
  return parseCSVToObjects<Destination>(csvData, (headers, values) => {
    const id = getValue(headers, values, 'id');
    if (!id) return null;

    return {
      id,
      name: getValue(headers, values, 'name'),
      url: getValue(headers, values, 'url'),
      slug: getValue(headers, values, 'slug'),
      type: getValue(headers, values, 'type') as 'City' | 'Region' | 'Country',
      country: getValue(headers, values, 'country'),
      continent: getValue(headers, values, 'continent'),
      description: getValue(headers, values, 'description'),
      video: getValue(headers, values, 'video') || undefined,
      heroImage: getValue(headers, values, 'heroimage'),
      tripadvisor: {
        url: getValue(headers, values, 'trip advisor url'),
        rating: getNumericValue(headers, values, 'trip advisor rating') || undefined,
        reviewTotal: getNumericValue(headers, values, 'trip advisor review total') || undefined,
        reviewUrl: getValue(headers, values, 'trip advisor review url') || undefined,
        description: getValue(headers, values, 'trip advisor description') || undefined
      }
    };
  });
}

// Category CSV Parser
export function parseCategories(csvData: string): Category[] {
  return parseCSVToObjects<Category>(csvData, (headers, values) => {
    const id = getValue(headers, values, 'id');
    if (!id) return null;

    return {
      id,
      name: getValue(headers, values, 'name'),
      url: getValue(headers, values, 'url'),
      slug: getValue(headers, values, 'slug'),
      description: getValue(headers, values, 'description') || undefined
    };
  });
}

// Hub CSV Parser
export function parseHubs(csvData: string): Hub[] {
  return parseCSVToObjects<Hub>(csvData, (headers, values) => {
    const id = getValue(headers, values, 'id');
    if (!id) return null;

    return {
      id,
      name: getValue(headers, values, 'name'),
      displayName: getValue(headers, values, '') || getValue(headers, values, 'name'), // Second column appears to be display name
      url: getValue(headers, values, 'url'),
      destination: getValue(headers, values, 'destination'),
      category: getValue(headers, values, 'category'),
      description: getValue(headers, values, 'description') || undefined
    };
  });
}

// Product Review CSV Parser
export function parseProductReviews(csvData: string): ProductReview[] {
  return parseCSVToObjects<ProductReview>(csvData, (headers, values) => {
    const productId = getValue(headers, values, 'product id');
    if (!productId) return null;

    return {
      id: getValue(headers, values, 'id') || undefined,
      productId,
      reviewSource: getValue(headers, values, 'review source') as ProductReview['reviewSource'],
      travellerName: getValue(headers, values, 'traveller name'),
      rating: getNumericValue(headers, values, 'rating'),
      ratingOutOf: getNumericValue(headers, values, 'rating out of'),
      title: getValue(headers, values, 'title'),
      body: getValue(headers, values, 'body'),
      travelledDate: getValue(headers, values, 'travelled date'),
      travellerType: getValue(headers, values, 'traveller type') as ProductReview['travellerType'],
      link: getValue(headers, values, 'link') || undefined,
      submittedDate: getValue(headers, values, 'submitted date'),
      fullReview: getValue(headers, values, 'full review') || undefined
    };
  });
}

// Product Category Mapping CSV Parser
export function parseProductCategoryMappings(csvData: string): ProductCategoryMapping[] {
  return parseCSVToObjects<ProductCategoryMapping>(csvData, (headers, values) => {
    const id = getValue(headers, values, 'id');
    if (!id) return null;

    return {
      id,
      code: getValue(headers, values, 'code'),
      name: getValue(headers, values, 'name'),
      sequence: getNumericValue(headers, values, 'seq'),
      productId: getValue(headers, values, '9326a53c-059f-488d-972a-e3c990820efc') || id, // This seems to be a product ID column
      categoryName: getValue(headers, values, 'name') // Assuming name is the category name
    };
  });
}

// TripAdvisor Reviews Parser (similar to ProductReviews but might have different structure)
export function parseTripAdvisorReviews(csvData: string): ProductReview[] {
  return parseProductReviews(csvData); // Reuse the same parser for now
}

// Unified data loader with caching
class DataCache {
  private cache = new Map<string, any>();
  private loadPromises = new Map<string, Promise<any>>();

  async loadCSV<T>(
    key: string,
    filePath: string,
    parser: (csvData: string) => T[]
  ): Promise<DataResponse<T>> {
    if (this.cache.has(key)) {
      const data = this.cache.get(key);
      return {
        data,
        meta: { total: data.length, count: data.length },
        source: 'csv'
      };
    }

    if (this.loadPromises.has(key)) {
      const data = await this.loadPromises.get(key);
      return {
        data,
        meta: { total: data.length, count: data.length },
        source: 'csv'
      };
    }

    const loadPromise = this.loadFromFile(filePath, parser);
    this.loadPromises.set(key, loadPromise);

    try {
      const data = await loadPromise;
      this.cache.set(key, data);
      this.loadPromises.delete(key);
      
      return {
        data,
        meta: { total: data.length, count: data.length },
        source: 'csv'
      };
    } catch (error) {
      this.loadPromises.delete(key);
      throw error;
    }
  }

  private async loadFromFile<T>(filePath: string, parser: (csvData: string) => T[]): Promise<T[]> {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
      }
      const csvData = await response.text();
      return parser(csvData);
    } catch (error) {
      console.error(`Error loading CSV from ${filePath}:`, error);
      return [];
    }
  }

  clearCache() {
    this.cache.clear();
    this.loadPromises.clear();
  }
}

// Global data cache instance
export const dataCache = new DataCache();

// CSV file paths (relative to public directory or src/csv)
export const CSV_PATHS = {
  destinations: '/csv/UA-destination.csv',
  categories: '/csv/UA-category.csv',
  hubs: '/csv/UA-Hub.csv',
  products: '/csv/UA-Product.csv',
  reviews: '/csv/UA-reviews.csv',
  tripadvisorReviews: '/csv/UA-tripadvisor-reviews.csv',
  categoryMappings: '/csv/UA-categoriesxhub.csv'
} as const;

// Contentstack-ready data loaders
export class DataService {
  // In the future, this will switch to Contentstack API calls
  async getDestinations(): Promise<DataResponse<Destination>> {
    return dataCache.loadCSV('destinations', CSV_PATHS.destinations, parseDestinations);
  }

  async getCategories(): Promise<DataResponse<Category>> {
    return dataCache.loadCSV('categories', CSV_PATHS.categories, parseCategories);
  }

  async getHubs(): Promise<DataResponse<Hub>> {
    return dataCache.loadCSV('hubs', CSV_PATHS.hubs, parseHubs);
  }

  async getProductReviews(): Promise<DataResponse<ProductReview>> {
    return dataCache.loadCSV('reviews', CSV_PATHS.reviews, parseProductReviews);
  }

  async getCategoryMappings(): Promise<DataResponse<ProductCategoryMapping>> {
    return dataCache.loadCSV('categoryMappings', CSV_PATHS.categoryMappings, parseProductCategoryMappings);
  }

  // Get related data
  async getDestinationBySlug(slug: string): Promise<Destination | null> {
    const response = await this.getDestinations();
    return response.data.find(dest => dest.slug === slug) || null;
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const response = await this.getCategories();
    return response.data.find(cat => cat.slug === slug) || null;
  }

  async getReviewsForProduct(productId: string): Promise<ProductReview[]> {
    const response = await this.getProductReviews();
    return response.data.filter(review => review.productId === productId);
  }

  async getHubsByDestination(destination: string): Promise<Hub[]> {
    const response = await this.getHubs();
    return response.data.filter(hub => hub.destination.toLowerCase() === destination.toLowerCase());
  }

  async getHubsByCategory(category: string): Promise<Hub[]> {
    const response = await this.getHubs();
    return response.data.filter(hub => hub.category.toLowerCase() === category.toLowerCase());
  }
}

// Global data service instance
export const dataService = new DataService();