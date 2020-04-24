/* eslint no-use-before-define: 0 */ // --> OFF

const Koa = require('koa');
const render = require('koa-ejs');
const path = require('path');

const app = new Koa();
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true,
});

// eslint-disable-next-line prefer-arrow-callback
app.use(async function (ctx) {
  await ctx.render('index');
});

app.listen(7001);
