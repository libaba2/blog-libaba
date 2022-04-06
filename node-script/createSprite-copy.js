/*
 * @Author: libaba2
 * @Date: 2022-03-25 09:49:30
 * @LastEditTime: 2022-03-28 10:46:33
 * @LastEditors: Please set LastEditors
 * @Description: 组合icon生成雪碧图
 * @FilePath: \blog-libaba\node-script\createSprite.js
 */
var fs = require("fs");
var Spritesmith = require("spritesmith");

class createSprite {
    constructor(config) {
        this.config = config;
    }
    /**
     * @description: 
     * @param {string} inputUrl 小图标源路径
     * @return {*}
     */
    runCreate(inputUrl) {
        this.readdir(inputUrl, []).then(e => {
            this.runCreateSprite(e, this.config)
        })
    }
    /**
     * @description: 获取文件信息
     * @param {string} filesUrl 文件路径
     * @return Promise()
     */
    getFileInfo(filesUrl) {
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
    readdir(filesUrl, arr) {
        let _this = this;
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
                        resFiles.push(_this.getFileInfo(baseUrl))
                    }
                    Promise.all(resFiles).then(async (e) => {
                        for (let i = 0; i < files.length; i++) {
                            const element = files[i];
                            if (e[i]) {
                                let obj = {};
                                obj['name'] = element.split('.')[0];
                                obj['url'] = filesUrl + '/' + element;
                                newFiles.push(obj);
                            } else {
                                await _this.readdir(baseUrls[i], newFiles).then(e => {
                                    newFiles = e;
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
     * @description: runCreateSprite
     * @param {Array[object]} imageList 小图标路径数组
     * @param {String} unit 生成单位(默认：px)
     * @param {Boolean} isOutputTreeJson 是否输出icon信息json文件
     * @return {*}
     */
    runCreateSprite(imageList, { unit = 'px', isOutputTreeJson = false }) {
        let _this = this;
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
                    background-image:url("${_this.config.spriteImageName}");
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
                        `.${_this.config.cssImagePrefix}${imageName}{
                        width:${width};
                        height:${height};
                        background-position: -${x} -${y};
                    }`
                    );
                    console.log(`push icon '${imageName}'-----`);
                }
                fs.mkdirSync(_this.config.outputDir, { recursive: true });
                // 保存雪碧图图片
                fs.writeFileSync(
                    `${_this.config.outputDir}${_this.config.spriteImageName}`,
                    result.image
                );
                // 保存雪碧图CSS文件
                fs.writeFileSync(
                    `${_this.config.outputDir}${_this.config.spriteImageCSS}`,
                    cssLines.join("\n")
                );
                if (isOutputTreeJson) {
                    // 保存雪碧图JSON文件
                    fs.writeFileSync(
                        `${_this.config.outputDir}${_this.config.spriteImageJSON}`,
                        JSON.stringify(json, 0, 4)
                    );
                }
                console.log("create sprite file finish-----");
            }
        );
    }
    /**
     * @description: px2vw
     * @param {Number} num 需转换的数值
     * @param {Number} maxLen 转换后数值精度
     * @return {*}
     */
    px2vw(num, maxLen = 6) {
        return +(num / 750 * 100).toFixed(maxLen) + "vw";
    };
}


export default createSprite