const { proxyServerUrl, cookiesList } = require('../config')
// 获取所有 cookies，根据config 里面的cookiesList
let getAllcookis = (ctx, cookiesList) => {
    let cookies = []
    let l = cookiesList.length;
    while (l--) {
        if (ctx.cookies.get(cookiesList[l])) {
            cookies.push(cookiesList[l] + '=' + ctx.cookies.get(cookiesList[l]))
        }
    }
    return cookies.join(';')
}
//  整理请求头
let axiosHeard = (ctx, options) => {
    let url = ''
    // host method url
    let countUrl = ctx.request.url; // 默认值
    let method = ctx.request.method; // 默认值
    let contentTpye = 'multipart/form-data';// 默认值
    if (options) {
        countUrl = options.url || ctx.request.url; // 如果传递则使用
        method = options.method || ctx.request.method; // 如果传递则使用
        contentTpye = options.contentTpye || contentTpye; // 如果传递则使用
        url = (options.host || proxyServerUrl) + countUrl; // 如果传递则使用
    } else {
        url = proxyServerUrl + countUrl;
    }
    let cookies = getAllcookis(ctx, cookiesList)

    const option = {
        method: method,
        headers: {
            'content-type': contentTpye,
            'Accept': 'application/json, text/plain, */*',
            'Cookie': cookies
        },
        url
    }
    if ('POST' === method) {
        option.data = ctx.request.body
    }
    return option
}
module.exports = {
    getAllcookis,
    axiosHeard
}