# Сайт адвоката Рустама Гогуева

Статический сайт на Next.js и Tailwind CSS. Сервер и база данных не нужны. Сайт не собирает персональные данные: посетители связываются с адвокатом напрямую по телефону, в WhatsApp, Telegram, MAX или по почте.

Сайт бесплатно размещается на GitHub Pages и пересобирается сам при каждом изменении.

## Запуск на компьютере

```bash
npm install
npm run dev
```

Сайт откроется на http://localhost:3000. Готовые файлы для публикации собираются командой `npm run build` в папку `out`.

## Что где менять

| Что | Где |
| --- | --- |
| Телефон, Telegram, почта, адрес, ФИО, график | `src/content/site.ts` |
| Фото адвоката | положить файл в `public/` (например `public/lawyer.jpg`) и указать `photo: "/lawyer.jpg"` в `src/content/site.ts` |
| Услуги и цены | `src/content/services.ts` |
| Тексты главной (шаги, гарантии, вопросы) | `src/app/(site)/page.tsx` |
| Посты | через админку `ваш-сайт/admin/` или файлы `.md` в `content/posts` |

## Публикации (админка)

Админка открывается по адресу `ваш-сайт/admin/`. Это Sveltia CMS: посты сохраняются прямо в репозиторий GitHub, а через 1–2 минуты сайт обновляется сам.

Как войти:
1. На GitHub: аватарка → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token.
2. Repository access: «Only select repositories», выбрать репозиторий сайта.
3. Permissions → Repository permissions → **Contents: Read and write**.
4. Создать токен и скопировать его.
5. На странице `/admin/` нажать «Sign In Using Access Token» и вставить токен. Браузер его запомнит.

В файле `public/admin/config.yml` в строке `repo:` должно быть указано `логин/название-репозитория`.

## Публикация на GitHub Pages

1. Создать на GitHub репозиторий и загрузить в него проект (без `node_modules`, `.next`, `out`).
2. В репозитории: Settings → Pages → Source: **GitHub Actions**.
3. Каждый `git push` в ветку `main` (и каждый пост из админки) запускает сборку и публикацию: вкладка Actions → «Публикация сайта».

### Свой домен

1. Settings → Pages → Custom domain: вписать домен (например `advokat-gogueev.ru`), сохранить.
2. У регистратора домена в DNS добавить:
   - четыре записи **A** для `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`;
   - запись **CNAME** для `www`: `логин.github.io`.
3. Когда домен заработает, включить «Enforce HTTPS» в Settings → Pages.
4. Запустить сборку заново (Actions → «Публикация сайта» → Run workflow), чтобы адреса в sitemap обновились.
