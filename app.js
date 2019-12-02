const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./middleware/templating');

// const Sequelize = require('sequelize');
const config = require('./middleware/mysql');

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