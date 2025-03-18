'use client';

import Image from 'next/image';
import { JSX } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  title: JSX.Element;
  subtitle?: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  buttonText?: string;
  buttonUrl?: string;
  list: string[];
}

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Section = ({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
  buttonText = '자세히 보기',
  buttonUrl = '#',
  list,
}: SectionProps) => {
  return (
    <section className="py-[2.5rem] md:py-[10rem] sm:py-[5rem]">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        className={`container mx-auto px-[1.25rem] md:px-4 flex flex-col ${
          reverse ? 'md:flex-row-reverse' : 'md:flex-row'
        } items-start gap-[2.5rem] md:gap-12`}
      >
        <motion.div variants={fadeInUp} className="flex-1 w-full">
          <div className="flex flex-col gap-[2rem] md:gap-[5rem] max-w-xl">
            <div className="flex flex-col gap-[0.75rem] md:gap-[1.25rem]">
              {subtitle && (
                <motion.div
                  variants={fadeInUp}
                  className="lg:text-2.25 sm:text-1 font-weight-500t"
                >
                  {subtitle}
                </motion.div>
              )}
              <motion.div
                variants={fadeInUp}
                className="lg:text-4.375 sm:text-1.7 font-bold"
              >
                {title}
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="lg:text-2.25 sm:text-1 font-weight-500 text-gray-700"
              >
                {description}
              </motion.div>
            </div>
            <motion.div variants={fadeInUp}>
              <button
                href={buttonUrl}
                className="inline-block bg-black text-white lg:w-[23rem] md:w-[27.5rem] lg:h-[4.75rem] lg:py-[1.625rem] md:py-[1.625rem] lg:px-[8rem] md:px-[8rem] rounded-full hover:bg-gray-800 transition-colors mobile-subtitle font-bold lg:text-1.5 sm:text-1 sm:text-1 sm:w-[10.5rem] sm:h-[2.9rem]"
              >
                {buttonText}
              </button>
            </motion.div>
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className="flex-1 w-full">
          <motion.div
            variants={fadeInUp}
            className="relative aspect-[1/2] md:aspect-[2/1] w-full sm:w-[20rem] sm:h-[8.75rem]"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div variants={fadeInUp} className="mt-[1.25rem] md:mt-4">
            {list.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="lg:text-1.125 sm:text-0.875 md:mb-[1rem] leading-[1.5] lg:line-height-1.125 sm:line-height-1.375"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Section;
