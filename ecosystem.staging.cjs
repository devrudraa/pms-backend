module.exports = {
  apps: [
    {
      name: 'api-staging',
      script: 'npm',
      args: 'run start:prod',
      cwd: '/var/www/development-pms/pms-backend',
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        APP_ENV: 'staging',
        PORT: 4001,
      },
    },
  ],
};
