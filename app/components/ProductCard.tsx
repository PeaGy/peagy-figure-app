"use client";
import { Figure } from "../services/figure.service";
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import { useCartStore } from "../store/cartStore";
import { message, Tooltip } from "antd";
import { motion } from "framer-motion";

export default function ProductCard({ figure }: { figure: Figure }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(figure, 1);
    message.success(`Đã thêm ${figure.name} vào giỏ!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full relative"
    >
      <div className="absolute top-0 left-0 z-10 overflow-hidden w-16 h-16 pointer-events-none">
        <div className="bg-[#4196D1] text-white text-[10px] font-bold py-1 px-10 absolute top-3 -left-8 -rotate-45 shadow-sm uppercase">In Stock</div>
      </div>

      <Link href={`/product/${figure.id}`} className="relative aspect-square overflow-hidden bg-[#F9F9F9] flex items-center justify-center p-2">
        {/* Next.js Image Optimization */}
        <Image
          src={figure.image}
          alt={figure.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <div className="bg-white p-2 rounded-full shadow-md text-black hover:bg-red-500 hover:text-white transition-colors">
            <EyeOutlined />
          </div>
        </div>

        <button onClick={handleAddToCart} className="absolute z-20 bottom-0 left-0 right-0 bg-black/80 text-white py-2 text-[11px] font-bold uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-red-600">
          <ShoppingCartOutlined className="mr-2" /> Thêm vào giỏ
        </button>
      </Link>

      <div className="p-3 flex flex-col flex-grow border-t border-gray-50">
        <h3 className="text-[13px] font-bold text-gray-800 line-clamp-2 min-h-[40px] group-hover:text-red-600 transition-colors uppercase">
          {figure.name}
        </h3>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="text-red-600 font-bold text-base">{figure.price?.toLocaleString()}đ</span>
          <span className="text-[10px] text-gray-400 uppercase">{figure.category}</span>
        </div>
      </div>
    </motion.div>
  );
}