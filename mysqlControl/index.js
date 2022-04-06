var doquery = require('./queryDataMoudel')

doquery.insertData("insert into blog_users (email, password, username, create_time) values (?,?,?,?)", ['123123@163.com', '123456', 'libaba2', new Date()])