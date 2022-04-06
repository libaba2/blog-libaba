var mongoose = require('mongoose')

function collectionMongoose() {
  mongoose.connect("mongodb://127.0.0.1:27017/blog-libaba", { useMongoClient: true })
  var db = mongoose.connection
  db.on('open', function (err) {
    if (err) {
      console.log('collection mongodb faild...');
      throw err;
    }
    console.log('collection mongodb success...');
  })
  return mongoose
}

function closeCollection(mongoose) {
  mongoose.connection.close()
  console.log('mongodb collection was closed...');
}

module.exports = {
  collectionMongoose: collectionMongoose,
  closeCollection: closeCollection
}

// // 账户的数据库模型
// var UserSchema = new mongoose.Schema({
//   username: String,
//   password: String,
//   email: String
// });
// var User = mongoose.model('User', UserSchema);

// // 新增数据
// var user = {
//   username: 'ydj',
//   password: '123123',
//   email: ''
// }
// var newUser = new User(user);
// newUser.save();