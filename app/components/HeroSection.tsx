"use client";

import { useRef, useState } from "react";
import { Carousel } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import {
  AppstoreOutlined,
  CalculatorOutlined,
  CarOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  GiftOutlined,
  HistoryOutlined,
  LeftOutlined,
  MenuOutlined,
  QuestionCircleOutlined,
  RightOutlined,
  RobotOutlined,
  SafetyCertificateOutlined,
  SearchOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Image from "next/image";

const banners = [
  { src: "/banner1.png", alt: "Miễn phí vận chuyển toàn quốc cho đơn từ 400K" },
  { src: "/banner2.png", alt: "Figure hàng sẵn, giao ngay" },
  { src: "/banner3.png", alt: "Bộ sưu tập figure mới đang có sẵn" },
];

const categories = [
  { icon: GiftOutlined, label: "Mẫu mới về" },
  { icon: ThunderboltOutlined, label: "Hàng sẵn" },
  { icon: AppstoreOutlined, label: "Tất cả sản phẩm" },
  { icon: UserOutlined, label: "PVC Figure" },
  { icon: UserOutlined, label: "Resin Figure" },
  { icon: RobotOutlined, label: "Blindbox & Art toy" },
  { icon: RobotOutlined, label: "Gundam & Tokusatsu" },
  { icon: CustomerServiceOutlined, label: "Balo & Goods" },
  { icon: HistoryOutlined, label: "Pre-order" },
];

const services = [
  { icon: CarOutlined, label: "Giao hàng & bảo hành" },
  { icon: SearchOutlined, label: "Tra cứu đơn hàng" },
  { icon: CalculatorOutlined, label: "Tính giá gom hàng" },
  { icon: SafetyCertificateOutlined, label: "Hàng chính hãng" },
  { icon: QuestionCircleOutlined, label: "Hỏi đáp" },
  { icon: FileTextOutlined, label: "Tin tức" },
];

export default function HeroSection() {
  const carouselRef = useRef<CarouselRef | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="mx-auto max-w-[1340px] px-4 pb-5 pt-4 sm:px-6 sm:pb-8 sm:pt-6">
      <div className="-mx-4 mb-4 flex snap-x items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
        {services.map(({ icon: Icon, label }) => (
          <button
            type="button"
            key={label}
            className="flex h-12 shrink-0 snap-start items-center gap-2 rounded-xl border border-[#e9e4df] bg-white px-3.5 text-[13px] font-medium text-[#4b4643] transition hover:border-[#f2aaa5] hover:bg-[#fff7f5] hover:text-[#d94e46] sm:justify-center"
          >
            <Icon className="text-base text-[#ef655c]" />
            <span className="whitespace-nowrap">{label}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[258px_minmax(0,1fr)]">
        <aside className="hidden overflow-hidden rounded-2xl border border-[#e9e4df] bg-white lg:block">
          <div className="flex h-[58px] items-center gap-3 bg-[#1f1d1c] px-5 text-white">
            <MenuOutlined className="text-lg" />
            <span className="text-[14px] font-semibold">Danh mục sản phẩm</span>
          </div>
          <div className="p-2">
            {categories.map(({ icon: Icon, label }, index) => (
              <button
                type="button"
                key={label}
                className="group flex min-h-[47px] w-full items-center gap-3 rounded-xl px-3 text-left text-[13px] font-medium text-[#5f5955] transition hover:bg-[#fff0ed] hover:text-[#d94e46]"
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    index < 2
                      ? "bg-[#fff0ed] text-[#d94e46]"
                      : "bg-[#f5f2ef] text-[#716b67]"
                  }`}
                >
                  <Icon />
                </span>
                <span className="flex-1">{label}</span>
                <RightOutlined className="text-[10px] text-[#b7aea8] transition group-hover:translate-x-0.5 group-hover:text-[#d94e46]" />
              </button>
            ))}
          </div>
        </aside>

        <div className="hero-carousel group relative min-w-0 overflow-hidden rounded-2xl bg-[#f2ece7] shadow-[0_18px_45px_rgba(63,49,42,0.10)] sm:rounded-3xl">
          <Carousel
            ref={carouselRef}
            autoplay
            autoplaySpeed={5200}
            speed={650}
            effect="fade"
            dots={false}
            pauseOnHover
            swipeToSlide
            afterChange={setActiveSlide}
          >
            {banners.map((banner, index) => (
              <div key={banner.src}>
                <div className="relative aspect-[2/1] w-full">
                  <Image
                    src={banner.src}
                    alt={banner.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 1050px"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </Carousel>

          <button
            type="button"
            onClick={() => carouselRef.current?.prev()}
            aria-label="Banner trước"
            className="pointer-events-none absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#1f1d1c] opacity-0 shadow-lg backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-[#1f1d1c] hover:text-white group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 sm:left-5 sm:h-12 sm:w-12"
          >
            <LeftOutlined />
          </button>
          <button
            type="button"
            onClick={() => carouselRef.current?.next()}
            aria-label="Banner tiếp theo"
            className="pointer-events-none absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#1f1d1c] opacity-0 shadow-lg backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-[#1f1d1c] hover:text-white group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 sm:right-5 sm:h-12 sm:w-12"
          >
            <RightOutlined />
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#1f1d1c]/75 px-3 py-2 shadow-lg backdrop-blur-md sm:bottom-5">
            {banners.map((banner, index) => (
              <button
                type="button"
                key={banner.src}
                aria-label={`Chuyển đến banner ${index + 1}`}
                aria-current={activeSlide === index}
                onClick={() => carouselRef.current?.goTo(index)}
                className={`h-2 rounded-full transition-all ${
                  activeSlide === index ? "w-7 bg-white" : "w-2 bg-white/55 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="-mx-4 mt-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 lg:hidden">
        {categories.map(({ icon: Icon, label }, index) => (
          <button
            type="button"
            key={label}
            className={`flex h-11 shrink-0 snap-start items-center gap-2 rounded-full border px-4 text-[13px] font-medium ${
              index < 2
                ? "border-[#f5b8b3] bg-[#fff0ed] text-[#d94e46]"
                : "border-[#e9e4df] bg-white text-[#514c49]"
            }`}
          >
            <Icon />
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
