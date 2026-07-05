// app/components/CartDrawer.tsx
"use client";
import { Drawer, Button, InputNumber, Empty, Divider } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useCartStore } from "../store/cartStore";
import Image from "next/image";

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
    const { items, removeItem, updateQuantity, totalPrice, clearCart } =
        useCartStore();

    return (
        <Drawer
            title={
                <div className="flex items-center gap-2 font-black uppercase tracking-widest text-base">
                    <ShoppingCartOutlined className="text-[#FBBBB9] text-xl" />
                    Giỏ hàng của bạn
                </div>
            }
            placement="right"
            onClose={onClose}
            open={open}
            size={420}
            footer={
                items.length > 0 ? (
                    <div className="space-y-3 p-2">
                        <Divider className="my-2" />
                        <div className="flex justify-between items-center">
                            <span className="font-bold uppercase text-sm text-gray-500 tracking-wider">
                                Tổng cộng:
                            </span>
                            <span className="text-2xl font-black text-red-600">
                                {totalPrice().toLocaleString()}đ
                            </span>
                        </div>
                        <Button
                            type="primary"
                            size="large"
                            block
                            className="bg-red-600 border-none font-bold uppercase tracking-widest h-12 rounded-sm hover:!bg-red-700"
                        >
                            Tiến hành đặt hàng
                        </Button>
                        <Button
                            size="large"
                            block
                            danger
                            className="font-bold uppercase tracking-widest h-10 rounded-sm"
                            onClick={clearCart}
                        >
                            Xóa toàn bộ giỏ hàng
                        </Button>
                    </div>
                ) : null
            }
        >
            {items.length === 0 ? (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                        <span className="text-gray-400 italic">
                            Giỏ hàng của bạn đang trống
                        </span>
                    }
                    className="mt-20"
                />
            ) : (
                <div className="space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-3 p-3 border border-gray-100 rounded-sm hover:border-gray-200 transition-colors"
                        >
                            {/* Ảnh sản phẩm */}
                            <div className="w-20 h-20 bg-gray-50 flex-shrink-0 relative overflow-hidden rounded-sm">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-contain p-1"
                                />
                            </div>

                            {/* Thông tin */}
                            <div className="flex-1 min-w-0 space-y-1">
                                <p className="text-[12px] font-bold uppercase text-gray-800 line-clamp-2 leading-tight">
                                    {item.name}
                                </p>
                                <p className="text-red-600 font-black text-sm">
                                    {item.price.toLocaleString()}đ
                                </p>

                                <div className="flex items-center justify-between mt-2">
                                    {/* Số lượng */}
                                    <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden">
                                        <button
                                            className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 transition-colors text-lg font-light border-r border-gray-200"
                                            onClick={() =>
                                                updateQuantity(item.id, item.quantity - 1)
                                            }
                                        >
                                            −
                                        </button>
                                        <span className="w-8 text-center text-sm font-bold">
                                            {item.quantity}
                                        </span>
                                        <button
                                            className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 transition-colors text-lg font-light border-l border-gray-200"
                                            onClick={() =>
                                                updateQuantity(item.id, item.quantity + 1)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Xóa */}
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-sm transition-all"
                                    >
                                        <DeleteOutlined className="text-sm" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Drawer>
    );
}