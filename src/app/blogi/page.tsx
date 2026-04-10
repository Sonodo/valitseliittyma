import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/data/blog-posts';

export const metadata: Metadata = {
  title: 'Blogi — Ajankohtaista puhelinliittymistä ja operaattoreista',
  description:
    'Valitse Puhelimen blogi: vertailuja, oppaita ja ajankohtaisia artikkeleita puhelinliittymistä, operaattoreista ja laajakaistoista.',
  alternates: { canonical: '/blogi' },
};

export default function BlogiPage() {
  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Blogi</h1>
          <p className="mt-4 text-lg text-slate-600">
            Ajankohtaista puhelinliittymistä, operaattoreista ja laajakaistoista Suomessa.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogi/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex flex-1 flex-col p-6">
                <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-cyan-600">
                  {post.category}
                </span>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-cyan-700">
                  {post.title}
                </h2>
                <p className="mt-3 flex-1 text-sm text-slate-600">{post.description}</p>
                <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('fi-FI')}
                  </time>
                  <span>&middot;</span>
                  <span>{post.readingTime} min lukuaika</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
