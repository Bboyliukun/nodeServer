const path = require('path')
const logs = path.join(__dirname + '../../logs')
const log4js = require("log4js");
// console.log(logs, '==== logs ====')
log4js.configure({
    appenders: {
        console: {
            type: 'console'
        },
        errorLogger: {
            type: 'dateFile',
            filename: logs + '/err',
            pattern: '-yyyy-MM-dd-hh.log',
            alwaysIncludePattern: true,
            encoding: 'utf-8',
            layout: {
                type: 'basic'
            }
        },
        http: {
            type: 'dateFile',
            filename: logs + '/http',
            pattern: '-yyyy-MM-dd-hh.log',
            alwaysIncludePattern: true,
            encoding: 'utf-8',
            layout: {
                type: 'basic'// 'messagePassThrough'
            }
        },
        resLogger: {
            type: 'dateFile',
            filename: logs + '/res',
            pattern: '-yyyy-MM-dd-hh.log',
            alwaysIncludePattern: true,
            encoding: 'utf-8',
            layout: {
                type: 'basic'
            }
        }
    },
    categories: {
        default: {
            appenders: ['console'], level: 'all'
        },
        resLogger: {
            appenders: ['resLogger'], level: 'info'
        },
        errorLogger: {
            appenders: ['errorLogger'], level: 'error'
        },
        http: {
            appenders: ['http'], level: 'info'
        }
    }
});
// 调用预先定义的日志名称
const resLogger = log4js.getLogger('resLogger');
const reqLogger = log4js.getLogger('http');
const errorLogger = log4js.getLogger('errorLogger');
// const consoleLogger = log4js.getLogger();
module.exports = {
    logers: async (ctx, next) => {
        // console.log('log ctx request == ', ctx)
        reqLogger.info(ctx.request)
        resLogger.info(ctx.response)
        await next()
    },
    resLogger,
    reqLogger,
    errorLogger
}