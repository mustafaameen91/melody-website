#!/usr/bin/env bash
# Run on the server from the project folder to ship the latest code: ./deploy/deploy.sh
set -euo pipefail
cd "$(dirname "$0")/.."

git pull --ff-only
npm ci
npm run build
pm2 reload deploy/ecosystem.config.cjs --update-env || pm2 start deploy/ecosystem.config.cjs
pm2 save
echo "Melody is live."
