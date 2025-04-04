'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '../../../components/Nav';
import FilterableList from '../../../components/FilterableList';

const sampleOrders = Array(10)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    title: '울림픽대교 남단사거리 앞',
    subtitle: '(남단 유수지앞)',
    location: '방이동',
    status: index % 3 === 0 ? '진행중' : index % 3 === 1 ? '완료' : '대기중',
    date: '2024.03.06',
  }));

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('주문내역');

  const tabs = [
    { name: '마이페이지', href: '/mypage' },
    { name: '주문내역', href: '/mypage/orders' },
    { name: '1:1상담', href: '/mypage/consultation' },
    { name: '간편정보관리', href: '/mypage/info' },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Nav variant="default" />

      <div className="container mx-auto px-4 pt-[7rem] pb-[10rem]">
        <div className="flex gap-8">
          {/* Left Navigation */}
          <div className="w-[16rem] flex-shrink-0">
            <div className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <Link
                  key={tab.name}
                  href={tab.href}
                  onClick={() => setActiveTab(tab.name)}
                  className={`px-4 py-3 rounded ${
                    activeTab === tab.name
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-8">주문내역</h2>
            <FilterableList items={sampleOrders} />
          </div>
        </div>
      </div>
    </main>
  );
}
