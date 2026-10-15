import Link from "next/link";
import { AskButton } from "@/components/AskModal";
import {
  ArrowIcon,
  CheckIcon,
  ClockIcon,
  DocIcon,
  GavelIcon,
  PinIcon,
  ShieldIcon,
  serviceIcons,
} from "@/components/Icons";
import ContactLinks from "@/components/ContactLinks";
import Portrait from "@/components/Portrait";
import { formatPrice, services } from "@/content/services";
import { courts, education, site } from "@/content/site";
import { formatDate } from "@/lib/format";
import { getPosts } from "@/lib/posts";

const steps = [
  { title: "Звонок или сообщение", text: "Позвоните или напишите в WhatsApp, Telegram или на почту. Отвечаю ежедневно с 9:00 до 18:00." },
  { title: "Бесплатный разбор", text: "Изучаю документы и обстоятельства, объясняю перспективы и риски простым языком." },
  { title: "Договор и стратегия", text: "Фиксируем в договоре объём работы и стоимость. Вы заранее знаете, за что платите." },
  { title: "Ведение до результата", text: "Готовлю документы, представляю вас в суде и госорганах, держу в курсе каждого шага." },
];

const guarantees = [
  { icon: ShieldIcon, title: "Адвокатская тайна", text: "Всё, что вы рассказали, защищено законом и не выходит за пределы нашего разговора." },
  { icon: DocIcon, title: "Работа по договору", text: "Официальное соглашение об оказании юридической помощи с понятной ценой." },
  { icon: GavelIcon, title: "Суды всех уровней", text: "Общей юрисдикции, арбитражные, Верховный и Конституционный суды." },
  { icon: ClockIcon, title: "Срочные дела", text: "Беру дела с горящими сроками: обжалование, ответы на иски, заседания на днях." },
];

const faq = [
  {
    q: "Сколько стоит консультация?",
    a: "Первичная консультация и разбор ситуации бесплатны. По итогам вы поймёте перспективы дела и примерную стоимость работы.",
  },
  {
    q: "От чего зависит итоговая цена?",
    a: "От сложности дела, объёма документов, количества заседаний и инстанций. На сайте указаны цены «от»; точная сумма фиксируется в договоре до начала работы.",
  },
  {
    q: "Можно ли работать удалённо?",
    a: "Да. Консультации, анализ документов и подготовку бумаг можно провести дистанционно. Также возможна встреча в офисе или у вас, и выезд в другие регионы.",
  },
  {
    q: "Вы ведёте уголовные дела?",
    a: "Нет, на этом сайте я принимаю гражданские, арбитражные, семейные дела, дела по КоАП и вопросы недвижимости.",
  },
  {
    q: "Какие документы подготовить к консультации?",
    a: "Всё, что относится к делу: договоры, переписку, решения и постановления, повестки, чеки. Если чего-то нет, это не страшно, начнём с того, что есть.",
  },
];

