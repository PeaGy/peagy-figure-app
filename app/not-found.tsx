"use client";
import React from 'react';
import Link from 'next/link';
import { Button, ConfigProvider } from 'antd';
import { HomeOutlined, ShoppingOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#FBBBB9',
                    colorTextBase: '#1a1a1a',
                },
                components: {
                    Button: {
                        controlHeightLG: 50,
                        fontWeight: 700,
                        // Sửa lỗi nút bị nhạt: Tự định nghĩa màu chữ khi dùng primary
                        colorPrimaryText: '#ffffff',
                    }
                }
            }}
        >
            <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center px-6">

                {/* Container chính để tạo khối cho đẹp */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl w-full bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-3xl p-10 md:p-20 text-center relative overflow-hidden"
                >
                    {/* Họa tiết trang trí góc */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FBBBB9] opacity-10 rounded-bl-full -mr-16 -mt-16"></div>

                    {/* 1. Số 404 - Dùng Outline để sang trọng hơn */}
                    <h1 className="text-[100px] md:text-[150px] font-black leading-none mb-4 tracking-tighter text-white drop-shadow-sm"
                        style={{ WebkitTextStroke: '2px #FBBBB9' }}>
                        404
                    </h1>

                    {/* 2. Tiêu đề chính */}
                    <div className="space-y-4 mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-widest">
                            Lỗi không tìm thấy trang
                        </h2>
                        <div className="w-16 h-1 bg-[#FBBBB9] mx-auto"></div>
                        <p className="text-gray-500 text-sm md:text-base max-w-sm mx-auto leading-relaxed italic">
                            "Có vẻ như mô hình bạn đang tìm kiếm đã rời khỏi kệ hàng hoặc đường dẫn này chưa từng tồn tại."
                        </p>
                    </div>

                    {/* 3. Khu vực Nút bấm - Đã sửa lỗi màu sắc */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                        {/* Nút Về trang chủ - Dùng màu ĐEN để cực kỳ nổi bật */}
                        <Link href="/" className="w-full sm:w-auto">
                            <Button
                                type="primary"
                                size="large"
                                block
                                icon={<HomeOutlined />}
                                className="!bg-black !border-black hover:!bg-[#FBBBB9] hover:!border-[#FBBBB9] !text-white transition-all duration-300 h-14 px-10 rounded-xl shadow-lg uppercase tracking-widest text-xs"
                            >
                                Về trang chủ
                            </Button>
                        </Link>

                        {/* Nút Mua sắm - Dùng màu Hồng nhưng chữ Đen để rõ ràng */}
                        <Link href="/" className="w-full sm:w-auto">
                            <Button
                                size="large"
                                block
                                icon={<ShoppingOutlined />}
                                className="border-2 border-gray-200 hover:border-[#FBBBB9] hover:text-[#FBBBB9] h-14 px-10 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors"
                            >
                                Tiếp tục mua sắm
                            </Button>
                        </Link>
                    </div>

                    {/* Nút quay lại trang trước đó */}
                    <button
                        onClick={() => window.history.back()}
                        className="mt-10 text-gray-400 hover:text-black transition-colors flex items-center justify-center gap-2 mx-auto text-xs font-bold uppercase tracking-widest"
                    >
                        <ArrowLeftOutlined /> Quay lại trang trước
                    </button>
                </motion.div>

                {/* 4. Footer - Đã tăng kích thước và làm rõ */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center space-y-2"
                >
                    <img src="/logo.jpg" alt="Peagy Figure" className="h-8 mx-auto opacity-50 mb-4" />
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.4em]">
                        Peagy Figure Store
                    </p>
                    <p className="text-gray-400 text-[11px]">
                        Chuyên cung cấp mô hình chính hãng & High-end Figure
                    </p>
                </motion.div>
            </div>
        </ConfigProvider>
    );
}