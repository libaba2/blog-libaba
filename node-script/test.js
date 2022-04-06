var Cbsprite = require('create-base-sprite').createSprite
const OPTIONS = {
    outputDir: __dirname + "/output/", // 输出路径
    spriteImageName: "sprite.png", // 合成sprite图片名
    spriteImageJSON: "sprite.json", // 输出icon信息json文件名
    spriteImageCSS: "sprite.css",  // 输出css样式文件名
    cssImagePrefix: "icons-", // 样式前缀
};
var csprite = new Cbsprite(OPTIONS)
csprite.runCreate('./images')