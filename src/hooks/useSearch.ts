import { useState, useEffect } from 'react';
import { debounce } from '@/utils';
import { sampleProducts } from '@/lib/productData';

interface SearchSuggestion {
  type: 'trip' | 'country' | 'trip_type';
  value: string;
  subtitle: string;
}

interface UseSearchResult {
  suggestions: SearchSuggestion[];
  loading: boolean;
  error: string | null;
}

export const useSearch = (query: string, delay: number = 300): UseSearchResult => {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchSuggestions = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Use only local search for now to avoid API issues
      const localSuggestions = generateLocalSuggestions(searchQuery);
      setSuggestions(localSuggestions);
      
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const generateLocalSuggestions = (searchQuery: string): SearchSuggestion[] => {
    try {
      const query = searchQuery.toLowerCase();
      const suggestions: SearchSuggestion[] = [];
      
      // Check if sampleProducts exists and is an array
      if (!sampleProducts || !Array.isArray(sampleProducts) || sampleProducts.length === 0) {
        return [];
      }
      
      // Search products by name and destination with null checks
      const matchingProducts = sampleProducts.filter(product => {
        if (!product) return false;
        
        const nameMatch = product.name?.toLowerCase()?.includes(query) || false;
        const overviewMatch = product.overview?.toLowerCase()?.includes(query) || false;
        const destinationNameMatch = product.destination?.name?.toLowerCase()?.includes(query) || false;
        const destinationCountryMatch = product.destination?.country?.toLowerCase()?.includes(query) || false;
        const highlightsMatch = product.highlights?.some(h => h?.toLowerCase()?.includes(query)) || false;
        const categoriesMatch = product.categories?.some(c => c?.toLowerCase()?.includes(query)) || false;
        
        return nameMatch || overviewMatch || destinationNameMatch || destinationCountryMatch || highlightsMatch || categoriesMatch;
      });
      
      // Add trip suggestions with null checks
      matchingProducts.slice(0, 3).forEach(product => {
        if (!product?.name || !product?.destination || !product?.pricing) return;
        
        suggestions.push({
          type: 'trip',
          value: product.name,
          subtitle: `${product.destination.name || 'Unknown'}, ${product.destination.country || 'Unknown'} • ${product.pricing.currency || 'AUD'} $${product.pricing.adult || '0'}`
        });
      });
      
      // Add unique destination suggestions with null checks
      const uniqueDestinations = new Set<string>();
      sampleProducts.forEach(product => {
        if (!product?.destination) return;
        
        const destination = product.destination.name;
        const country = product.destination.country;
        
        if (!destination || !country) return;
        
        if (destination.toLowerCase().includes(query) || country.toLowerCase().includes(query)) {
          if (!uniqueDestinations.has(destination)) {
            uniqueDestinations.add(destination);
            suggestions.push({
              type: 'country',
              value: destination,
              subtitle: `${country} • ${sampleProducts.filter(p => p?.destination?.name === destination).length} tours available`
            });
          }
        }
      });
      
      // Add category suggestions with null checks
      const uniqueCategories = new Set<string>();
      sampleProducts.forEach(product => {
        if (!product?.categories) return;
        
        product.categories.forEach(category => {
          if (!category) return;
          
          if (category.toLowerCase().includes(query) && !uniqueCategories.has(category)) {
            uniqueCategories.add(category);
            suggestions.push({
              type: 'trip_type',
              value: category,
              subtitle: `${sampleProducts.filter(p => p?.categories?.includes(category)).length} tours in this category`
            });
          }
        });
      });
    
      return suggestions.slice(0, 8); // Limit to 8 suggestions
    } catch (error) {
      console.error('Error generating local suggestions:', error);
      return [];
    }
  };

  const debouncedSearch = debounce(searchSuggestions, delay);

  useEffect(() => {
    debouncedSearch(query);
  }, [query]);

  return {
    suggestions,
    loading,
    error
  };
};