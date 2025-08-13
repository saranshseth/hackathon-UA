import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

export interface EnhancedProduct {
  id: string;
  name: string;
  slug: string;
  destinationName: string;
  destinationCountry: string;
  destinationContinent: string;
  duration: string;
  durationHours: number;
  private: boolean;
  overview: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  currency: string;
  pricing: {
    adult: number;
    child: number;
    infant: number;
  };
  categories: string[];
  images: {
    hero: string;
    gallery: string[];
  };
  rating: number;
  reviewCount: number;
  tripAdvisorUrl?: string;
  tripAdvisorRating?: number;
  tripAdvisorReviewCount?: number;
  popular?: boolean;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  type: string;
  country: string;
  continent: string;
  description: string;
  heroImage: string;
  tripAdvisorUrl?: string;
  tripAdvisorRating?: number;
  tripAdvisorReviewTotal?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Review {
  id: string;
  productId: string;
  source: string;
  travellerName: string;
  rating: number;
  ratingOutOf: number;
  title: string;
  body: string;
  travelledDate: string;
  travellerType: string;
  submittedDate: string;
}

// Intelligent pricing system based on various factors
class IntelligentPricingEngine {
  private baseFactors = {
    destination: {
      'Europe': 1.3,
      'Asia': 0.8,
      'Oceania': 1.1,
      'Africa': 0.9,
      'North America': 1.2,
      'South America': 0.7,
    },
    category: {
      'Private': 2.5,
      'Food & Drink': 1.2,
      'Active': 1.4,
      'City Highlights': 1.0,
      'Art & Culture & History': 1.1,
      'Off The Beaten Path': 1.3,
      'Social Impact': 0.9,
    },
    duration: {
      short: 0.8,   // 2-4 hours
      medium: 1.0,  // 4-8 hours
      long: 1.5,    // 8+ hours
      fullDay: 1.8, // 12+ hours
    },
    rating: {
      excellent: 1.2,  // 4.5+
      good: 1.0,       // 4.0-4.4
      average: 0.9,    // 3.5-3.9
      poor: 0.8,       // <3.5
    }
  };

  calculatePrice(product: any): { adult: number; child: number; infant: number } {
    // Base price calculation
    let basePrice = this.getBasePriceByDestination(product.destinationCountry);
    
    // Apply continental factor
    const continentFactor = this.baseFactors.destination[product.destinationContinent] || 1.0;
    basePrice *= continentFactor;
    
    // Apply category factors
    const categories = [product['Category 1'], product['Category 2'], product['Category 3']].filter(Boolean);
    const categoryFactor = this.getCategoryFactor(categories);
    basePrice *= categoryFactor;
    
    // Apply duration factor
    const durationFactor = this.getDurationFactor(product['duration-hours']);
    basePrice *= durationFactor;
    
    // Apply rating factor if available
    const ratingFactor = this.getRatingFactor(product['trip advisor rating']);
    basePrice *= ratingFactor;
    
    // Apply private tour premium
    if (product.private === 'TRUE' || product.private === true) {
      basePrice *= this.baseFactors.category['Private'];
    }
    
    // Round to reasonable price points
    const adultPrice = Math.round(basePrice / 10) * 10;
    const childPrice = Math.round(adultPrice * 0.7 / 10) * 10;
    const infantPrice = Math.round(adultPrice * 0.1 / 10) * 10;
    
    return {
      adult: adultPrice,
      child: childPrice,
      infant: infantPrice,
    };
  }

  private getBasePriceByDestination(country: string): number {
    const countryPricing: Record<string, number> = {
      'Australia': 450,
      'Greece': 180,
      'Spain': 200,
      'Romania': 120,
      'Croatia': 160,
      'Italy': 220,
      'United Kingdom': 280,
      'France': 250,
      'Austria': 200,
      'Indonesia': 80,
      'Egypt': 60,
      'Thailand': 70,
      'Vietnam': 65,
      'Japan': 300,
      'Singapore': 150,
      'Malaysia': 90,
      'Philippines': 85,
      'India': 55,
      'Nepal': 50,
      'Sri Lanka': 60,
      'Myanmar': 65,
      'Cambodia': 70,
      'Laos': 75,
      'China': 120,
      'South Korea': 180,
      'Taiwan': 140,
      'Hong Kong': 200,
      'Macau': 180,
      'Turkey': 100,
      'Israel': 200,
      'Jordan': 150,
      'UAE': 250,
      'Morocco': 90,
      'South Africa': 120,
      'Kenya': 180,
      'Tanzania': 200,
      'Madagascar': 130,
      'USA': 320,
      'Canada': 280,
      'Mexico': 140,
      'Brazil': 160,
      'Argentina': 150,
      'Chile': 180,
      'Peru': 120,
      'Colombia': 110,
      'Ecuador': 100,
      'Bolivia': 90,
      'Uruguay': 140,
      'Costa Rica': 160,
      'Guatemala': 120,
      'Panama': 140,
      'Nicaragua': 100,
      'Belize': 180,
      'Honduras': 110,
      'El Salvador': 100,
    };
    
    return countryPricing[country] || 150; // Default price
  }

