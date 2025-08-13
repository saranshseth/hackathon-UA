"use client";

import React, { useEffect, useState } from 'react';

export function AnimatedBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolling(true);
      
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Set new timeout to stop animation after scrolling stops
      const timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
      
      setScrollTimeout(timeout);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle background gradient animation */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${50 + scrollY * 0.02}% ${50 + scrollY * 0.01}%, rgba(255, 40, 40, 0.05) 0%, rgba(59, 130, 246, 0.03) 50%, transparent 100%)`,
          transform: `scale(${isScrolling ? 1.02 : 1})`,
          transition: isScrolling ? 'none' : 'transform 2s ease-out',
        }}
      />
    </div>
  );
}