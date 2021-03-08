const svgCaptcha = require('svg-captcha');
module.exports = function (a) {
    let captchaArr = svgCaptcha.createMathExpr({
        noise: 3,
        mathMin: 16,
        mathMax: 89,
        mathOperator: '+'
    });
    return {
        svg: captchaArr.data,// svg 验证码
        text: captchaArr.text// svg 文字
    }
}