"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { AskButton } from "./AskModal";
import { CloseIcon, MenuIcon, PhoneIcon, TelegramIcon } from "./Icons";

const nav = [
  { href: "/#services", label: "Услуги и цены" },
  { href: "/#about", label: "Об адвокате" },
  { href: "/#process", label: "Как я работаю" },
  { href: "/blog", label: "Публикации" },
  { href: "/#contacts", label: "Контакты" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
        scrolled || menu ? "border-b border-line/70 bg-night/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-gold focus:p-2 focus:text-ink">
        К содержимому
      </a>
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setMenu(false)}>
          <span className="grid h-10 w-10 place-items-center border border-gold/60 font-serif text-lg text-gold transition-colors group-hover:border-gold">
            РГ
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg">{site.shortName}</span>
            <span className="block text-[11px] tracking-[0.2em] text-mist uppercase">Адвокат</span>
          </span>
        </Link>

        <nav aria-label="Основное меню" className="hidden items-center gap-7 text-sm text-mist lg:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="transition-colors hover:text-ivory">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 px-2 text-sm font-semibold whitespace-nowrap transition-colors hover:text-gold-soft md:inline-flex"
          >
            <PhoneIcon width={16} height={16} className="text-gold" />
            {site.phone}
          </a>
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написать в Telegram"
            className="hidden h-11 w-11 place-items-center text-gold transition-colors hover:text-gold-soft sm:grid"
          >
            <TelegramIcon />
          </a>
          <AskButton className="btn btn-gold hidden !min-h-11 !px-4 sm:inline-flex">Связаться с юристом</AskButton>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center lg:hidden"
            aria-label={menu ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menu}
            onClick={() => setMenu((m) => !m)}
          >
            {menu ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menu && (
        <div className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-night lg:hidden">
          <nav aria-label="Мобильное меню" className="container-x flex flex-col py-4">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMenu(false)}
                className="border-b border-line/60 py-4 font-serif text-2xl"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-6 grid gap-3">
              <a href={site.phoneHref} className="btn btn-outline">
                <PhoneIcon width={18} height={18} /> {site.phone}
              </a>
              <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <TelegramIcon width={18} height={18} /> Telegram
              </a>
              <span onClick={() => setMenu(false)}>
                <AskButton className="btn btn-gold w-full">Связаться с юристом</AskButton>
              </span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
