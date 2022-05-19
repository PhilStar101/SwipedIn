export const config = () => ({
  service: {
    name: 'Profile',
    database: {
      host: `${process.env.DB_URI}${
        process.env[`NODE_ENV`] === 'test' ? '_test' : ''
      }?retryWrites=true&w=majority`,
    },
  },
});
