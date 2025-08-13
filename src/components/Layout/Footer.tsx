"use client";

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Star, Shield, CreditCard } from 'lucide-react';
import { TripAdvisorWidget } from '@/components/ui/TripAdvisorWidget';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Trust Badges Section */}
        <div className="mb-12 pb-8 border-b border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* TripAdvisor Rating Widget */}
            <div className="text-center md:text-left">
              <TripAdvisorWidget 
                overallRating={4.5}
                totalReviews={1247}
                className="justify-center md:justify-start"
              />
              <div className="mt-2">
                <p className="text-xs text-green-400 hover:text-green-300 transition-colors">
                  View all reviews →
                </p>
              </div>
            </div>

            {/* Security Badge */}
            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end mb-2">
                <Shield className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm font-semibold">Trusted & Secure</span>
              </div>
              <p className="text-xs text-gray-400">
                ATOL Protected • ABN: 12 345 678 901
              </p>
              <p className="text-xs text-gray-400">
                Member of Australian Travel Industry
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Urban Adventures</h3>
            <p className="text-gray-400 mb-4">
              Best.Day.Ever. We're a network of local friends who create amazing day-long urban experiences. Our local experts show you their city's hidden gems and authentic culture.
            </p>
            <div className="flex space-x-4">
              <a href="/about" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.611-3.132-1.551-.684-.94-.684-2.145 0-3.085.684-.94 1.835-1.551 3.132-1.551s2.448.611 3.132 1.551c.684.94.684 2.145 0 3.085-.684.94-1.835 1.551-3.132 1.551z"/>
                </svg>
              </a>
              <a href="/blog" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Popular Destinations</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/destinations/australia" className="hover:text-white transition-colors">Australia</a></li>
              <li><a href="/destinations/japan" className="hover:text-white transition-colors">Japan</a></li>
              <li><a href="/destinations/egypt" className="hover:text-white transition-colors">Egypt</a></li>
              <li><a href="/destinations/vietnam" className="hover:text-white transition-colors">Vietnam</a></li>
              <li><a href="/destinations/india" className="hover:text-white transition-colors">India</a></li>
              <li><a href="/destinations/antarctica" className="hover:text-white transition-colors">Antarctica</a></li>
            </ul>
          </div>

          {/* Travel Styles */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Experience Types</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/tours/walking" className="hover:text-white transition-colors">Walking Tours</a></li>
              <li><a href="/tours/food" className="hover:text-white transition-colors">Food & Drink</a></li>
              <li><a href="/tours/culture" className="hover:text-white transition-colors">Culture Tours</a></li>
              <li><a href="/tours/local" className="hover:text-white transition-colors">Local Experiences</a></li>
              <li><a href="/tours/photography" className="hover:text-white transition-colors">Photo Tours</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="/booking-info" className="hover:text-white transition-colors">Booking Information</a></li>
              <li><a href="/travel-insurance" className="hover:text-white transition-colors">Travel Insurance</a></li>
              <li><a href="/responsible-travel" className="hover:text-white transition-colors">Responsible Travel</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>
        </div>

        {/* Legal and Copyright */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 lg:mb-0">
              © 2024 Urban Adventures. All rights reserved. ABN 12 345 678 901 • Licensed Travel Agent
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a>
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/accessibility" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}