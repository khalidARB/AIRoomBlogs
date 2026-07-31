import Header from '@/components/Header';
import HeroFeatured from '@/components/HeroFeatured';
import BlogArchiveSection from '@/components/BlogArchiveSection';
import Footer from '@/components/Footer';
import {
  getAllPosts,
  getCategories,
  getMenu,
} from '@/lib/wordpress';

export const revalidate = 60; // Incremental Static Regeneration (ISR) every 60s

export default async function HomePage() {
  const [posts, categories, headerMenu, footerMenu] = await Promise.all([
    getAllPosts(),
    getCategories(),
    getMenu('header'),
    getMenu('footer'),
  ]);

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] flex flex-col justify-between">
      <Header navItems={headerMenu} />

      <main className="flex-grow">
        {featuredPost && <HeroFeatured post={featuredPost} />}

        <BlogArchiveSection posts={remainingPosts} categories={categories} />
      </main>

      <Footer navItems={footerMenu} categories={categories} />
    </div>
  );
}
