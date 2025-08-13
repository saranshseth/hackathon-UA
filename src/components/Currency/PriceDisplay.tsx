"use client";

import { useCurrency } from "@/contexts/CurrencyContext";

interface PriceDisplayProps {
  price: number;
  fromCurrency?: string;
  className?: string;
  showOriginal?: boolean;
}

export default function PriceDisplay({
  price,
  fromCurrency = "AUD",
  className = "",
  showOriginal = false,
}: PriceDisplayProps) {
  const { formatPrice, selectedCurrency, convertPrice } = useCurrency();

  const convertedPrice = convertPrice(price, fromCurrency);
  const formattedPrice = formatPrice(convertedPrice, selectedCurrency);

  return (
    <span className={`font-semibold ${className}`}>
      {formattedPrice}
      {showOriginal && fromCurrency !== selectedCurrency.code && (
        <span className="text-xs text-gray-500 ml-1">
          (was {price} {fromCurrency})
        </span>
      )}
    </span>
  );
}

// Helper component for price ranges
export function PriceRange({
  minPrice,
  maxPrice,
  fromCurrency = "AUD",
  className = "",
}: {
  minPrice: number;
  maxPrice: number;
  fromCurrency?: string;
  className?: string;
}) {
  const { formatPrice, selectedCurrency, convertPrice } = useCurrency();

  const convertedMinPrice = convertPrice(minPrice, fromCurrency);
  const convertedMaxPrice = convertPrice(maxPrice, fromCurrency);

  return (
    <span className={`font-semibold ${className}`}>
      {formatPrice(convertedMinPrice, selectedCurrency)} - {formatPrice(convertedMaxPrice, selectedCurrency)}
    </span>
  );
}