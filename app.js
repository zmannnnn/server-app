var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// 加载链接数据库文件
require('./db.js')(app)

// 加载跨域中间件
app.use(require('cors')())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 这个是设置静态文件夹
app.use(express.static(path.join(__dirname, 'public')));

// 引入自定义路由文件 我这里是为了示例用的temp.js,没有直接用index
require('./routes/temp')(app)

// 这个是连两个默认的路由不要就去掉
/**
 * app.use('/', require('./routes/index'));
 * app.use('/users', require('./routes/users'));
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
