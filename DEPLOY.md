# Deploying Melody to a Linux server (nginx)

Tested layout: Ubuntu 22.04/24.04, Node.js 22, PM2 keeps the app running on `127.0.0.1:3050`, nginx serves it on ports 80/443.

```
browser ──► nginx :80/:443 ──► Next.js (PM2) 127.0.0.1:3050
```

Domain: **melody.codility.tech**. In the DNS for `codility.tech`, add an **A record** for `melody` pointing at the server's IP before step 5.

## 1. Install Node.js, PM2, nginx, git

```bash
sudo apt update
sudo apt install -y nginx git
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2        # skip if PM2 is already installed
```

## 2. Get the code and build it

```bash
sudo mkdir -p /var/www && sudo chown $USER /var/www
cd /var/www
git clone https://github.com/mustafaameen91/melody-website.git melody
cd melody
npm ci
npm run build
```

If the repo is private, use a GitHub deploy key or a personal access token for the clone.

## 3. Start the app with PM2

```bash
pm2 start deploy/ecosystem.config.cjs
pm2 save
pm2 startup        # prints one sudo command — run it so Melody starts after a reboot
```

Check it: `curl -I http://127.0.0.1:3050` should return `200`.

## 4. Configure nginx

```bash
sudo cp deploy/nginx-melody.conf /etc/nginx/sites-available/melody
sudo ln -s /etc/nginx/sites-available/melody /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## 5. HTTPS (free certificate)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d melody.codility.tech
```

Certbot edits the nginx file to add HTTPS and the HTTP→HTTPS redirect, and renews automatically.

## 6. Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

Port 3050 stays closed to the outside — only nginx talks to it.

## Updating the site later

Push changes to GitHub, then on the server:

```bash
cd /var/www/melody && ./deploy/deploy.sh
```

## Useful commands

| Command | Does |
|---|---|
| `pm2 status` | Is the app running |
| `pm2 logs melody` | App logs |
| `pm2 restart melody` | Restart the app |
| `sudo tail -f /var/log/nginx/error.log` | nginx errors |

The server needs about 1 GB of RAM for `npm run build`. On a smaller server, add swap first:
`sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile`.
