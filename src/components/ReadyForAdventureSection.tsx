"use client";

import React from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Compass } from 'lucide-react';

export function ReadyForAdventureSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#FF2828]/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF2828]/10 rounded-full mb-6">
          <Compass className="w-8 h-8 text-[#FF2828]" />
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Ready for your next adventure?
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Browse over 700 destinations worldwide and find your perfect 
          travel experience
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-[#FF2828] hover:bg-[#E61E1E] text-white px-8 py-4 rounded-xl shadow-lg shadow-[#FF2828]/25 hover:shadow-xl hover:shadow-[#FF2828]/30 transition-all duration-300 group"
          >
            Explore destinations
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            className="px-8 py-4 rounded-xl border-2 border-gray-200 hover:border-[#FF2828] hover:text-[#FF2828] transition-all duration-300"
          >
            Plan my trip
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span>100,000+ happy travelers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span>50+ years of experience</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#FF2828] rounded-full" />
              <span>Award-winning service</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}