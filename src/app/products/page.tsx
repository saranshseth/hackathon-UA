"use client";

import React, { useState, useEffect } from "react";
import { clientDataProvider } from "@/lib/clientDataProvider";
import { EnhancedProduct } from "@/lib/enhancedDataProvider";
import Header from "@/components/Layout/Header";
import PriceDisplay from "@/components/Currency/PriceDisplay";
import { Card, CardContent } from "@/components/ui/Card";
import { Star, Clock, Users, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<EnhancedProduct[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, destinationsData, categoriesData] = await Promise.all([
          clientDataProvider.getAllProducts(),
          clientDataProvider.getAllDestinations(),
          clientDataProvider.getAllCategories()
        ]);
        
        setAllProducts(productsData);
        setDestinations(destinationsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-4">
            All Products from CSV Data
          </h1>
          <p className="text-center text-gray-600 mb-4">
            Showing {allProducts.length} products with intelligent pricing and relevant images
          </p>
          
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-blue-600">{allProducts.length}</h3>
              <p className="text-gray-600">Total Products</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-green-600">{destinations.length}</h3>
              <p className="text-gray-600">Destinations</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-purple-600">{categories.length}</h3>
              <p className="text-gray-600">Categories</p>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Data Source Information */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            🔧 Data Integration Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">CSV Data Sources:</h3>
              <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
                <li>✅ UA-Product.csv - Product information, pricing, descriptions</li>
                <li>✅ UA-destination.csv - Destination details and images</li>
                <li>✅ UA-category.csv - Product categories</li>
                <li>✅ UA-reviews.csv - Customer reviews and ratings</li>
                <li>✅ UA-Hub.csv - Hub information</li>
                <li>✅ UA-categoriesxhub.csv - Category relationships</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Intelligent Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
                <li>🧠 Smart pricing based on destination, duration, category</li>
                <li>🖼️ Relevant images mapped to destinations and activities</li>
                <li>💰 Currency conversion for all prices</li>
                <li>⭐ Real ratings from TripAdvisor data</li>
                <li>🔄 Contentstack-ready architecture</li>
                <li>📱 Fully responsive design</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-100 rounded">
            <h4 className="font-semibold text-blue-800 mb-2">🚀 Contentstack Ready:</h4>
            <p className="text-blue-700 text-sm">
              The system automatically detects Contentstack environment variables and switches to 
              Contentstack API when available. Set CONTENTSTACK_API_KEY, CONTENTSTACK_DELIVERY_TOKEN, 
              and CONTENTSTACK_ENVIRONMENT to enable Contentstack integration.
            </p>
          </div>
        </div>
      </div>
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

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-white rounded-full px-3 py-1 shadow-md">
          <PriceDisplay 
            price={product.pricing.adult} 
            fromCurrency={product.currency}
            className="text-sm font-semibold text-gray-800"
          />
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
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{product.destinationName}, {product.destinationCountry}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>{product.duration}</span>
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