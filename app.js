const koa = require('koa')
const app = new koa()
const path = require('path')
const koaStatic = require('koa-static')
const koabodyparser = require('koa-bodyparser')
const { logers } = require('./utils/loger')
const error = require('./utils/error_404')
const proxy = require('./utils/proxy')
const { port, listenCallback } = require('./config')
// 模板
const render = require('koa-art-template')
render(app, {
  root: path.join(__dirname, 'view'),// 视图位置
  extname: '.html',// 模板后缀名
  debug: process.env.NODE_ENV !== 'production'
});
// 加载路由
const router = require('./route/index');
// 静态资源
app.use(koaStatic(path.join(__dirname + '/puplic')))
// 解析请求参数
app.use(koabodyparser())
// 路由
app.use(router.routes())

// 代理去请求接口
app.use(proxy)
// 404 error 处理
app.use(error)
// 日志
app.use(logers)
// 监听端口
app.listen(port, listenCallback)
