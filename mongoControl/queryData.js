var schemaModel = require('./schemaModel')
var mongoose = require('./mongoCollection').collectionMongoose()


const modelObj = {
    user: mongoose.model('user', schemaModel.user)
}

// *collectionName:表名，*condition:条件
function getQueryData(collectionName, condition) {
    return new Promise((resolve, reject) => {
        modelObj[collectionName].find(condition, function (err, data) {
            if (!err) {
                console.log('select data success@!...');
                resolve(formatRsult(data, '操作成功！', 200, true))
            }
            reject(formatRsult(null, '系统异常！', 500, false))
        })
    })
}

function formatRsult(data, alertMsg, statusCode, success) {
    // mongoCollection.closeCollection()
    return {
        data: data,
        alertMsg: alertMsg,
        statusCode: statusCode,
        success: success
    }
}

module.exports = {
    getQueryData: getQueryData,
    formatRsult: formatRsult
}

