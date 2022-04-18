/*
 * @Author: your name
 * @Date: 2022-03-25 09:49:30
 * @LastEditTime: 2022-04-11 15:36:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-libaba\node-script\createSprite.js
 * 发npm包 先替换 镜像路径 为npm
 */
var fs = require("fs");
var Spritesmith = require("spritesmith");
const OPTIONS = {
    outputDir: __dirname + "/output/", // 输出路径
    spriteImageName: "sprite.png", // 合成sprite图片名
    spriteImageJSON: "sprite.json", // 输出icon信息json文件名
    spriteImageCSS: "sprite.css",  // 输出css样式文件名
    cssImagePrefix: "icons-", // 样式前缀
};
runCreate('E:\/Download\/task-icons')
/**
 * @description: 
 * @param {string} inputUrl 小图标源路径
 * @return {*}
 */
function runCreate(inputUrl) {
    readdir(inputUrl, []).then(e => {
        runCreateSprite(e,'vw')
    })
}
/**
 * @description: 获取文件信息
 * @param {string} filesUrl 文件路径
 * @return Promise()
 */
function getFileInfo(filesUrl) {
    return new Promise((resolve, reject) => {
        fs.stat(filesUrl, function (err, stats) {
            if (!err) {
                resolve(stats.isFile()); //  是否为文件
            } else {
                reject(null)
            }
        })
    })
}
/**
 * @description: 读取文件列表
 * @param {string} filesUrl 文件路径
 * @param {Array} arr 文件存储路径数组
 * @return Promise()
 */
function readdir(filesUrl, arr) {
    return new Promise((resolve, rejcet) => {
        fs.readdir(filesUrl, function (err, files) {
            if (!err) {
                let newFiles = arr;
                let resFiles = [];
                let baseUrls = [];
                for (let i = 0; i < files.length; i++) {
                    const element = files[i];
                    const baseUrl = filesUrl + '/' + element;
                    baseUrls.push(baseUrl);
                    resFiles.push(getFileInfo(baseUrl))
                }
                Promise.all(resFiles).then(async (e) => {
                    for (let i = 0; i < files.length; i++) {
                        const element = files[i];
                        if (e[i]) {
                            let obj = {};
                            obj['name'] = element.split('.')[0]
                            obj['url'] = filesUrl + '/' + element
                            newFiles.push(obj)
                        } else {
                            await readdir(baseUrls[i], newFiles).then(e => {
                                newFiles = e
                            })
                        }
                    }
                    resolve(newFiles); // 只返回文件
                })
            }
        })
    })
}
/**
 * @description: 
 * @param {Array[object]} imageList 小图标路径数组
 * @param {String} unit 生成单位(默认：px)
 * @return {*}
 */
function runCreateSprite(imageList, unit = 'px') {
    Spritesmith.run(
        {
            src: imageList.map((k) => k.url),
            engine: require("canvassmith"),
        },
        function handleResult(err, result) {
            if (err) {
                console.log(err);
                throw err;
            }
            // 雪碧图JSON文件信息
            var json = {};
            // 雪碧图CSS文件信息
            var cssLines = [];
            cssLines.push(
                `.icons {
                    background-image:url("${OPTIONS.spriteImageName}");
                    display: inline-block;
                }`
            );            
            for (var url in result.coordinates) {
                var imageName = imageList.find((k) => k.url == url).name;
                var data = (json[imageName] = result.coordinates[url]);
                var width = unit === 'px' ? data.width + unit : px2vw(data.width)
                var height = unit === 'px' ? data.height + unit : px2vw(data.height)
                var x = unit === 'px' ? data.x + unit : px2vw(data.x)
                var y = unit === 'px' ? data.y + unit : px2vw(data.y)
                cssLines.push(
                    `.${OPTIONS.cssImagePrefix}${imageName}{
                        width:${width};
                        height:${height};
                        background-position: -${x} -${y};
                    }`
                );
            }
            fs.mkdirSync(OPTIONS.outputDir, { recursive: true });
            // 保存雪碧图图片
            fs.writeFileSync(
                `${OPTIONS.outputDir}${OPTIONS.spriteImageName}`,
                result.image
            );
            // 保存雪碧图JSON文件
            fs.writeFileSync(
                `${OPTIONS.outputDir}${OPTIONS.spriteImageJSON}`,
                JSON.stringify(json, 0, 4)
            );
            // 保存雪碧图CSS文件
            fs.writeFileSync(
                `${OPTIONS.outputDir}${OPTIONS.spriteImageCSS}`,
                cssLines.join("\n")
            );
            console.log("create sprite file finish-----");
        }
    );
}
/**
 * @description: px2vw
 * @param {Number} num 需转换的数值
 * @param {Number} maxLen 
 * @return {*}
 */
const px2vw = function (num, maxLen = 6) {
    return +(num / 750 * 100).toFixed(maxLen) + "vw";
};