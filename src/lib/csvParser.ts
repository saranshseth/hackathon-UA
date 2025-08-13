import { Product } from '@/types';

export function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  let i = 0;

  while (i < line.length) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i += 2;
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
        i++;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      result.push(current.trim());
      current = '';
      i++;
    } else {
      current += char;
      i++;
    }
  }
  
  // Add the last field
  result.push(current.trim());
  return result;
}

export function parseCSVData(csvData: string): Product[] {
  const lines = csvData.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];

  // Parse header to get column indices
  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());
  const products: Product[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length < headers.length) continue;

    try {
      const product = parseProductFromRow(headers, values);
      if (product) {
        products.push(product);
      }
    } catch (error) {
      console.warn(`Error parsing row ${i}:`, error);
    }
  }

  return products;
}

function parseProductFromRow(headers: string[], values: string[]): Product | null {
  const getValue = (key: string): string => {
    const index = headers.indexOf(key);
    return index >= 0 ? (values[index] || '').trim() : '';
  };

  const getNumericValue = (key: string): number => {
    const value = getValue(key);
    return value ? parseFloat(value.replace(/[^\d.-]/g, '')) || 0 : 0;
  };

  const getBooleanValue = (key: string): boolean => {
    const value = getValue(key).toLowerCase();
    return value === 'true' || value === '1' || value === 'yes';
  };

  const splitValue = (value: string, separator: string = '\n'): string[] => {
    return value ? value.split(separator).map(s => s.trim()).filter(s => s) : [];
  };

  const id = getValue('id');
  if (!id) return null;

  // Parse images
  const heroImage = getValue('hero image');
  const galleryImages = [
    getValue('image1'),
    getValue('image2'),
    getValue('image3'),
    getValue('image4'),
    getValue('image5'),
    getValue('image6'),
    getValue('image7'),
    getValue('image8'),
    getValue('image9')
  ].filter(img => img);

  // Parse highlights
  const highlights = splitValue(getValue('highlight'));

  // Parse inclusions and exclusions
  const inclusions = splitValue(getValue('inclusions'));
  const exclusions = splitValue(getValue('exclusions'));

  // Parse categories
  const categories = [
    getValue('category 1'),
    getValue('category 2'),
    getValue('category 3')
  ].filter(cat => cat);

  const product: Product = {
    id,
    name: getValue('name'),
    url: getValue('url'),
    slug: getValue('slug'),
    baseUrl: getValue('base url'),
    destination: {
      name: getValue('destination name'),
      country: getValue('destination country'),
      continent: getValue('destination continent')
    },
    duration: {
      hours: getNumericValue('duration-hours'),
      days: Math.ceil(getNumericValue('duration-hours') / 24)
    },
    isPrivate: getBooleanValue('private'),
    overview: getValue('overview'),
    highlights,
    inclusions,
    exclusions,
    meetingPoint: getValue('meeting point'),
    endPoint: getValue('end point'),
    moreInformation: getValue('more information'),
    localImpact: getValue('local impact'),
    pricing: {
      currency: getValue('currency') || 'AUD',
      adult: getNumericValue('adult'),
      child: getNumericValue('child'),
      infant: getNumericValue('infant')
    },
    categories,
    images: {
      hero: heroImage,
      gallery: galleryImages
    },
    tripadvisor: {
      url: getValue('trip advisor url'),
      rating: getNumericValue('trip advisor rating'),
      reviewCount: getNumericValue('trip advisor review count'),
      reviewLink: getValue('trip advisor review link'),
      recommendation: getValue('trip advisor recommendation'),
      description: getValue('trip advisor description'),
      freeCancellation: getBooleanValue('trip advisor free cancellation'),
      reservePayLater: getBooleanValue('trip advisor reserve pay later'),
      lowestPriceGuarantee: getBooleanValue('trip advisor lowest price guarantee'),
      highlights: splitValue(getValue('trip advisor highlights')),
      itinerary: getValue('trip advisor itinerary')
    },
    faq: {
      groupSize: getValue('faq-groupsize'),
      findingGuide: getValue('faq-finding-guide'),
      dietary: getValue('faq-dietary'),
      cancellations: getValue('faq-cancellations'),
      accessibility: getValue('faq-accessability'),
      walkingDistance: getValue('faq-walkingdistance'),
      childPolicy: getValue('faq-childpolicy'),
      importantInfo: getValue('faq-important info')
    }
  };

  return product;
}

// Utility functions for working with product data
export function filterProductsByDestination(products: Product[], destination: string): Product[] {
  const searchTerm = destination.toLowerCase();
  return products.filter(product => 
    product.destination.name.toLowerCase().includes(searchTerm) ||
    product.destination.country.toLowerCase().includes(searchTerm) ||
    product.destination.continent.toLowerCase().includes(searchTerm)
  );
}

export function filterProductsByCategory(products: Product[], category: string): Product[] {
  const searchTerm = category.toLowerCase();
  return products.filter(product =>
    product.categories.some(cat => cat.toLowerCase().includes(searchTerm))
  );
}

export function searchProducts(products: Product[], query: string): Product[] {
  const searchTerm = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.overview.toLowerCase().includes(searchTerm) ||
    product.destination.name.toLowerCase().includes(searchTerm) ||
    product.destination.country.toLowerCase().includes(searchTerm) ||
    product.highlights.some(highlight => highlight.toLowerCase().includes(searchTerm)) ||
    product.categories.some(category => category.toLowerCase().includes(searchTerm))
  );
}

export function convertProductToTrip(product: Product): any {
  // Convert Product interface to Trip interface for backward compatibility
  return {
    id: product.id,
    name: product.name,
    description: product.overview,
    shortDescription: product.highlights[0] || product.overview.substring(0, 100) + '...',
    price: product.pricing.adult,
    duration: product.duration.days || 1,
    location: {
      lat: 0, // Would need geocoding for actual coordinates
      lng: 0,
      country: product.destination.country,
      city: product.destination.name
    },
    tripType: product.categories,
    difficulty: 'Easy' as const,
    badges: [],
    images: [product.images.hero, ...product.images.gallery].filter(Boolean),
    availability: 'Available' as const,
    rating: product.tripadvisor.rating || 4.5,
    reviewCount: product.tripadvisor.reviewCount || 0,
    tags: product.categories,
    itinerary: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}