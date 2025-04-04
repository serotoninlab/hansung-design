'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  subtitle?: string;
  keyword?: string;
  mainKeyword?: string;
}

interface ProgressiveCarouselProps {
  images: GalleryImage[];
  autoPlayInterval?: number;
}

export default function ProgressiveCarousel({
  images,
  autoPlayInterval = 3000,
}: ProgressiveCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Auto-play functionality
  useEffect(() => {
    if (isHovering) return; // Don't auto-play if user is interacting

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlayInterval, images.length, isHovering]);

  // Calculate all visible indices with proper wrapping
  const getVisibleIndices = () => {
    const indices = [];
    // Get 2 images before and 2 images after the active one
    for (let i = -2; i <= 2; i++) {
      const index = (activeIndex + i + images.length) % images.length;
      indices.push({ index, position: i });
    }
    return indices;
  };

  // Handle mouse events for manual scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;

    isDragging.current = true;
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
    setIsHovering(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return;

    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;

    // Determine which direction to scroll based on movement
    if (carouselRef.current) {
      const currentScroll = carouselRef.current.scrollLeft;
      const diff = currentScroll - scrollLeft.current;

      if (Math.abs(diff) > 50) {
        // Only trigger if significant movement
        if (diff > 0) {
          setActiveIndex(
            (current) => (current - 1 + images.length) % images.length
          );
        } else if (diff < 0) {
          setActiveIndex((current) => (current + 1) % images.length);
        }
      }
    }

    setTimeout(() => setIsHovering(false), 1000); // Resume auto-play after 1 second
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    setTimeout(() => setIsHovering(false), 1000);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden ">
      <div
        ref={carouselRef}
        className="flex justify-center items-center  cursor-grab active:cursor-grabbing h-[90%]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center justify-center gap-2">
          {getVisibleIndices().map(({ index, position }) => {
            // Calculate size and opacity based on position from center
            const absPosition = Math.abs(position);
            const scale = absPosition === 0 ? 1 : absPosition === 1 ? 0.8 : 0.6;
            const opacity =
              absPosition === 0 ? 1 : absPosition === 1 ? 0.7 : 0.4;
            const zIndex = 10 - absPosition;

            return (
              <div
                key={`${index}-${position}`}
                className="transition-all duration-300 ease-in-out px-2 h-full"
                style={{
                  transform: `scale(${scale})`,
                  opacity,
                  zIndex,
                }}
              >
                <div
                  className={`relative w-96 h-128 overflow-hidden rounded-lg transition-all duration-500 ease-in-out ${
                    absPosition === 0 ? 'hover:scale-150 hover:z-20' : ''
                  }`}
                >
                  <Image
                    src={images[index].src}
                    alt={images[index].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {absPosition === 0 && (
                    <div className="absolute bottom-6 left-6 bg-opacity-50 p-2 rounded">
                      <div className="text-white text-sm font-medium">
                        {images[index].keyword}
                      </div>

                      <div className="text-white text-1.25 font-500 pb-2">
                        {images[index].mainKeyword}
                      </div>
                      <div className="text-white text-2.5 font-700">
                        {images[index].title}
                      </div>

                      <div className="text-white text-1.25 font-500 mt-1">
                        {images[index].subtitle}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === activeIndex ? 'bg-white w-6' : 'bg-gray-400'
            }`}
            onClick={() => {
              setActiveIndex(index);
              setIsHovering(true);
              setTimeout(() => setIsHovering(false), 1000);
            }}
          />
        ))}
      </div>
    </div>
  );
}
