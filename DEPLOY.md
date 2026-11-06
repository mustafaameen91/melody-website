# Deploying Melody (melody.codility.tech)

The server already has Node.js, PM2, nginx and certbot for its other apps. Melody runs in PM2 as `melody` on `127.0.0.1:3050`, and nginx serves it on ports 80/443.

```
browser ──► nginx :80/:443 ──► Next.js (PM2 "melody") 127.0.0.1:3050
```

Needs Node.js 20 or newer (`node -v`).

## First deploy

```bash
# 1. Get the code and build it
cd /var/www
git clone https://github.com/mustafaameen91/melody-website.git melody
cd melody
npm ci
npm run build

# 2. Start it in PM2
pm2 start deploy/ecosystem.config.cjs
pm2 save
curl -I http://127.0.0.1:3050          # should return 200

# 3. nginx site
sudo cp deploy/nginx-melody.conf /etc/nginx/sites-available/melody
sudo ln -s /etc/nginx/sites-available/melody /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 4. HTTPS
sudo certbot --nginx -d melody.codility.tech
```

Certbot adds HTTPS and the HTTP→HTTPS redirect to the Melody nginx file only; the other sites are not touched.

If the repo is private, clone with a GitHub deploy key or a personal access token.

## Updating the site

Push changes to GitHub, then on the server:

```bash
cd /var/www/melody && ./deploy/deploy.sh
```

It pulls, rebuilds and reloads only the `melody` process.

## Useful commands

| Command | Does |
|---|---|
| `pm2 status` | Is the app running |
| `pm2 logs melody` | App logs |
| `pm2 restart melody` | Restart the app |
| `sudo tail -f /var/log/nginx/error.log` | nginx errors |

To change the port, edit it in both `deploy/ecosystem.config.cjs` and `deploy/nginx-melody.conf`.
