module.exports = {
  apps: [
    {
      name: 'api-staging',
      script: 'dist/main.js',
      cwd: '/var/www/development-pms/pms-backend',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'staging',
        PORT: 4001,
      },
    },
  ],
};
