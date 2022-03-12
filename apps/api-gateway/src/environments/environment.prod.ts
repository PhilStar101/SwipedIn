import { environment as commonEnvironment } from './environment.common';
export const environment = () => {
  return {
    ...commonEnvironment(),
    production: true,
  };
};
