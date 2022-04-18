var doquery = require('./queryDataMoudel')

async function addUser(params) {
    let result = ''
    result = await doquery.queryData(`select * from blog_users`)
    return {
        success: result.length ? true : false,
        data: result,
        alertMsg: '操作成功'
    };
}

module.exports = {
    addUser
}