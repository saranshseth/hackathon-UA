"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  User,
  Phone,
  Coffee,
  UtensilsCrossed,
  Wine,
  MapPin,
  Star,
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
  Globe,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
// import { Switch } from "@/components/ui/Switch";
// import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

interface Experience {
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

const experiences: Experience[] = [
  {
    id: "1",
    title: "Tokyo Sake Brewery & Sushi Master Class",
    duration: "4 hours",
    category: "Cooking Class",
    price: 185,
    images: [
      "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1615361200098-550e4f8bd4a4?w=400&h=300&fit=crop",
    ],
    rating: 4.9,
    reviews: 243,
    location: "Shibuya District",
    city: "Tokyo",
    region: "Asia",
    maxGroup: 8,
  },
  {
    id: "2",
    title: "Paris Wine Caves & Cheese Pairing Tour",
    duration: "3.5 hours",
    category: "Wine & Beer Tours",
    price: 145,
    images: [
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    ],
    rating: 4.8,
    reviews: 189,
    location: "Saint-Germain",
    city: "Paris",
    region: "Europe",
    maxGroup: 12,
  },
  {
    id: "3",
    title: "Barcelona Tapas & Flamenco Cultural Evening",
    duration: "4 hours",
    category: "Cultural Food",
    price: 125,
    images: [
      "https://images.unsplash.com/photo-1515669097368-22e68cb54bcb?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    ],
    rating: 4.9,
    reviews: 312,
    location: "Gothic Quarter",
    city: "Barcelona",
    region: "Europe",
    maxGroup: 15,
  },
  {
    id: "4",
    title: "Bangkok Night Market Street Food Adventure",
    duration: "3 hours",
    category: "Street Food",
    price: 65,
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559847844-d724611b2196?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    ],
    rating: 4.7,
    reviews: 156,
    location: "Chatuchak Market",
    city: "Bangkok",
    region: "Asia",
    maxGroup: 10,
  },
  {
    id: "5",
    title: "Tuscan Vineyard & Farm-to-Table Cooking",
    duration: "6 hours",
    category: "Wine & Beer Tours",
    price: 220,
    images: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
    ],
    rating: 4.9,
    reviews: 89,
    location: "Chianti Region",
    city: "Florence",
    region: "Europe",
    maxGroup: 8,
  },
  {
    id: "6",
    title: "Mumbai Spice Market & Curry Workshop",
    duration: "4.5 hours",
    category: "Cooking Class",
    price: 85,
    images: [
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1596797882870-8c59cd6c6a22?w=400&h=300&fit=crop",
    ],
    rating: 4.8,
    reviews: 167,
    location: "Crawford Market",
    city: "Mumbai",
    region: "Asia",
    maxGroup: 12,
  },
  {
    id: "7",
    title: "Buenos Aires Steak & Malbec Tasting",
    duration: "3 hours",
    category: "Wine & Beer Tours",
    price: 155,
    images: [
      "https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    ],
    rating: 4.9,
    reviews: 134,
    location: "Palermo District",
    city: "Buenos Aires",
    region: "South America",
    maxGroup: 10,
  },
  {
    id: "8",
    title: "Istanbul Turkish Delight & Tea Ceremony",
    duration: "2.5 hours",
    category: "Cultural Food",
    price: 75,
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    ],
    rating: 4.6,
    reviews: 98,
    location: "Grand Bazaar",
    city: "Istanbul",
    region: "Europe",
    maxGroup: 14,
  },
  {
    id: "9",
    title: "New York Craft Brewery & Pizza Walk",
    duration: "3 hours",
    category: "Wine & Beer Tours",
    price: 115,
    images: [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    ],
    rating: 4.7,
    reviews: 201,
    location: "Brooklyn",
    city: "New York",
    region: "North America",
    maxGroup: 12,
  },
  {
    id: "10",
    title: "Melbourne Coffee Culture & Laneway Eats",
    duration: "3 hours",
    category: "Cultural Food",
    price: 95,
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=300&fit=crop",
    ],
    rating: 4.8,
    reviews: 176,
    location: "CBD Laneways",
    city: "Melbourne",
    region: "Oceania",
    maxGroup: 10,
  },
  {
    id: "11",
    title: "Mexico City Street Tacos & Mezcal Tour",
    duration: "4 hours",
    category: "Street Food",
    price: 90,
    images: [
      "https://images.unsplash.com/photo-1565299507177-b0ac66763ed1?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559847844-d724611b2196?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1545264242-7ad32ac882ca?w=400&h=300&fit=crop",
    ],
    rating: 4.9,
    reviews: 201,
    location: "Roma Norte",
    city: "Mexico City",
    region: "North America",
    maxGroup: 12,
  },
  {
    id: "12",
    title: "Moroccan Tagine Cooking in Marrakech",
    duration: "5 hours",
    category: "Cooking Class",
    price: 120,
    images: [
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1515669097368-22e68cb54bcb?w=400&h=300&fit=crop",
    ],
    rating: 4.8,
    reviews: 143,
    location: "Medina",
    city: "Marrakech",
    region: "Africa",
    maxGroup: 8,
  },
];

