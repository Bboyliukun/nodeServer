// 
const axios = require('axios')
let { axiosHeard } = require('./index')
const { errorLogger } = require('./loger');
module.exports = async (ctx, next) => {
    const option = axiosHeard(ctx)
    console.log(ctx.request.body, ' ctx.request.body', option)
    try {
        let res = await axios(option)
        console.log('res = 代理 返回结果了')
        ctx.body = res.data
    } catch (e) {
        errorLogger.warn('代理目标接口返回出错 = ',ctx)
        // 如果后面的代码报错 返回500
        ctx.status = 500;
        await ctx.render('500')
    }
    await next();   // 执行后代的代码
}