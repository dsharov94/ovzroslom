# Архитектура ovzroslom.ru

## Обзор
- **Frontend:** Astro (статическая сборка) → контейнер `site` (порт 4321 внутри docker-сети).
- **Reverse proxy:** Caddy — HTTPS (Let’s Encrypt), редиректы, заголовки безопасности, CSP.
- **Оркестрация:** Docker Compose (`infra/docker-compose.yml`).

## Контейнеры
- `site`: собирает Astro, раздаёт через `serve` (порт 4321 внутри сети).
- `caddy`: слушает 80/443 на хосте, проксирует в `site:4321`.

## Порты и сеть
- Внешние: 80/tcp, 443/tcp (UFW открыт).
- Внутренние: `site:4321` (только внутри docker-сети `webnet`).

## Конфигурация
- `infra/Caddyfile` — домены, TLS, заголовки, CSP.
- `infra/docker-compose.yml` — сервисы/тома.
- `apps/site/**` — исходники сайта.

## Схема трафика
Пользователь ⇄ (HTTP/HTTPS) ⇄ Caddy ⇄ (HTTP) ⇄ site:4321

bash
Копировать
Редактировать
