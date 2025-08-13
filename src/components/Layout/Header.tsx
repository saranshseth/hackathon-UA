"use client";

import { useState } from "react";
import Link from "next/link";
import LoginButton from "@/components/Auth/LoginButton";
import { Button } from "@/components/ui/Button";
import { Heart, Map, Search, Menu, X, User } from "lucide-react";
import Image from "next/image";
import SearchInput from "@/components/Search/SearchInput";
import CurrencySelector from "@/components/Currency/CurrencySelector";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { selectedCurrency, setCurrency } = useCurrency();

  return (
    <>
      <header className="bg-white border-b border-ui-grey-weak sticky top-0 z-40">
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <div className="bg-white px-4 2xl:px-8 pt-3.5 pb-[15px]">
            <div className="h-[70px] w-full max-w-7xl mx-auto flex items-center justify-between">
              {/* Left side - Logo */}
              <div className="flex-shrink-0">
                <Link href="/" className="block">
                  <Image
                    src="/intrepid-ua.webp"
                    alt="UA logo"
                    width={106}
                    height={40}
                    className="h-10"
                  />
                </Link>
              </div>

              {/* Center - Search Bar */}
              <div className="flex-1 max-w-md mx-8">
                <div className="relative w-full h-[42px] rounded-full border border-[#dedede]">
                  <div className="flex items-center h-full pl-2.5 pr-4 py-2">
                    <div className="w-5 h-5 mr-1.5 flex items-center justify-center flex-shrink-0">
                      <Search className="w-[13.75px] h-[13.75px] text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search"
                      className="flex-1 text-[15px] font-semibold text-gray-600 bg-transparent border-none outline-none placeholder:text-[#bebebe]"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const target = e.target as HTMLInputElement;
                          const params = new URLSearchParams();
                          if (target.value) params.set('q', target.value);
                          window.location.href = `/search${params.toString() ? `?${params.toString()}` : ''}`;
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Right side - Navigation and Actions */}
              <div className="flex items-center gap-6 flex-shrink-0">
                {/* Navigation Menu */}
                <nav className="hidden xl:flex items-center gap-6">
                  <Link
                    href="/destinations"
                    className="text-[#757575] text-[15px] font-medium leading-6 hover:text-brand-primary-intrepid-red transition-colors whitespace-nowrap"
                  >
                    Destinations
                  </Link>
                  <Link
                    href="/experiences"
                    className="text-[#757575] text-[15px] font-medium leading-6 hover:text-brand-primary-intrepid-red transition-colors whitespace-nowrap"
                  >
                    Categories
                  </Link>
                  <Link
                    href="/about"
                    className="text-[#757575] text-[15px] font-medium leading-6 hover:text-brand-primary-intrepid-red transition-colors whitespace-nowrap"
                  >
                    About
                  </Link>
                </nav>

                {/* Right actions */}
                <div className="flex items-center gap-3">
                  {/* Wishlist Icon */}
                  <Link href="/wishlist" className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Heart className="w-5 h-5 text-[#757575]" />
                  </Link>

                  {/* Currency selector */}
                  <div className="hidden lg:block">
                    <CurrencySelector
                      selectedCurrency={selectedCurrency}
                      onCurrencyChange={setCurrency}
                      showFlag={false}
                    />
                  </div>

                  {/* Sign in button */}
                  <Link 
                    href="/auth/signin" 
                    className="bg-black/85 text-white px-4 py-2 rounded-lg text-[13px] font-semibold leading-[19.5px] hover:bg-black transition-colors whitespace-nowrap"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tablet Header */}
        <div className="hidden md:block lg:hidden">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left: Logo */}
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/intrepid-ua.webp"
                  alt="UA logo"
                  width={120}
                  height={45}
                  className="h-11"
                />
              </Link>

              {/* Center: Search Bar */}
              <div className="flex-1 max-w-sm mx-6">
                <div className="relative w-full h-10 rounded-full border border-[#dedede]">
                  <div className="flex items-center h-full pl-3 pr-4 py-2">
                    <Search className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="flex-1 text-sm text-gray-600 bg-transparent border-none outline-none placeholder:text-[#bebebe]"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const target = e.target as HTMLInputElement;
                          const params = new URLSearchParams();
                          if (target.value) params.set('q', target.value);
                          window.location.href = `/search${params.toString() ? `?${params.toString()}` : ''}`;
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link href="/wishlist" className="p-2 rounded-full hover:bg-gray-100">
                  <Heart className="w-5 h-5 text-[#757575]" />
                </Link>
                <CurrencySelector
                  selectedCurrency={selectedCurrency}
                  onCurrencyChange={setCurrency}
                  showFlag={false}
                  compact={true}
                />
                <Link href="/auth/signin" className="bg-black/85 text-white px-3 py-1.5 rounded-md text-sm font-semibold">
                  Sign in
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5 text-[#757575]" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Left: Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6 text-[#757575]" />
              </Button>

              {/* Center: Logo */}
              <Link
                href="/"
                className="absolute left-1/2 transform -translate-x-1/2"
              >
                <Image
                  src="/intrepid-ua.webp"
                  alt="Intrepid"
                  width={100}
                  height={38}
                  className="h-9"
                />
              </Link>

              {/* Right: Actions */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileSearchOpen(true)}
                  className="p-2"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5 text-[#757575]" />
                </Button>
                <Link href="/wishlist">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2"
                    aria-label="Wishlist"
                  >
                    <Heart className="h-5 w-5 text-[#757575]" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Search Overlay */}
          {isMobileSearchOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-b border-[#dedede] p-4 z-50 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="relative w-full h-10 rounded-full border border-[#dedede]">
                    <div className="flex items-center h-full pl-3 pr-4 py-2">
                      <Search className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Search destinations..."
                        className="flex-1 text-sm text-gray-600 bg-transparent border-none outline-none placeholder:text-[#bebebe]"
                        autoFocus
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const target = e.target as HTMLInputElement;
                            const params = new URLSearchParams();
                            if (target.value) params.set('q', target.value);
                            window.location.href = `/search${params.toString() ? `?${params.toString()}` : ''}`;
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileSearchOpen(false)}
                  className="p-2 flex-shrink-0"
                >
                  <X className="h-5 w-5 text-[#757575]" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 lg:hidden">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <Image
                  src="/intrepid-ua.webp"
                  alt="Intrepid Travel"
                  width={120}
                  height={46}
                  className="h-11"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2"
                >
                  <X className="h-6 w-6 text-[#757575]" />
                </Button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-6">
                <Link
                  href="/destinations"
                  className="block text-[#757575] font-medium text-base py-2 hover:text-brand-primary-intrepid-red transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Destinations
                </Link>
                <Link
                  href="/experiences"
                  className="block text-[#757575] font-medium text-base py-2 hover:text-brand-primary-intrepid-red transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link
                  href="/about"
                  className="block text-[#757575] font-medium text-base py-2 hover:text-brand-primary-intrepid-red transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/map"
                  className="block text-[#757575] font-medium text-base py-2 hover:text-brand-primary-intrepid-red transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  View Map
                </Link>
              </nav>

              {/* Currency selector */}
              <div className="mt-8">
                <div className="text-[#757575] text-base mb-3">Currency:</div>
                <CurrencySelector
                  selectedCurrency={selectedCurrency}
                  onCurrencyChange={setCurrency}
                  showFlag={true}
                  className="justify-start"
                />
              </div>

              {/* User Account Section */}
              <div className="mt-8 pt-6 border-t border-[#dedede]">
                <Link
                  href="/auth/signin"
                  className="flex items-center justify-center w-full bg-black/85 text-white py-3 px-6 rounded-lg font-semibold hover:bg-black transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In / Register
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
