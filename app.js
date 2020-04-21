const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./middleware/templating');

// const Sequelize = require('sequelize');
const config = require('./middleware/mysql');

const session = require('koa-session')

const toHump = require('./middleware/toHump')

// var sequelize = new Sequelize(config.database, config.username, config.password, {
//     host: config.host,
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 30000
//     }
// });

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

app.keys = ['secretkeys'];
const CONFIG = {
   key: 'koa:sess', /* 默认的cookie签名 */
   maxAge: 86400000,/* cookie的最大过期时间 */
   autoCommit: true, /** (boolean) automatically commit headers (default true) */
   overwrite: true, /** 无效属性 */
   httpOnly: true, /** (boolean) httpOnly or not (default true) */
   signed: true, /** 默认签名与否 */
   rolling: false, /** 每次请求强行设置cookie */
   renew: false, /** cookie快过期时自动重新设置*/
 };
  
app.use(session(CONFIG, app));
app.use(toHump);
// log request URL:
app.use(async (ctx, next) => {
   console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
   var
       start = new Date().getTime(),
       execTime;
   await next();
   execTime = new Date().getTime() - start;
   ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// static file support:
if (! isProduction) {
   let staticFiles = require('./middleware/static-files');
   app.use(staticFiles('/static/', __dirname + '/static'));
}

// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(templating('views', {
   noCache: !isProduction,
   watch: !isProduction
}));

// add controllers:
app.use(controller());

app.listen(3001);
console.log('app started at port 3001...');