const experienceCategories = [
  { id: "all-experiences", label: "All Experiences" },
  { id: "cooking-class", label: "Cooking Classes" },
  { id: "wine-beer-tours", label: "Wine & Beer Tours" },
  { id: "cultural-food", label: "Cultural Food" },
  { id: "street-food", label: "Street Food" },
];

const regions = [
  { id: "all-regions", label: "All Regions" },
  { id: "asia", label: "Asia" },
  { id: "europe", label: "Europe" },
  { id: "north-america", label: "North America" },
  { id: "south-america", label: "South America" },
  { id: "oceania", label: "Oceania" },
  { id: "africa", label: "Africa" },
];

// function Header() {
//   return (
//     <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <div className="text-2xl font-bold text-red-600">intrepid</div>
//           </div>

//           {/* Search Bar */}
//           <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
//             <div className="relative w-full">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 value="Food & Drink Experiences"
//                 readOnly
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                 placeholder="Search experiences..."
//               />
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="hidden lg:flex space-x-8">
//             <a
//               href="#"
//               className="text-gray-700 hover:text-red-600 font-medium"
//             >
//               Destinations
//             </a>
//             <a
//               href="#"
//               className="text-gray-700 hover:text-red-600 font-medium"
//             >
//               Experiences
//             </a>
//             <a
//               href="#"
//               className="text-gray-700 hover:text-red-600 font-medium"
//             >
//               Deals
//             </a>
//             <a
//               href="#"
//               className="text-gray-700 hover:text-red-600 font-medium"
//             >
//               About
//             </a>
//           </nav>

//           {/* Actions */}
//           <div className="flex items-center space-x-4">
//             <Button variant="ghost" size="sm" className="p-2">
//               <Heart className="h-5 w-5" />
//             </Button>
//             <Button variant="ghost" size="sm" className="p-2">
//               <User className="h-5 w-5" />
//             </Button>
//             <Button variant="ghost" size="sm" className="p-2">
//               <Phone className="h-5 w-5" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

