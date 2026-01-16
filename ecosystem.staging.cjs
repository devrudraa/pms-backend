module.exports = {
  apps: [
    {
      name: 'backend-staging',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'staging',
        PORT: 4001,
      },
    },
  ],
};
