"use client";

import { useState } from "react";
import {
  Heart,
  Search,
  ChevronLeft,
  ChevronRight,
  Globe,
  Clock,
  Star,
  Users,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export interface ListingItem {
  id: string;
  title: string;
  duration: string;
  category: string;
  price: number;
  images: string[];
  rating?: number;
  reviews?: number;
  location?: string;
  city?: string;
  region?: string;
  maxGroup?: number;
}

export interface FilterOption {
  id: string;
  label: string;
}

export interface HeroExperience {
  image: string;
  title: string;
  location: string;
  rating: number;
}

export interface FactItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ListingTemplateConfig {
  pageTitle: string;
  pageDescription: string;
  heroTitle: string;
  heroDescription: string;
  heroCarouselTitle: string;
  filterTitle: string;
  searchPlaceholder: string;
  primaryFilterTitle: string;
  primaryFilterIcon: React.ComponentType<{ className?: string }>;
  secondaryFilterTitle: string;
  secondaryFilterIcon: React.ComponentType<{ className?: string }>;
  facts: FactItem[];
  heroExperiences: HeroExperience[];
  primaryFilters: FilterOption[];
  secondaryFilters: FilterOption[];
}

interface FilterSectionProps {
  selectedPrimary: string[];
  onPrimaryToggle: (id: string) => void;
  selectedSecondary: string[];
  onSecondaryToggle: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  config: ListingTemplateConfig;
}

function FilterSection({
  selectedPrimary,
  onPrimaryToggle,
  selectedSecondary,
  onSecondaryToggle,
  searchQuery,
  onSearchChange,
  config,
}: FilterSectionProps) {
  const PrimaryIcon = config.primaryFilterIcon;
  const SecondaryIcon = config.secondaryFilterIcon;

  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          {config.filterTitle}
        </h2>

        {/* Search Section */}
        <div className="mb-8">
          <div className="max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={config.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm text-sm"
              />
            </div>
          </div>
        </div>

        {/* Primary Filters */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <PrimaryIcon className="h-5 w-5 mr-2 text-red-600" />
            {config.primaryFilterTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {config.primaryFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => onPrimaryToggle(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-center text-sm ${
                  selectedPrimary.includes(filter.id)
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filters */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <SecondaryIcon className="h-5 w-5 mr-2 text-red-600" />
            {config.secondaryFilterTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {config.secondaryFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => onSecondaryToggle(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-center text-sm ${
                  selectedSecondary.includes(filter.id)
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface HeroSectionProps {
  config: ListingTemplateConfig;
}

function HeroSection({ config }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % config.heroExperiences.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + config.heroExperiences.length) %
        config.heroExperiences.length
    );
  };

  const currentExperience = config.heroExperiences[currentImageIndex];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div>
            <h1 className="text-5xl font-medium text-gray-900 pt-6">
              {config.heroTitle}
            </h1>
            <div className="max-w-md mb-12">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed px-[0px] py-[15px] mx-[0px] my-[29px]">
                {config.heroDescription}
              </p>
            </div>

            {/* Facts Section */}
            <div>
              <h2 className="text-xl font-semibold text-red-600 mb-6 tracking-wide text-[15px]">
                Why choose our experiences
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {config.facts.map((fact, index) => {
                  const IconComponent = fact.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <IconComponent className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {fact.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                          {fact.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative mt-8 md:mt-32">
            <h2 className="text-xl font-medium text-red-600 mb-6 tracking-wide text-[15px]">
              {config.heroCarouselTitle}
            </h2>

            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg group">
              <img
                src={currentExperience.image}
                alt={currentExperience.title}
                className="w-full h-full object-cover transition-opacity duration-500"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg">
                {/* Rating - Top Left */}
                <div className="absolute top-16 left-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 flex items-center space-x-1 shadow-lg">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900 text-sm">
                      {currentExperience.rating}
                    </span>
                  </div>
                </div>

                {/* Location - Top Right */}
                <div className="absolute top-16 right-4">
                  <div className="bg-black/70 backdrop-blur-sm text-white rounded-full px-3 py-2 flex items-center space-x-1 shadow-lg">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {currentExperience.location}
                    </span>
                  </div>
                </div>

                {/* Title and Button - Bottom */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-semibold text-lg lg:text-xl mb-4 leading-tight">
                    {currentExperience.title}
                  </h3>
                  <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium shadow-lg">
                    Find out more
                  </Button>
                </div>
              </div>

              {/* Navigation arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 text-gray-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white shadow-lg z-20"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 text-gray-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white shadow-lg z-20"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Image indicators */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
                {config.heroExperiences.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ItemCard({ item }: { item: ListingItem }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + item.images.length) % item.images.length
    );
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
      <div className="relative group">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={item.images[currentImageIndex]}
            alt={item.title}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        </div>

        {/* Navigation arrows */}
        {item.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Image indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1">
              {item.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Heart icon - top right */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors z-10"
        >
          <Heart
            className={`h-4 w-4 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>

        {/* Category tag - bottom left of image */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-black/75 text-white px-3 py-1 rounded text-xs font-medium backdrop-blur-sm">
            {item.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1.5" />
          <span>{item.location}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-3 text-base leading-tight line-clamp-2">
          {item.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="font-semibold text-sm text-gray-900 mr-1">
            {item.rating}
          </span>
          <span className="text-gray-500 text-sm">
            ({item.reviews} reviews)
          </span>
        </div>

        {/* Duration and Group Size */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{item.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>Max {item.maxGroup}</span>
          </div>
        </div>

        {/* Price and Book Button */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 mb-1">From</div>
            <div className="font-semibold text-lg text-gray-900">
              AUD ${item.price}
            </div>
          </div>

          <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium text-sm">
            Book now
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ItemsGridProps {
  items: ListingItem[];
  searchQuery: string;
}

function ItemsGrid({ items, searchQuery }: ItemsGridProps) {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results counter */}
        <div className="mb-8">
          <p className="text-gray-600">
            {searchQuery.trim() ? (
              <>
                <span className="font-medium">{items.length}</span> experience
                {items.length !== 1 ? "s" : ""} found for "{searchQuery}"
              </>
            ) : (
              <>
                Showing <span className="font-medium">{items.length}</span>{" "}
                experience{items.length !== 1 ? "s" : ""}
              </>
            )}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No experiences found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface ListingTemplateProps {
  config: ListingTemplateConfig;
  items: ListingItem[];
  onFilterItems: (
    items: ListingItem[],
    searchQuery: string,
    primaryFilters: string[],
    secondaryFilters: string[]
  ) => ListingItem[];
}

export default function ListingTemplate({
  config,
  items,
  onFilterItems,
}: ListingTemplateProps) {
  const [selectedPrimary, setSelectedPrimary] = useState<string[]>([
    config.primaryFilters[0]?.id || "",
  ]);
  const [selectedSecondary, setSelectedSecondary] = useState<string[]>([
    config.secondaryFilters[0]?.id || "",
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePrimaryToggle = (id: string) => {
    setSelectedPrimary((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSecondaryToggle = (id: string) => {
    setSelectedSecondary((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredItems = onFilterItems(
    items,
    searchQuery,
    selectedPrimary,
    selectedSecondary
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection config={config} />
      <FilterSection
        selectedPrimary={selectedPrimary}
        onPrimaryToggle={handlePrimaryToggle}
        selectedSecondary={selectedSecondary}
        onSecondaryToggle={handleSecondaryToggle}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        config={config}
      />
      <ItemsGrid items={filteredItems} searchQuery={searchQuery} />
      <Footer />
    </div>
  );
}
