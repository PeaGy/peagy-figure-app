"use client";

import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { message } from "antd";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Figure } from "../services/figure.service";
import { useCartStore } from "../store/cartStore";

export default function ProductCard({ figure }: { figure: Figure }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(figure, 1);
    message.success(`Đã thêm ${figure.name} vào giỏ hàng`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[#e9e4df] bg-white shadow-[0_5px_18px_rgba(52,43,38,0.04)] transition-shadow hover:shadow-[0_16px_36px_rgba(52,43,38,0.12)]"
    >
      <Link
        href={`/product/${figure.id}`}
        aria-label={`Xem ${figure.name}`}
        className="relative aspect-square overflow-hidden bg-[#f7f5f2]"
      >
        <Image
          src={figure.image}
          alt={figure.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          className="object-contain p-3 transition duration-500 group-hover:scale-[1.06] sm:p-4"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center bg-black/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <span className="flex h-11 w-11 scale-90 items-center justify-center rounded-full bg-white text-[#1f1d1c] shadow-[0_10px_28px_rgba(31,29,28,0.20)] transition-transform duration-300 group-hover:scale-100">
            <SearchOutlined className="text-lg" />
          </span>
        </span>
        <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#2f855a] shadow-sm backdrop-blur sm:left-3 sm:top-3">
          Có sẵn
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="mb-2 truncate text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9a706b] sm:text-[12px]">
          {figure.category || "Figure"}
        </p>
        <Link href={`/product/${figure.id}`}>
          <h3 className="line-clamp-2 min-h-[42px] text-[14px] font-semibold leading-[1.5] text-[#2a2725] transition group-hover:text-[#d94e46] sm:min-h-[48px] sm:text-[15px]">
            {figure.name}
          </h3>
        </Link>

        <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[16px] font-bold tracking-[-0.02em] text-[#d94e46] sm:text-[18px]">
            {figure.price?.toLocaleString("vi-VN")}đ
          </span>
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Thêm ${figure.name} vào giỏ hàng`}
            className="flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#FBBBB9] px-3 text-[12px] font-semibold text-white sm:h-10"
          >
            <ShoppingCartOutlined className="text-base" />
            <span>Thêm</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
