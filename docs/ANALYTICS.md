# Аналитика

## Яндекс.Метрика
- Счётчик добавлен в apps/site/src/components/Seo.astro.
- Webvisor отключён: webvisor:false.

## CSP (Caddy)
Разрешить mc.yandex.ru в:
- script-src
- img-src
- connect-src

## Проверка
DevTools → Network: запросы к mc.yandex.ru (tag.js, watch).
