"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MapPin,
  Sparkles,
  Activity,
  Mountain,
  Bike,
  Palette,
  Building,
  Wine,
  TreePine,
} from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Badge } from "./ui/Badge";
import { MelbourneTripCarousel } from "./MelbourneTripCarousel";
import { clientDataProvider } from "@/lib/clientDataProvider";
import { EnhancedProduct } from "@/lib/enhancedDataProvider";
import { useCurrency } from "@/contexts/CurrencyContext";
import { locationService } from "@/lib/locationService";
import PriceDisplay from "./Currency/PriceDisplay";

const filterCategories = [
  {
    id: "active",
    label: "Active",
    active: false,
    icon: Activity,
    categoryName: "Active",
  },
  {
    id: "trek",
    label: "Walk",
    active: false,
    icon: Mountain,
    categoryName: "City Highlights",
  },
  {
    id: "bike",
    label: "Bike",
    active: false,
    icon: Bike,
    categoryName: "Active",
  },
  {
    id: "art",
    label: "Art",
    active: false,
    icon: Palette,
    categoryName: "Art & Culture & History",
  },
  {
    id: "culture",
    label: "Culture",
    active: false,
    icon: Building,
    categoryName: "Art & Culture & History",
  },
  {
    id: "food",
    label: "Food & drink",
    active: false,
    icon: Wine,
    categoryName: "Food & Drink",
  },
  {
    id: "wildlife",
    label: "Wildlife",
    active: false,
    icon: TreePine,
    categoryName: "Off The Beaten Path",
  },
];

interface HeroSectionProps {
  onSearch?: (query: string, filters: string[]) => void;
  onFilterChange?: (activeFilters: string[]) => void;
}

