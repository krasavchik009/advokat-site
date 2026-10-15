import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AskButton } from "@/components/AskModal";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";
import { getPost, getPosts } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getPosts();
  // Без постов Next.js не соберёт динамический маршрут, поэтому оставляем служебную заглушку.
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return { robots: { index: false } };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date.toISOString(),
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date.toISOString(),
    author: { "@type": "Person", name: site.name, jobTitle: "Адвокат" },
    image: post.cover ? [new URL(post.cover, site.url).toString()] : undefined,
    mainEntityOfPage: `${site.url}/blog/${post.slug}/`,
  };

  return (
    <article className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-x max-w-3xl">
        <nav aria-label="Навигация" className="text-sm text-mist">
          <Link href="/blog/" className="hover:text-ivory">
            ← Все публикации
          </Link>
        </nav>
        <h1 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-sm text-mist">
          {site.name} · {formatDate(post.date)}
        </p>
        {post.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover} alt="" className="mt-10 aspect-[16/9] w-full border border-line object-cover" />
        )}
        <div className="post-body prose prose-lg mt-10 max-w-none" dangerouslySetInnerHTML={{ __html: post.html }} />

        <aside className="mt-16 border border-line bg-surface p-8">
          <p className="eyebrow">Нужна помощь?</p>
          <p className="mt-3 font-serif text-3xl">Похожая ситуация? Разберу её бесплатно</p>
          <p className="mt-2 text-mist">Позвоните или напишите, чтобы обсудить, как действовать.</p>
          <AskButton className="btn btn-gold mt-6">Связаться с адвокатом</AskButton>
        </aside>
      </div>
    </article>
  );
}
