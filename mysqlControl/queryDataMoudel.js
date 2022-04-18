var connection = require('./collection').collectinoMysql()


function queryData(sql) {

    return new Promise((resolve, reject) => {
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            resolve(results);
        })
    })
}

function insertData(sql, insertParams) {
    return new Promise((resolve, reject) => {
        connection.query(sql, insertParams, function (error, results, fields) {
            if (error) throw error;
            resolve(results);
        })
    })
}

function updateData(sql, insertParams) {
    return new Promise((resolve, reject) => {
        connection.query(sql, insertParams, function (error, results, fields) {
            if (error) throw error;
            resolve(results);
        })
    })
}

function deleteData(sql, insertParams) {
    return new Promise((resolve, reject) => {
        connection.query(sql, insertParams, function (error, results, fields) {
            if (error) throw error;
            resolve(results);
        })
    })
}

module.exports = {
    queryData,
    insertData,
    updateData,
    deleteData
}