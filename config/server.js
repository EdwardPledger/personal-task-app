const Koa = require('koa');

/**
 * Server configuration
 */
const startServer = () => {
  const app = new Koa();

  app.use(async (context) => {
    // eslint-disable-next-line no-param-reassign
    context.body = 'Hello, World!';
  });
  app.listen(3000, () => console.log('Koa is listening on port 3000'));
};

module.exports = startServer;
