"use client"
import { DiscordFilled, TwitterOutlined, FacebookFilled } from "@ant-design/icons";

export default function Footer() {
  return (
    <footer className="bg-[#141414] text-white pt-16 pb-6">
      <div className="max-w-[1400px] mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-20">
        <div className="space-y-4">
          <div className="border-l-2 border-white pl-4 font-bold text-lg uppercase">Peagy Figure</div>
          <div className="text-gray-400 text-sm">
            <p>Bửu Long, Biên Hòa, Đồng Nai</p>
            <p>Điện thoại: 0325869684</p>
            <p>Email: trieuan0912@gmail.com</p>
          </div>
        </div>

        <div className="text-sm text-gray-400 space-y-2">
          <p>Chính sách</p><p>Giới thiệu</p><p>Chính sách bảo mật</p><p>Đổi trả và bảo hành</p>
        </div>

        <div className="space-y-4">
          <div className="text-sm text-gray-400 space-y-2">
            <p>Hỗ trợ</p><p>Liên hệ</p><p>Vận chuyển</p>
          </div>
          <div className="flex gap-4 text-2xl">
            <DiscordFilled className="text-[#5865F2]" />
            <TwitterOutlined className="text-[#1DA1F2]" />
            <FacebookFilled className="text-[#1877F2]" />
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-16 pt-6 border-t border-gray-800">
        © 2026 Peagy Figure. All rights reserved.
      </div>
    </footer>
  );
}