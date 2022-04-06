var mysql = require('mysql')
function collectinoMysql() {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'blog_libaba'
    });
    connection.connect(function (err) {
        if (err) {
            return console.error(err);
        }
    });
    return connection;
}

module.exports = {
    collectinoMysql
}