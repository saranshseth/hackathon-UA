import React, { useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  fallbackSrc = '/placeholder-image.jpg'
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <div className={className}>
      <img
        src={imgSrc}
        alt={alt}
        onError={handleError}
        className="w-full h-full object-cover"
        style={{ width: width || '100%', height: height || '100%' }}
      />
    </div>
  );
};