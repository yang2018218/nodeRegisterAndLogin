const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/express-auth', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const UserSchema = new mongoose.Schema({
    // unique  键 唯一性
    username: {type: String, unique: true},
    //密码需要加密： npm i bcrypt （下载）
    password: {
        type: String,
        set(val) {
            console.log(val,'val')
            // 为传过来的密码， 10为密码强度 （一般为10就好了）
            return require('bcrypt').hashSync(val,10)
        }
    },
})
const User = mongoose.model('User', UserSchema)

/** 删除数据库所有数据**/
// User.db.dropCollection("users")

module.exports = {User}
