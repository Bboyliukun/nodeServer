//请求拦截
axios.interceptors.request.use(
    config => {
        // 根据请求类型进行更改数据
        let obj = {
            'get': () => {
                let t = {
                    _: +new Date()
                };
                let params = config.params ? { ...config.params, ...t } : t;
                config.params = params;
            },
            'post': () => {
                // if (config.data) {
                //     let postFormDataval = new FormData()
                //     for (let item in config.data) {
                //         postFormDataval.append(item, config.data[item])
                //     }
                //     config.data = postFormDataval
                // }

            }
        }

        obj[config.method] && obj[config.method]();
        return config
    },
    error => {
        return Promise.reject(error);
    }
);
const handleError = function (err) {
    alert(err.message || "未知错误");
};
let msg = '网络开小差了，请稍后重试';
let cache = {}; // 防止表单重复提交
const GET = function (url) {
    return function (data = {}) {
        let str = url + JSON.stringify(data)
        if (cache[str]) return new Promise((r, j) => { r(null, '请勿重复提交') })
        cache[str] = true
        return axios.get(url, { params: data }).catch(handleError).then(res => {
            delete cache[str];
            if (!res) {
                return { msg }
            }
            return res
        })
    }
}
const POST = function (url, config = {}) {
    return function (data = {}) {
        let str = url + JSON.stringify(data)
        if (cache[str]) return new Promise((r, j) => { r(null, '请勿重复提交') })
        cache[str] = true
        return axios.post(url, data, config).catch(handleError).then(res => {

            delete cache[str]
            if (!res) {
                return { msg }
            }
            return res
        })
    }
}