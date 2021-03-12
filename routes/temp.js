/**
 * 创建通用的增删改查的接口模型
*/
module.exports = app => {
  // 引入 express 并把父子路由合并
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })
  /*======================== 定义接口以及方法 start ========================*/
  let result = {
    code: 200,
    msg: "请求成功"
  }
  // 创建数据
  router.post('/postList', (req, res) => {
    req.ModelData.create(req.body)
    res.json({...result})
  })
  // 获取数据
  router.get('/getList', async (req, res) => {
      const model = await req.ModelData.find().limit()
      res.json({...result, data: model})
  })
  // 修改数据
  router.post('/editList', async (req, res) => {
	  // 通过传过来的body里面的数据的_id去数据库里面匹配
    const model = await req.ModelData.findByIdAndUpdate(req.body._id, req.body)
    res.json({...result, data: model})
  })
  // 删除数据
  router.post('/deleteList', (req, res) => {
    req.ModelData.findByIdAndDelete(req.body._id, req.body)
    res.json({...result})
  })
  /*======================== 定义接口以及方法 end ========================*/
  /**
    * 获取数据模型并路由挂载管理
    * 这个写法是一种动态写法，通过前台接口请求传入的参数动态引入模型文件 
	* 譬如前端请求 ".../api/rest/listData/getList" 把文件名listData直接带过连请求不同的文件（即接口数据模型）
    * 如果名称需要类型名称转换的化可以用下面的这个方法进行转换。
    * require('inflection').classify(req.params.resource)
  */
	const resourceMiddleWare = async (req, res, next) => {
		req.ModelData = await require(`../models/${req.params.resource}`) // 给请求绑定原型的名称并引入数据库原型,
		next()
	} // 这个叫中间件，所有的中间件其实可以卸载另外的文件里面，放在一起。
  app.use('/api/rest/:resource', resourceMiddleWare, router)
}
