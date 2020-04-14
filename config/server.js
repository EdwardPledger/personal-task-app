const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const taskController = require('../controllers/task-controller');

/**
 * Server configuration
 */
const startServer = () => {
  const app = new Koa();

  app.use(bodyParser());
  app.use(taskController.routes());
  app.use(taskController.allowedMethods());
  app.listen(3000, () => console.log('Koa is listening on port 3000'));
};

module.exports = startServer;
