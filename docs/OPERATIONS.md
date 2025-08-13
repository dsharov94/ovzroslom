# Операции (Runbook)

## Деплой на сервере
cd ~/ovzroslom/infra
docker compose build site && docker compose up -d

## Логи
docker compose logs -f caddy
docker compose logs -f site

## Домены и HTTPS
1) DNS: A-записи `ovzroslom.ru` и `www` → IPv4 сервера.
2) Вернуть TLS-конфиг в `infra/Caddyfile`, затем:
docker compose restart caddy
docker compose logs -f caddy   # ждём obtaining/obtained certificate

## Бэкапы (cron пример)
mkdir -p ~/backups
(crontab -l 2>/dev/null; echo '0 3 * * * tar -czf ~/backups/ovzroslom-$(date +\%F).tar.gz -C ~ ovzroslom --warning=no-file-changed -P -h --exclude=**/node_modules') | crontab -
