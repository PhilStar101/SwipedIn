export const config = () => {
  const name = 'SwipedIn';
  const serviceName = 'api-gateway';

  return {
    application: {
      name,
    },
    service: {
      name: `${name} (${serviceName})`,
      host: process.env.HOST,
      prefix: 'api',
      port: parseInt(process.env.PORT, 10) || 3000,
      documentation: {
        prefix: 'api/docs',
        title: name,
        description: `The ${name} API documentation`,
        version: '1.0',
      },
    },
  };
};
