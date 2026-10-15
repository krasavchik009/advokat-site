import { site } from "@/content/site";
import { MailIcon, PhoneIcon, TelegramIcon, WhatsappIcon } from "./Icons";

const mailHref = `mailto:${site.email}?subject=${encodeURIComponent("Вопрос адвокату")}`;

const links = [
  { href: site.phoneHref, icon: PhoneIcon, label: "Позвонить", sub: site.phone, external: false },
  { href: site.whatsapp, icon: WhatsappIcon, label: "WhatsApp", sub: "Написать в чат", external: true },
  { href: site.telegram, icon: TelegramIcon, label: "Telegram", sub: site.telegramHandle, external: true },
  { href: mailHref, icon: MailIcon, label: "Почта", sub: site.email, external: false },
];

// Крупные кнопки связи: на сайте ничего не заполняется, человек сразу пишет или звонит адвокату.
export default function ContactLinks() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {links.map(({ href, icon: Icon, label, sub, external }, i) => (
        <li key={label}>
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`group flex min-h-16 items-center gap-4 border p-4 transition-colors duration-200 ${
              i === 0
                ? "border-gold bg-gold text-ink hover:bg-gold-soft"
                : "border-line bg-night hover:border-gold/70 hover:bg-raised"
            }`}
          >
            <span
              className={`grid h-11 w-11 shrink-0 place-items-center border ${
                i === 0 ? "border-ink/30" : "border-gold/40 text-gold group-hover:border-gold"
              }`}
            >
              <Icon width={20} height={20} />
            </span>
            <span className="min-w-0">
              <span className="block font-semibold">{label}</span>
              <span className={`block truncate text-sm ${i === 0 ? "text-ink/75" : "text-mist"}`}>{sub}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
