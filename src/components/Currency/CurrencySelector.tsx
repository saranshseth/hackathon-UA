"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  flag?: string;
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: "AUD", symbol: "$", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧" },
  { code: "CAD", symbol: "$", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "NZD", symbol: "$", name: "New Zealand Dollar", flag: "🇳🇿" },
  { code: "SGD", symbol: "$", name: "Singapore Dollar", flag: "🇸🇬" },
];

interface CurrencySelectorProps {
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  className?: string;
  showFlag?: boolean;
  compact?: boolean;
}

export default function CurrencySelector({
  selectedCurrency,
  onCurrencyChange,
  className = "",
  showFlag = true,
  compact = false,
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCurrencySelect = (currency: Currency) => {
    onCurrencyChange(currency);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 text-[#757575] hover:text-brand-primary-intrepid-red transition-colors ${
          compact ? "text-sm" : "text-[15px]"
        }`}
        aria-label="Select currency"
      >
        {showFlag && selectedCurrency.flag && (
          <span className="text-sm">{selectedCurrency.flag}</span>
        )}
        <span className={compact ? "text-base" : "text-lg"}>{selectedCurrency.symbol}</span>
        <span className={`font-semibold leading-6 ${compact ? "text-sm" : "text-[15px]"}`}>
          {selectedCurrency.code}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-[#dedede] rounded-lg shadow-lg z-50">
          <div className="py-2">
            <div className="px-4 py-2 text-sm font-medium text-[#757575] border-b border-[#dedede]">
              Select Currency
            </div>
            <div className="max-h-64 overflow-y-auto">
              {SUPPORTED_CURRENCIES.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => handleCurrencySelect(currency)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                    selectedCurrency.code === currency.code
                      ? "bg-gray-50 text-brand-primary-intrepid-red"
                      : "text-[#757575]"
                  }`}
                >
                  {showFlag && currency.flag && (
                    <span className="text-lg">{currency.flag}</span>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{currency.code}</span>
                      <span className="text-gray-400">{currency.symbol}</span>
                    </div>
                    <div className="text-sm text-gray-500">{currency.name}</div>
                  </div>
                  {selectedCurrency.code === currency.code && (
                    <div className="w-2 h-2 bg-brand-primary-intrepid-red rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}