import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import { blogPosts, getBlogBySlug } from '@/data/blog-posts';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    alternates: { canonical: `/blogi/${slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Link
          href="/blogi"
          className="mb-6 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-cyan-600"
        >
          <ArrowLeft className="h-4 w-4" /> Kaikki artikkelit
        </Link>

        <header className="mb-10">
          <span className="text-sm font-semibold uppercase tracking-wider text-cyan-600">
            {post.category}
          </span>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('fi-FI', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {post.readingTime} min lukuaika
            </span>
          </div>
        </header>

        <article
          className="prose prose-slate prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
          <h2 className="text-xl font-bold text-slate-900">Etsitkö parempaa liittymää?</h2>
          <p className="mt-2 text-slate-600">
            Vertaa kaikkia puhelinliittymiä ja löydä edullisin.
          </p>
          <Link
            href="/puhelinliittymat"
            className="mt-4 inline-block rounded-lg bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-700"
          >
            Vertaa liittymiä
          </Link>
        </div>
      </div>
    </div>
  );
}
