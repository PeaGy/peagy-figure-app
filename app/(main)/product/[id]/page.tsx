"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  CheckCircleFilled,
  CheckOutlined,
  GlobalOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import Image from "next/image";
import Link from "next/link";
import figureService, { Figure } from "../../../services/figure.service";
import { useCartStore } from "../../../store/cartStore";

const promises = [
  {
    icon: SafetyCertificateOutlined,
    title: "Hàng chính hãng",
    detail: "Hỗ trợ bảo hành lỗi nhà sản xuất",
  },
  {
    icon: CheckCircleFilled,
    title: "Kiểm tra kỹ",
    detail: "Ngoại quan được kiểm tra trước khi gửi",
  },
  {
    icon: RocketOutlined,
    title: "Miễn phí vận chuyển",
    detail: "Áp dụng cho đơn hàng từ 400K",
  },
  {
    icon: GlobalOutlined,
    title: "Giao hàng linh hoạt",
    detail: "Hỗ trợ trong nước và quốc tế",
  },
];

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Figure | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (!params.id) return;
    figureService
      .getById(params.id)
      .then(setProduct)
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
    message.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`);
  };

  if (loading) {
    return (
      <div className="mx-auto min-h-[70vh] max-w-[1340px] px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="skeleton aspect-square rounded-3xl" />
          <div className="space-y-5 py-4">
            <div className="skeleton h-5 w-28 rounded-full" />
            <div className="skeleton h-10 w-4/5 rounded-xl" />
            <div className="skeleton h-10 w-44 rounded-xl" />
            <div className="skeleton h-40 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
        <p className="text-5xl">😢</p>
        <h1 className="mt-5 text-2xl font-bold text-[#1f1d1c]">
          Không tìm thấy sản phẩm
        </h1>
        <p className="mt-2 text-sm text-[#716b67]">
          Sản phẩm có thể đã hết hàng hoặc đường dẫn không còn tồn tại.
        </p>
        <Link
          href="/"
          className="mt-6 flex h-11 items-center rounded-xl bg-[#1f1d1c] px-5 text-sm font-semibold text-white transition hover:bg-[#ef655c]"
        >
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] pb-16 sm:pb-24">
      <div className="border-b border-[#e9e4df] bg-white">
        <nav
          aria-label="Đường dẫn"
          className="mx-auto flex max-w-[1340px] items-center gap-2 overflow-x-auto px-4 py-3 text-[13px] text-[#817974] sm:px-6"
        >
          <Link href="/" className="shrink-0 transition hover:text-[#d94e46]">
            Trang chủ
          </Link>
          <span>/</span>
          <Link href="/" className="shrink-0 transition hover:text-[#d94e46]">
            {product.category}
          </Link>
          <span>/</span>
          <span className="truncate font-medium text-[#3b3735]">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-[1340px] px-4 py-6 sm:px-6 sm:py-10">
        <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(400px,0.95fr)] lg:gap-12">
          <div className="lg:sticky lg:top-[112px]">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#e9e4df] bg-white shadow-[0_12px_40px_rgba(55,45,39,0.06)] sm:rounded-3xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 620px"
                className="object-contain p-5 sm:p-10"
              />
              <span className="absolute left-4 top-4 rounded-full bg-[#eaf7ef] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#2f855a] sm:left-6 sm:top-6">
                Hàng có sẵn
              </span>
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#d94e46]">
              {product.category || "Figure"}
            </p>
            <h1 className="mt-3 text-[27px] font-bold leading-[1.25] tracking-[-0.035em] text-[#1f1d1c] sm:text-[38px]">
              {product.name}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-[#817974]">
              <span>
                Mã sản phẩm: <strong className="font-semibold text-[#4b4643]">{product.id}</strong>
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-[#c4bbb5] sm:block" />
              <span className="flex items-center gap-1.5 text-[#2f855a]">
                <CheckCircleFilled />
                Sẵn sàng giao
              </span>
            </div>

            <p className="mt-7 text-[32px] font-bold tracking-[-0.04em] text-[#d94e46] sm:text-[40px]">
              {product.price.toLocaleString("vi-VN")}đ
            </p>
            <p className="mt-1 text-[13px] text-[#817974]">
              Giá đã bao gồm thuế, chưa bao gồm ưu đãi vận chuyển.
            </p>

            <div className="mt-7 rounded-2xl border border-[#e9e4df] bg-white p-4 shadow-[0_10px_30px_rgba(55,45,39,0.05)] sm:p-5">
              <p className="text-[13px] font-semibold text-[#3d3937]">
                Hình thức thanh toán
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="min-h-11 rounded-xl border-2 border-[#ef655c] bg-[#fff0ed] px-3 text-[13px] font-semibold text-[#d94e46]"
                >
                  Thanh toán toàn bộ
                </button>
                <button
                  type="button"
                  disabled
                  className="min-h-11 cursor-not-allowed rounded-xl border border-[#e9e4df] bg-[#f8f6f4] px-3 text-[13px] font-medium text-[#b6ada7]"
                >
                  Thanh toán cọc
                </button>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <div className="flex h-12 items-center justify-between overflow-hidden rounded-xl border border-[#dfd8d3] sm:w-[142px]">
                  <button
                    type="button"
                    aria-label="Giảm số lượng"
                    className="h-full w-11 text-xl text-[#716b67] transition hover:bg-[#f7f5f2]"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    −
                  </button>
                  <span className="text-[15px] font-semibold">{quantity}</span>
                  <button
                    type="button"
                    aria-label="Tăng số lượng"
                    className="h-full w-11 text-xl text-[#716b67] transition hover:bg-[#f7f5f2]"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-xl px-5 text-[14px] font-semibold text-white shadow-lg transition active:scale-[0.99] ${
                    added
                      ? "bg-[#2f855a] shadow-green-900/10"
                      : "bg-[#1f1d1c] shadow-black/10 hover:bg-[#ef655c]"
                  }`}
                >
                  {added ? <CheckOutlined /> : <ShoppingCartOutlined className="text-lg" />}
                  {added ? "Đã thêm vào giỏ" : "Thêm vào giỏ hàng"}
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2.5">
              {promises.map(({ icon: Icon, title, detail }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-[#e9e4df] bg-white p-3.5 sm:p-4"
                >
                  <Icon className="text-xl text-[#ef655c]" />
                  <p className="mt-2 text-[13px] font-semibold text-[#363230]">
                    {title}
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-[#817974] sm:text-[12px]">
                    {detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-[#fff7e7] p-4 text-[13px] leading-6 text-[#76633d]">
              <strong className="font-semibold text-[#5d4b2b]">Lưu ý:</strong>{" "}
              Giá và thời gian giao hàng có thể thay đổi theo nguồn hàng. Peagy
              Figure sẽ xác nhận lại thông tin trước khi xử lý đơn.
            </div>
          </div>
        </div>

        <section className="mt-10 rounded-2xl border border-[#e9e4df] bg-white p-5 sm:mt-14 sm:rounded-3xl sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#d94e46]">
              Thông tin chi tiết
            </p>
            <h2 className="mt-2 text-[24px] font-bold tracking-[-0.03em] text-[#1f1d1c] sm:text-[30px]">
              Mô tả sản phẩm
            </h2>
            <div className="mt-5 whitespace-pre-line text-[15px] leading-8 text-[#625c58]">
              {product.description || "Chưa có mô tả chi tiết cho sản phẩm này."}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
