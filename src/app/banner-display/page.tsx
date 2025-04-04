'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '../../components/Nav';

const districts = [
  {
    id: 0,
    name: '전체',
    description: '송중사이즈 800×416 픽셀',
    count: 32,
    bgColor: 'bg-[#83B9FF]',
  },
  {
    id: 1,
    name: '강동구',
    description: '송중사이즈 800×416 픽셀',
    count: 5,
    bgColor: 'bg-[#4897FF]',
  },
  {
    id: 2,
    name: '강북구',
    description: '송중사이즈 800×416 픽셀',
    count: 3,
    bgColor: 'bg-[#338BFF]',
  },
  {
    id: 3,
    name: '강서구',
    description: '송중사이즈 800×416 픽셀',
    count: 4,
    bgColor: 'bg-[#006EFF]',
  },
  {
    id: 4,
    name: '관악구',
    description: '송중사이즈 800×416 픽셀',
    count: 6,
    bgColor: 'bg-[#006EFF]',
  },
  {
    id: 5,
    name: '광진구',
    description: '송중사이즈 800×416 픽셀',
    count: 4,
    bgColor: 'bg-[#338BFF]',
  },
  {
    id: 6,
    name: '구로구',
    description: '송중사이즈 800×416 픽셀',
    count: 5,
    bgColor: 'bg-[#4897FF]',
  },
  {
    id: 7,
    name: '금천구',
    description: '송중사이즈 800×416 픽셀',
    count: 3,
    bgColor: 'bg-[#83B9FF]',
  },
];

export default function BannerDisplayPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDistricts, setShowDistricts] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(400);
  const bannerImages = [
    '/images/banner-image1.png',
    '/images/banner-image2.png',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowDistricts(scrollPosition > 100);

      // Adjust banner height based on scroll position
      const newHeight = Math.max(250, 400 - scrollPosition * 0.5);
      setBannerHeight(newHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Nav variant="default" />

      {/* Header Section */}
      <section className="flex items-center justify-center gap-4 mx-auto px-4 pt-[7rem] pb-[2rem] text-center">
        <div className="text-2.5 font-700 mb-3">현수막게시대</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="334"
          height="2"
          viewBox="0 0 334 2"
          fill="none"
        >
          <path d="M0.5 1H333.5" stroke="black" />
        </svg>
        <div className="text-1.5 font-500 text-gray-600">
          MOVE ON THE SCREEN
        </div>
      </section>

      {/* Banner Section */}
      <section className="container mx-auto px-4 mb-12">
        <div
          className="relative rounded-2xl overflow-hidden transition-all duration-300"
          style={{ height: `${bannerHeight}px` }}
        >
          {bannerImages.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Banner ${index + 1}`}
              fill
              className={`
                object-cover
                transition-opacity duration-500
                ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}
              `}
              priority
            />
          ))}
        </div>
      </section>

      {/* Districts Grid */}
      <section
        className={`
          fixed inset-0 bg-white transition-transform duration-500
          ${showDistricts ? 'translate-y-[300px]' : 'translate-y-full'}
        `}
      >
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-4 gap-[1px] bg-gray-100">
            {districts.map((district) => (
              <Link
                key={district.id}
                href={`/led-display/${district.name}`}
                className={`
                  ${district.bgColor}
                  hover:opacity-90 transition-all p-6 text-white
                  flex flex-col min-h-[200px] relative
                `}
              >
                {/* District name in top right */}
                <div className="absolute top-6 right-6 text-lg font-medium">
                  {district.name}
                </div>

                {/* Main content */}
                <div className="mt-16">
                  <h3 className="text-2 font-700 mb-2">유동인구</h3>
                  <p className="text-1 font-500 opacity-80">
                    {district.description}
                  </p>
                </div>

                {/* Bottom section */}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm">게시대 {district.count}개</span>
                  <span className="text-xl">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
