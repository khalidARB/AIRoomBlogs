import Header from '@/components/Header';
import SeoTesterSection from '@/components/SeoTesterSection';
import Footer from '@/components/Footer';
import { getCategories, getMenu } from '@/lib/wordpress';

export const revalidate = 60;

export default async function SeoTesterDedicatedPage() {
  const [categories, headerMenu, footerMenu] = await Promise.all([
    getCategories(),
    getMenu('header'),
    getMenu('footer'),
  ]);

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] dark:bg-[#0A0A0A] flex flex-col justify-between">
      <Header navItems={headerMenu} />

      <main className="flex-grow pt-24">
        <SeoTesterSection />
      </main>

      <Footer navItems={footerMenu} categories={categories} />
    </div>
  );
}
