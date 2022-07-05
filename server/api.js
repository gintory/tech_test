const userData = require('../data/user.json');
const Koa = require('koa');
const Router = require('koa-router');
const Koa_static = require('koa-static');
const path = require('path');
const body = require('koa-body');
const app = new Koa();
const router = new Router();
const server = require('http').createServer(app.callback());
const io = require('socket.io', { cors: true })(server);
app
  .use(
    body({
      multipart: true,
      formidable: {
        uploadDir: path.join(__dirname, '../public/uploads'),
        keepExtensions: true
      }
    })
  )
  .use(Koa_static(__dirname, 'public'));

router.prefix('/api');
router.post('/getData', function (ctx, next) {
  const config = ctx.request.body;
  let data = {
    userId: 0,
    userName: 'null',
    password: 'null',
    userType: 1
  };
  let findUser = userData.RECORDS.find((item) => item.userName == config.userName);
  if (findUser) {
    data = findUser;
  }
  ctx.response.body = { data };
});

io.on('connection', (socket) => {
  socket.on('getUser', (data) => {
    let res = {
      userId: 0,
      userName: 'null',
      password: 'null',
      userType: 1
    };
    if (data) {
      let findUser = userData.RECORDS.find((item) => item.userName == data.userName);
      if (findUser) {
        res = findUser;
      }
    }
    socket.emit('sendUser', res);
  });
});

app.use(router.routes()).use(router.allowedMethods());
server.listen('3006', (err) => {
  if (err) {
    console.log('服务器失败');
  } else {
    console.log('服务器启动成功:地址为:http://localhost:3006');
  }
});
