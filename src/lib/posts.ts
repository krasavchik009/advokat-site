import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { withBase } from "./base";
import { cleanPostHtml, htmlToText } from "./sanitize";

// Посты лежат в content/posts в виде .md-файлов. Их создаёт админка (/admin) или вручную.
const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type Post = {
  slug: string;
  title: string;
  date: Date;
  description: string;
  cover: string | null;
  html: string;
};

function readPost(file: string): (Post & { draft: boolean }) | null {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  if (!data.title) return null;
  const html = cleanPostHtml(marked.parse(content, { async: false }))
    // Картинки из админки ссылаются на /uploads/..., добавляем префикс сайта, если он есть.
    .replace(/(<img[^>]+src=")(\/[^"]*)/g, (_, a, src) => a + withBase(src));
  const description = String(data.description ?? "").trim() || truncate(htmlToText(html), 200);
  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    date: new Date(data.date ?? fs.statSync(path.join(POSTS_DIR, file)).mtime),
    description,
    cover: data.cover ? withBase(String(data.cover)) : null,
    html,
    draft: Boolean(data.draft),
  };
}

function truncate(s: string, n: number) {
  return s.length <= n ? s : s.slice(0, n).replace(/\s\S*$/, "") + "…";
}

export function getPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readPost)
    .filter((p): p is Post & { draft: boolean } => p !== null && !p.draft)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}