export default function Home() {
  const posts = getPosts().slice(0, 3);
  const siteUrl = site.url;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: site.title,
    url: siteUrl,
    telephone: site.phone,
    email: site.email,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: "Карачаево-Черкесская Республика",
      streetAddress: "пл. Канамата Боташева",
      addressCountry: "RU",
    },
    openingHours: "Mo-Su 09:00-18:00",
    sameAs: [site.telegram],
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title },
      priceSpecification: { "@type": "PriceSpecification", minPrice: s.price, priceCurrency: "RUB" },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Первый экран */}
      <section className="grain relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_20%,rgba(201,163,92,.14),transparent_55%),radial-gradient(ellipse_at_0%_100%,rgba(23,34,59,.9),transparent_60%)]"
        />
        <div className="container-x grid items-center gap-14 lg:grid-cols-[1.15fr_.85fr]">
          <div className="reveal">
            <p className="eyebrow">Адвокат · {site.city}</p>
            <h1 className="mt-6 font-serif text-[2.6rem] leading-[1.05] font-medium sm:text-6xl lg:text-7xl">
              Защищаю ваши права <em className="text-gold italic">в суде</em> и за его пределами
            </h1>
            <p className="mt-6 max-w-xl text-lg text-mist">
              Гражданские и арбитражные споры, дела по КоАП, развод и раздел имущества, сделки с недвижимостью.
              Честно оцениваю перспективы и веду дело до результата.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <AskButton>
                Получить бесплатную консультацию <ArrowIcon width={18} height={18} />
              </AskButton>
              <Link href="#services" className="btn btn-outline">
                Услуги и цены
              </Link>
            </div>
            <ul className="mt-10 grid gap-3 text-sm text-mist sm:grid-cols-3">
              {["Первичная консультация бесплатно", "Работа по договору", `${site.schedule}`].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-gold" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal [animation-delay:150ms]">
            <Portrait priority />
          </div>
        </div>
      </section>

      {/* Полоса доверия */}
      <section aria-label="Коротко" className="border-y border-line bg-ink">
        <div className="container-x grid grid-cols-2 divide-line py-8 text-center md:grid-cols-4 md:divide-x">
          {[
            ["№ " + site.registryNumber, "в реестре адвокатов"],
            ["Тайна", "адвокатская, по закону"],
            ["4 уровня", "судебной системы"],
            ["Выезд", "к клиенту и в регионы"],
          ].map(([a, b]) => (
            <div key={a} className="px-4 py-3">
              <p className="font-serif text-2xl text-gold sm:text-3xl">{a}</p>
              <p className="mt-1 text-xs tracking-wide text-mist uppercase">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Услуги */}
      <section id="services" className="py-20 lg:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Услуги и цены</p>
              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">С чем я помогаю</h2>
            </div>
            <p className="max-w-md text-mist">
              Указана стартовая стоимость ведения дела. Точная цена зависит от сложности и фиксируется в договоре.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = serviceIcons[s.id];
              return (
                <article key={s.id} className="group flex flex-col bg-night p-7 transition-colors duration-300 hover:bg-surface sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center border border-gold/40 text-gold transition-colors group-hover:border-gold">
                      <Icon width={22} height={22} />
                    </span>
                    <p className="font-serif text-2xl whitespace-nowrap text-gold">{formatPrice(s.price)}</p>
                  </div>
                  <h3 className="mt-6 font-serif text-2xl">{s.title}</h3>
                  <p className="mt-2 text-sm text-mist">{s.summary}</p>
                  <ul className="mt-5 grid gap-2 text-sm">
                    {s.items.map((i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 bg-gold" aria-hidden />
                        {i}
                      </li>
                    ))}
                  </ul>
                  <AskButton
                    className="mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-6 text-sm font-semibold text-gold-soft transition-colors hover:text-ivory"
                  >
                    Обсудить дело <ArrowIcon width={16} height={16} />
                  </AskButton>
                </article>
              );
            })}
            <article className="flex flex-col justify-between bg-raised p-7 sm:p-8">
              <div>
                <p className="font-serif text-2xl text-gold">Бесплатно</p>
                <h3 className="mt-6 font-serif text-2xl">Консультация и разбор ситуации</h3>
                <p className="mt-2 text-sm text-mist">
                  Не уверены, к какой категории относится ваш вопрос? Расскажите о нём, я подскажу, как действовать.
                </p>
              </div>
              <AskButton className="btn btn-gold mt-6 self-start">
                Задать вопрос
              </AskButton>
            </article>
          </div>
        </div>
      </section>

      {/* Об адвокате */}
      <section id="about" className="border-y border-line bg-ink py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div className="hidden lg:block">
            <Portrait />
          </div>
          <div>
            <p className="eyebrow">Об адвокате</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">{site.name}</h2>
            <div className="mt-6 grid gap-4 text-lg text-mist">
              <p>
                Оказываю квалифицированную юридическую помощь в соответствии с Федеральным законом «Об адвокатской
                деятельности и адвокатуре в Российской Федерации». Регистрационный номер {site.registryNumber} в{" "}
                {site.registry}.
              </p>
              <p>
                Для меня каждое дело индивидуально: сначала разбираюсь в деталях, затем предлагаю стратегию и
                честно говорю о рисках. Работаю удалённо, в офисе или с выездом к клиенту, при необходимости
                выезжаю в другие регионы.
              </p>
            </div>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-xs tracking-[0.2em] text-gold uppercase">Образование</h3>
                <ul className="mt-4 grid gap-4">
                  {education.map((e) => (
                    <li key={e.title} className="border-l border-gold/50 pl-4">
                      <p className="font-semibold">{e.title}</p>
                      <p className="text-sm text-mist">
                        {e.place}, {e.year}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs tracking-[0.2em] text-gold uppercase">Представляю интересы</h3>
                <ul className="mt-4 grid gap-2">
                  {courts.map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-gold" />
                      {c}
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-gold" />
                    Государственные органы
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Как я работаю */}
      <section id="process" className="py-20 lg:py-28">
        <div className="container-x">
          <p className="eyebrow">Как я работаю</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">Четыре шага от вопроса до решения</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="relative border-t border-line pt-6">
                <span className="absolute -top-px left-0 h-px w-12 bg-gold" aria-hidden />
                <p className="font-serif text-5xl text-gold/80">0{i + 1}</p>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-mist">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Гарантии */}
      <section aria-labelledby="why" className="pb-20 lg:pb-28">
        <div className="container-x">
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-surface p-7">
                <Icon width={26} height={26} className="text-gold" />
                <h3 id={title === "Адвокатская тайна" ? "why" : undefined} className="mt-5 font-serif text-2xl">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-mist">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Публикации */}
      {posts.length > 0 && (
        <section className="border-t border-line py-20 lg:py-28">
          <div className="container-x">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow">Публикации</p>
                <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Разбираю правовые вопросы</h2>
              </div>
              <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 font-semibold text-gold-soft hover:text-ivory">
                Все публикации <ArrowIcon width={16} height={16} />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col border border-line p-6 transition-colors hover:border-gold/60 hover:bg-surface"
                >
                  <p className="text-xs text-mist">{formatDate(p.date)}</p>
                  <h3 className="mt-3 font-serif text-2xl leading-snug group-hover:text-gold-soft">{p.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm text-mist">{p.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section id="faq" className="border-t border-line bg-ink py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Вопросы</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Частые вопросы</h2>
            <p className="mt-4 text-mist">Не нашли ответ? Спросите напрямую, это бесплатно.</p>
            <AskButton className="btn btn-outline mt-6">Задать свой вопрос</AskButton>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {faq.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="relative h-4 w-4 shrink-0 text-gold" aria-hidden>
                    <span className="absolute top-1/2 left-0 h-px w-4 bg-current" />
                    <span className="absolute top-0 left-1/2 h-4 w-px bg-current transition-transform duration-200 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="pb-6 text-mist">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section id="contacts" className="grain relative py-20 lg:py-28">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_0%,rgba(201,163,92,.10),transparent_50%)]" />
        <div className="container-x grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Контакты</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Обсудим ваше дело</h2>
            <p className="mt-4 text-mist">
              Позвоните или напишите удобным способом. Первичная консультация и разбор ситуации бесплатны. По номеру
              телефона меня также можно найти в WhatsApp и MAX.
            </p>
            <ul className="mt-8 grid gap-4">
              <li className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center border border-gold/40 text-gold"><PinIcon /></span>
                <span>
                  <span className="block text-xs text-mist">Приём по предварительной договорённости</span>
                  <span>{site.address}</span>
                </span>
              </li>
              <li className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center border border-gold/40 text-gold"><ClockIcon /></span>
                <span>{site.schedule}</span>
              </li>
            </ul>
          </div>
          <div className="border border-line bg-surface p-6 sm:p-10">
            <h3 className="font-serif text-3xl">Связаться с адвокатом</h3>
            <p className="mt-2 mb-6 text-mist">Ответ в рабочее время, ежедневно с 9:00 до 18:00.</p>
            <ContactLinks />
          </div>
        </div>
      </section>
    </>
  );
}
