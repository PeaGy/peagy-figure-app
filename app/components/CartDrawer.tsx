"use client";

import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Drawer, Empty } from "antd";
import Image from "next/image";
import { useCartStore } from "../store/cartStore";

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
        <div className="flex items-center gap-3 text-[16px] font-semibold text-[#1f1d1c]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff0ed] text-[#d94e46]">
            <ShoppingCartOutlined />
          </span>
          Giỏ hàng của bạn
          <span className="rounded-full bg-[#f3efec] px-2 py-0.5 text-[12px] text-[#716b67]">
            {items.length}
          </span>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width="min(440px, 100vw)"
      rootClassName="cart-drawer"
      footer={
        items.length > 0 ? (
          <div>
            <div className="mb-4 flex items-end justify-between">
              <span className="text-[13px] font-medium text-[#716b67]">
                Tổng tạm tính
              </span>
              <span className="text-[24px] font-bold tracking-[-0.03em] text-[#d94e46]">
                {totalPrice().toLocaleString("vi-VN")}đ
              </span>
            </div>
            <Button
              type="primary"
              size="large"
              block
              className="!h-12 !rounded-xl !font-semibold"
            >
              Tiến hành đặt hàng
            </Button>
            <button
              type="button"
              className="mt-3 h-10 w-full text-[13px] font-medium text-[#8b827c] transition hover:text-[#d94e46]"
              onClick={clearCart}
            >
              Xóa toàn bộ giỏ hàng
            </button>
          </div>
        ) : null
      }
    >
      {items.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div className="space-y-1">
              <p className="font-medium text-[#4b4643]">Giỏ hàng đang trống</p>
              <p className="text-[13px] text-[#918984]">
                Hãy chọn một mẫu figure bạn yêu thích.
              </p>
            </div>
          }
          className="mt-20"
        />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 rounded-2xl border border-[#e9e4df] bg-white p-3"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f7f5f2] sm:h-24 sm:w-24">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-contain p-1.5"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-[13px] font-semibold leading-5 text-[#2c2927]">
                  {item.name}
                </p>
                <p className="mt-1 text-[15px] font-bold text-[#d94e46]">
                  {item.price.toLocaleString("vi-VN")}đ
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex h-9 items-center overflow-hidden rounded-lg border border-[#e3ddd8]">
                    <button
                      type="button"
                      aria-label="Giảm số lượng"
                      className="h-full w-9 text-lg text-[#716b67] transition hover:bg-[#f7f5f2]"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-[13px] font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Tăng số lượng"
                      className="h-full w-9 text-lg text-[#716b67] transition hover:bg-[#f7f5f2]"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Xóa ${item.name} khỏi giỏ hàng`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-[#a49b95] transition hover:bg-[#fff0ed] hover:text-[#d94e46]"
                  >
                    <DeleteOutlined />
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
