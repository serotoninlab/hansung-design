'use client';

import { motion } from 'framer-motion';
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

const signageItems = Array(12).fill({
  title: '장성종합운동장 사거리앞',
  subtitle: '(실내체육관 방향)',
  image: '/images/digital-signage-example.png',
});

export default function DigitalSignage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Nav
        className="absolute top-0 left-0 w-full z-50"
        TextInvert
        variant="photo"
      />

      <div className="relative w-full h-[50vh]">
        <div>디지털사이니지</div>
        <Image
          src="/images/digital-signage-main.png"
          alt="디지털사이니지"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute flex flex-col items-start top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 text-white gap-[1.25rem]">
          <div className="text-1.25">디지털사이니지</div>
          <div className="lg:text-4.375 sm:text-1.7 font-bold font-gmarket">
            MOVE ON THE FUTURE
          </div>
          <div className="text-1.25">광고를 혁신하다, 공간을 스마트하게</div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow bg-white">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="container mx-auto px-4 py-20"
        >
          {/* Signage Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {signageItems.map((item, index) => (
              <div key={index} className="flex flex-col">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-1 font-medium">{item.title}</h3>
                  <p className="text-0.875 text-gray-600">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
