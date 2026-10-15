import { withBase } from "@/lib/base";
import { site } from "@/content/site";

// Портрет адвоката в золотой рамке. Пока фото нет, показывается монограмма.
export default function Portrait({ priority = false }: { priority?: boolean }) {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
      <div className="absolute -inset-3 border border-gold/40 sm:-inset-4" aria-hidden />
      <div className="absolute -right-3 -bottom-3 h-24 w-24 border-r border-b border-gold sm:-right-4 sm:-bottom-4" aria-hidden />
      <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-raised to-ink">
        {site.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={withBase(site.photo)}
            alt={`${site.name}, адвокат`}
            loading={priority ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <div className="grain flex h-full flex-col items-center justify-center gap-5 text-center">
            <span className="font-serif text-[7rem] leading-none text-gold/90 italic">РГ</span>
            <span className="h-px w-16 bg-gold/60" />
            <span className="text-xs tracking-[0.3em] text-mist uppercase">Адвокат</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent px-6 pt-16 pb-5">
          <p className="font-serif text-xl">{site.name}</p>
          <p className="mt-1 text-xs tracking-wider text-mist">Рег. № {site.registryNumber} · {site.city}</p>
        </div>
      </div>
    </div>
  );
}
