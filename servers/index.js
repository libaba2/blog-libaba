
var Koa = require('koa');
var routes = require('../routes/index') //路由列表
var cors = require('koa2-cors');//跨域
const bodyparser = require("koa-bodyparser");

var app = new Koa();
app.use(bodyparser());// 处理post请求获取参数为空
app.use(cors());// 设置跨域
app.use(routes.routes()).use(routes.allowedMethods())// 注册路由
app.listen(9000);
console.log('app started at port 9000...')
