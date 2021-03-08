const fs = require('fs')
const path = require('path')
const { visionHash } = require('../config')
let list = async (ctx, next) => {
    let id = ctx.params.id; // 获取请求参数
    await ctx.render('list', { visionHash, id })
}
module.exports = {
    'GET /list/:id': list
}