// app/layout.tsx
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Inter } from 'next/font/google'; // Chuyển sang Inter
import './globals.css';

// Cấu hình font Inter
const inter = Inter({ 
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={inter.className}>
      <body className="bg-white text-black antialiased text-[16px] font-medium">
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}