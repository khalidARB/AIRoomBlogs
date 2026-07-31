export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  featuredImage: {
    url: string;
    altText?: string;
  };
  categories: {
    name: string;
    slug: string;
  }[];
  author: {
    name: string;
    avatarUrl: string;
    role: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
}

const WP_GRAPHQL_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost/BlogsRoom/graphql';

export const MOCK_POSTS: Post[] = [
  {
    id: 'post-1',
    slug: 'future-of-headless-architecture-nextjs-wordpress',
    title: 'The Future of Headless Architecture: Combining Next.js with WordPress',
    excerpt: 'Explore how modern decoupling enables ultra-fast static site regeneration, dynamic user interfaces, and flawless SEO scores without giving up your favorite CMS.',
    content: `
      <p class="text-lg leading-relaxed text-gray-700 font-normal mb-6">
        The web landscape is changing rapidly. Monolithic CMS platforms, while powerful for content creation, often struggle to deliver the lightning-fast page speed and responsive micro-interactions demanded by modern web standards. Enter <strong>Headless Architecture</strong>.
      </p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-4 tracking-tight">Why Decouple WordPress?</h2>
      <p class="leading-relaxed text-gray-700 mb-6">
        By separating the content management system from the display layer, developers gain complete freedom over the rendering pipeline. WordPress serves purely as an API endpoint exposing structured GraphQL data, while Next.js handles static site generation (SSG) and incremental static regeneration (ISR).
      </p>
      
      <blockquote class="my-8 p-6 bg-gray-50 border-l-4 border-[#BEF264] rounded-r-2xl text-gray-900 text-xl font-semibold italic shadow-sm">
        "Decoupling content management from execution provides the agility of modern JavaScript frameworks with the time-tested editorial workflows content creators rely on."
      </blockquote>

      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-4 tracking-tight">Key Advantages of Next.js & WPGraphQL</h2>
      <ul class="list-disc list-inside space-y-3 text-gray-700 mb-8 pl-2">
        <li><strong>Sub-second Page Loads:</strong> Pre-rendered HTML pages served straight from the CDN.</li>
        <li><strong>Uncompromising Security:</strong> WordPress dashboard is isolated behind a secure backend, minimizing surface attack vectors.</li>
        <li><strong>Fluid Micro-Animations:</strong> Rich animations using Framer Motion without performance degradation.</li>
        <li><strong>Perfect Core Web Vitals:</strong> Built-in Next.js image optimization and zero-layout-shift routing.</li>
      </ul>

      <p class="leading-relaxed text-gray-700 mb-6">
        As digital products continue to elevate visual design standards, combining Tailwind CSS styling with Next.js App Router creates an unparalleled foundation for publication platforms.
      </p>
    `,
    date: 'July 31, 2026',
    readTime: '6 min read',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      altText: 'Abstract vibrant futuristic rendering'
    },
    categories: [{ name: 'Development', slug: 'development' }, { name: 'Design System', slug: 'design' }],
    author: {
      name: 'Alex Rivera',
      role: 'Lead Architect',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
    }
  },
  {
    id: 'post-2',
    slug: 'mastering-framer-motion-for-micro-interactions',
    title: 'Mastering Framer Motion: Crafting Fluid UI & Tactile Micro-Interactions',
    excerpt: 'Learn how subtle scroll reveals, layout ID transitions, and spring physics elevate digital publication experiences into tactile artwork.',
    content: `
      <p class="text-lg leading-relaxed text-gray-700 font-normal mb-6">
        Micro-interactions are the connective tissue of modern web design. They communicate feedback, signal interactive visual state, and provide visual delight without cluttering the interface.
      </p>
      
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-4 tracking-tight">Spring Physics vs Linear Easing</h2>
      <p class="leading-relaxed text-gray-700 mb-6">
        Real-world objects possess mass, inertia, and momentum. Linear animations feel robotic and artificial, whereas spring physics model real material behavior.
      </p>

      <blockquote class="my-8 p-6 bg-gray-50 border-l-4 border-[#BEF264] rounded-r-2xl text-gray-900 text-xl font-semibold italic shadow-sm">
        "Animation should never be ornamental—it must clarify structure and elevate the visual hierarchy."
      </blockquote>

      <p class="leading-relaxed text-gray-700 mb-6">
        Using Framer Motion with Next.js client component leaves allows developers to isolate interactive physics components while keeping server components lightweight.
      </p>
    `,
    date: 'July 28, 2026',
    readTime: '4 min read',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop',
      altText: 'Liquid 3D art design'
    },
    categories: [{ name: 'Design', slug: 'design' }, { name: 'Animation', slug: 'animation' }],
    author: {
      name: 'Elena Rostova',
      role: 'Design Director',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop'
    }
  },
  {
    id: 'post-3',
    slug: 'building-scalable-design-systems-with-tailwind-v4',
    title: 'Building Scalable Design Systems with Tailwind CSS',
    excerpt: 'A comprehensive deep dive into custom CSS custom properties, utility mapping, and maintaining typographic consistency across device sizes.',
    content: `
      <p class="text-lg leading-relaxed text-gray-700 font-normal mb-6">
        Design systems serve as the single source of truth for visual tokens across modern product teams. Tailwind CSS provides a low-level framework that balances rapid prototyping with strict constraint enforcement.
      </p>
      <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-4 tracking-tight">Standardizing Token Radii & Contrast</h2>
      <p class="leading-relaxed text-gray-700 mb-6">
        Establishing strict border-radius values (such as rounded 24px cards) softens layout cards while maintaining architectural harmony across all components.
      </p>
    `,
    date: 'July 24, 2026',
    readTime: '5 min read',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
      altText: 'Modern architectural interior'
    },
    categories: [{ name: 'Design System', slug: 'design-system' }],
    author: {
      name: 'Marcus Chen',
      role: 'Frontend Architect',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    }
  },
  {
    id: 'post-4',
    slug: 'optimizing-core-web-vitals-in-2026',
    title: 'Optimizing Core Web Vitals for Uncompromised SEO Scores',
    excerpt: 'Practical techniques for minimizing LCP, eliminating CLS layout jumps, and achieving 100/100 Lighthouse performance metrics.',
    content: `
      <p class="text-lg leading-relaxed text-gray-700 font-normal mb-6">
        Search engines heavily prioritize user experience signals. Fast load times, stable viewports, and interactive responsiveness directly drive organic reach and reader retention.
      </p>
    `,
    date: 'July 20, 2026',
    readTime: '7 min read',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop',
      altText: 'Cyber digital code rendering'
    },
    categories: [{ name: 'Business', slug: 'business' }, { name: 'SEO', slug: 'seo' }],
    author: {
      name: 'Alex Rivera',
      role: 'Lead Architect',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
    }
  },
  {
    id: 'post-5',
    slug: 'the-art-of-minimalist-content-layout',
    title: 'The Art of Minimalist Content Layout & Reading UX',
    excerpt: 'Why narrow character line lengths, generous whitespace, and muted high-contrast palettes drastically improve long-form reading retention.',
    content: `
      <p class="text-lg leading-relaxed text-gray-700 font-normal mb-6">
        Content-first design requires stripping away unnecessary ornamentation. When the typography and line spacing are carefully tuned, reading becomes effortless.
      </p>
    `,
    date: 'July 15, 2026',
    readTime: '4 min read',
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
      altText: 'Minimal studio design space'
    },
    categories: [{ name: 'UX Design', slug: 'ux-design' }],
    author: {
      name: 'Elena Rostova',
      role: 'Design Director',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop'
    }
  }
];