  private getCategoryFactor(categories: string[]): number {
    if (!categories.length) return 1.0;
    
    let factor = 1.0;
    categories.forEach(category => {
      const categoryFactor = this.baseFactors.category[category];
      if (categoryFactor) {
        factor *= categoryFactor;
      }
    });
    
    // Normalize if multiple categories
    return Math.pow(factor, 1 / categories.length);
  }

  private getDurationFactor(hours: number | string): number {
    const hoursNum = typeof hours === 'string' ? parseFloat(hours) : hours;
    
    if (hoursNum <= 4) return this.baseFactors.duration.short;
    if (hoursNum <= 8) return this.baseFactors.duration.medium;
    if (hoursNum <= 12) return this.baseFactors.duration.long;
    return this.baseFactors.duration.fullDay;
  }

  private getRatingFactor(rating: number | string): number {
    if (!rating) return 1.0;
    
    const ratingNum = typeof rating === 'string' ? parseFloat(rating) : rating;
    
    if (ratingNum >= 4.5) return this.baseFactors.rating.excellent;
    if (ratingNum >= 4.0) return this.baseFactors.rating.good;
    if (ratingNum >= 3.5) return this.baseFactors.rating.average;
    return this.baseFactors.rating.poor;
  }
}

// Image mapping system for relevant product images
class ImageProvider {
  private destinationImages: Record<string, string[]> = {
    'Melbourne': [
      'https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=800&h=600&fit=crop', // Melbourne city
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', // Melbourne laneways
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', // Street art
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop', // Coffee culture
      'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&h=600&fit=crop', // Food scene
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop', // Markets
    ],
    'Kangaroo Island': [
      'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=600&fit=crop', // Wildlife
      'https://images.unsplash.com/photo-1551041777-7a85d2e5aa3c?w=800&h=600&fit=crop', // Kangaroos
      'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=600&fit=crop', // Nature
      'https://images.unsplash.com/photo-1502780402662-acc01917fb52?w=800&h=600&fit=crop', // Seals
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', // Landscape
    ],
    'Athens': [
      'https://images.unsplash.com/photo-1555993539-1732b0258df5?w=800&h=600&fit=crop', // Acropolis
      'https://images.unsplash.com/photo-1601158935942-52dd47e19369?w=800&h=600&fit=crop', // Ancient ruins
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop', // Greek food
      'https://images.unsplash.com/photo-1572448862527-d3c904757de6?w=800&h=600&fit=crop', // Athens streets
    ],
    'Barcelona': [
      'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=800&h=600&fit=crop', // Sagrada Familia
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=600&fit=crop', // Park Güell
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=600&fit=crop', // Barcelona streets
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop', // Spanish food
    ],
    'Paris': [
      'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop', // Eiffel Tower
      'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800&h=600&fit=crop', // Paris streets
      'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800&h=600&fit=crop', // French pastries
      'https://images.unsplash.com/photo-1545998178-3e35a6a6c05d?w=800&h=600&fit=crop', // Louvre
    ],
    'London': [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop', // Big Ben
      'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800&h=600&fit=crop', // London Eye
      'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&h=600&fit=crop', // London streets
      'https://images.unsplash.com/photo-1504680933434-a4c1c2d48493?w=800&h=600&fit=crop', // British pub
    ],
    'Florence': [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', // Florence skyline
      'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop', // Duomo
      'https://images.unsplash.com/photo-1566665451-8b5e8c30b953?w=800&h=600&fit=crop', // Italian food
      'https://images.unsplash.com/photo-1540599989618-7c0111b7e906?w=800&h=600&fit=crop', // Tuscan countryside
    ],
    'Venice': [
      'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&h=600&fit=crop', // Venice canals
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop', // Gondolas
      'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=800&h=600&fit=crop', // St. Mark's Square
      'https://images.unsplash.com/photo-1455275942112-63e281a1a12b?w=800&h=600&fit=crop', // Venice architecture
    ],
    'Vienna': [
      'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&h=600&fit=crop', // Schönbrunn Palace
      'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=800&h=600&fit=crop', // Vienna architecture
      'https://images.unsplash.com/photo-1578915629189-d0feeb0daf83?w=800&h=600&fit=crop', // Coffee culture
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop', // Austrian food
    ],
    'Bali': [
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop', // Bali temples
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&h=600&fit=crop', // Rice terraces
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', // Bali beaches
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop', // Indonesian food
    ],
  };