export function HeroSection({ onSearch, onFilterChange }: HeroSectionProps) {
  const { userLocation } = useCurrency();
  const [filters, setFilters] = useState(filterCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState<EnhancedProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<EnhancedProduct[]>(
    []
  );
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [suggestedTripTypes, setSuggestedTripTypes] = useState<string[]>([]);

  // Load all products on mount
  useEffect(() => {
    async function loadProducts() {
      try {
        const products = await clientDataProvider.getAllProducts();
        setAllProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Get suggested trip types based on user location
  useEffect(() => {
    if (userLocation) {
      const suggestions =
        locationService.getSuggestedTripsForLocation(userLocation);
      setSuggestedTripTypes(suggestions);
    }
  }, [userLocation]);

  // Filter products when search or filters change
  useEffect(() => {
    if (!isSearching && !searchQuery) return;

    let filtered = allProducts;

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.destinationName.toLowerCase().includes(query) ||
          product.overview.toLowerCase().includes(query) ||
          product.categories.some((cat) => cat.toLowerCase().includes(query))
      );
    }

    // Apply category filters
    const activeCategories = filters
      .filter((f) => f.active)
      .map((f) => f.categoryName);

    if (activeCategories.length > 0) {
      filtered = filtered.filter((product) =>
        product.categories.some((category) =>
          activeCategories.some((filter) =>
            category.toLowerCase().includes(filter.toLowerCase())
          )
        )
      );
    }

    setFilteredProducts(filtered);
    onSearch?.(searchQuery, activeCategories);
  }, [searchQuery, filters, allProducts, isSearching, onSearch]);

  const toggleFilter = (id: string) => {
    // Find the clicked filter
    const clickedFilter = filters.find((f) => f.id === id);
    if (!clickedFilter) return;

    // Add the filter label to search query
    setSearchQuery(clickedFilter.label);

    // Navigate to search page with the filter as search query
    const params = new URLSearchParams();
    params.set("q", clickedFilter.label);
    window.location.href = `/search?${params.toString()}`;
  };

  const handleSearch = () => {
    // Redirect to search page with query
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    window.location.href = `/search${
      params.toString() ? `?${params.toString()}` : ""
    }`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Redirect to search page with query
      const params = new URLSearchParams();
      if (searchQuery) params.set("q", searchQuery);
      window.location.href = `/search${
        params.toString() ? `?${params.toString()}` : ""
      }`;
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setFilters(filterCategories);
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 pt-20 pb-8 overflow-hidden z-10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-[#FF2828]/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-20 right-20 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
            <Sparkles className="w-4 h-4 text-[#FF2828]" />
            <span className="text-sm font-medium text-gray-700">
              Discover your next adventure
            </span>
          </div>
        </div>

        {/* Stats - Moved above search */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-sm sm:max-w-md mx-auto mb-6 sm:mb-8">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              120+
            </div>
            <div className="text-xs text-gray-600 font-medium">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              1M+
            </div>
            <div className="text-xs text-gray-600 font-medium">Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              50+
            </div>
            <div className="text-xs text-gray-600 font-medium">Years</div>
          </div>
        </div>

        {/* Full-width Search */}
        <div className="mb-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF2828]/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl p-2 shadow-xl shadow-black/10">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <MapPin className="w-5 h-5 text-gray-400 ml-4" />
                  <Input
                    placeholder="Where would you like to explore?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="border-0 bg-transparent text-lg placeholder:text-gray-400 focus-visible:ring-0 font-light !text-gray-900"
                    style={{ color: "#111827" }}
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="bg-[#FF2828] hover:bg-[#E61E1E] text-white px-4 sm:px-8 py-3 rounded-xl shadow-lg shadow-[#FF2828]/25 hover:shadow-xl hover:shadow-[#FF2828]/30 transition-all duration-300"
                >
                  <Search className="w-5 h-5 sm:mr-2" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tags Below Search */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {filters.map((filter) => {
              const IconComponent = filter.icon;
              return (
                <Badge
                  key={filter.id}
                  variant="secondary"
                  className="cursor-pointer px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 bg-white/70 text-gray-700 hover:bg-white/90 border border-gray-200/60 backdrop-blur-sm"
                  onClick={() => toggleFilter(filter.id)}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {filter.label}
                </Badge>
              );
            })}
          </div>

          {/* Location-based Suggestions */}
          {/* {userLocation && suggestedTripTypes.length > 0 && (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Popular in {userLocation.country}: 
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestedTripTypes.slice(0, 4).map((tripType, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer px-3 py-1 text-xs bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors"
                    onClick={() => {
                      setSearchQuery(tripType);
                      const params = new URLSearchParams();
                      params.set('q', tripType);
                      window.location.href = `/search?${params.toString()}`;
                    }}
                  >
                    {tripType}
                  </Badge>
                ))}
              </div>
            </div>
          )} */}
        </div>

        {/* Two Column Layout - Title and Carousel */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-8 min-h-[600px]">
          {/* Left Column - Title and Content (Centered Vertically) */}
          <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
            {/* Title - Bigger and Black */}
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-4 lg:mb-6 leading-tight tracking-tight">
                Explore
                <span className="block text-black italic">Melbourne</span>
              </h1>

              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-light">
                Discover authentic experiences with small groups of{" "}
                <br className="hidden sm:block" />
                like-minded travelers in Australia's cultural capital
              </p>
            </div>

            {/* CTA Button - Removed Watch Video */}
            <div>
              <Button className="bg-[#FF2828] hover:bg-[#E61E1E] text-white px-6 sm:px-8 py-3 lg:py-4 rounded-xl shadow-lg shadow-[#FF2828]/25 hover:shadow-xl hover:shadow-[#FF2828]/30 transition-all duration-300">
                Discover more
              </Button>
            </div>
          </div>

          {/* Right Column - Melbourne Trip Carousel */}
          <div className="flex items-center justify-center w-full overflow-hidden">
            <div className="w-full max-w-lg lg:max-w-none">
              <MelbourneTripCarousel />
            </div>
          </div>
        </div>

        {/* Search Results Section */}
        {isSearching && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  {searchQuery
                    ? `Search Results for "${searchQuery}"`
                    : "Filtered Experiences"}
                </h2>
                <Button
                  variant="outline"
                  onClick={clearSearch}
                  className="text-[#FF2828] border-[#FF2828] hover:bg-[#FF2828] hover:text-white"
                >
                  Clear Search
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                <span>
                  {loading
                    ? "Loading..."
                    : `${filteredProducts.length} experiences found`}
                </span>

                {filters.some((f) => f.active) && (
                  <div className="flex flex-wrap gap-2">
                    <span>Active filters:</span>
                    {filters
                      .filter((f) => f.active)
                      .map((filter, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {filter.label}
                        </Badge>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Results Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 animate-pulse"
                  >
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
                <div className="text-gray-400 mb-4">
                  <MapPin className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No experiences found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search terms or filters to find more
                    experiences.
                  </p>
                </div>
                <Button
                  onClick={clearSearch}
                  variant="outline"
                  className="mt-4"
                >
                  Show all experiences
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// Search result card component
function SearchResultCard({ product }: { product: EnhancedProduct }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.images.hero}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop";
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
              <span className="text-sm text-gray-500">
                ({product.reviewCount})
              </span>
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
  );
}
