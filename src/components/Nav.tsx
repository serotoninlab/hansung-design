'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

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
  TextInvert?: boolean;
}

interface NavProps {
  className?: string;
  isbg?: boolean;
  TextInvert?: boolean;
  variant?: 'default' | 'photo' | 'mixed';
}

const iconSize = 'w-6 h-6';

const menuItems: MenuItem[] = [
  { name: '공공디자인', href: '/public-design' },
  { name: 'LED전자게시대', href: '/led-display' },
  { name: '현수막게시대', href: '/banner-display' },
  { name: '디지털사이니지', href: '/digital-signage' },
];

const IconButton = ({
  onClick,
  iconPath,
  label,
  href,
  TextInvert,
}: IconButtonProps) => (
  <Link href={href}>
    <button
      onClick={onClick}
      className={`p-2 hover:bg-gray-100 rounded-full transition-colors hover:cursor-pointer ${
        TextInvert && 'invert'
      }`}
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

const IconList = ({ TextInvert }: { TextInvert?: boolean }) => (
  <div className="flex items-center gap-2">
    <IconButton
      iconPath="M4 16V4H2V2h3a1 1 0 0 1 1 1v12h12.438l2-8H8V5h13.72a1 1 0 0 1 .97 1.243l-2.5 10a1 1 0 0 1-.97.757H5a1 1 0 0 1-1-1zm2 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm12 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
      label="장바구니"
      TextInvert={TextInvert}
      href="/cart"
    />
    <IconButton
      iconPath="M4 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
      label="마이페이지"
      TextInvert={TextInvert}
      href="/mypage"
    />
    <Image
      src="/svg/headphones.svg"
      alt="한성기업 로고"
      width={30}
      height={30}
      className={`w-7 h-7 ${TextInvert && 'invert'}`}
    />
  </div>
);

const Nav = ({
  className,
  isbg,
  TextInvert,
  variant = 'default',
}: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Adjust this value based on when you want the color to change
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getMenuItemStyles = (isSelected: boolean) => {
    // If scrolled, always use black text
    if (isScrolled) {
      return isSelected
        ? 'text-black bg-white px-[0.8125rem] py-[0.6875rem] font-weight-700'
        : 'text-black';
    }

    // Original styling based on variant when not scrolled
    switch (variant) {
      case 'photo':
        return isSelected
          ? 'text-black bg-white px-[0.8125rem] py-[0.6875rem] font-weight-700'
          : 'text-white';
      case 'mixed':
        return isSelected ? 'bg-white text-black' : 'text-white';
      default:
        return 'text-black';
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-200 ${className} ${
        isbg || isScrolled ? 'bg-white' : 'bg-none'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-[5.5rem]">
          <Link href="/" className="flex items-center">
            <Image
              src="svg/logo.svg"
              alt="한성기업 로고"
              width={150}
              height={40}
              className={`w-[9.375rem] h-10 ${
                TextInvert && !isScrolled && 'invert'
              }`}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8 gap-[5rem] w-full">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-1 transition-colors duration-300 ${
                    pathname === item.href
                      ? `${getMenuItemStyles(true)} rounded-full`
                      : getMenuItemStyles(false)
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <IconList TextInvert={TextInvert && !isScrolled} />
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
            <IconList TextInvert={TextInvert && !isScrolled} />
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
                  className={`${
                    pathname === item.href
                      ? `${getMenuItemStyles(true)} rounded-full`
                      : getMenuItemStyles(false)
                  }`}
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
