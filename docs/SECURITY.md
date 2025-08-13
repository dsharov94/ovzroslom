# Безопасность

## Сеть/Порты
- Открыты: 22 (SSH), 80 (HTTP), 443 (HTTPS).
- UFW: sudo ufw allow 80; sudo ufw allow 443

## SSH
Отключить вход по паролю:
sudo sed -i 's/^#\?PasswordAuthentication .*/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart ssh

## Заголовки безопасности (Caddy)
HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, CSP.

## Обновления безопасности
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
