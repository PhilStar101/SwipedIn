import { constants } from '@swiped-in/constants';

const name = constants.application.name;
export const config = () => ({
  service: {
    name: 'API gateway',
    api: {
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
  },
});
