const address = require('address')
let proxyServerUrl = 'http://pre-rich.meitu.com'// 代理到那个服务器！
let port = 3030;
module.exports = {
    vision: 'V1.0.0',// 版本号
    // new Date().toLocaleDateString().replace(/\//g,'-') + ' ' + new Date().getTime()
    visionHash: '2020-07-30',// 静态资源hash 
    port,
    proxyServerUrl,// 代理到那个服务器！
    cookiesList: ['__mt_temp_token__', '__mt_stat_gid__', 'UM_distinctid'],// 使用的那些cookise
    listenCallback: () => {
        const host = address.ip()
        console.log('\x1b[36m%s\x1b[0m', '应用启动成功：Ip:' + host + ' 端口:' + port + ' 点击下方链接进行跳转 ')
        console.log('\x1b[33m%s\x1b[0m', '  http://' + host + ':' + port)
        console.log('\x1b[32m', ' http://localhost:' + port)
    }
}