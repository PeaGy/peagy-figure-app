"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PhoneOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Dropdown } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../store/cartStore";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const router = useRouter();
  const totalItems = useCartStore((state) => state.totalItems());

  useEffect(() => {
    setIsAdmin(localStorage.getItem("user") === "admin");
  }, []);

  const handleSearch = (event?: React.FormEvent) => {
    event?.preventDefault();
    const value = searchValue.trim();
    router.push(value ? `/?search=${encodeURIComponent(value)}` : "/");
  };

  const accountItems = isAdmin
    ? [
        {
          key: "admin",
          label: <Link href="/admin">Trang quản trị</Link>,
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
          label: <Link href="/login">Đăng nhập quản trị</Link>,
        },
      ];

  const searchForm = (mobile = false) => (
    <form
      role="search"
      onSubmit={handleSearch}
      className={`flex items-center overflow-hidden rounded-xl border border-white/70 bg-white transition focus-within:border-white ${
        mobile ? "h-11 w-full" : "h-12 w-full max-w-[560px]"
      }`}
    >
      <input
        type="search"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Tìm figure, art toy, nhân vật..."
        aria-label="Tìm kiếm sản phẩm"
        className="h-full min-w-0 flex-1 bg-transparent px-4 text-[14px] text-[#1f1d1c] outline-none placeholder:text-[#9b938e]"
      />
      <button
        type="submit"
        aria-label="Tìm kiếm"
        className="mr-1.5 flex h-9 w-11 items-center justify-center rounded-lg bg-[#FBBBB9] text-white"
      >
        <SearchOutlined className="text-lg" />
      </button>
    </form>
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/60 bg-[#FBBBB9] shadow-[0_8px_30px_rgba(91,47,50,0.10)]">
        <div className="border-b border-white/50 bg-[#FBBBB9] text-white">
          <div className="mx-auto flex h-8 max-w-[1340px] items-center justify-between px-4 text-[12px] font-medium sm:px-6">
            <span>Miễn phí vận chuyển toàn quốc cho đơn từ 400K</span>
            <a
              href="tel:0325869684"
              className="hidden items-center gap-2 transition hover:opacity-80 sm:flex"
            >
              <PhoneOutlined />
              0325 869 684
            </a>
          </div>
        </div>

        <div className="mx-auto max-w-[1340px] px-4 sm:px-6">
          <div className="flex h-[68px] items-center gap-4 lg:h-[76px] lg:gap-8">
            <Link
              href="/"
              aria-label="Về trang chủ Peagy Figure"
              className="relative h-10 w-[154px] shrink-0 overflow-hidden rounded-lg bg-[#fbbbb9] sm:h-11 sm:w-[174px]"
            >
              <Image
                src="/logo.jpg"
                alt="Peagy Figure"
                fill
                sizes="174px"
                priority
                className="object-cover"
              />
            </Link>

            <div className="hidden min-w-0 flex-1 justify-center md:flex">
              {searchForm()}
            </div>

            <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
              <a
                href="tel:0325869684"
                aria-label="Gọi hotline"
                className="hidden h-11 items-center gap-3 rounded-xl px-3 text-white lg:flex"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white">
                  <PhoneOutlined className="text-lg" />
                </span>
                <span className="text-left leading-tight">
                  <span className="block text-[11px] text-white/80">Hotline</span>
                  <span className="block text-[13px] font-semibold">0325 869 684</span>
                </span>
              </a>

              <Dropdown menu={{ items: accountItems }} placement="bottomRight" arrow>
                <button
                  type="button"
                  aria-label="Tài khoản"
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                >
                  <UserOutlined className="text-[21px]" />
                </button>
              </Dropdown>

              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-label={`Mở giỏ hàng, ${totalItems} sản phẩm`}
                className="flex h-11 items-center gap-2 rounded-xl border border-white/80 bg-[#FBBBB9] px-3.5 text-white sm:px-4"
              >
                <Badge count={totalItems} size="small" color="#3d3937" offset={[4, -3]}>
                  <ShoppingCartOutlined className="text-[20px] !text-white" />
                </Badge>
                <span className="hidden text-[13px] font-semibold sm:inline">Giỏ hàng</span>
              </button>
            </div>
          </div>

          <div className="pb-3 md:hidden">{searchForm(true)}</div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
