'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Trip, MapBounds } from '@/types';
import { DEFAULT_MAP_CENTER } from '@/lib/constants';

interface MapContainerProps {
  trips: Trip[];
  onTripClick?: (trip: Trip) => void;
  onBoundsChange?: (bounds: MapBounds) => void;
  className?: string;
}

const MapContainer: React.FC<MapContainerProps> = ({
  trips,
  onTripClick,
  onBoundsChange,
  className = ''
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    
    if (!mapboxToken) {
      console.warn('Mapbox token not found. Please add NEXT_PUBLIC_MAPBOX_TOKEN to your environment variables.');
      return;
    }

    if (!mapContainer.current) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [DEFAULT_MAP_CENTER.lng, DEFAULT_MAP_CENTER.lat],
      zoom: DEFAULT_MAP_CENTER.zoom,
      projection: 'globe' as any
    });

    map.current.on('load', () => {
      setIsMapLoaded(true);
      
      map.current!.on('moveend', () => {
        if (onBoundsChange && map.current) {
          const bounds = map.current.getBounds();
          if (bounds) {
            onBoundsChange({
              north: bounds.getNorth(),
              south: bounds.getSouth(),
              east: bounds.getEast(),
              west: bounds.getWest()
            });
          }
        }
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [onBoundsChange]);

  useEffect(() => {
    if (!map.current || !isMapLoaded) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers for trips
    trips.forEach(trip => {
      const el = document.createElement('div');
      el.className = 'trip-marker';
      el.innerHTML = `
        <div class="w-8 h-8 bg-brand-primary-intrepid-red rounded-full flex items-center justify-center cursor-pointer transform transition-transform hover:scale-110 shadow-lg">
          <div class="w-3 h-3 bg-white rounded-full"></div>
        </div>
      `;

      el.addEventListener('click', () => {
        if (onTripClick) {
          onTripClick(trip);
        }
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat([trip.location.lng, trip.location.lat])
        .addTo(map.current!);

      // Add popup on hover
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: [0, -10]
      }).setHTML(`
        <div class="p-2 max-w-xs">
          <h3 class="font-semibold text-sm">${trip.name}</h3>
          <p class="text-xs text-gray-600">${trip.location.city}, ${trip.location.country}</p>
          <p class="text-xs font-medium text-brand-primary-intrepid-red">From $${trip.price}</p>
        </div>
      `);

      el.addEventListener('mouseenter', () => {
        marker.setPopup(popup).togglePopup();
      });

      el.addEventListener('mouseleave', () => {
        popup.remove();
      });

      markers.current.push(marker);
    });
  }, [trips, isMapLoaded, onTripClick]);

  if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    return (
      <div className={`flex items-center justify-center bg-ui-grey-weaker ${className}`}>
        <div className="text-center p-8">
          <p className="text-ui-grey-strong mb-2">Map unavailable</p>
          <p className="text-sm text-ui-grey">
            Please add your Mapbox token to .env.local
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default MapContainer;