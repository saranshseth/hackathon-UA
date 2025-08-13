"use client";

import { useCurrency } from "@/contexts/CurrencyContext";
import { Currency, SUPPORTED_CURRENCIES } from "./CurrencySelector";
import { Calculator, TrendingUp, Clock } from "lucide-react";
import { useState } from "react";

interface CurrencyConversionAreaProps {
  className?: string;
  showCalculator?: boolean;
  showTrends?: boolean;
  showLastUpdated?: boolean;
}

export default function CurrencyConversionArea({
  className = "",
  showCalculator = true,
  showTrends = false,
  showLastUpdated = true,
}: CurrencyConversionAreaProps) {
  const { selectedCurrency, exchangeRates, isLoading, convertPrice, formatPrice } = useCurrency();
  const [calculatorAmount, setCalculatorAmount] = useState<string>("100");
  const [calculatorFromCurrency, setCalculatorFromCurrency] = useState<Currency>(
    SUPPORTED_CURRENCIES.find(c => c.code === "AUD") || SUPPORTED_CURRENCIES[0]
  );

  const baseCurrency = SUPPORTED_CURRENCIES.find(c => c.code === "AUD") || SUPPORTED_CURRENCIES[0];
  const currentTime = new Date().toLocaleTimeString();

  // Calculate converted amount for calculator
  const calculatedAmount = calculatorAmount
    ? convertPrice(parseFloat(calculatorAmount) || 0, calculatorFromCurrency.code)
    : 0;

  return (
    <div className={`bg-white border border-[#dedede] rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-[#757575]" />
        <h3 className="text-lg font-semibold text-[#757575]">Currency Conversion</h3>
        {isLoading && (
          <div className="w-4 h-4 border-2 border-[#757575] border-t-transparent rounded-full animate-spin ml-2"></div>
        )}
      </div>

      {/* Current Exchange Rate Display */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Current Rate</div>
            <div className="text-xl font-bold text-[#757575]">
              1 {baseCurrency.code} = {exchangeRates[selectedCurrency.code]?.toFixed(4) || "1.0000"} {selectedCurrency.code}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl">{selectedCurrency.flag}</div>
            <div className="text-sm text-gray-600">{selectedCurrency.name}</div>
          </div>
        </div>
      </div>

      {/* Quick Conversion Calculator */}
      {showCalculator && (
        <div className="mb-6">
          <h4 className="text-md font-medium text-[#757575] mb-3">Quick Calculator</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Amount Input */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Amount</label>
              <input
                type="number"
                value={calculatorAmount}
                onChange={(e) => setCalculatorAmount(e.target.value)}
                className="w-full px-3 py-2 border border-[#dedede] rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary-intrepid-red/20 focus:border-brand-primary-intrepid-red"
                placeholder="Enter amount"
              />
            </div>

            {/* From Currency */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">From</label>
              <select
                value={calculatorFromCurrency.code}
                onChange={(e) => {
                  const currency = SUPPORTED_CURRENCIES.find(c => c.code === e.target.value);
                  if (currency) setCalculatorFromCurrency(currency);
                }}
                className="w-full px-3 py-2 border border-[#dedede] rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary-intrepid-red/20 focus:border-brand-primary-intrepid-red"
              >
                {SUPPORTED_CURRENCIES.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Result */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">To {selectedCurrency.code}</label>
              <div className="px-3 py-2 bg-gray-50 border border-[#dedede] rounded-md text-lg font-semibold text-[#757575]">
                {formatPrice(calculatedAmount, selectedCurrency)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exchange Rate Grid */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-[#757575] mb-3">Exchange Rates (1 {baseCurrency.code})</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SUPPORTED_CURRENCIES.filter(c => c.code !== baseCurrency.code).map((currency) => (
            <div
              key={currency.code}
              className={`p-3 border rounded-lg transition-colors ${
                currency.code === selectedCurrency.code
                  ? "border-brand-primary-intrepid-red bg-red-50"
                  : "border-[#dedede] hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{currency.flag}</span>
                <span className="text-sm font-medium text-[#757575]">{currency.code}</span>
              </div>
              <div className="text-lg font-bold text-[#757575]">
                {exchangeRates[currency.code]?.toFixed(4) || "-.----"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trends Section (Placeholder for future implementation) */}
      {showTrends && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-[#757575]" />
            <h4 className="text-md font-medium text-[#757575]">Rate Trends</h4>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
            <p className="text-sm">Trend analysis coming soon...</p>
            <p className="text-xs mt-1">This area can be modified to show historical data, charts, etc.</p>
          </div>
        </div>
      )}

      {/* Last Updated */}
      {showLastUpdated && (
        <div className="flex items-center gap-2 text-xs text-gray-500 border-t border-[#dedede] pt-4">
          <Clock className="w-3 h-3" />
          <span>Rates last updated: {currentTime}</span>
          <span className="ml-auto text-brand-primary-intrepid-red">• Live</span>
        </div>
      )}

      {/* Developer Note */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800">
          <strong>Developer Note:</strong> This conversion area is designed to be easily modifiable. 
          You can add real-time API integration, historical charts, rate alerts, or other features by 
          modifying the CurrencyConversionArea component and CurrencyContext.
        </p>
      </div>
    </div>
  );
}