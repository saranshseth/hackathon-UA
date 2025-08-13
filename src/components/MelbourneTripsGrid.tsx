"use client";

import React, { useState, useEffect } from 'react';
import { Star, Clock, MapPin, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import PriceDisplay from '@/components/Currency/PriceDisplay';
import { EnhancedProduct } from '@/lib/enhancedDataProvider';
import { clientDataProvider } from '@/lib/clientDataProvider';

interface MelbourneTripsGridProps {
  products?: EnhancedProduct[];
}

export function MelbourneTripsGrid({ products: externalProducts }: MelbourneTripsGridProps) {
  const [products, setProducts] = useState<EnhancedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Load products if not provided externally
  useEffect(() => {
    async function loadProducts() {
      if (externalProducts && externalProducts.length > 0) {
        setProducts(externalProducts.slice(0, 3)); // Limit to 3 for grid
        setLoading(false);
      } else {
        try {
          const melbourneProducts = await clientDataProvider.getProductsByDestination('Melbourne');
          setProducts(melbourneProducts.slice(0, 3));
        } catch (error) {
          console.error('Error loading products for grid:', error);
          setProducts([]);
        } finally {
          setLoading(false);
        }
      }
    }

    loadProducts();
  }, [externalProducts]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg p-4 animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">
          <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No Melbourne experiences available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: EnhancedProduct }) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-white">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.images.hero}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=800&h=600&fit=crop';
          }}
        />
        
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

        {/* Category Badge */}
        {product.categories[0] && (
          <div className="absolute top-3 left-3 bg-black/80 text-white px-2 py-1 rounded-full text-xs font-medium">
            {product.categories[0]}
          </div>
        )}

        {/* Private Badge */}
        {product.private && (
          <div className="absolute bottom-3 left-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
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
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm leading-tight">
          {product.name}
        </h3>

        {/* Details */}
        <div className="space-y-1 text-xs text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{product.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{product.destinationName}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <PriceDisplay 
            price={product.pricing.adult} 
            fromCurrency={product.currency}
            className="text-lg font-bold text-gray-900"
          />
          <Button 
            size="sm"
            className="bg-[#FF2828] hover:bg-[#E61E1E] text-white text-xs px-3 py-1 rounded-full"
          >
            Book now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}