"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Star,
  Heart,
  Check,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { clientDataProvider } from "@/lib/clientDataProvider";
import { EnhancedProduct } from "@/lib/enhancedDataProvider";
import PriceDisplay from "@/components/Currency/PriceDisplay";
import Header from "@/components/Layout/Header";
import Link from "next/link";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<EnhancedProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    async function loadProduct() {
      try {
        const products = await clientDataProvider.getAllProducts();
        const foundProduct = products.find((p) => p.id === params.id);
        if (foundProduct) {
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h1>
          <Button onClick={() => router.push("/")}>Return to Home</Button>
        </div>
      </div>
    );
  }

  const images = [
    product.images.hero,
    "https://images.unsplash.com/photo-1514515511788-fafb6278dafe?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
      {/* Back button */}
      <div className="bg-white border-b border-gray-200 sticky top-[73px] z-20">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Image Gallery */}
          <div>
            <div className="relative rounded-lg overflow-hidden mb-4">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-[500px] object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop";
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
                  }`}
                />
              </Button>
            </div>

            {/* Thumbnail images */}
            <div className="grid grid-cols-3 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-brand-primary-intrepid-red"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-24 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop";
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div>
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.categories.map((category, index) => (
                <Badge key={index} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <MapPin className="h-4 w-4" />
              <span>
                {product.destinationName}, {product.destinationCountry}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-lg">{product.rating}</span>
              </div>
              <span className="text-gray-600">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-0 mb-6">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Duration</div>
                  <div className="font-semibold">{product.duration}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <Users className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Group Size</div>
                  <div className="font-semibold">
                    {product.private ? "Private" : "Small group"}
                  </div>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-white p-6 rounded-lg mb-6">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">From</div>
                  <div className="text-3xl font-bold text-gray-900">
                    <PriceDisplay
                      price={product.pricing.adult}
                      fromCurrency={product.currency}
                    />
                  </div>
                  <div className="text-sm text-gray-600">per person</div>
                </div>
                <Button className="bg-[#FF2828] hover:bg-[#E61E1E] text-white px-8 py-3">
                  Book Now
                </Button>
              </div>

              {/* What's included */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">What's included</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Professional guide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Hotel pickup and drop-off</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Small group experience</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg text-green-700">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">Available daily</span>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.overview}
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">Highlights</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary-intrepid-red mt-1">
                      •
                    </span>
                    <span>
                      Experience the best of {product.destinationName}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary-intrepid-red mt-1">
                      •
                    </span>
                    <span>
                      Small group tour with maximum{" "}
                      {product.private ? "1 group" : "12 people"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary-intrepid-red mt-1">
                      •
                    </span>
                    <span>Led by experienced local guides</span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="itinerary" className="mt-6">
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-brand-primary-intrepid-red text-white rounded-full flex items-center justify-center font-semibold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Meeting Point</h4>
                      <p className="text-gray-600">
                        Start your adventure at the designated meeting point in{" "}
                        {product.destinationName}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-brand-primary-intrepid-red text-white rounded-full flex items-center justify-center font-semibold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Main Activity</h4>
                      <p className="text-gray-600">
                        Enjoy the main experience with your guide and group
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-brand-primary-intrepid-red text-white rounded-full flex items-center justify-center font-semibold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Return</h4>
                      <p className="text-gray-600">
                        Tour concludes back at the starting point
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl font-bold">{product.rating}</div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">
                      Based on {product.reviewCount} reviews
                    </div>
                  </div>
                </div>

                <div className="text-center py-8 text-gray-500">
                  Reviews coming soon...
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Placeholder for related products */}
            <div className="text-center py-12 bg-white rounded-lg text-gray-500 md:col-span-3">
              Related products coming soon...
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
