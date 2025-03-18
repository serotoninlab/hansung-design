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

export default function MyPage() {
  return (
    <main className="pt-[5.5rem]">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="container mx-auto px-4 py-20"
      >
        <h1 className="lg:text-4.375 sm:text-1.7 font-bold mb-8">마이페이지</h1>
        <p className="lg:text-2.25 sm:text-1 text-gray-700 mb-12">
          주문 내역 확인 및 개인정보 관리를 할 수 있습니다.
        </p>
        {/* Add user profile, order history, and settings */}
      </motion.div>
    </main>
  );
}
