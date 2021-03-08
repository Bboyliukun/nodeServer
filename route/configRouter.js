const fs = require('fs')
const path = require('path')
const { reqLogger } = require('../utils/loger')
// 先导入fs模块，然后用readdirSync列出文件
let addMapping = async function (router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, (function (url) {
                return async (ctx, next) => {
                    reqLogger.info(ctx.request)
                    await mapping[url](ctx, next)
                }
            })(url));
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, (function (url) {
                return async (ctx, next) => {
                    reqLogger.info(ctx.request)
                    await mapping[url](ctx, next)
                }
            })(url));
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}
// function addMapping(router, mapping) {
//     for (var url in mapping) {
//         if (url.startsWith('GET ')) {
//             var path = url.substring(4);
//             router.get(path, mapping[url]);
//         } else if (url.startsWith('POST ')) {
//             var path = url.substring(5);
//             router.post(path, mapping[url]);
//         } else {
//             console.log(`invalid URL: ${url}`);
//         }
//     }
// }
function addControllers(router) {
    let controllerPaths = path.resolve('controller');
    // console.log(controllerPaths, '== controllerPaths ==')
    var files = fs.readdirSync(controllerPaths);
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });
    for (var f of js_files) {
        // console.log(`process controller: ${f}...`);
        let mapping = require(controllerPaths + '/' + f);
        addMapping(router, mapping);
    }
}
module.exports = addControllers
