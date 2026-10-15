import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";
import { site } from "@/content/site";
import { formatDate } from "@/lib/format";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Публикации",
  description: `Статьи и разборы правовых ситуаций от адвоката ${site.shortName}: гражданские и арбитражные споры, КоАП, семейное право, недвижимость.`,
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="container-x">
        <p className="eyebrow">Публикации</p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-tight sm:text-6xl">Право простым языком</h1>
        <p className="mt-4 max-w-2xl text-lg text-mist">
          Разбираю частые ситуации и объясняю, как действовать, чтобы защитить свои интересы.
        </p>

        {posts.length === 0 ? (
          <p className="mt-16 border border-line p-8 text-mist">Публикации скоро появятся.</p>
        ) : (
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}/`}
                className="group flex flex-col border border-line bg-night transition-colors duration-300 hover:border-gold/60 hover:bg-surface"
              >
                <div className="aspect-[16/9] overflow-hidden bg-raised">
                  {p.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.cover}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="grain flex h-full items-center justify-center font-serif text-5xl text-gold/50 italic">§</div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs text-mist">{formatDate(p.date)}</p>
                  <h2 className="mt-3 font-serif text-2xl leading-snug group-hover:text-gold-soft">{p.title}</h2>
                  <p className="mt-3 line-clamp-3 text-sm text-mist">{p.description}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-gold-soft">
                    Читать <ArrowIcon width={16} height={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
