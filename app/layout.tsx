import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'Peagy Figure | Mô hình chính hãng',
    template: '%s | Peagy Figure',
  },
  description:
    'Peagy Figure chuyên mô hình PVC, resin, art toy và hàng sẵn chính hãng với giao hàng toàn quốc.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="antialiased">
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
