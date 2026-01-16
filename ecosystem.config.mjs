module.exports = {
  apps: [
    {
      name: 'staging',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'staging',
      },
    },
    {
      name: 'production',
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
