const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const render = require('koa-ejs');
const serve = require('koa-static');
const cors = require('kcors');
const path = require('path');
const taskController = require('../controllers/task-controller');

/**
 * Server configuration
 */
module.exports.startServer = () => {
  const app = new Koa();
  console.log('dirname', __dirname);
  // Rendering
  render(app, {
    root: path.join(__dirname, '../', 'views'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: true,
  });

  app.use(cors());
  app.use(bodyParser());
  app.use(taskController.routes());
  app.use(taskController.allowedMethods());
  app.use(serve(path.join(__dirname, '../', 'views')));
  app.listen(3000, () => console.log('Koa is listening on port 3000'));
};
