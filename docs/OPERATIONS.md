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


## Git и автодеплой
- Репозиторий: `origin` на GitHub (см. `.github/workflows/deploy.yml`).
- Ветка по умолчанию: `main`. Пуш в `main` **автоматически** запускает деплой на VPS.
- Типичный цикл:
  ```bash
  # 1) Проверяем связь
  git remote -v
  git ls-remote origin -h

  # 2) Ветки/коммиты
  git checkout -b feature/design || git checkout feature/design
  git add -A
  git commit -m "feat(design): дизайн-система + главная"
  git push -u origin feature/design

  # 3) Создаём Pull Request -> Merge в main
  # 4) Деплой запускается GitHub Actions (.github/workflows/deploy.yml)
  ```
- Быстрый хотфикс (если нужно миновать PR):
  ```bash
  git checkout main
  git pull
  git cherry-pick <commit>
  git push origin main
  ```
- Логи деплоя: вкладка **Actions** в GitHub → workflow **Deploy to VPS**.


## Первичная настройка на сервере (клон репозитория)
> Ошибка `fatal: not a git repository` означает, что вы не в каталоге с клоном git.

1. Проверяем, есть ли локальный клон:
   ```bash
   ls -la ~/ovzroslom
   test -d ~/ovzroslom/.git && echo 'OK: repo exists' || echo 'NO: clone needed'
   ```

2. Если клон отсутствует — клонируем и переключаемся на main:
   ```bash
   mkdir -p ~/ovzroslom
   git clone git@github.com:dsharov94/ovzroslom.git ~/ovzroslom
   cd ~/ovzroslom
   git checkout main
   git remote -v
   ```

3. Если клон уже есть — просто переходим в каталог проекта:
   ```bash
   cd ~/ovzroslom
   git status
   ```

4. Типичный цикл через feature-ветку (внутри каталога репозитория):
   ```bash
   cd ~/ovzroslom
   git checkout -b feature/design || git checkout feature/design
   git add -A
   git commit -m "feat(design): дизайн-система + главная"
   git push -u origin feature/design
   # Создаём Pull Request → merge в main
   # Пуш в main запускает GitHub Actions → автодеплой на VPS
   ```

### Траблшутинг
- **Нет доступа по SSH к GitHub:** убедиться, что `~/.ssh/id_ed25519.pub` добавлен в GitHub → Settings → SSH keys.
  ```bash
  ssh -T git@github.com
  ```
- **Workflow не запускается:** проверить вкладку **Actions** в GitHub, а также корректность секретов для деплоя (если используются).
