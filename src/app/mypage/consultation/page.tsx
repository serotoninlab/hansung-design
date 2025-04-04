'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '../../../components/Nav';

export default function ConsultationPage() {
  const [activeTab, setActiveTab] = useState('1:1상담');
  const [inquiry, setInquiry] = useState('');

  const tabs = [
    { name: '마이페이지', href: '/mypage' },
    { name: '주문내역', href: '/mypage/orders' },
    { name: '1:1상담', href: '/mypage/consultation' },
    { name: '간편정보관리', href: '/mypage/info' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Inquiry submitted:', inquiry);
  };

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
            <h2 className="text-2xl font-bold mb-8">1:1 상담</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  문의 내용
                </label>
                <textarea
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="문의하실 내용을 입력해주세요."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors"
              >
                문의하기
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
