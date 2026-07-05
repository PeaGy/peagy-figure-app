"use client";
import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const onFinish = (values: any) => {
    if (values.username === 'admin' && values.password === 'admin') {
      localStorage.setItem("user", "admin");
      message.success('Đăng nhập quản trị thành công!');
      window.location.href = "/admin"; // Chuyển thẳng tới trang quản trị
    } else {
      message.error('Sai tài khoản!');
    }
  };

  return (
    // Nền trang trắng hoàn toàn
    <div className="min-h-screen flex items-center justify-center bg-[#FBBBB9]">
      
      {/* Khung Login có viền hồng #FBBBB9 bao quanh */}
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-lg border-2 border-[#FBBBB9]">
        
        {/* Logo PeagyFIGURE */}
        <div className="text-center mb-8">
          <img 
            src="/logo.jpg" 
            alt="Logo" 
            className="h-20 mx-auto mb-6 object-contain" 
          />
          
          {/* Tiêu đề Đỏ, Font bình thường, Không nghiêng */}
          <h2 className="text-2xl font-bold text-red-600 uppercase tracking-wide">
            Đăng nhập tài khoản
          </h2>
          
          {/* Vạch kẻ hồng mỏng trang trí */}
          <div className="w-12 h-[1px] bg-[#FBBBB9] mx-auto mt-3"></div>
        </div>

        <Form
          name="login_form"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          className="mt-8"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#FBBBB9' }} />} 
              placeholder="Tên đăng nhập" 
              className="rounded-lg border-[#FBBBB9] hover:border-red-500 focus:border-red-500"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#FBBBB9' }} />}
              placeholder="Mật khẩu"
              className="rounded-lg border-[#FBBBB9] hover:border-red-500 focus:border-red-500"
            />
          </Form.Item>

          <div className="flex justify-between items-center mb-8">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-gray-500">Ghi nhớ đăng nhập</Checkbox>
            </Form.Item>
            <a className="text-red-500 text-sm hover:text-[#FBBBB9]" href="#">
              Quên mật khẩu?
            </a>
          </div>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              // Nút bấm hồng PeagyFIGURE, hover sang màu đỏ
              className="w-full h-12 bg-[#FBBBB9] border-none rounded-lg font-bold text-lg hover:!bg-red-600 transition-all shadow-md"
            >
              ĐĂNG NHẬP
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-6">
          <Link href="/" className="text-gray-400 text-sm hover:text-red-500 transition-colors">
            ← Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}