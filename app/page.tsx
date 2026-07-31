'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroFeatured from '@/components/HeroFeatured';
import CategoryFilter from '@/components/CategoryFilter';
import PostGrid from '@/components/PostGrid';
import Footer from '@/components/Footer';
import {
  getAllPosts,
  getCategories,
  getMenu,
  Post,
  Category,
  MenuItem,
} from '@/lib/wordpress';

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [headerMenu, setHeaderMenu] = useState<MenuItem[]>([]);
  const [footerMenu, setFooterMenu] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      const [fetchedPosts, fetchedCategories, hMenu, fMenu] = await Promise.all([
        getAllPosts(),
        getCategories(),
        getMenu('header'),
        getMenu('footer'),
      ]);

      setPosts(fetchedPosts);
      setCategories(fetchedCategories);
      setHeaderMenu(hMenu);
      setFooterMenu(fMenu);
      setLoading(false);
    }
    loadData();
  }, []);

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  const filteredPosts =
    activeCategory === 'all'
      ? remainingPosts
      : remainingPosts.filter((post) =>
          post.categories.some((cat) => cat.slug === activeCategory)
        );

  if (loading) {
    return (
      <div className="min-h-[100dvh] bg-[#F9FAFB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-[#BEF264] animate-spin"></div>
          <span className="text-sm font-semibold text-gray-600">Loading AiRooms...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] flex flex-col justify-between">
      <Header navItems={headerMenu} />

      <main className="flex-grow">
        {featuredPost && <HeroFeatured post={featuredPost} />}

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        <PostGrid posts={filteredPosts.length > 0 ? filteredPosts : remainingPosts} />
      </main>

      <Footer navItems={footerMenu} categories={categories} />
    </div>
  );
}
