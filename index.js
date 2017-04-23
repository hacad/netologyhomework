const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

var userCount = 0;

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
  console.log('new user connected');

  socket.on('user.userconnected', function(data){
    console.log(`new user: ${data.username}`);
    
    userCount++;
    socket.username = data.username;
    io.sockets.emit('server.userconnected', {userCount, 'username': data.username});
  });

  socket.on('user.newmessage', function(data){
    socket.broadcast.emit('server.newmessage', data);
  });

  socket.on('disconnect', function() {
    if(userCount){
      console.log('user disconnected');
      userCount--;
      io.sockets.emit('server.userdisconnected', {userCount, 'username': socket.username});
    }
  });

});

server.listen(port, function() {
  console.log(`server listening on port ${port}`);
});
