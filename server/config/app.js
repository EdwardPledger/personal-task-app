const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const render = require('koa-ejs');
const serve = require('koa-static');
const cors = require('kcors');
const morgan = require('koa-morgan');
const path = require('path');
const fs = require('fs');

const taskController = require('../controllers/task-controller');

const accessLogStream = fs.createWriteStream(path.join(__dirname, '../', 'logs', 'access.log'), { flags: 'a' });

const app = new Koa();

// Rendering
render(app, {
  root: path.join(__dirname, '../', 'views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: false,
});

app.use(cors());
// Error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log('err', err);
    
    ctx.status = err.status || 500;
    ctx.body = err;
    /**
     * TODO: figure out why this blocks response?
     */
    // ctx.app.emit('error', err, ctx);
  }
})
app.use(bodyParser());
app.use(taskController.routes());
app.use(taskController.allowedMethods());
app.use(serve(path.join(__dirname, '../', 'views')));
app.use(morgan('combined', { stream: accessLogStream }));

// When error occurs
app.on('error', (err, ctx) => {
  console.error('SERVER ERROR: ', err);
});

module.exports = app;
