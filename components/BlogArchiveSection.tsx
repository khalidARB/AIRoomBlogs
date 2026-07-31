'use client';

import { useState } from 'react';
import CategoryFilter from '@/components/CategoryFilter';
import PostGrid from '@/components/PostGrid';
import { Post, Category } from '@/lib/wordpress';

interface BlogArchiveSectionProps {
  posts: Post[];
  categories: Category[];
}

export default function BlogArchiveSection({ posts, categories }: BlogArchiveSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredPosts =
    activeCategory === 'all'
      ? posts
      : posts.filter((post) =>
          post.categories.some((cat) => cat.slug === activeCategory)
        );

  return (
    <>
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      <PostGrid posts={filteredPosts.length > 0 ? filteredPosts : posts} />
    </>
  );
}
