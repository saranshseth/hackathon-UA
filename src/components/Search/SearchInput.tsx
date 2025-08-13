'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { useSearch } from '@/hooks/useSearch';
import { Search, MapPin, Tag, Compass } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  onSelect?: (value: string, type: string) => void;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search destinations, experiences, or countries...",
  onSelect,
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { suggestions, loading } = useSearch(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 0);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion: any) => {
    setQuery(suggestion.value);
    setShowSuggestions(false);
    
    // If onSelect callback is provided, call it
    if (onSelect) {
      onSelect(suggestion.value, suggestion.type);
    } else {
      // Redirect to search page with the selected suggestion
      const params = new URLSearchParams();
      params.set('q', suggestion.value);
      window.location.href = `/search?${params.toString()}`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        if (showSuggestions && suggestions.length > 0) {
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        if (showSuggestions && suggestions.length > 0) {
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (showSuggestions && selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else if (query.trim()) {
          // If no suggestion is selected but there's a query, redirect to search
          const params = new URLSearchParams();
          params.set('q', query);
          window.location.href = `/search?${params.toString()}`;
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'trip': return <Compass className="h-4 w-4" />;
      case 'country': return <MapPin className="h-4 w-4" />;
      case 'trip_type': return <Tag className="h-4 w-4" />;
      default: return <Search className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-ui-grey" />
        <Input
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 0 && setShowSuggestions(true)}
          placeholder={placeholder}
          className="pl-10"
        />
        {loading && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin h-4 w-4 border-2 border-ui-grey-weak border-t-brand-primary-intrepid-red rounded-full"></div>
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-ui-grey-weak rounded-lg shadow-lg max-h-64 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.type}-${suggestion.value}`}
              className={`flex items-center px-4 py-3 cursor-pointer transition-colors ${
                index === selectedIndex 
                  ? 'bg-brand-primary-sand' 
                  : 'hover:bg-brand-primary-sand'
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="mr-3 text-ui-grey">
                {getIcon(suggestion.type)}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-brand-primary-midnight">
                  {suggestion.value}
                </div>
                <div className="text-xs text-ui-grey-strong">
                  {suggestion.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;