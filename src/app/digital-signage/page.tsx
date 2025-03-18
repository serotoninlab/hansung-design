'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

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

export default function DigitalSignage() {
  return (
    <main className="pt-[5.5rem]">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="container mx-auto px-4 py-20"
      >
        <h1 className="lg:text-4.375 sm:text-1.7 font-bold mb-8">
          디지털사이니지
        </h1>
        <p className="lg:text-2.25 sm:text-1 text-gray-700 mb-12">
          혁신적인 디지털 사이니지 솔루션으로 스마트한 정보 전달을 경험하세요.
        </p>

        {/* District Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[0.625rem] mb-8 ">
          {districts.map((district) => (
            <Link
              key={district.name}
              href={district.href}
              className="w-[18.1875rem] py-[3.4375rem] px-[0.6875rem] h-[4.9375rem] bg-white rounded-[1.25rem] shadow-lg p-4 text-center hover:shadow-md transition-shadow border border-gray-100 justify-center items-center "
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
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
