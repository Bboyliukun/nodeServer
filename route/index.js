const router = require('@koa/router')();
// 加载路由
const addControllers = require('./configRouter')
// 把路由传递进去
addControllers(router)
module.exports = router