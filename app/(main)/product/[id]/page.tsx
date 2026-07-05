// app/product/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Breadcrumb, Button, Image as AntImage, message } from "antd";
import {
  CheckCircleFilled,
  ShoppingCartOutlined,
  SafetyCertificateOutlined,
  GlobalOutlined,
  RocketOutlined,
  DownOutlined,
  UpOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import figureService, { Figure } from "../../../services/figure.service";
import { useCartStore } from "../../../store/cartStore";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Figure | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false); // ← Trạng thái feedback nút

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (id) {
      figureService
        .getById(id as string)
        .then(setProduct)
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);

    // Hiệu ứng feedback nút
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);

    message.success({
      content: (
        <span>
          Đã thêm <b>{quantity}</b> sản phẩm vào giỏ hàng!
        </span>
      ),
      icon: <CheckOutlined className="text-green-500" />,
      duration: 2,
    });
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-[#FBBBB9] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-bold uppercase tracking-widest text-gray-400 text-sm">
            Đang tải sản phẩm...
          </p>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-6xl">😢</p>
          <p className="font-bold uppercase tracking-widest text-gray-500">
            Sản phẩm không tồn tại
          </p>
          <Button href="/" className="mt-4">
            Về trang chủ
          </Button>
        </div>
      </div>
    );

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-3">
          <Breadcrumb
            className="text-[13px]"
            items={[
              {
                title: (
                  <a href="/" className="text-gray-500 hover:text-black">
                    Trang chủ
                  </a>
                ),
              },
              {
                title: (
                  <a href="/" className="text-gray-500 hover:text-black uppercase">
                    {product.category}
                  </a>
                ),
              },
              {
                title: (
                  <span className="text-black font-medium">{product.name}</span>
                ),
              },
            ]}
          />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* CỘT TRÁI: HÌNH ẢNH */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[500px] h-[500px] bg-[#FDFDFD] rounded-sm flex items-center justify-center overflow-hidden border border-gray-100">
              <div className="absolute top-0 left-0 z-10 overflow-hidden w-20 h-20 pointer-events-none">
                <div className="bg-[#4196D1] text-white text-[12px] font-bold py-1 px-10 absolute top-4 -left-8 -rotate-45 shadow-sm uppercase">
                  In Stock
                </div>
              </div>
              <div className="w-full h-full flex items-center justify-center p-4">
                <AntImage
                  src={product.image}
                  alt={product.name}
                  preview={true}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* CỘT GIỮA: THÔNG TIN */}
          <div className="lg:col-span-4 space-y-5">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight uppercase tracking-tight">
              {product.name}
            </h1>

            <div className="bg-[#4CAF50] text-white px-3 py-1 rounded-sm text-[11px] font-bold w-fit uppercase tracking-widest">
              Hàng Sẵn Ship Ngay
            </div>

            <div className="text-[14px] space-y-1.5 pt-2 border-t border-gray-100">
              <p className="text-gray-500 italic uppercase tracking-tighter text-sm">
                Thể loại:{" "}
                <span className="text-red-600 font-bold ml-1">
                  {product.category}
                </span>
              </p>
              <p className="text-gray-500 italic uppercase tracking-tighter text-sm">
                MSP:{" "}
                <span className="text-red-600 font-bold ml-1">{product.id}</span>
              </p>
            </div>

            <div className="text-4xl font-black text-red-600 py-2">
              {product.price?.toLocaleString()}đ
            </div>

            <div className="space-y-4 pt-2">
              <p className="text-[13px] font-bold uppercase text-gray-800 tracking-wider">
                Hình thức thanh toán:
              </p>
              <div className="flex gap-2">
                <Button className="border-red-600 text-red-600 font-bold h-11 px-6 rounded-sm">
                  Thanh toán toàn bộ
                </Button>
                <Button
                  disabled
                  className="h-11 px-6 rounded-sm text-gray-300 border-gray-200"
                >
                  Thanh toán cọc
                </Button>
              </div>

              {/* Chọn số lượng + Nút thêm giỏ */}
              <div className="flex items-center gap-3 py-4">
                {/* Số lượng */}
                <div className="flex items-center border border-gray-300 h-12 bg-white rounded-sm">
                  <button
                    className="w-10 h-full flex items-center justify-center hover:bg-gray-50 text-xl font-light border-r border-gray-300 transition-colors"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    −
                  </button>
                  <div className="w-14 h-full flex items-center justify-center font-bold text-base">
                    {quantity}
                  </div>
                  <button
                    className="w-10 h-full flex items-center justify-center hover:bg-gray-50 text-xl font-light border-l border-gray-300 transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>

                {/* Nút thêm giỏ — ✅ Có feedback trạng thái */}
                <Button
                  type="primary"
                  onClick={handleAddToCart}
                  className={`
                    flex-grow h-12 border-none font-bold text-[14px] rounded-sm
                    uppercase flex items-center justify-center gap-2 shadow-md
                    transition-all duration-300
                    ${added
                      ? "!bg-green-500 hover:!bg-green-600"
                      : "!bg-red-600 hover:!bg-red-700"
                    }
                  `}
                  icon={
                    added ? (
                      <CheckOutlined className="text-lg" />
                    ) : (
                      <ShoppingCartOutlined className="text-lg" />
                    )
                  }
                >
                  {added ? "ĐÃ THÊM VÀO GIỎ!" : "THÊM VÀO GIỎ"}
                </Button>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: CAM KẾT */}
          <div className="lg:col-span-3 space-y-6">
            <div className="border border-green-500 rounded-sm overflow-hidden shadow-sm">
              <div className="bg-[#4CAF50] text-white p-2.5 font-bold uppercase text-[11px] tracking-widest text-center">
                Cam kết bán hàng
              </div>
              <div className="p-5 space-y-4 text-[12px] font-bold text-gray-700">
                <div className="flex gap-3 items-center">
                  <SafetyCertificateOutlined className="text-xl text-[#4196D1] shrink-0" />
                  Bảo Đảm Giá Đặt Trước
                </div>
                <div className="flex gap-3 items-center">
                  <CheckCircleFilled className="text-xl text-[#4CAF50] shrink-0" />
                  Hàng chính hãng, bảo hành lỗi NSX
                </div>
                <div className="flex gap-3 items-center">
                  <RocketOutlined className="text-xl text-[#FBBBB9] shrink-0" />
                  FREE SHIPPING (Đơn trên 400K)
                </div>
                <div className="flex gap-3 items-center">
                  <GlobalOutlined className="text-xl text-[#4196D1] shrink-0" />
                  Ship quốc tế có sẵn
                </div>
              </div>
            </div>

            <div className="border border-amber-400 rounded-sm overflow-hidden shadow-sm">
              <div className="bg-amber-400 text-white p-2.5 font-bold uppercase text-[11px] tracking-widest text-center">
                Lưu ý khi mua hàng
              </div>
              <div className="p-5 space-y-3 text-[12px] font-medium text-gray-600 italic leading-relaxed">
                <p>• Vui lòng đọc kỹ ngày phát hành dự kiến.</p>
                <p>• Giá có thể thay đổi tùy thời điểm nguồn hàng.</p>
                <p>• Mỗi nguồn hàng có chính sách bảo hành riêng.</p>
              </div>
            </div>
          </div>
        </div>

        {/* MÔ TẢ SẢN PHẨM */}
        <div className="mt-16 bg-white p-8 md:p-10 border border-gray-100 rounded-sm shadow-sm">
          <h2 className="text-xl font-bold uppercase mb-8 tracking-[0.2em] border-b pb-4 text-gray-800">
            Mô tả sản phẩm
          </h2>
          <div
            className={`relative overflow-hidden transition-all duration-700 ${showMore ? "h-auto" : "max-h-[350px]"
              }`}
          >
            <div className="text-gray-700 leading-loose text-[15px] whitespace-pre-line">
              {product.description || "Chưa có mô tả chi tiết cho sản phẩm này."}
            </div>

            {!showMore && (product.description?.length || 0) > 600 && (
              <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent" />
            )}
          </div>

          {(product.description?.length || 0) > 600 && (
            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center gap-3 h-11 px-24 font-bold bg-white border-gray-300 hover:border-red-600 hover:text-red-600 transition-all uppercase text-[11px] tracking-[0.2em] rounded-sm"
                icon={showMore ? <UpOutlined /> : <DownOutlined />}
              >
                {showMore ? "Thu gọn nội dung" : "Xem thêm mô tả"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}