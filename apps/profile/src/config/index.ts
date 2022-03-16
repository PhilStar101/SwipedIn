export const config = () => ({
  service: {
    name: 'Profile',
    database: {
      host: process.env.DB_URI + '?retryWrites=true&w=majority',
    },
  },
});
