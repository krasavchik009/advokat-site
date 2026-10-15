"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { site } from "@/content/site";
import ContactLinks from "./ContactLinks";
import { ChatIcon, CloseIcon } from "./Icons";

type Ctx = { open: () => void };
const AskContext = createContext<Ctx>({ open: () => {} });
export const useAskModal = () => useContext(AskContext);

const SEEN_KEY = "ask-modal-seen";
const AUTO_DELAY_MS = 25000;

function storage(key: string, value?: string) {
  try {
    if (value === undefined) return sessionStorage.getItem(key);
    sessionStorage.setItem(key, value);
  } catch {}
  return null;
}

export function AskModalProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);

  const open = useCallback(() => {
    storage(SEEN_KEY, "1");
    if (!ref.current?.open) ref.current?.showModal();
  }, []);

  const close = () => ref.current?.close();

  // Автопоказ: через 25 секунд или при попытке уйти со страницы. Один раз за сессию.
  useEffect(() => {
    const shouldAuto = () => !storage(SEEN_KEY) && !ref.current?.open && !document.querySelector("dialog[open]");
    const timer = window.setTimeout(() => shouldAuto() && open(), AUTO_DELAY_MS);
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget && shouldAuto()) open();
    };
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.clearTimeout(timer);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [open]);

  return (
    <AskContext.Provider value={{ open }}>
      {children}

      <button
        type="button"
        onClick={open}
        className="fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-gold py-3 pr-5 pl-4 font-semibold text-ink shadow-[0_10px_30px_-10px_rgba(201,163,92,.7)] transition-colors duration-200 hover:bg-gold-soft sm:right-6 sm:bottom-6"
      >
        <ChatIcon />
        <span className="text-sm">Задать вопрос</span>
      </button>

      <dialog
        ref={ref}
        aria-labelledby="ask-title"
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto w-[calc(100%-2rem)] max-w-xl overflow-visible bg-transparent p-0 text-ivory backdrop:bg-ink/80 backdrop:backdrop-blur-sm open:animate-[reveal_300ms_ease-out]"
      >
        <div className="relative max-h-[calc(100dvh-2rem)] overflow-y-auto border border-line bg-surface p-6 sm:p-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <button
            type="button"
            onClick={close}
            aria-label="Закрыть"
            className="absolute top-3 right-3 grid h-11 w-11 place-items-center text-mist transition-colors hover:text-ivory"
          >
            <CloseIcon />
          </button>
          <p className="eyebrow">Консультация бесплатно</p>
          <h2 id="ask-title" className="mt-3 pr-8 font-serif text-3xl leading-tight sm:text-4xl">
            Задайте вопрос юристу
          </h2>
          <p className="mt-3 text-mist">
            Позвоните или напишите удобным способом. Коротко опишите ситуацию, и адвокат подскажет, что делать
            дальше.
          </p>
          <div className="mt-6">
            <ContactLinks />
          </div>
          <p className="mt-5 text-sm text-mist">
            По номеру {site.phone} адвоката можно найти и в MAX. {site.schedule}.
          </p>
        </div>
      </dialog>
    </AskContext.Provider>
  );
}

export function AskButton({ children, className = "btn btn-gold" }: { children: React.ReactNode; className?: string }) {
  const { open } = useAskModal();
  return (
    <button type="button" className={className} onClick={open}>
      {children}
    </button>
  );
}
