// Добавляет префикс сайта к путям файлов (нужно, пока сайт открыт по адресу github.io/имя-репозитория).
export const withBase = (p: string) =>
  p.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${p}` : p;
