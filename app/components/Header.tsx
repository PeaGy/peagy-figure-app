// app/components/Header.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  SearchOutlined,
  PhoneOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Dropdown, message } from "antd";
import Link from "next/link";
import { useCartStore } from "../store/cartStore";
import CartDrawer from "./CartDrawer";
import Image from "next/image";


export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [visible, setVisible] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const lastScrollY = useRef(0); // ✅ Dùng useRef thay vì state
  const router = useRouter();
  const totalItems = useCartStore((state) => state.totalItems());

  // ✅ Đã sửa bug: dependency array rỗng, dùng ref tracking
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(
        lastScrollY.current > currentScrollY || currentScrollY < 150
      );
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // ← Chỉ chạy 1 lần

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user === "admin") setIsAdmin(true);
  }, []);

  const handleSearch = () => {
    if (searchValue.trim()) {
      router.push(`/?search=${encodeURIComponent(searchValue.trim())}`);
    } else {
      router.push("/");
    }
  };

  const items = isAdmin
    ? [
      {
        key: "admin",
        label: (
          <Link
            href="/admin"
            className="font-bold text-red-600 uppercase"
          >
            Trang quản trị
          </Link>
        ),
      },
      {
        key: "logout",
        label: "Đăng xuất",
        onClick: () => {
          localStorage.removeItem("user");
          window.location.href = "/";
        },
      },
    ]
    : [
      {
        key: "login",
        label: <Link href="/login">Đăng nhập Admin</Link>,
      },
    ];

  return (
    <>
      <header
        className={`bg-[#FBBBB9] py-3 px-10 flex justify-center sticky top-0 z-50 shadow-sm transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="w-full max-w-[1400px] flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="shrink-0 relative h-11 w-32">
            <Image
              src="/logo.jpg"
              alt="Peagy Figure Logo"
              fill
              className="object-contain"
            />
          </Link>

          {/* Search bar */}
          <div className="flex-grow max-w-[550px] flex items-center bg-white border border-white rounded-sm overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder="Bạn đang tìm gì..."
              className="flex-grow px-4 py-2 outline-none text-sm text-black bg-white"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-[#FBBBB9] w-14 h-10 flex items-center justify-center border-l border-pink-200 hover:bg-[#f9a8a6] transition-colors"
            >
              <SearchOutlined style={{ color: "white" }} className="text-2xl" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 text-white">
            {/* Hotline */}
            <div className="hidden md:flex items-center gap-2">
              <PhoneOutlined className="text-2xl" />
              <div className="flex flex-col text-[10px] uppercase">
                <span>Hotline</span>
                <span className="font-bold text-xs">0325869684</span>
              </div>
            </div>

            {/* Tài khoản */}
            <Dropdown menu={{ items }} placement="bottomRight" arrow>
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                <UserOutlined className="text-2xl" />
                <div className="hidden sm:flex flex-col text-[10px]">
                  <span>Tài khoản</span>
                  <span className="font-bold text-xs">của bạn</span>
                </div>
              </div>
            </Dropdown>

            {/* Giỏ hàng */}
            <button
              onClick={() => setCartOpen(true)}
              // 1. Thêm 'group' và chủ động set 'text-white' cho toàn bộ nút
              className="group text-white flex items-center gap-2 border border-white rounded-lg px-4 py-2 font-bold uppercase text-xs hover:bg-white hover:text-[#FBBBB9] transition-all duration-200"
            >
              <Badge
                count={totalItems}
                size="small"
                color="#DC2626"
                offset={[2, -2]}
              >
                {/* 2. Thêm dấu ! để ép màu (ví dụ: !text-white) */}
                <ShoppingCartOutlined className="text-xl !text-white group-hover:!text-[#FBBBB9] transition-colors duration-200" />
              </Badge>
              <span className="hidden sm:inline">Giỏ hàng</span>
            </button>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}