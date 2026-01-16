module.exports = {
  apps: [
    {
      name: 'backend-staging',

      script: 'npm',
      args: 'run start',

      cwd: '/var/www/development-pms/pms-backend',
      instances: 1,
      exec_mode: 'fork',
      interpreter: 'none',

      env_file: '.env.staging',
    },
  ],
};
