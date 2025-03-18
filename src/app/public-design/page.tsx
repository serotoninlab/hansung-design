'use client';

import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function PublicDesign() {
  return (
    <main className="pt-[5.5rem]">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="container mx-auto px-4 py-20"
      >
        <h1 className="lg:text-4.375 sm:text-1.7 font-bold mb-8">공공디자인</h1>
        <p className="lg:text-2.25 sm:text-1 text-gray-700 mb-12">
          도시의 미래를 그리는 한성기업의 공공디자인 솔루션을 만나보세요.
        </p>
        {/* Add more content as needed */}
      </motion.div>
    </main>
  );
}
