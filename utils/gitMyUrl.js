const fs = require('fs')
const path = require('path')
let urlPath = {
    '/favicon.ico':true
}
// 先导入fs模块，然后用readdirSync列出文件
function addMapping(mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            urlPath[path] = true
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            urlPath[path] = true
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}
function addControllers() {
    let controllerPaths = path.resolve('controller');
    var files = fs.readdirSync(controllerPaths);
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });
    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(controllerPaths + '/' + f);
        addMapping(mapping);
    }
}
addControllers();
module.exports = urlPath
