'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Nav from '../../components/Nav';

const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const districts = [
  { name: '전체', href: '/digital-signage' },
  { name: '강동구', href: '/digital-signage?district=gangdong' },
  { name: '광진구', href: '/digital-signage?district=gwangjin' },
  { name: '동작구', href: '/digital-signage?district=dongjak' },
  { name: '관악구', href: '/digital-signage?district=gwanak' },
  { name: '동대문구', href: '/digital-signage?district=dongdaemun' },
  { name: '강북구', href: '/digital-signage?district=gangbuk' },
  { name: '영등포구', href: '/digital-signage?district=yeongdeungpo' },
];

export default function LedDisplay() {
  return (
    <main className="min-h-screen flex flex-col">
      <Nav
        className="absolute top-0 left-0 w-full z-50"
        TextInvert
        variant="photo"
      />

      <div className="relative w-full h-[50vh]">
        <Image
          src="/images/led-display.png"
          layout="fill"
          objectFit="cover"
          className="z-0"
          alt="디지털사이니지"
        />
        <div className="absolute flex flex-col top-1/2 left-1.9/4 transform -translate-x-1/2 -translate-y-1/2 lg:text-3.75 sm:text-1.7 z-10 text-white gap-[1.25rem]">
          <div className="text-1.25 font-weight-500">전자게시대</div>
          <div className="lg:text-3.75 sm:text-1.7 font-weight-700 text-gmarket">
            MOVE ON THE SCREEN
          </div>
          <div className="text-1.25 font-weight-500">전자게시대</div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="container mx-auto px-4 py-20"
        >
          {/* District Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {districts.map((district) => (
              <Link
                key={district.name}
                href={district.href}
                className="w-[18.1875rem] py-[3.4375rem] px-[0.6875rem] h-[4.9375rem] bg-white rounded-[1.25rem] shadow-lg p-4 text-center hover:shadow-md transition-shadow border border-gray-100 justify-center items-center"
              >
                <div className="flex items-center justify-around gap-[2rem]">
                  <div>
                    <span className="text-gray-700 text-2.5 font-weight-700">
                      {district.name}
                    </span>
                    <div className="text-gray-400 text-0.875 mt-4">
                      송출사이즈 800*416 픽셀
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="29"
                    viewBox="0 0 16 29"
                    fill="none"
                  >
                    <path
                      d="M2 26.5L14 14.5L2 2.5"
                      stroke="#AAAAAA"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
