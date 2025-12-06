module.exports = {
  apps: [
    {
      name: 'gateway-service',
      script: 'nx',
      args: 'run gateway-service-gateway-service:serve',
      env: {
        PORT: 3000,
      },
    },
    {
      name: 'auth-service',
      script: 'nx',
      args: 'run auth-service-auth-service:serve',
      env: {
        AUTH_SERVICE_PORT: 3333,
      },
    },
    {
      name: 'payment-service',
      script: 'nx',
      args: 'run payment-service:serve',
      env: {
        PAYMENT_SERVICE_PORT: 3334,
      },
    },
    {
      name: 'frontend',
      script: 'nx',
      args: 'run karlo:serve',
    },
  ],
};
