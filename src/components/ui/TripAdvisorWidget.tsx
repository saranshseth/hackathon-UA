"use client";

import React from "react";
import { Star } from "lucide-react";

interface TripAdvisorWidgetProps {
  overallRating?: number;
  totalReviews?: number;
  className?: string;
  showDetailed?: boolean;
}

export function TripAdvisorWidget({
  overallRating = 4.5,
  totalReviews = 1247,
  className = "",
  showDetailed = false,
}: TripAdvisorWidgetProps) {
  const ratingBreakdown = [
    { stars: 5, count: 687, percentage: 55 },
    { stars: 4, count: 374, percentage: 30 },
    { stars: 3, count: 125, percentage: 10 },
    { stars: 2, count: 37, percentage: 3 },
    { stars: 1, count: 24, percentage: 2 },
  ];

  const renderStars = (rating: number, size: "sm" | "md" = "md") => {
    const sizeClasses = size === "sm" ? "w-3 h-3" : "w-4 h-4";

    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses} ${
              star <= Math.floor(rating)
                ? "fill-green-500 text-green-500"
                : star <= rating
                ? "fill-green-300 text-green-300"
                : "fill-gray-300 text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  if (showDetailed) {
    return (
      <a
        href="https://www.tripadvisor.com.au/Attraction_Review-g255100-d1856798-Reviews-Melbourne_Urban_Adventures-Melbourne_Victoria.html"
        target="_blank"
        rel="noopener noreferrer"
        className={`block bg-white rounded-lg p-4 shadow-lg border hover:shadow-xl transition-shadow duration-300 ${className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <img
              src="/csv/logos/trip-advisor-logo.png"
              alt="TripAdvisor"
              className="h-6 mr-2"
            />
            <span className="text-sm font-medium text-gray-600">
              TripAdvisor
            </span>
          </div>
          <div className="text-xs text-gray-500">Traveler Reviews</div>
        </div>

        {/* Overall Rating */}
        <div className="flex items-center mb-4">
          {renderStars(overallRating)}
          <span className="ml-2 text-lg font-bold text-gray-900">
            {overallRating}
          </span>
          <span className="ml-1 text-sm text-gray-500">
            ({totalReviews.toLocaleString()} reviews)
          </span>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-1">
          {ratingBreakdown.map((item) => (
            <div key={item.stars} className="flex items-center text-xs">
              <span className="w-8 text-gray-600">{item.stars}★</span>
              <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
              <span className="w-8 text-gray-500">{item.count}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Melbourne Urban Adventures</span>
            <span className="text-green-600 hover:text-green-700">
              View all reviews →
            </span>
          </div>
        </div>
      </a>
    );
  }

  // Compact version for footer
  return (
    <a
      href="https://www.tripadvisor.com.au/Attraction_Review-g255100-d1856798-Reviews-Melbourne_Urban_Adventures-Melbourne_Victoria.html"
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center group ${className}`}
    >
      <div className="flex items-center">
        <img
          src="/csv/logos/trip-advisor-logo.png"
          alt="TripAdvisor"
          className="h-[4rem] mr-2"
        />
        {renderStars(overallRating, "sm")}
        <div className="ml-2">
          <div className="text-sm font-semibold text-white group-hover:text-green-300 transition-colors">
            {overallRating}/5
          </div>
          <div className="text-xs text-gray-400">
            {totalReviews.toLocaleString()} reviews
          </div>
        </div>
      </div>
    </a>
  );
}
