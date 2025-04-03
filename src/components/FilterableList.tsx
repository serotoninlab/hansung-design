'use client';

import { useState } from 'react';
import Calendar from './Calendar';

interface ListItem {
  id: number;
  title: string;
  subtitle?: string;
  location?: string;
  status: string;
  date?: string;
  category?: string;
  price?: number;
}

interface FilterableListProps {
  items: ListItem[];
  onItemSelect?: (selectedItems: number[]) => void;
  showDateFilter?: boolean;
  showLocationFilter?: boolean;
  showCategoryFilter?: boolean;
}

const FilterableList = ({
  items,
  onItemSelect,
  showDateFilter = true,
  showLocationFilter = true,
  showCategoryFilter = true,
}: FilterableListProps) => {
  const [startDate, setStartDate] = useState('2025.02.06');
  const [endDate, setEndDate] = useState('2025.03.06');
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  const categories = [
    '전체',
    '공공디자인',
    'LED전자게시대',
    '현수막',
    '디지털사이니지',
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(items.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    }
  };

  if (onItemSelect) {
    onItemSelect(selectedItems);
  }

  return (
    <div className="w-full">
      <h2 className="text-lg font-medium mb-2">주문내역</h2>
      <p className="text-gray-600 text-sm mb-6">
        *생산이 시작된 주문은 취소/파일 교체가 불가하며, 제품 발송 - 출고완료
        상태에서는 배송 방법 변경이 불가합니다.
      </p>

      {/* Date and Location Filters */}
      <div className="bg-gray-50 p-8 rounded-lg mb-6">
        <div className="flex flex-wrap gap-8">
          <div className="flex-1">
            <div className="text-gray-600 mb-2">주문일</div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={startDate}
                  onClick={() => {
                    setShowStartCalendar(true);
                    setShowEndCalendar(false);
                  }}
                  readOnly
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 pr-10 cursor-pointer"
                  placeholder="YYYY.MM.DD"
                />
                <button
                  onClick={() => {
                    setShowStartCalendar(true);
                    setShowEndCalendar(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
                  </svg>
                </button>
                {showStartCalendar && (
                  <Calendar
                    selectedDate={startDate}
                    onDateSelect={(date) => setStartDate(date)}
                    onClose={() => setShowStartCalendar(false)}
                  />
                )}
              </div>
              <span className="text-gray-400">~</span>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={endDate}
                  onClick={() => {
                    setShowEndCalendar(true);
                    setShowStartCalendar(false);
                  }}
                  readOnly
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 pr-10 cursor-pointer"
                  placeholder="YYYY.MM.DD"
                />
                <button
                  onClick={() => {
                    setShowEndCalendar(true);
                    setShowStartCalendar(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
                  </svg>
                </button>
                {showEndCalendar && (
                  <Calendar
                    selectedDate={endDate}
                    onDateSelect={(date) => setEndDate(date)}
                    onClose={() => setShowEndCalendar(false)}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-gray-600 mb-2">광고위치</div>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="flex-1 border border-gray-200 rounded-lg px-4 py-2"
                placeholder="위치를 입력해보세요. ex.송파구"
              />
              <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                조회
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Buttons */}
      {showCategoryFilter && (
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border ${
                selectedCategory === category
                  ? 'bg-black text-white border-black'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* List */}
      <div className="border-t border-gray-200">
        <div className="grid grid-cols-12 py-4 px-6 bg-gray-50 text-gray-600">
          <div className="col-span-1">
            <input
              type="checkbox"
              checked={selectedItems.length === items.length}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="rounded border-gray-300"
            />
          </div>
          <div className="col-span-5">제목</div>
          <div className="col-span-2 text-center">상태</div>
          <div className="col-span-2 text-center">위치</div>
          <div className="col-span-2 text-center">날짜</div>
        </div>
        {items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 py-4 px-6 border-b border-gray-200 items-center"
          >
            <div className="col-span-1">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                className="rounded border-gray-300"
              />
            </div>
            <div className="col-span-5">
              <div className="font-medium">{item.title}</div>
              {item.subtitle && (
                <div className="text-gray-600 text-sm">{item.subtitle}</div>
              )}
            </div>
            <div className="col-span-2 text-center">{item.status}</div>
            <div className="col-span-2 text-center">{item.location}</div>
            <div className="col-span-2 text-center">{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterableList;
