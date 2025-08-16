"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { HeroSection } from '@/components/HeroSection';
import { PopularToursSection } from '@/components/PopularToursSection';
import { AuthenticExperiencesSection } from '@/components/AuthenticExperiencesSection';
import { ReadyForAdventureSection } from '@/components/ReadyForAdventureSection';
import ExploreMelbourneSection from '@/components/ExploreMelbourneSection';
import { clientDataProvider } from '@/lib/clientDataProvider';
import { EnhancedProduct } from '@/lib/enhancedDataProvider';
import { Card, CardContent } from '@/components/ui/Card';
import PriceDisplay from '@/components/Currency/PriceDisplay';
import { Star, Clock, MapPin, Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function HeroDemoPage() {
  const [allProducts, setAllProducts] = useState<EnhancedProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<EnhancedProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>(['Active', 'Food & Drink']);
  const [loading, setLoading] = useState(true);

  // Load all products
  useEffect(() => {
    async function loadProducts() {
      try {
        const products = await clientDataProvider.getAllProducts();
        setAllProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Filter products based on search and active filters
  useEffect(() => {
    let filtered = allProducts;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.destinationName.toLowerCase().includes(query) ||
        product.overview.toLowerCase().includes(query) ||
        product.categories.some(cat => cat.toLowerCase().includes(query))
      );
    }

    // Apply category filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter(product =>
        product.categories.some(category =>
          activeFilters.some(filter =>
            category.toLowerCase().includes(filter.toLowerCase())
          )
        )
      );
    }

    setFilteredProducts(filtered);
  }, [allProducts, searchQuery, activeFilters]);

  const handleSearch = (query: string, filters: string[]) => {
    setSearchQuery(query);
    setActiveFilters(filters);
  };

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <HeroSection 
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
      />

      {/* Search Results Section */}
      {(searchQuery || activeFilters.length > 0) && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {searchQuery ? `Search Results for ${'"'}${searchQuery}${'"'}` : 'Filtered Experiences'}
              </h2>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span>
                  {loading ? 'Loading...' : `${filteredProducts.length} experiences found`}
                </span>
                
                {activeFilters.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span>Filters:</span>
                    {activeFilters.map((filter, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                        {filter}
                      </span>
                    ))}
                  </div>
                )}
                
                {(searchQuery || activeFilters.length > 0) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveFilters([]);
                    }}
                    className="text-[#FF2828] hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>

            {/* Results Grid */}
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
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <MapPin className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No experiences found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search terms or filters to find more experiences.
                  </p>
                </div>
                <Button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilters([]);
                  }}
                  className="mt-4"
                  variant="outline"
                >
                  Show all experiences
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Popular Tours Section */}
      {!searchQuery && activeFilters.length === 0 && (
        <>
          <PopularToursSection />
          
          {/* Authentic Experiences Section */}
          <AuthenticExperiencesSection />
          
          {/* Ready for Adventure CTA */}
          <ReadyForAdventureSection />
        </>
      )}

      {/* Default Melbourne Section - Only show when no search/filter */}
      {!searchQuery && activeFilters.length === 0 && (
        <ExploreMelbourneSection />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

function ProductCard({ product }: { product: EnhancedProduct }) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
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
          <PriceDisplay 
            price={product.pricing.adult} 
            fromCurrency={product.currency}
            className="text-sm font-semibold text-gray-800"
          />
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/90 hover:bg-white text-gray-700 p-0 h-8 w-8 rounded-full"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Private Badge */}
        {product.private && (
          <div className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Private
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm">
          {product.name}
        </h3>

        {/* Details */}
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>{product.duration}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{product.destinationName}</span>
          </div>

          {product.categories.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.categories.slice(0, 2).map((category, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}