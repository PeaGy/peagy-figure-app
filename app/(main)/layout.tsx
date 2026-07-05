// app/(main)/layout.tsx
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Suspense } from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <Suspense fallback={<div className="p-20 text-center">Đang tải...</div>}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </>
  );
}