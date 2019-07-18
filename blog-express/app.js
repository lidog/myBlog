var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);


var blogRouter = require('./routes/blog');
var userRouter = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//加入判断环境变量
const env = process.env.NODE_ENV;
if(env==='env')app.use(logger('dev'));
if(env==='prod'){
    const logFileName = path.join(__dirname,'log','access.log')
    const writeStream = fs.createWriteStream(logFileName,{
        flags:'a'
    })
    app.use(logger('combined',{
        stream:writeStream
    }));
}
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./db/redis');
const sessionStore = new RedisStore({
    client:redisClient
})
app.use(session({
    secret:'Wxxgwegwi23452',//用于加密的字符串
    saveUninitialized: false,
    key:"token",
    cookie:{
      path:'/', //默认值
      httpOnly:true, //默认值
      maxAge:24*60*60*1000, //过期时间
    },
    store:sessionStore,
}))



app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

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