function FilterSection({
  selectedCategories,
  onCategoryToggle,
  selectedRegions,
  onRegionToggle,
  searchQuery,
  onSearchChange,
}: {
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  selectedRegions: string[];
  onRegionToggle: (region: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}) {
  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Filter experiences
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
                placeholder="Search food & drink experiences..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm text-sm mx-[0px] m-[0px]"
              />
            </div>
          </div>
        </div>
        {/* Experience Types */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <UtensilsCrossed className="h-5 w-5 mr-2 text-red-600" />
            Experience Type
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {experienceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryToggle(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-center text-sm ${
                  selectedCategories.includes(category.id)
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Regions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Globe className="h-5 w-5 mr-2 text-red-600" />
            Region
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => onRegionToggle(region.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-center text-sm ${
                  selectedRegions.includes(region.id)
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {region.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroExperiences = [
    {
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
      title: "Bangkok Night Market Street Food Adventure",
      location: "Bangkok, Thailand",
      rating: 4.7,
    },
    {
      image:
        "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=800&h=600&fit=crop",
      title: "Tokyo Sake Brewery & Sushi Master Class",
      location: "Tokyo, Japan",
      rating: 4.9,
    },
    {
      image:
        "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
      title: "Paris Wine Caves & Cheese Pairing Tour",
      location: "Paris, France",
      rating: 4.8,
    },
    {
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop",
      title: "Tuscan Vineyard & Farm-to-Table Cooking",
      location: "Tuscany, Italy",
      rating: 4.9,
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroExperiences.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + heroExperiences.length) % heroExperiences.length
    );
  };

  const currentExperience = heroExperiences[currentImageIndex];

  const facts = [
    {
      title: "Global Cuisines",
      description:
        "Explore authentic food experiences from over 50 countries, from street food markets to Michelin-starred kitchens",
      icon: Globe,
    },
    {
      title: "Expert Guides",
      description:
        "Learn from local chefs, sommeliers, and food experts who share the stories behind every dish and drink",
      icon: Coffee,
    },
    {
      title: "Cultural Immersion",
      description:
        "Go beyond just eating - discover the cultural traditions and history that shape each culinary experience",
      icon: UtensilsCrossed,
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div>
            <h1 className="text-5xl font-medium text-gray-900 pt-6">
              Explore Melbourne
            </h1>
            <div className="max-w-md mb-12">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed px-[0px] py-[15px] mx-[0px] my-[29px]">
                Embark on a culinary journey around the world. From cooking
                classes in Tokyo to wine tastings in Tuscany, discover authentic
                flavors and culinary traditions that define cultures across the
                globe.
              </p>
            </div>

            {/* Facts Section */}
            <div>
              <h2 className="text-xl font-semibold text-red-600 mb-6 tracking-wide text-[15px]">
                Why choose our experiences
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {facts.map((fact, index) => {
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
            {/* Carousel Title */}
            <h2 className="text-xl font-medium text-red-600 mb-6 tracking-wide text-[15px]">
              Explore our most popular experiences
            </h2>

            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg group relative">
              <Image
                src={currentExperience.image}
                alt="Food & drink experiences around the world"
                fill
                className="object-cover transition-opacity duration-500"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg px-[0px] p-[0px] m-[0px]">
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
                {heroExperiences.map((_, index) => (
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

function ExperienceCard({ experience }: { experience: Experience }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % experience.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + experience.images.length) % experience.images.length
    );
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
      <div className="relative group">
        <div className="aspect-[4/3] overflow-hidden relative">
          <Image
            src={experience.images[currentImageIndex]}
            alt={experience.title}
            fill
            className="object-cover transition-opacity duration-300"
          />
        </div>

        {/* Navigation arrows */}
        {experience.images.length > 1 && (
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
              {experience.images.map((_, index) => (
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

        {/* Experience type tag - bottom left of image */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-black/75 text-white px-3 py-1 rounded text-xs font-medium backdrop-blur-sm">
            {experience.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1.5" />
          <span>{experience.location}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-3 text-base leading-tight line-clamp-2">
          {experience.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="font-semibold text-sm text-gray-900 mr-1">
            {experience.rating}
          </span>
          <span className="text-gray-500 text-sm">
            ({experience.reviews} reviews)
          </span>
        </div>

        {/* Duration and Group Size */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{experience.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>Max {experience.maxGroup}</span>
          </div>
        </div>

        {/* Price and Book Button */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 mb-1">From</div>
            <div className="font-semibold text-lg text-gray-900">
              AUD ${experience.price}
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

function ExperiencesGrid({
  experiences,
  searchQuery,
}: {
  experiences: Experience[];
  searchQuery: string;
}) {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results counter */}
        <div className="mb-8">
          <p className="text-gray-600">
            {searchQuery.trim() ? (
              <>
                <span className="font-medium">{experiences.length}</span>{" "}
                experience{experiences.length !== 1 ? "s" : ""} found for {'"'}
                {searchQuery}{'"'}
              </>
            ) : (
              <>
                Showing{" "}
                <span className="font-medium">{experiences.length}</span>{" "}
                experience{experiences.length !== 1 ? "s" : ""}
              </>
            )}
          </p>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No experiences found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function IntrepidSection() {
  const intrepidTours = [
    {
      name: "Japan Real Food Adventure",
      duration: "15 days",
      price: "From $4,290",
    },
    { name: "Best of Thailand", duration: "12 days", price: "From $1,840" },
    {
      name: "European Food Explorer",
      duration: "18 days",
      price: "From $3,560",
    },
    {
      name: "India Golden Triangle & Goa",
      duration: "14 days",
      price: "From $2,180",
    },
  ];

  return (
    <div
      className="relative bg-gray-50 py-16 px-[0px] py-[18px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1485516195719-e9edaa29d2ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2VuaWMlMjBtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHRyYXZlbCUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NTUwNTkzOTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Ready for a longer adventure?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover multi-day journeys with Intrepid Travel. From cultural
            immersions to culinary expeditions, explore the world with small
            groups and local leaders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {intrepidTours.map((tour, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h4 className="font-medium text-gray-900 mb-2 text-sm leading-tight">
                {tour.name}
              </h4>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {tour.duration}
                </div>
                <div className="font-medium text-gray-900">{tour.price}</div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs h-8"
              >
                View Tour
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2">
            Explore All Intrepid Tours
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "all-experiences",
  ]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([
    "all-regions",
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleRegionToggle = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredExperiences = experiences.filter((experience) => {
    const hasSearchQuery = searchQuery.trim().length > 0;

    // If there's a search query, prioritize search results
    if (hasSearchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        experience.title.toLowerCase().includes(query) ||
        experience.category.toLowerCase().includes(query) ||
        experience.city?.toLowerCase().includes(query) ||
        experience.region?.toLowerCase().includes(query) ||
        experience.location?.toLowerCase().includes(query) ||
        experience.duration.toLowerCase().includes(query);

      // If searching, return results that match search regardless of filter state
      return matchesSearch;
    }

    // Only apply filters when there's no active search
    // Apply category filter
    if (!selectedCategories.includes("all-experiences")) {
      let matchesCategory = false;

      if (
        selectedCategories.includes("cooking-class") &&
        experience.category === "Cooking Class"
      )
        matchesCategory = true;
      if (
        selectedCategories.includes("wine-beer-tours") &&
        experience.category === "Wine & Beer Tours"
      )
        matchesCategory = true;
      if (
        selectedCategories.includes("cultural-food") &&
        experience.category === "Cultural Food"
      )
        matchesCategory = true;
      if (
        selectedCategories.includes("street-food") &&
        experience.category === "Street Food"
      )
        matchesCategory = true;

      if (!matchesCategory) return false;
    }

    // Apply region filter
    if (!selectedRegions.includes("all-regions")) {
      let matchesRegion = false;

      if (selectedRegions.includes("asia") && experience.region === "Asia")
        matchesRegion = true;
      if (selectedRegions.includes("europe") && experience.region === "Europe")
        matchesRegion = true;
      if (
        selectedRegions.includes("north-america") &&
        experience.region === "North America"
      )
        matchesRegion = true;
      if (
        selectedRegions.includes("south-america") &&
        experience.region === "South America"
      )
        matchesRegion = true;
      if (
        selectedRegions.includes("oceania") &&
        experience.region === "Oceania"
      )
        matchesRegion = true;
      if (selectedRegions.includes("africa") && experience.region === "Africa")
        matchesRegion = true;

      if (!matchesRegion) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FilterSection
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategoryToggle}
        selectedRegions={selectedRegions}
        onRegionToggle={handleRegionToggle}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <ExperiencesGrid
        experiences={filteredExperiences}
        searchQuery={searchQuery}
      />
      <IntrepidSection />
    </div>
  );
}
