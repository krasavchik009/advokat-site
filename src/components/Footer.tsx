import Link from "next/link";
import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink pb-24 sm:pb-10">
      <div className="container-x grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-serif text-2xl">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm text-mist">
            Адвокат. Регистрационный номер {site.registryNumber} в {site.registry}.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-xs tracking-[0.2em] text-gold uppercase">Разделы</p>
          <ul className="grid gap-2 text-mist">
            <li><Link className="hover:text-ivory" href="/#services">Услуги и цены</Link></li>
            <li><Link className="hover:text-ivory" href="/#about">Об адвокате</Link></li>
            <li><Link className="hover:text-ivory" href="/blog">Публикации</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 text-xs tracking-[0.2em] text-gold uppercase">Связь</p>
          <ul className="grid gap-2 text-mist">
            <li><a className="hover:text-ivory" href={site.phoneHref}>{site.phone}</a></li>
            <li><a className="hover:text-ivory" href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><a className="hover:text-ivory" href={site.telegram} target="_blank" rel="noopener noreferrer">Telegram {site.telegramHandle}</a></li>
            <li>{site.schedule}</li>
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-line/60 pt-6 text-xs text-mist/70 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p>Информация на сайте не является публичной офертой.</p>
      </div>
    </footer>
  );
}
