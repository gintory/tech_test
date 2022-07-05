const userData = require('../data/user.json');
const Koa = require('koa');
const app = new Koa();
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);
io.on('ping', (socket) => {
  console.log('a user login in to ping');
});
io.on('connection', (socket) => {
  console.log('连接成功!');
  socket.on('ping', (data) => {
    io.emit('pong', data);
  });
  socket.on('getUser', (data) => {
    io.emit('sendUser', data);
  });
});

server.listen(3006, () => {
  console.log('Server is running on port 666');
});
