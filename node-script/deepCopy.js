/**
 * 深拷贝
 * @param {Object} obj 要拷贝的对象
 * @param {Map} map 用于存储循环引用对象的地址
 */

function deepClone(obj = {}, map = new Map()) {
    // 判断是否是对象
    if (typeof obj !== 'object') {
        return obj
    }
    // 判断是否已存在map中
    if (map.get(obj)) {
        return map.get(obj)
    }
    // 创建新存储空间
    let result = {}
    // 数组处理
    if (Object.prototype.toString.call(obj) === '[Object Array]') {
        result = []
    }
    // 遍历对象，进行迭代  
    for (const key in obj) {
        // 不在原型上
        if (obj.hasOwnProperty(key)) {
            result[key] = deepClone(obj[key], map)
        }
    }
    // 返回数据
    return result;
}

let aa = {
    'b': 'c1', 'c': {
        'a': 'ac', 'd': {
            'm': 23
        }
    }
}

// var b = JSON.parse(JSON.stringify(aa))

function getValue(condition) {
    if (condition) {
        let value = "blue";
        return value;
    } else {
        // value 在此处不可用
        console.log(value,'value');
        return null;
    }
    // value 在此处不可用
}

console.log(a);
var a = "a";
var foo = () => {
    console.log(a);
    var a = "a1";
}
foo();