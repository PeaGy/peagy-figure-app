// app/(main)/layout.tsx
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Suspense } from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#faf9f7]">
        <Suspense
          fallback={
            <div className="flex min-h-[50vh] items-center justify-center px-4 text-center text-sm font-medium text-[#716b67]">
              Đang chuẩn bị nội dung...
            </div>
          }
        >
          {children}
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
