module.exports = {
  apps: [
    {
      name: 'api-staging',
      script: 'dist/main.js',
      cwd: '/var/www/development-pms/pms-backend',
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'staging',
        APP_ENV: 'staging',
        PORT: 4001,
      },
    },
  ],
};
