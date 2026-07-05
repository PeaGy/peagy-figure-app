// app/(main)/page.tsx
"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { FloatButton, Pagination, Select, Empty } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import figureService, { Figure } from "../services/figure.service";
import ProductCard from "../components/ProductCard";
import HeroSection from "../components/HeroSection";
import ProductSkeleton from "../components/ProductSkeleton";

export default function HomePage() {
  const [data, setData] = useState<Figure[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("newest");
  const pageSize = 10;

  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";

  useEffect(() => {
    setLoading(true);
    figureService.getAll()
      .then(setData)
      .finally(() => {
        // Giả lập delay 800ms để người xem thấy được hiệu ứng Skeleton cực xịn
        setTimeout(() => setLoading(false), 800);
      });
  }, []);

  // Xử lý Lọc tìm kiếm và Sắp xếp
  const processedData = useMemo(() => {
    let result = data.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    if (sortOrder === "priceAsc") result.sort((a, b) => a.price - b.price);
    if (sortOrder === "priceDesc") result.sort((a, b) => b.price - a.price);

    return result;
  }, [data, query, sortOrder]);

  // Dữ liệu hiển thị trên trang hiện tại
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, currentPage]);

  return (
    <div className="bg-white min-h-screen pb-20">
      {!query && <HeroSection />}

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        {/* Toolbar: Tiêu đề & Sắp xếp */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-4">
            <div className="border-l-4 border-black h-6"></div>
            <h2 className="font-bold tracking-[0.2em] uppercase text-black">
              {query ? `KẾT QUẢ TÌM KIẾM: "${query}"` : "INSTOCK"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-400 uppercase">Sắp xếp:</span>
            <Select
              className="w-44"
              defaultValue="newest"
              onChange={(value) => setSortOrder(value)}
              options={[
                { value: 'newest', label: 'Mới nhất' },
                { value: 'priceAsc', label: 'Giá: Thấp đến Cao' },
                { value: 'priceDesc', label: 'Giá: Cao đến Thấp' },
              ]}
            />
          </div>
        </div>

        {loading ? (
          <ProductSkeleton />
        ) : (
          <>
            {paginatedData.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                  {paginatedData.map(item => (
                    <ProductCard key={item.id} figure={item} />
                  ))}
                </div>

                {/* Chức năng Phân trang */}
                <div className="mt-16 flex justify-center">
                  <Pagination
                    current={currentPage}
                    total={processedData.length}
                    pageSize={pageSize}
                    onChange={(page) => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    showSizeChanger={false}
                  />
                </div>
              </>
            ) : (
              <Empty description="Không tìm thấy sản phẩm nào" className="py-20" />
            )}
          </>
        )}
      </div>

      <FloatButton.BackTop
        duration={600}
        type="primary"
        style={{ right: 40, bottom: 40 }}
        icon={<ArrowUpOutlined />}
      />
    </div>
  );
}