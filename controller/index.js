const fs = require('fs')
const path = require('path')
const { getdata } = require('../model/index')
// const svgCaptcha = require('svg-captcha');
// 生成验证码
const makeCapcha = require('../utils/verificationCode');

// 生成验证码2
const makCode = require('../utils/verificationCode-svg');

let index = async (ctx, next) => {
    let { svg, text } = makCode(1000);
    await ctx.render('index', { svg, text })
}
let index1 = async (ctx, next) => {
    let { img, str } = makeCapcha()
    let src = img.getDataUrl()
    console.log('======')
    await ctx.render('index1', { src, str })
}
let user = async (ctx, next) => {
    await ctx.render('user', { user: '小小坤' })
}
let signin = async (ctx, next) => {
    let { id } = ctx.request.body; // 获取请求参数
    ctx.body = {
        code: 0,
        id
    }
}
let other = async (ctx, next) => {
    let { id } = ctx.request.body; // 获取请求参数
    let { data } = await getdata(ctx)
    ctx.body = data
}
let test = async (ctx, next) => {
    // 请求后端解决数据
    let baidudata = await getdata(ctx, {
        contentTpye: 'application/json;charset=UTF-8',
        host: 'https://xhpfmapi.zhongguowangshi.com',
        method: 'GET',
        url: '/v600/news/getDisclaimer?docid=9808161'
    });
    let data = await getdata(ctx, {
        method: 'POST',
        url: '/aj/credit/commit.json'
    });

    if (baidudata.code) {
        console.log('请求失败')
    }
    if (data.code) {
        console.log('请求失败')
    }
    ctx.body = {
        data,
        baidudata
    }
}
module.exports = {
    'GET /': index,
    'GET /index1': index1,
    'GET /user': user,
    'GET /other': other,
    'POST /signin': signin,
    'GET /test': test // 多个接口合并
}