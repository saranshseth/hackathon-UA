'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set your Mapbox access token here
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface Stop {
  number: string | number;
  title: string;
  address: string;
  duration: string;
  description: string;
  isStart?: boolean;
  isEnd?: boolean;
  coordinates: [number, number]; // [longitude, latitude]
  details?: {
    highlights: string[];
    whatToExpect: string;
    tips: string;
  };
}

interface MapboxMapProps {
  stops: Stop[];
  selectedStop?: number | null;
  onStopSelect?: (index: number | null) => void;
  className?: string;
}

const MapboxMap: React.FC<MapboxMapProps> = ({ 
  stops, 
  selectedStop, 
  onStopSelect,
  className = "w-full h-96 rounded-lg"
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [initialFitDone, setInitialFitDone] = useState(false);

  // Melbourne coordinates for center
  const melbourneCenter: [number, number] = [144.9631, -37.8136];

  // Sample coordinates for stops (you can replace with real coordinates)
  const defaultCoordinates: [number, number][] = [
    [144.9711, -37.8031], // Melbourne Museum
    [144.9789, -37.7983], // Fitzroy
    [144.9801, -37.8097], // Fitzroy Gardens
    [144.9823, -37.7965], // Gertrude Street
    [144.9891, -37.7999], // Collingwood
    [144.9834, -37.7971], // Fitzroy (end)
  ];

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: melbourneCenter,
      zoom: 13,
      attributionControl: false
    });

    map.current.on('load', () => {
      setMapLoaded(true);
      
      // Add markers for each stop
      stops.forEach((stop, index) => {
        const coordinates = stop.coordinates;
        
        // Create marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'mapbox-marker';
        markerElement.style.cssText = `
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        `;

        // Style based on stop type
        if (stop.isStart || stop.isEnd) {
          markerElement.style.backgroundColor = '#6b7280';
          markerElement.style.color = 'white';
          markerElement.innerHTML = '📍';
        } else {
          markerElement.style.backgroundColor = '#000000';
          markerElement.style.color = 'white';
          markerElement.innerHTML = stop.number.toString();
        }

        // Add click handler
        markerElement.addEventListener('click', (e) => {
          e.stopPropagation();
          onStopSelect?.(index);
        });

        // Create and add marker
        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat(coordinates)
          .addTo(map.current!);

        // Add popup
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          closeOnClick: false
        }).setHTML(`
          <div class=${'"'}p-2${'"'}>
            <h4 class=${'"'}font-semibold text-sm${'"'}>${stop.title}</h4>
            <p class=${'"'}text-xs text-gray-600${'"'}>${stop.address}</p>
            ${stop.duration ? `<p class=${'"'}text-xs text-blue-600 mt-1${'"'}>${stop.duration}</p>` : ''}
          </div>
        `);

        marker.setPopup(popup);
        markers.current.push(marker);
      });

      // Fit map to show all markers only on initial load
      if (stops.length > 0 && !initialFitDone) {
        const bounds = new mapboxgl.LngLatBounds();
        stops.forEach((stop, index) => {
          const coordinates = stop.coordinates || defaultCoordinates[index] || melbourneCenter;
          bounds.extend(coordinates);
        });
        map.current!.fitBounds(bounds, { padding: 50 });
        setInitialFitDone(true);
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Update marker styles when selected stop changes
  useEffect(() => {
    if (!mapLoaded) return;

    markers.current.forEach((marker, index) => {
      const element = marker.getElement();
      const stop = stops[index];
      
      if (selectedStop === index) {
        element.style.backgroundColor = '#2563eb';
        element.style.transform = 'scale(1.2)';
        element.style.zIndex = '1000';
        marker.getPopup()?.addTo(map.current!);
        
        // Smoothly pan to selected marker without zooming
        if (map.current) {
          map.current.flyTo({
            center: stop.coordinates,
            zoom: map.current.getZoom(), // Keep current zoom level
            duration: 1000
          });
        }
      } else {
        if (stop.isStart || stop.isEnd) {
          element.style.backgroundColor = '#6b7280';
        } else {
          element.style.backgroundColor = '#000000';
        }
        element.style.transform = 'scale(1)';
        element.style.zIndex = '1';
        marker.getPopup()?.remove();
      }
    });
  }, [selectedStop, mapLoaded, stops]);

  return (
    <div className={className}>
      <div ref={mapContainer} className="w-full h-full rounded-lg overflow-hidden" />
      {!mapLoaded && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-gray-500">Loading map...</div>
        </div>
      )}
    </div>
  );
};

export default MapboxMap;