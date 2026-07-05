"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Space, Image, Tag, Modal, Form, Input, InputNumber, message, Popconfirm } from "antd";
import figureService, { Figure } from "../../services/figure.service";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [data, setData] = useState<Figure[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Figure | null>(null);
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== "admin") {
      message.error("Bạn không có quyền truy cập!");
      router.push("/login");
      return;
    }
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await figureService.getAll();
      setData(res);
    } finally { setLoading(false); }
  };

  const handleSave = async () => {
    const values = await form.validateFields();
    if (editingItem) await figureService.update(editingItem.id, values);
    else await figureService.create(values);
    message.success("Thành công!");
    setIsModalOpen(false);
    loadData();
  };

  const columns = [
    { title: 'ẢNH', dataIndex: 'image', render: (img: string) => <Image src={img} width={60} className="border" /> },
    { title: 'TÊN FIGURE', dataIndex: 'name', render: (t: string) => <b className="uppercase">{t}</b> },
    { title: 'GIÁ', dataIndex: 'price', render: (p: number) => <span className="font-bold">{p?.toLocaleString()}đ</span> },
    { title: 'THAO TÁC', render: (_: any, record: Figure) => (
      <Space>
        <Button onClick={() => { setEditingItem(record); form.setFieldsValue(record); setIsModalOpen(true); }}>Sửa</Button>
        <Popconfirm title="Xóa?" onConfirm={async () => { await figureService.delete(record.id); loadData(); }}>
          <Button danger>Xóa</Button>
        </Popconfirm>
      </Space>
    )},
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-10 py-10">
      <div className="flex justify-between items-center mb-8 bg-gray-50 p-6 rounded-lg border">
        <div>
          <h1 className="text-xl font-black text-red-600 uppercase">Hệ Thống Quản Trị PeagyFIGURE</h1>
          <p className="text-xs text-gray-500 uppercase mt-1">Chế độ quản lý kho hàng dành cho Admin</p>
        </div>
        <Button type="primary" className="bg-black border-none h-10 px-8 font-bold" onClick={() => { setEditingItem(null); form.resetFields(); setIsModalOpen(true); }}>
          THÊM MÔ HÌNH MỚI
        </Button>
      </div>

      <Table columns={columns} dataSource={data} rowKey="id" loading={loading} bordered className="bg-white" />

      <Modal title={editingItem ? "Sửa" : "Thêm"} open={isModalOpen} onOk={handleSave} onCancel={() => setIsModalOpen(false)} okText="Lưu lại">
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item name="name" label="Tên sản phẩm" rules={[{required: true}]}><Input /></Form.Item>
          <Form.Item name="price" label="Giá" rules={[{required: true}]}><InputNumber className="w-full" /></Form.Item>
          <Form.Item name="image" label="Link ảnh" rules={[{required: true}]}><Input /></Form.Item>
          <Form.Item name="description" label="Mô tả"><Input.TextArea /></Form.Item>
          <Form.Item name="category" label="Danh mục"><Input placeholder="VD: PVC Figure, Resin Figure, Blindbox..." /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}