export const MOCK_HEADER_MENU: MenuItem[] = [
  { id: 'm-1', label: 'Work', url: '#' },
  { id: 'm-2', label: 'Services', url: '#' },
  { id: 'm-3', label: 'About', url: '#' },
  { id: 'm-4', label: 'Learn', url: '/' },
];

export const MOCK_FOOTER_MENU: MenuItem[] = [
  { id: 'fm-1', label: 'Work', url: '#' },
  { id: 'fm-2', label: 'Services', url: '#' },
  { id: 'fm-3', label: 'About Us', url: '#' },
  { id: 'fm-4', label: 'Blog Archive', url: '/' },
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-all', name: 'All Articles', slug: 'all' },
  { id: 'cat-dev', name: 'Development', slug: 'development' },
  { id: 'cat-design', name: 'Design', slug: 'design' },
  { id: 'cat-biz', name: 'Business', slug: 'business' },
  { id: 'cat-seo', name: 'SEO & Performance', slug: 'seo' }
];

export async function fetchGraphQL<T>(query: string, variables: Record<string, any> = {}): Promise<T | null> {
  try {
    const res = await fetch(WP_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }, // Incremental Static Regeneration (ISR) edge caching
    });

    if (!res.ok) {
      console.warn('WPGraphQL returned non-OK response, using mock data fallback.');
      return null;
    }

    const { data, errors } = await res.json();
    if (errors) {
      console.warn('WPGraphQL errors encountered:', errors);
      return null;
    }

    return data as T;
  } catch (error) {
    console.warn('Unable to connect to WPGraphQL, rendering seamlessly with mock data fallback.', error);
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const query = `
    query GetAllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          slug
          title
          excerpt
          content
          date
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL<any>(query);

  if (!data?.posts?.nodes?.length) {
    return MOCK_POSTS;
  }

  return data.posts.nodes.map((node: any) => ({
    id: node.id,
    slug: node.slug,
    title: node.title.replace(/<\/?[^>]+(>|$)/g, ''),
    excerpt: node.excerpt ? node.excerpt.replace(/<\/?[^>]+(>|$)/g, '') : '',
    content: node.content || '',
    date: new Date(node.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: '5 min read',
    featuredImage: {
      url: node.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200',
      altText: node.featuredImage?.node?.altText || node.title
    },
    categories: node.categories?.nodes || [{ name: 'General', slug: 'general' }],
    author: {
      name: node.author?.node?.name || 'AiRooms Team',
      role: 'Contributor',
      avatarUrl: node.author?.node?.avatar?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200'
    }
  }));
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) || MOCK_POSTS.find((p) => p.slug === slug);
}

export async function getCategories(): Promise<Category[]> {
  const query = `
    query GetCategories {
      categories(first: 20, where: { orderby: NAME, order: ASC }) {
        nodes {
          id
          name
          slug
          count
        }
      }
    }
  `;

  const data = await fetchGraphQL<any>(query);

  if (!data?.categories?.nodes?.length) {
    return MOCK_CATEGORIES;
  }

  const fetched = data.categories.nodes.map((cat: any) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    count: cat.count || 0
  }));

  // Ensure "All Articles" pill is always available
  return [{ id: 'cat-all', name: 'All Articles', slug: 'all' }, ...fetched];
}

export async function getMenu(menuType: string = 'header'): Promise<MenuItem[]> {
  const query = `
    query GetAllMenus {
      menus {
        nodes {
          id
          name
          slug
          locations
          menuItems(first: 100) {
            nodes {
              id
              label
              url
            }
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL<any>(query);
  const menus = data?.menus?.nodes || [];

  if (menus.length === 0) {
    return menuType === 'footer' ? MOCK_FOOTER_MENU : MOCK_HEADER_MENU;
  }

  const isHeader = menuType.toLowerCase().includes('header');
  const targetKey = isHeader ? 'header' : 'footer';

  // 1. Try matching by registered location ('header' or 'footer')
  let selectedMenu = menus.find((m: any) =>
    m.locations?.some((loc: string) => loc.toLowerCase().includes(targetKey))
  );

  // 2. Try matching by menu name or slug ('main', 'header', 'footer')
  if (!selectedMenu) {
    const searchTerms = isHeader ? ['header', 'main', 'primary', 'top'] : ['footer', 'bottom'];
    selectedMenu = menus.find((m: any) =>
      searchTerms.some((term) =>
        m.name?.toLowerCase().includes(term) || m.slug?.toLowerCase().includes(term)
      )
    );
  }

  // 3. Fallback to first menu for header, or second menu for footer (if available)
  if (!selectedMenu) {
    if (isHeader) {
      selectedMenu = menus[0];
    } else {
      selectedMenu = menus[1] || menus[0];
    }
  }

  const items = selectedMenu?.menuItems?.nodes || [];

  if (items.length === 0) {
    return menuType === 'footer' ? MOCK_FOOTER_MENU : MOCK_HEADER_MENU;
  }

  return items.map((item: any) => {
    let cleanUrl = item.url || '#';
    try {
      if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
        const urlObj = new URL(cleanUrl);
        // Strip subdirectory prefix if present
        let path = urlObj.pathname.replace(/^\/BlogsRoom/, '');
        if (path === '/blogs' || path === '/blogs/') path = '/';
        cleanUrl = path || '/';
      }
    } catch {
      // keep raw url if parsing fails
    }

    return {
      id: item.id,
      label: item.label,
      url: cleanUrl
    };
  });
}
