import type { NextConfig } from "next";

// Сайт собирается в готовые HTML-файлы (папка out) и не требует сервера.
// BASE_PATH задаётся при публикации на GitHub Pages, пока не подключён свой домен.
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
