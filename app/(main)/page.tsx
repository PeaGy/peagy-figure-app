"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Empty, FloatButton, Pagination, Select } from "antd";
import { ArrowUpOutlined, ReloadOutlined } from "@ant-design/icons";
import figureService, { Figure } from "../services/figure.service";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";

export default function HomePage() {
  const [data, setData] = useState<Figure[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("newest");
  const pageSize = 10;

  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";

  const loadProducts = async () => {
    setLoading(true);
    setLoadError(false);
    try {
      setData(await figureService.getAll());
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, sortOrder]);

  const processedData = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("vi");
    const result = data.filter((item) =>
      item.name.toLocaleLowerCase("vi").includes(normalizedQuery),
    );

    if (sortOrder === "priceAsc") {
      return [...result].sort((a, b) => a.price - b.price);
    }
    if (sortOrder === "priceDesc") {
      return [...result].sort((a, b) => b.price - a.price);
    }
    return result;
  }, [data, query, sortOrder]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, currentPage]);

  return (
    <div className="min-h-screen bg-[#faf9f7] pb-16 sm:pb-24">
      {!query && <HeroSection />}

      <section
        id="products"
        className="mx-auto max-w-[1340px] px-4 pt-8 sm:px-6 sm:pt-12"
      >
        <div className="mb-7 flex flex-col gap-5 border-b border-[#e9e4df] pb-6 md:flex-row md:items-end md:justify-between sm:mb-9">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-[#d94e46]">
              <span className="h-2 w-2 rounded-full bg-[#ef655c]" />
              Bộ sưu tập được yêu thích
            </div>
            <h1 className="text-[26px] font-bold tracking-[-0.035em] text-[#1f1d1c] sm:text-[34px]">
              {query ? `Kết quả cho “${query}”` : "Figure đang có sẵn"}
            </h1>
            <p className="mt-2 text-[14px] text-[#716b67] sm:text-[15px]">
              {query
                ? `${processedData.length} sản phẩm phù hợp với tìm kiếm của bạn`
                : "Chọn ngay mẫu yêu thích, kiểm tra kỹ trước khi đóng gói và giao hàng."}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 md:justify-end">
            <span className="text-[13px] font-medium text-[#716b67]">Sắp xếp</span>
            <Select
              value={sortOrder}
              onChange={setSortOrder}
              className="w-[190px]"
              options={[
                { value: "newest", label: "Mới nhất" },
                { value: "priceAsc", label: "Giá thấp đến cao" },
                { value: "priceDesc", label: "Giá cao đến thấp" },
              ]}
            />
          </div>
        </div>

        {loading ? (
          <ProductSkeleton />
        ) : loadError ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#e1d9d3] bg-white px-6 text-center">
            <p className="text-lg font-semibold text-[#2b2826]">
              Chưa thể tải danh sách sản phẩm
            </p>
            <p className="mt-2 max-w-md text-sm text-[#716b67]">
              Kết nối đang bị gián đoạn. Bạn có thể thử tải lại ngay.
            </p>
            <button
              type="button"
              onClick={loadProducts}
              className="mt-5 flex h-11 items-center gap-2 rounded-xl bg-[#1f1d1c] px-5 text-sm font-semibold text-white transition hover:bg-[#ef655c]"
            >
              <ReloadOutlined />
              Thử lại
            </button>
          </div>
        ) : paginatedData.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
              {paginatedData.map((item) => (
                <ProductCard key={item.id} figure={item} />
              ))}
            </div>

            {processedData.length > pageSize && (
              <div className="mt-12 flex justify-center sm:mt-16">
                <Pagination
                  current={currentPage}
                  total={processedData.length}
                  pageSize={pageSize}
                  responsive
                  showLessItems
                  showSizeChanger={false}
                  onChange={(page) => {
                    setCurrentPage(page);
                    document
                      .getElementById("products")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#e1d9d3] bg-white py-16">
            <Empty description="Không tìm thấy sản phẩm phù hợp" />
          </div>
        )}
      </section>

      <FloatButton.BackTop
        duration={600}
        type="primary"
        className="!bottom-5 !right-4 sm:!bottom-8 sm:!right-8"
        icon={<ArrowUpOutlined />}
      />
    </div>
  );
}
