'use client';

import React, { useState } from 'react';
import MapContainer from '@/components/Map/MapContainer';
import SearchInput from '@/components/Search/SearchInput';
import FilterPanel from '@/components/Filters/FilterPanel';
import Header from '@/components/Layout/Header';
import { useTrips } from '@/hooks/useTrips';
import { Trip, MapBounds, SearchFilters } from '@/types';
import { Button } from '@/components/ui/Button';
import { Filter, List } from 'lucide-react';

export default function MapPage() {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showSidebar, setShowSidebar] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  
  const { trips, loading, error, total } = useTrips(filters);

  // Handle URL parameters on mount
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newFilters: SearchFilters = {};
    
    const destination = params.get('destination');
    if (destination) newFilters.destination = destination;
    
    const tripTypes = params.get('tripTypes');
    if (tripTypes) newFilters.tripTypes = tripTypes.split(',');
    
    const search = params.get('search');
    if (search) newFilters.destination = search;
    
    if (Object.keys(newFilters).length > 0) {
      setFilters(newFilters);
    }
  }, []);

  const handleTripClick = (trip: Trip) => {
    setSelectedTrip(trip);
  };

  const handleBoundsChange = (bounds: MapBounds) => {
    // Filter trips based on map bounds
    console.log('Map bounds changed:', bounds);
  };

  return (
    <>
      <Header />
      <div className="h-screen flex flex-col">
        {/* Search Header */}
        <header className="bg-white border-b border-ui-grey-weak p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-brand-primary-midnight">
              Urban Adventures Map
            </h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <List className="h-4 w-4 mr-2" />
              {showSidebar ? 'Hide' : 'Show'} List
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <SearchInput
              placeholder="Search destinations..."
              className="w-64"
            />
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              {showFilters && (
                <div className="absolute right-0 top-12 w-80 z-50">
                  <FilterPanel
                    filters={filters}
                    onFiltersChange={setFilters}
                    onClose={() => setShowFilters(false)}
                  />
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 flex">
          {/* Sidebar */}
          {showSidebar && (
            <div className="w-80 bg-white border-r border-ui-grey-weak overflow-y-auto">
              <div className="p-4">
                <h2 className="font-semibold text-brand-primary-midnight mb-4">
                  {loading ? 'Loading...' : `${total} adventures found`}
                </h2>
                
                {error && (
                  <div className="text-ui-alert-error text-sm mb-4">
                    {error}
                  </div>
                )}
                
                <div className="space-y-4">
                  {trips.map((trip) => (
                    <div
                      key={trip.id}
                      className={`p-4 border border-ui-grey-weak rounded-lg cursor-pointer transition-colors hover:bg-brand-primary-sand ${
                        selectedTrip?.id === trip.id ? 'bg-brand-primary-sand border-brand-primary-intrepid-red' : ''
                      }`}
                      onClick={() => handleTripClick(trip)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-brand-primary-midnight">
                          {trip.name}
                        </h3>
                        <span className="text-brand-primary-intrepid-red font-medium">
                          ${trip.price}
                        </span>
                      </div>
                      
                      <p className="text-sm text-brand-primary-midnight-weak mb-2">
                        {trip.location.city}, {trip.location.country}
                      </p>
                      
                      <p className="text-sm text-ui-grey-strong line-clamp-2">
                        {trip.shortDescription}
                      </p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-ui-grey-strong">
                            {trip.duration} day{trip.duration > 1 ? 's' : ''}
                          </span>
                          <span className="text-xs text-ui-grey-strong">
                            ⭐ {trip.rating}
                          </span>
                        </div>
                        
                        {trip.badges.length > 0 && (
                          <span className="text-xs bg-brand-secondary-luxor text-brand-primary-midnight px-2 py-1 rounded">
                            {trip.badges[0].label}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Map */}
          <div className="flex-1 relative">
            <MapContainer
              trips={trips}
              onTripClick={handleTripClick}
              onBoundsChange={handleBoundsChange}
              className="w-full h-full"
            />
            
            {selectedTrip && (
              <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-brand-primary-midnight">
                    {selectedTrip.name}
                  </h3>
                  <button
                    onClick={() => setSelectedTrip(null)}
                    className="text-ui-grey-strong hover:text-brand-primary-midnight"
                  >
                    ×
                  </button>
                </div>
                
                <p className="text-sm text-brand-primary-midnight-weak mb-2">
                  {selectedTrip.location.city}, {selectedTrip.location.country}
                </p>
                
                <p className="text-sm text-ui-grey-strong mb-3">
                  {selectedTrip.shortDescription}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-brand-primary-intrepid-red font-semibold">
                    From ${selectedTrip.price}
                  </span>
                  <a href={`/trips/${selectedTrip.id}`}>
                    <Button size="sm">
                      View Details
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}