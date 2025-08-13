'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SearchFilters } from '@/types';
import { TRIP_TYPES, DIFFICULTIES, AVAILABILITY_STATUS } from '@/lib/constants';
import { X, Filter } from 'lucide-react';

interface FilterPanelProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClose?: () => void;
  className?: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  onClose,
  className = ""
}) => {
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    if (onClose) onClose();
  };

  const handleClearFilters = () => {
    const emptyFilters: SearchFilters = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const toggleArrayFilter = (key: keyof SearchFilters, value: string) => {
    const currentArray = (localFilters[key] as string[]) || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    handleFilterChange(key, newArray.length > 0 ? newArray : undefined);
  };

  return (
    <div className={`bg-white border border-ui-grey-weak rounded-lg shadow-lg ${className}`}>
      <div className="p-4 border-b border-ui-grey-weak">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Filter className="h-5 w-5 mr-2 text-brand-primary-midnight" />
            <h3 className="text-lg font-semibold text-brand-primary-midnight">
              Filters
            </h3>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6 max-h-96 overflow-y-auto">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-brand-primary-midnight mb-2">
            Price Range (USD)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={localFilters.priceRange?.[0] || ''}
              onChange={(e) => {
                const min = e.target.value ? parseInt(e.target.value) : undefined;
                const max = localFilters.priceRange?.[1];
                handleFilterChange('priceRange', min !== undefined || max !== undefined ? [min || 0, max || 999999] : undefined);
              }}
            />
            <Input
              type="number"
              placeholder="Max"
              value={localFilters.priceRange?.[1] || ''}
              onChange={(e) => {
                const max = e.target.value ? parseInt(e.target.value) : undefined;
                const min = localFilters.priceRange?.[0];
                handleFilterChange('priceRange', min !== undefined || max !== undefined ? [min || 0, max || 999999] : undefined);
              }}
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-brand-primary-midnight mb-2">
            Duration (Days)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={localFilters.durationRange?.[0] || ''}
              onChange={(e) => {
                const min = e.target.value ? parseInt(e.target.value) : undefined;
                const max = localFilters.durationRange?.[1];
                handleFilterChange('durationRange', min !== undefined || max !== undefined ? [min || 1, max || 365] : undefined);
              }}
            />
            <Input
              type="number"
              placeholder="Max"
              value={localFilters.durationRange?.[1] || ''}
              onChange={(e) => {
                const max = e.target.value ? parseInt(e.target.value) : undefined;
                const min = localFilters.durationRange?.[0];
                handleFilterChange('durationRange', min !== undefined || max !== undefined ? [min || 1, max || 365] : undefined);
              }}
            />
          </div>
        </div>

        {/* Trip Types */}
        <div>
          <label className="block text-sm font-medium text-brand-primary-midnight mb-2">
            Trip Types
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TRIP_TYPES.map(type => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(localFilters.tripTypes || []).includes(type)}
                  onChange={() => toggleArrayFilter('tripTypes', type)}
                  className="rounded border-ui-grey-weak text-brand-primary-intrepid-red focus:ring-brand-primary-intrepid-red"
                />
                <span className="text-sm text-brand-primary-midnight capitalize">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-brand-primary-midnight mb-2">
            Difficulty
          </label>
          <div className="space-y-2">
            {DIFFICULTIES.map(difficulty => (
              <label key={difficulty} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(localFilters.difficulty || []).includes(difficulty)}
                  onChange={() => toggleArrayFilter('difficulty', difficulty)}
                  className="rounded border-ui-grey-weak text-brand-primary-intrepid-red focus:ring-brand-primary-intrepid-red"
                />
                <span className="text-sm text-brand-primary-midnight">
                  {difficulty}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-brand-primary-midnight mb-2">
            Availability
          </label>
          <div className="space-y-2">
            {AVAILABILITY_STATUS.map(status => (
              <label key={status} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(localFilters.availability || []).includes(status)}
                  onChange={() => toggleArrayFilter('availability', status)}
                  className="rounded border-ui-grey-weak text-brand-primary-intrepid-red focus:ring-brand-primary-intrepid-red"
                />
                <span className="text-sm text-brand-primary-midnight">
                  {status}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-ui-grey-weak">
        <div className="flex space-x-2">
          <Button onClick={handleApplyFilters} className="flex-1">
            Apply Filters
          </Button>
          <Button variant="outline" onClick={handleClearFilters}>
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;