"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { TripAdvisorWidget } from "@/components/ui/TripAdvisorWidget";
import { Phone, Mail, Globe, MapPin, Star, Users, Clock } from "lucide-react";

export default function Footer() {
  const popularTours = [
    {
      name: "Melbourne Booze Makes History Better",
      duration: "3 hours",
      rating: 4.9,
    },
    {
      name: "Craft Beer Lovers' Guide to Melbourne",
      duration: "4 hours",
      rating: 4.8,
    },
    {
      name: "Multicultural Markets of Melbourne Tour",
      duration: "3.5 hours",
      rating: 4.7,
    },
    {
      name: "Melbourne: A Foodie's Guide to Root to Fruit",
      duration: "4 hours",
      rating: 4.9,
    },
    {
      name: "Melbourne Bites & Sights (with Eureka Skydeck)",
      duration: "5 hours",
      rating: 4.8,
    },
  ];

  const popularCities = [
    { name: "Melbourne", tours: "25+ experiences" },
    { name: "Bangkok", tours: "18+ experiences" },
    { name: "Tokyo", tours: "22+ experiences" },
    { name: "Paris", tours: "20+ experiences" },
    { name: "Barcelona", tours: "15+ experiences" },
    { name: "Istanbul", tours: "12+ experiences" },
  ];

  const tripCategories = [
    "City Highlights",
    "Food & Drink tours",
    "Off The Beaten Path",
    "Private Tours",
    "Cultural Experiences",
    "Cooking Classes",
  ];
  const aboutUsLinks = [
    "Intrepid Urban Adventures",
    "Responsible Travel",
    "FAQs",
    "Safe Space Policy",
    "Booking Conditions",
    "Privacy Policy",
  ];

  return (
    <footer className="bg-white border-t border-gray-200 px-[0px] py-[21px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 px-[28px] py-[54px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 mb-12">
          {/* Contact Details */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="text-2xl font-bold text-red-600 mb-2">
                intrepid
              </div>
              <div className="text-sm font-medium text-gray-900">
                Urban Adventures
              </div>
              <div className="text-sm text-gray-600">Melbourne</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-700 text-sm">
                <Phone className="h-4 w-4 mr-2 text-red-600" />
                <span>+61 3 8672 6442</span>
              </div>
              <div className="flex items-start text-gray-700 text-sm">
                <Mail className="h-4 w-4 mr-2 mt-0.5 text-red-600 flex-shrink-0" />
                <span className="break-all">
                  info@melbourneurbanadventures.com
                </span>
              </div>
              <div className="flex items-start text-gray-700 text-sm">
                <Globe className="h-4 w-4 mr-2 mt-0.5 text-red-600 flex-shrink-0" />
                <span className="break-all">
                  https://www.urbanadventures.com/melbourne
                </span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 mb-4">Contact Us</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div>
                  <a href="#" className="hover:text-red-600 transition-colors">
                    Contact Us
                  </a>
                </div>
                <div>
                  <a href="#" className="hover:text-red-600 transition-colors">
                    Become an Agent
                  </a>
                </div>
                <div>
                  <a href="#" className="hover:text-red-600 transition-colors">
                    Become an In Focus Partner
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* About Us */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-gray-900 mb-4">About Us</h4>
            <ul className="space-y-2">
              {aboutUsLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-red-600 transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Trip Categories */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-gray-900 mb-4">
              Trip categories
            </h4>
            <ul className="space-y-2">
              {tripCategories.map((category, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-red-600 transition-colors text-sm"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Cities */}
          <div className="lg:col-span-2 mx-[0px] m-[0px] mx-[16px] my-[0px]">
            <h4 className="font-semibold text-gray-900 mb-4">Visit Next</h4>
            <ul className="space-y-2">
              {popularCities.map((city, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="block text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <div className="text-sm font-medium">{city.name}</div>
                    <div className="text-xs text-gray-500">{city.tours}</div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tours */}
          <div className="lg:col-span-3 mx-[-24px] my-[0px] my-[0px] px-[-12px] py-[0px] my-[0px] my-[0px] my-[0px]">
            <h4 className="font-semibold text-gray-900 mb-4">
              Popular experiences
            </h4>
            <ul className="space-y-3">
              {popularTours.map((tour, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="block text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <div className="text-sm font-medium mb-1 line-clamp-2 leading-tight">
                      {tour.name}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {tour.duration}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {tour.rating}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-4 md:mb-0">
              © 2024 Intrepid Urban Adventures. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-600 hover:text-red-600">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-red-600">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-red-600">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
