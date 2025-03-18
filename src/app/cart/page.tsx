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

export default function Cart() {
  return (
    <main className="pt-[5.5rem]">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="container mx-auto px-4 py-20"
      >
        <h1 className="lg:text-4.375 sm:text-1.7 font-bold mb-8">장바구니</h1>
        <p className="lg:text-2.25 sm:text-1 text-gray-700 mb-12">
          선택하신 제품들을 확인하고 주문을 진행하실 수 있습니다.
        </p>
        {/* Add cart items and checkout functionality */}
      </motion.div>
    </main>
  );
}