  private categoryImages: Record<string, string[]> = {
    'Food & Drink': [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=800&h=600&fit=crop',
    ],
    'Active': [
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1567173829008-2a0b9b8b29b0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=800&h=600&fit=crop',
    ],
    'Art & Culture & History': [
      'https://images.unsplash.com/photo-1568394748913-d4eb4bf3bb88?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566665451-8b5e8c30b953?w=800&h=600&fit=crop',
    ],
  };

  getProductImages(product: any): { hero: string; gallery: string[] } {
    const destination = product.destinationName || product['destination name'];
    const categories = [product['Category 1'], product['Category 2'], product['Category 3']].filter(Boolean);
    
    // Start with existing images if available
    let images: string[] = [];
    
    if (product['Hero Image']) {
      images.push(product['Hero Image']);
    }
    
    // Add additional images from CSV
    for (let i = 1; i <= 9; i++) {
      const img = product[`Image${i}`];
      if (img && img.trim()) {
        images.push(img);
      }
    }
    
    // If we don't have enough images, add relevant ones
    if (images.length < 4) {
      // Add destination-specific images
      const destImages = this.destinationImages[destination] || [];
      images.push(...destImages.slice(0, 3));
      
      // Add category-specific images
      categories.forEach(category => {
        const catImages = this.categoryImages[category] || [];
        images.push(...catImages.slice(0, 2));
      });
    }
    
    // Remove duplicates and ensure we have at least one image
    images = [...new Set(images)];
    
    if (images.length === 0) {
      // Fallback image
      images.push('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop');
    }
    
    return {
      hero: images[0],
      gallery: images.slice(1, 6), // Up to 5 additional images
    };
  }
}

export class EnhancedDataProvider {
  private pricingEngine = new IntelligentPricingEngine();
  private imageProvider = new ImageProvider();
  private products: EnhancedProduct[] = [];
  private destinations: Destination[] = [];
  private categories: Category[] = [];
  private reviews: Review[] = [];

  constructor() {
    this.loadData();
  }

  private loadData() {
    try {
      // Load products
      const productsPath = path.join(process.cwd(), 'src/csv/UA-Product.csv');
      if (fs.existsSync(productsPath)) {
        const productsContent = fs.readFileSync(productsPath, 'utf-8');
        const rawProducts = parse(productsContent, { columns: true, skip_empty_lines: true });
        this.products = this.transformProducts(rawProducts);
      }

      // Load destinations
      const destinationsPath = path.join(process.cwd(), 'src/csv/UA-destination.csv');
      if (fs.existsSync(destinationsPath)) {
        const destinationsContent = fs.readFileSync(destinationsPath, 'utf-8');
        const rawDestinations = parse(destinationsContent, { columns: true, skip_empty_lines: true });
        this.destinations = this.transformDestinations(rawDestinations);
      }

      // Load categories
      const categoriesPath = path.join(process.cwd(), 'src/csv/UA-category.csv');
      if (fs.existsSync(categoriesPath)) {
        const categoriesContent = fs.readFileSync(categoriesPath, 'utf-8');
        const rawCategories = parse(categoriesContent, { columns: true, skip_empty_lines: true });
        this.categories = this.transformCategories(rawCategories);
      }

      // Load reviews
      const reviewsPath = path.join(process.cwd(), 'src/csv/UA-reviews.csv');
      if (fs.existsSync(reviewsPath)) {
        const reviewsContent = fs.readFileSync(reviewsPath, 'utf-8');
        const rawReviews = parse(reviewsContent, { columns: true, skip_empty_lines: true });
        this.reviews = this.transformReviews(rawReviews);
      }
    } catch (error) {
      console.warn('Error loading CSV data:', error);
      // Continue with empty data sets
    }
  }

