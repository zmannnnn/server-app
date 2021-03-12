const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  name: { type: String },
  content: { type: String },
  icon: { type: String }
},{ versionKey: false })
// versionKey 不显示版本字段

module.exports = mongoose.model('listData', schema)