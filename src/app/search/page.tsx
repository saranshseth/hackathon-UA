'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Filter, MapPin, SortAsc, Activity, Mountain, Bike, Palette, Building, Wine, TreePine } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { clientDataProvider } from '@/lib/clientDataProvider';
import { EnhancedProduct } from '@/lib/enhancedDataProvider';
import Header from '@/components/Layout/Header';
import PriceDisplay from '@/components/Currency/PriceDisplay';
import { useCurrency } from '@/contexts/CurrencyContext';
import Link from 'next/link';

const filterCategories = [
  { id: 'active', label: 'Active', icon: Activity, categoryName: 'Active' },
  { id: 'trek', label: 'Walk', icon: Mountain, categoryName: 'City Highlights' },
  { id: 'bike', label: 'Bike', icon: Bike, categoryName: 'Active' },
  { id: 'art', label: 'Art', icon: Palette, categoryName: 'Art & Culture & History' },
  { id: 'culture', label: 'Culture', icon: Building, categoryName: 'Art & Culture & History' },
  { id: 'food', label: 'Food & drink', icon: Wine, categoryName: 'Food & Drink' },
  { id: 'wildlife', label: 'Wildlife', icon: TreePine, categoryName: 'Off The Beaten Path' },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { userLocation } = useCurrency();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState(filterCategories.map(f => ({ ...f, active: false })));
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [allProducts, setAllProducts] = useState<EnhancedProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<EnhancedProduct[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasUserSelectedCountry, setHasUserSelectedCountry] = useState(false);

  // Load all products on mount
  useEffect(() => {
    async function loadProducts() {
      try {
        const products = await clientDataProvider.getAllProducts();
        setAllProducts(products);
        
        // Extract unique countries
        const uniqueCountries = Array.from(new Set(products.map(p => p.destinationCountry))).sort();
        setCountries(uniqueCountries);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Set default country based on user location (only once, when user hasn't made a selection)
  useEffect(() => {
    if (userLocation && countries.length > 0 && selectedCountry === 'all' && !hasUserSelectedCountry) {
      try {
        // Map user's country to available countries
        const userCountryMapping: Record<string, string> = {
          'Australia': 'Australia',
          'United States': 'Australia', // Default to Australia for US users
          'Canada': 'Australia',
          'United Kingdom': 'Australia',
          'New Zealand': 'Australia',
          'Singapore': 'Australia',
          'Japan': 'Australia',
        };
        
        const defaultCountry = userCountryMapping[userLocation.country];
        if (defaultCountry && countries.includes(defaultCountry)) {
          setSelectedCountry(defaultCountry);
        }
      } catch (error) {
        console.warn('Error setting default country:', error);
      }
    }
  }, [userLocation, countries, selectedCountry, hasUserSelectedCountry]);

  // Filter and sort products
  useEffect(() => {
    let filtered = allProducts;

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.destinationName.toLowerCase().includes(query) ||
        product.overview.toLowerCase().includes(query) ||
        product.categories.some(cat => cat.toLowerCase().includes(query))
      );
    }

    // Apply country filter
    if (selectedCountry !== 'all') {
      filtered = filtered.filter(product => 
        product.destinationCountry === selectedCountry
      );
    }

    // Apply category filters
    const activeCategories = filters.filter(f => f.active).map(f => f.categoryName);
    if (activeCategories.length > 0) {
      filtered = filtered.filter(product =>
        product.categories.some(category =>
          activeCategories.some(filter =>
            category.toLowerCase().includes(filter.toLowerCase())
          )
        )
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.pricing.adult - b.pricing.adult);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.pricing.adult - a.pricing.adult);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered = [...filtered].sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredProducts(filtered);
  }, [searchQuery, filters, allProducts, sortBy, selectedCountry]);

  const toggleFilter = (id: string) => {
    setFilters(filters.map(filter => 
      filter.id === id ? { ...filter, active: !filter.active } : filter
    ));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search query
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    router.push(`/search${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setHasUserSelectedCountry(true);
  };

  const clearFilters = () => {
    setFilters(filterCategories.map(f => ({ ...f, active: false })));
    setSortBy('relevance');
    setSelectedCountry('all');
    setSearchQuery('');
    setHasUserSelectedCountry(true); // Mark as user selection
    // Update URL to remove search params
    router.push('/search');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destinations, experiences, or countries..."
                className="pl-10 pr-20 py-3 w-full text-lg"
                style={{ color: '#111827' }}
              />
              <Button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10">
                Search
              </Button>
            </div>
          </form>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {/* Country Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Country:</span>
              <select
                value={selectedCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary-intrepid-red text-gray-900 bg-white"
              >
                <option value="all" className="text-gray-900">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country} className="text-gray-900">
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filters */}
            {filters.map((filter) => {
              const IconComponent = filter.icon;
              return (
                <Badge
                  key={filter.id}
                  variant={filter.active ? "default" : "secondary"}
                  className={`cursor-pointer px-3 py-1.5 transition-all ${
                    filter.active 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                  }`}
                  onClick={() => toggleFilter(filter.id)}
                >
                  <IconComponent className="w-4 h-4 mr-1.5" />
                  {filter.label}
                </Badge>
              );
            })}
            {/* Reset Filter Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-gray-600 hover:text-gray-900 border-gray-300 px-4 py-1.5"
            >
              Reset Filters
            </Button>
          </div>

          {/* Results count and sort */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600">
              {loading ? 'Loading...' : `${filteredProducts.length} experiences found`}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-44 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary-intrepid-red text-gray-900 bg-white"
              >
                <option value="relevance" className="text-gray-900">Relevance</option>
                <option value="price-low" className="text-gray-900">Price: Low to High</option>
                <option value="price-high" className="text-gray-900">Price: High to Low</option>
                <option value="rating" className="text-gray-900">Rating</option>
                <option value="reviews" className="text-gray-900">Most Reviews</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-4 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <SearchResultCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No experiences found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search terms or filters to find more experiences.
            </p>
            <Button onClick={() => {
              setSearchQuery('');
              clearFilters();
            }}>
              Show all experiences
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Search result card component
function SearchResultCard({ product }: { product: EnhancedProduct }) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.images.hero}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop';
            }}
          />
          
          {/* Price Badge */}
          <div className="absolute bottom-3 left-3 bg-white rounded-full px-3 py-1 shadow-md">
            <span className="text-sm font-semibold text-gray-800">
              <PriceDisplay 
                price={product.pricing.adult} 
                fromCurrency={product.currency}
              />
            </span>
          </div>

          {/* Category Badge */}
          {product.categories[0] && (
            <div className="absolute top-3 left-3 bg-black/80 text-white px-2 py-1 rounded-full text-xs font-medium">
              {product.categories[0]}
            </div>
          )}
        </div>

        <div className="p-4">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {product.reviewCount > 0 ? (
              <>
                <span className="text-sm font-medium">⭐ {product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviewCount})</span>
              </>
            ) : (
              <span className="text-sm text-gray-500">No reviews yet</span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm">
            {product.name}
          </h3>

          {/* Details */}
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{product.destinationName}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🕒</span>
              <span>{product.duration}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function SearchPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <SearchContent />
      </Suspense>
    </>
  );
}