  private transformProducts(rawProducts: any[]): EnhancedProduct[] {
    return rawProducts.map(product => {
      const pricing = this.pricingEngine.calculatePrice(product);
      const images = this.imageProvider.getProductImages(product);
      const highlights = product.highlight ? product.highlight.split('\n').filter(Boolean) : [];
      const inclusions = product.inclusions ? product.inclusions.split('\n').filter(Boolean) : [];
      const exclusions = product.exclusions ? product.exclusions.split('\n').filter(Boolean) : [];
      const categories = [product['Category 1'], product['Category 2'], product['Category 3']].filter(Boolean);
      const rating = parseFloat(product['trip advisor rating']) || 4.5;
      const reviewCount = parseInt(product['trip advisor review count']) || 0;
      
      // Determine if tour is popular based on rating and review count
      const popular = rating >= 4.4 && reviewCount >= 30;

      return {
        id: product.id,
        name: product.Name || product.name,
        slug: product.slug,
        destinationName: product['destination name'],
        destinationCountry: product['destination country'],
        destinationContinent: product['destination continent'],
        duration: this.formatDuration(product['duration-hours']),
        durationHours: parseFloat(product['duration-hours']) || 0,
        private: product.private === 'TRUE' || product.private === true,
        overview: product.overview || '',
        highlights,
        inclusions,
        exclusions,
        currency: product.Currency || 'AUD',
        pricing,
        categories,
        images,
        rating,
        reviewCount,
        tripAdvisorUrl: product['trip advisor URL'],
        tripAdvisorRating: parseFloat(product['trip advisor rating']),
        tripAdvisorReviewCount: parseInt(product['trip advisor review count']),
        popular,
      };
    });
  }

  private transformDestinations(rawDestinations: any[]): Destination[] {
    return rawDestinations.map(dest => ({
      id: dest.id,
      name: dest.name,
      slug: dest.slug,
      type: dest.type,
      country: dest.country,
      continent: dest.continent,
      description: dest.description || '',
      heroImage: dest.heroimage || '',
      tripAdvisorUrl: dest['trip advisor URL'],
      tripAdvisorRating: parseFloat(dest['trip advisor rating']),
      tripAdvisorReviewTotal: parseInt(dest['trip advisor review total']),
    }));
  }

  private transformCategories(rawCategories: any[]): Category[] {
    return rawCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
    }));
  }

  private transformReviews(rawReviews: any[]): Review[] {
    return rawReviews.map(review => ({
      id: review.id || Math.random().toString(36),
      productId: review['product id'],
      source: review['review source'],
      travellerName: review['traveller name'],
      rating: parseInt(review.rating) || 5,
      ratingOutOf: parseInt(review['rating out of']) || 5,
      title: review.title || '',
      body: review.body || '',
      travelledDate: review['travelled date'] || '',
      travellerType: review['traveller type'] || '',
      submittedDate: review['submitted date'] || '',
    }));
  }

  private formatDuration(hours: string | number): string {
    const hoursNum = typeof hours === 'string' ? parseFloat(hours) : hours;
    
    if (hoursNum <= 1) return '1 hour';
    if (hoursNum < 2) return '1.5 hours';
    if (hoursNum < 4) return `${Math.round(hoursNum)} hours`;
    if (hoursNum < 8) return `${Math.round(hoursNum)} hours`;
    if (hoursNum < 12) return `${Math.round(hoursNum)} hours`;
    if (hoursNum >= 12) return 'Full day';
    
    return `${Math.round(hoursNum)} hours`;
  }

  // Public API methods
  getAllProducts(): EnhancedProduct[] {
    return this.products;
  }

  getProductsByDestination(destinationName: string): EnhancedProduct[] {
    return this.products.filter(p => 
      p.destinationName.toLowerCase().includes(destinationName.toLowerCase())
    );
  }

  getProductsByCategory(categoryName: string): EnhancedProduct[] {
    return this.products.filter(p => 
      p.categories.some(cat => cat.toLowerCase().includes(categoryName.toLowerCase()))
    );
  }

  getFeaturedProducts(limit: number = 12): EnhancedProduct[] {
    return this.products
      .sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount))
      .slice(0, limit);
  }

  getPopularProducts(limit: number = 8): EnhancedProduct[] {
    return this.products
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, limit);
  }

  getAllDestinations(): Destination[] {
    return this.destinations;
  }

  getAllCategories(): Category[] {
    return this.categories;
  }

  getReviewsForProduct(productId: string): Review[] {
    return this.reviews.filter(r => r.productId === productId);
  }

  searchProducts(query: string): EnhancedProduct[] {
    const searchTerm = query.toLowerCase();
    return this.products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.destinationName.toLowerCase().includes(searchTerm) ||
      p.overview.toLowerCase().includes(searchTerm) ||
      p.categories.some(cat => cat.toLowerCase().includes(searchTerm))
    );
  }
}

export const enhancedDataProvider = new EnhancedDataProvider();