module.exports = app => {
  const mongoose = require("mongoose")
  mongoose.connect('mongodb://127.0.0.1:27017/my-app', {
    useNewUrlParser: true, 
	useUnifiedTopology: true // 新版的数据库报错的话，加一个这个属性
  }, err => {
    if(err) console.warn('数据库连接失败!' + err)
    else console.log('数据库链接成功!')
    }
  )
}