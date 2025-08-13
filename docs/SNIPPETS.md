# Шпаргалка по работе с проектом

## Деплой (обновление сайта)
cd ~/ovzroslom/infra
docker compose build site && docker compose up -d

## Логи
docker compose logs -f caddy
docker compose logs -f site

## Перезапуск
docker compose restart caddy
docker compose restart site

## Проверка порта 4321 (внутренний сайт)
curl -I http://127.0.0.1:4321

## Проверка Caddy по IP
IP=$(curl -4 -s ifconfig.me)
curl -I http://$IP

## Обновление зависимостей
docker compose exec site pnpm install
docker compose exec site pnpm update
