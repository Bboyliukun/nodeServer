const BMP24 = require('gd-bmp').BMP24

function rand(min, max) {
    return ~~(Math.random() * (max - min) + min);
}
// 制造验证码图片
function makeCapcha() {
    const img = new BMP24(100, 40);
    img.drawRect(0, 0, img.w, img.h, rand(0, 0xffffff));
    img.fillRect(1, 1, img.w - 2, img.h - 2, 0xffffff);
    img.drawCircle(rand(0, 100), rand(0, 40), rand(10, 40), rand(0, 0xffffff));
    img.fillRect(rand(0, 100), rand(0, 40), rand(10, 35), rand(10, 35), rand(0, 0xffffff));
    img.drawLine(rand(0, 100), rand(0, 40), rand(0, 100), rand(0, 40), rand(0, 0xffffff));
    // 画曲线
    const w = img.w / 2;
    const h = img.h;
    const color = rand(0, 0xffffff);
    const y1 = rand(-5, 5);
    const w2 = rand(10, 15);
    const h3 = rand(4, 6);
    const bl = rand(1, 5);
    for (let i = -w; i < w; i += 0.1) {
        const yy = Math.floor(h / h3 * Math.sin(i / w2) + h / 2 + y1);
        const xx = Math.floor(i + w);
        for (let j = 0; j < bl; j++) {
            img.drawPoint(xx, yy + j, color);
        }
    }
    const p = 'ABCDEFGHKMNPQRSTUVWXYZ3456789';
    let str = '';
    for (let a = 0; a < 5; a++) {
        str += p.charAt(Math.random() * p.length | 0);
    }
    const fonts = [BMP24.font8x16, BMP24.font12x24, BMP24.font16x32];
    let x = 15, y = 8;
    for (const ch of str) {
        const f = fonts[Math.random() * fonts.length | 0];
        y = 8 + rand(-10, 10);
        img.drawChar(ch, x, y, f, rand(0, 0xffffff));
        x += f.w + rand(2, 8);
    }
    return { img, str };
}
module.exports = makeCapcha