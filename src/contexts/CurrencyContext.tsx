"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Currency, SUPPORTED_CURRENCIES } from "@/components/Currency/CurrencySelector";
import { locationService, LocationData } from "@/lib/locationService";

interface CurrencyContextType {
  selectedCurrency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (price: number, fromCurrency?: string) => number;
  formatPrice: (price: number, currency?: Currency) => string;
  exchangeRates: Record<string, number>;
  isLoading: boolean;
  userLocation: LocationData | null;
  isLocationLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

interface CurrencyProviderProps {
  children: ReactNode;
}

// Mock exchange rates - replace with real API later
const MOCK_EXCHANGE_RATES: Record<string, number> = {
  AUD: 1.0,    // Base currency
  USD: 0.67,
  EUR: 0.61,
  GBP: 0.52,
  CAD: 0.90,
  JPY: 98.45,
  NZD: 1.07,
  SGD: 0.89,
};

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    SUPPORTED_CURRENCIES.find(c => c.code === "AUD") || SUPPORTED_CURRENCIES[0]
  );
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(MOCK_EXCHANGE_RATES);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState(true);

  // Detect user location and set currency
  useEffect(() => {
    const initializeLocationAndCurrency = async () => {
      try {
        // Check if user has saved currency preference first
        const savedCurrency = localStorage.getItem("selectedCurrency");
        if (savedCurrency) {
          const currency = SUPPORTED_CURRENCIES.find(c => c.code === savedCurrency);
          if (currency) {
            setSelectedCurrency(currency);
          }
        }
        
        // Try to get location in background (non-blocking)
        try {
          const location = await locationService.getUserLocation();
          console.log('Detected location:', location);
          setUserLocation(location);
          
          // Set currency from location if no saved preference
          if (!savedCurrency) {
            if (location && location.currencyCode) {
              const locationCurrency = SUPPORTED_CURRENCIES.find(c => c.code === location.currencyCode);
              if (locationCurrency) {
                console.log('Setting currency from location:', locationCurrency);
                setSelectedCurrency(locationCurrency);
              }
            }
          }
        } catch (locationError) {
          console.warn('Location detection failed:', locationError);
          // If location detection fails completely and no saved currency, use AUD default
          if (!savedCurrency) {
            const defaultCurrency = SUPPORTED_CURRENCIES.find(c => c.code === 'AUD');
            if (defaultCurrency) {
              setSelectedCurrency(defaultCurrency);
            }
          }
        }
      } catch (error) {
        console.warn('Currency initialization failed:', error);
      } finally {
        setIsLocationLoading(false);
      }
    };

    initializeLocationAndCurrency();
  }, []);

  // Save currency to localStorage when changed
  const setCurrency = (currency: Currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem("selectedCurrency", currency.code);
  };

  // Convert price from base currency (AUD) to selected currency
  const convertPrice = (price: number, fromCurrency: string = "AUD"): number => {
    if (fromCurrency === selectedCurrency.code) {
      return price;
    }

    // Convert from source currency to AUD first (if not already AUD)
    let audPrice = price;
    if (fromCurrency !== "AUD") {
      audPrice = price / (exchangeRates[fromCurrency] || 1);
    }

    // Convert from AUD to target currency
    const targetRate = exchangeRates[selectedCurrency.code] || 1;
    return audPrice * targetRate;
  };

  // Format price with currency symbol and proper formatting
  const formatPrice = (price: number, currency: Currency = selectedCurrency): string => {
    const convertedPrice = convertPrice(price);
    
    // Format based on currency
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.code,
      minimumFractionDigits: currency.code === "JPY" ? 0 : 2,
      maximumFractionDigits: currency.code === "JPY" ? 0 : 2,
    });

    return formatter.format(convertedPrice);
  };

  // TODO: Replace with real exchange rate API
  const fetchExchangeRates = async () => {
    setIsLoading(true);
    try {
      // Placeholder for real API call
      // const response = await fetch('https://api.exchangerate-api.com/v4/latest/AUD');
      // const data = await response.json();
      // setExchangeRates(data.rates);
      
      // For now, use mock rates
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      setExchangeRates(MOCK_EXCHANGE_RATES);
    } catch (error) {
      console.error("Failed to fetch exchange rates:", error);
      // Fallback to mock rates
      setExchangeRates(MOCK_EXCHANGE_RATES);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch exchange rates on mount and periodically
  useEffect(() => {
    fetchExchangeRates();
    
    // Update rates every 30 minutes
    const interval = setInterval(fetchExchangeRates, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const value: CurrencyContextType = {
    selectedCurrency,
    setCurrency,
    convertPrice,
    formatPrice,
    exchangeRates,
    isLoading,
    userLocation,
    isLocationLoading,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}

// Utility hook for easy price formatting
export function usePrice(price: number, fromCurrency: string = "AUD") {
  const { formatPrice, convertPrice, selectedCurrency } = useCurrency();
  
  const convertedPrice = convertPrice(price, fromCurrency);
  const formattedPrice = formatPrice(price, selectedCurrency);
  
  return {
    convertedPrice,
    formattedPrice,
    currency: selectedCurrency,
  };
}