const { axiosHeard } = require('../utils/index')
const axios = require('axios')

const moduleGetData = {
    getdata: async (ctx, options ={}) => {
        const option = axiosHeard(ctx, options)
        console.log('\x1b[36m%s\x1b[0m', '请求头内容 = ' , option)
        try {
            let res = await axios(option)
            return {
                code: 0,
                data:res.data,
                msg:res.msg
            }
        } catch (e) {
            // 如果后面的代码报错 返回500
            return {
                code: 1,
                data: '请求失败',
                msg: e
            }
        }
    }
}
module.exports = moduleGetData