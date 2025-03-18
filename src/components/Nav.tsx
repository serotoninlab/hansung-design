'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

// 메뉴 아이템 타입 정의
interface MenuItem {
  name: string;
  href: string;
}

interface IconButtonProps {
  onClick?: () => void;
  iconPath: string;
  label: string;
  href: string;
}

const iconSize = 'w-6 h-6';

const menuItems: MenuItem[] = [
  { name: '공공디자인', href: '/public-design' },
  { name: 'LED전자게시대', href: '/led-display' },
  { name: '현수막게시대', href: '/banner-display' },
  { name: '디지털사이니지', href: '/digital-signage' },
];

const IconButton = ({ onClick, iconPath, label, href }: IconButtonProps) => (
  <Link href={href}>
    <button
      onClick={onClick}
      className="p-2 hover:bg-gray-100 rounded-full transition-colors hover:cursor-pointer"
      aria-label={label}
    >
      <svg
        className={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={iconPath} fill="currentColor" />
      </svg>
    </button>
  </Link>
);

const IconList = () => (
  <div className="flex items-center gap-2">
    <IconButton
      iconPath="M4 16V4H2V2h3a1 1 0 0 1 1 1v12h12.438l2-8H8V5h13.72a1 1 0 0 1 .97 1.243l-2.5 10a1 1 0 0 1-.97.757H5a1 1 0 0 1-1-1zm2 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm12 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
      label="장바구니"
      href="/cart"
    />
    <IconButton
      iconPath="M4 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
      label="마이페이지"
      href="/mypage"
    />
  </div>
);

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-[5.5rem]">
          <Link href="/" className="flex items-center">
            <Image
              src="svg/logo.svg"
              alt="한성기업 로고"
              width={150}
              height={40}
              className="w-[9.375rem] h-10"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <IconList />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <IconButton
              onClick={() => setIsOpen(!isOpen)}
              iconPath={
                isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'
              }
              label="Menu"
              href="#"
            />
            <IconList />
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 pb-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-black transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
