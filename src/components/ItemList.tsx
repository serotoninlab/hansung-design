'use client';

import { useState } from 'react';

interface ListItem {
  id: number;
  title: string;
  subtitle: string;
  location: string;
  status: string;
  spots: number | string;
}

interface ItemListProps {
  items: ListItem[];
  onItemSelect?: (selectedItems: number[]) => void;
  showPagination?: boolean;
  showFooterInfo?: boolean;
}

export default function ItemList({
  items,
  onItemSelect,
  showPagination = true,
  showFooterInfo = true,
}: ItemListProps) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleItemSelect = (id: number) => {
    const newSelectedItems = selectedItems.includes(id)
      ? selectedItems.filter((itemId) => itemId !== id)
      : [...selectedItems, id];
    setSelectedItems(newSelectedItems);
    onItemSelect?.(newSelectedItems);
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelectedItems = checked ? items.map((item) => item.id) : [];
    setSelectedItems(newSelectedItems);
    onItemSelect?.(newSelectedItems);
  };

  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[auto,2fr,1fr,1fr,1fr] border-t border-b border-gray-200">
        <div className="flex items-center justify-center py-4 px-4">
          <input
            type="checkbox"
            className="w-4 h-4"
            onChange={(e) => handleSelectAll(e.target.checked)}
            checked={selectedItems.length === items.length && items.length > 0}
          />
        </div>
        <div className="py-4">게시대 명</div>
        <div className="py-4 text-center">행정동</div>
        <div className="py-4 text-center">마감여부</div>
        <div className="py-4 text-center">남은수량</div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden grid grid-cols-[auto,1fr,1fr,1fr] gap-4 py-4 border-b bg-gray-50 px-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4"
            onChange={(e) => handleSelectAll(e.target.checked)}
            checked={selectedItems.length === items.length && items.length > 0}
          />
        </div>
        <div className="text-gray-600">게시대 명</div>
        <div className="text-gray-600">마감여부</div>
        <div className="text-gray-600">남은수량</div>
      </div>

      {/* Table Body */}
      <div className="divide-y">
        {items.map((item) => (
          <div
            key={item.id}
            className="hidden md:grid grid-cols-[auto,2fr,1fr,1fr,1fr] border-b border-gray-200 hover:bg-gray-50"
          >
            <div className="flex items-center justify-center py-4 px-4">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={selectedItems.includes(item.id)}
                onChange={() => handleItemSelect(item.id)}
              />
            </div>
            <div className="py-4">
              <div>{item.title}</div>
              <div className="text-gray-600 text-0.875">{item.subtitle}</div>
            </div>
            <div className="py-4 text-center">{item.location}</div>
            <div className="py-4 text-center">{item.status}</div>
            <div className="py-4 text-center">{item.spots}</div>
          </div>
        ))}

        {/* Mobile List */}
        <div className="md:hidden">
          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[auto,1fr,1fr,1fr] gap-4 py-4 px-4 items-center hover:bg-gray-50"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleItemSelect(item.id)}
                />
              </div>
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-gray-600 text-0.875">{item.subtitle}</div>
              </div>
              <div className="text-center">{item.status}</div>
              <div className="text-center">{item.spots}</div>
            </div>
          ))}
        </div>
      </div>

      {showPagination && (
        <div className="flex justify-center gap-2 mt-8">
          {[1, 2].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded ${
                currentPage === page
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
          <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100">
            〉
          </button>
        </div>
      )}

      {showFooterInfo && (
        <div className="mt-8 text-0.875 text-gray-600">
          <p>
            ○ 게시대별 납부액 561,000원 광고료 500,000원 부가세 50,000원
            구청수수료 11,000원
          </p>
          <p>○ 2023년 하반기 광고 송출시간 800*416 픽셀</p>
          <p>○ 전자게시대 송출</p>
          <p>
            ○ 사진의 전자게시대 이미지는 구현에 따라 틀 2~3개 차이 있을수 있다.
          </p>
          <p>○ 전자게시대 광고내용의 검사 책임 사항</p>
          <p className="ml-4">광고하는 모든 물품의</p>
          <p className="ml-4">
            광고의 내용이 허위 과대광고 여부를 확인하여 주시기 바랍니다.
          </p>
          <p className="ml-4">
            광고 물품에 대한 인증번호 여부를 반드시 확인하여 주시기 바랍니다.
          </p>
        </div>
      )}
    </div>
  );
}
