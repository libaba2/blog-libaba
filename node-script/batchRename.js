
var fs = require('fs')
/**
 * @description: 获取文件信息
 * @param filesUrl 文件路径
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
 * @param filesUrl 文件路径
 * @return Promise()
 */
function readdir(filesUrl) {
    return new Promise((resolve, rejcet) => {
        fs.readdir(filesUrl, function (err, files) {
            if (!err) {
                let newFiles = [];
                let resFiles = [];
                for (let i = 0; i < files.length; i++) {
                    const element = files[i];
                    const baseUrl = filesUrl + '/' + element;
                    resFiles.push(getFileInfo(baseUrl))
                }
                Promise.all(resFiles).then(e => {
                    for (let i = 0; i < files.length; i++) {
                        const element = files[i];
                        if (e[i]) {
                            newFiles.push(filesUrl + '/' + element)
                        }
                    }
                    resolve(newFiles); // 只返回文件
                })
            }
        })
    })
}
/**
 * @description: 修改文件名
 * @param oldFileUrl 旧文件路径数组
 * @param type 新命名模式（前缀or后缀，after or before）
 * @param str 添加命名字符串
 * @param separator 分隔符
 * @param excludeType 排除文件类型数组
 * @return Undefined
 */
function renameFile(oldFileUrl, type, str, separator, excludeType) {
    if (oldFileUrl.length === 0) return;
    try {
        for (let i = 0; i < oldFileUrl.length; i++) {
            const element = oldFileUrl[i];
            let fileType = element.split('.').pop() // 文件类型
            let filePath = element.substr(0, element.lastIndexOf('.')) // 文件路径
            let fileBasePath = filePath.substr(0, element.lastIndexOf('/')) // 文件父目录
            let fileName = filePath.substr(element.lastIndexOf('/') + 1) // 文件名
            let newName = ''
            if (excludeType && excludeType.includes(fileType)) continue;
            if (type === 'before') {
                newName = str + separator + fileName
            } else if (type === 'after') {
                newName = fileName + separator + str
            } else {
                newName = str + separator + i
            }
            fs.rename(element, fileBasePath + '/' + newName + '.' + fileType, () => {
                console.log(fileName + '已重命名！');
            })
        }
    } catch (e) {
        console.error(e);
    }
}
/**
 * @description: 
 * @param {String} baseUrl 修改文件夹路径
 * @param {String} type 修改方式 all before after 
 * @param {String} str 文件名字符串
 * @param {String} separator 间隔符
 * @param {Array<String>} excludeType 排除修改类型
 * @return {*}
 */
function baseFilesReaname({baseUrl, type, str, separator, excludeType}) {
    readdir(baseUrl).then(e => {
        renameFile(e, type, str, separator, excludeType)
    })
}
const config = {
    baseUrl: 'E:/桌面文件/git',
    type: 'all',
    str: 'scratch-img',
    separator: '-',
    excludeType: ['css']
}
console.log(config.baseUrl);
// baseFilesReaname(config)

