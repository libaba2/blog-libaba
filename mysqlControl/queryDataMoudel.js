var connection = require('./collection').collectinoMysql()


function queryData(sql) {
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        return results;
    })
}

function insertData(sql, insertParams) {
    connection.query(sql, insertParams, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        return results;
    })
}

function updateData(sql, insertParams) {
    connection.query(sql, insertParams, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        return results;
    })
}

function deleteData(sql, insertParams) {
    connection.query(sql, insertParams, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        return results;
    })
}

module.exports = {
    queryData,
    insertData,
    updateData,
    deleteData
}