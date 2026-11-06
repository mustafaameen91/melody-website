// PM2 process file: pm2 start deploy/ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: "melody",
      cwd: __dirname + "/..",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 127.0.0.1 -p 3000",
      env: { NODE_ENV: "production" },
      instances: 1,
      autorestart: true,
      max_memory_restart: "600M",
    },
  ],
};
