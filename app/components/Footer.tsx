"use client";

import {
  FacebookFilled,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";

const policyLinks = [
  "Giới thiệu Peagy Figure",
  "Chính sách bảo mật",
  "Đổi trả & bảo hành",
  "Điều khoản mua hàng",
];

const supportLinks = [
  "Hướng dẫn đặt hàng",
  "Phương thức thanh toán",
  "Chính sách vận chuyển",
  "Câu hỏi thường gặp",
];

export default function Footer() {
  return (
    <footer className="bg-[#1f1d1c] text-white">
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-[1340px] gap-10 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.15fr]">
          <div>
            <div className="relative h-11 w-[176px] overflow-hidden rounded-lg bg-[#fbbbb9]">
              <Image
                src="/logo.jpg"
                alt="Peagy Figure"
                fill
                sizes="176px"
                className="object-cover"
              />
            </div>
            <p className="mt-5 max-w-sm text-[14px] leading-7 text-white/60">
              Không gian dành cho người yêu figure, art toy và mô hình sưu tầm
              chính hãng. Tư vấn rõ ràng, đóng gói kỹ và giao hàng toàn quốc.
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition hover:border-[#ef655c] hover:bg-[#ef655c] hover:text-white"
              >
                <FacebookFilled />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition hover:border-[#ef655c] hover:bg-[#ef655c] hover:text-white"
              >
                <InstagramOutlined />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-[14px] font-semibold">Về Peagy Figure</h2>
            <ul className="mt-5 space-y-3">
              {policyLinks.map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className="text-[14px] text-white/55 transition hover:text-[#ff8b82]"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[14px] font-semibold">Hỗ trợ khách hàng</h2>
            <ul className="mt-5 space-y-3">
              {supportLinks.map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className="text-[14px] text-white/55 transition hover:text-[#ff8b82]"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[14px] font-semibold">Liên hệ với chúng tôi</h2>
            <div className="mt-5 space-y-4 text-[14px] text-white/60">
              <a
                href="tel:0325869684"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-[#ff8b82]">
                  <PhoneOutlined />
                </span>
                0325 869 684
              </a>
              <a
                href="mailto:trieuan0912@gmail.com"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-[#ff8b82]">
                  <MailOutlined />
                </span>
                <span className="min-w-0 break-all">trieuan0912@gmail.com</span>
              </a>
              <p className="leading-6">Bửu Long, Biên Hòa, Đồng Nai</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1340px] flex-col gap-2 px-4 py-6 text-[12px] text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© 2026 Peagy Figure. Bảo lưu mọi quyền.</p>
        <p>Mô hình chính hãng · Đóng gói cẩn thận · Giao hàng toàn quốc</p>
      </div>
    </footer>
  );
}
