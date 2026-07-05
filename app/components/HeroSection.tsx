"use client";
import React, { useRef } from "react";
import { Carousel } from "antd";
import {
  MenuOutlined, GiftOutlined, ThunderboltOutlined,
  AppstoreOutlined, RightOutlined, LeftOutlined,
  CarOutlined, SearchOutlined, CalculatorOutlined,
  QuestionCircleOutlined, FileTextOutlined,
  UserOutlined, RobotOutlined, CustomerServiceOutlined,
  HistoryOutlined, TeamOutlined
} from "@ant-design/icons";
import Image from "next/image";

export default function HeroSection() {
  const carouselRef = useRef<any>(null);

  // Ảnh banner trong thư mục public
  const banners = ["/banner1.png", "/banner2.png", "/banner3.png"];

  const categories = [
    { icon: <GiftOutlined className="text-red-500" />, label: "NEW RELEASES !!!" },
    { icon: <ThunderboltOutlined />, label: "NOW In Stock!" },
    { icon: <AppstoreOutlined />, label: "ALL PRODUCTS" },
    { icon: <UserOutlined />, label: "PVC Figure", hasSub: true },
    { icon: <UserOutlined />, label: "RESIN Figure" },
    { icon: <RobotOutlined />, label: "Blindbox Arttoy" },
    { icon: <RobotOutlined />, label: "Gundam / Tokusatsu" },
    { icon: <CustomerServiceOutlined />, label: "Balo / Goods" },
    { icon: <HistoryOutlined />, label: "Pre-order", hasSub: true },
    { icon: <TeamOutlined />, label: "Khách Thân Thiết" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-10 bg-white">
      {/* Sub-menu bar */}
      <div className="flex items-center border-b border-gray-100">
        <div className="bg-black text-white w-64 h-12 flex items-center px-4 gap-3 shrink-0">
          <MenuOutlined />
          <span className="font-bold text-sm tracking-widest uppercase">Menu</span>
        </div>
        <div className="flex flex-1 justify-around items-center h-12 text-[10px] font-bold text-gray-700 uppercase px-4 tracking-tighter">
          <div className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition-colors"><CarOutlined className="text-base" /> Giao hàng & bảo hành</div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition-colors"><SearchOutlined className="text-base" /> Tra cứu đơn hàng</div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition-colors"><CalculatorOutlined className="text-base" /> Tính giá gom hàng</div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition-colors"><QuestionCircleOutlined className="text-base" /> FAQ</div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-red-500 transition-colors"><FileTextOutlined className="text-base" /> Tin tức</div>
        </div>
      </div>

      <div className="flex gap-1 h-[480px] mt-1">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-100 flex flex-col bg-white overflow-y-auto">
          {categories.map((item, index) => (
            <div key={index} className="flex items-center justify-between px-4 py-[11px] hover:bg-gray-50 cursor-pointer border-b border-gray-50 group">
              <div className="flex items-center gap-3 text-[11px] font-bold text-gray-600 uppercase">
                {item.icon}
                <span className="group-hover:text-black transition-colors">{item.label}</span>
              </div>
              {item.hasSub && <RightOutlined className="text-[9px] text-gray-400" />}
            </div>
          ))}
        </div>

        {/* Carousel với hiệu ứng Mũi tên Đổ màu */}
        <div className="flex-1 relative group overflow-hidden bg-gray-50">

          {/* NÚT TRÁI - Hiệu ứng: Nền trắng chạy xuống -> Mũi tên Đen */}
          <button
            onClick={() => carouselRef.current.prev()}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-16 border border-white flex items-center justify-center overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 group/btn"
          >
            {/* Lớp nền trắng nằm ẩn ở trên */}
            <div className="absolute inset-0 bg-white -translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-in-out"></div>

            {/* Icon - Ban đầu trắng, khi hover nền trắng chạy xuống thì icon thành Đen */}
            <LeftOutlined className="relative z-10 text-white text-2xl arrow-icon-transition group-hover/btn:!text-black" />
          </button>

          {/* NÚT PHẢI */}
          <button
            onClick={() => carouselRef.current.next()}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-16 border border-white flex items-center justify-center overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 group/btn"
          >
            <div className="absolute inset-0 bg-white -translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-in-out"></div>
            <RightOutlined className="relative z-10 text-white text-2xl arrow-icon-transition group-hover/btn:!text-black" />
          </button>

          <Carousel
            ref={carouselRef}
            autoplay
            effect="fade"
            dots={{ className: "custom-slick-dots" }}
          >
            {banners.map((url, idx) => (
              <div key={idx} className="h-[480px] w-full bg-[#F5F5F5] relative">
                <Image
                  src={url}
                  alt={`Banner ${idx + 1}`}
                  fill
                  priority={idx === 0} // Tải ảnh đầu tiên ngay lập tức
                  className="object-contain"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}