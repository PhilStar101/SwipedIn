export const environment = () => {
  const name = 'SwipedIn';
  return {
    production: false,
    api: {
      name,
      host: process.env.HOST,
      prefix: 'api',
      port: parseInt(process.env.PORT, 10) || 3000,
    },
    documentation: {
      prefix: 'api/docs',
      title: name,
      description: `The ${name} API documentation`,
      version: '1.0',
    },
  };
};
