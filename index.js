const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const path = require('path');
const port = 8000;
app.get('/', function(req, res){
   res.sendFile(path.join(__dirname,'index.html'));});
var users = [];
io.on('connection', function(socket){
   socket.on('setUsername', function(data){
      socket.in(data.chat_room).emit('newmsg',{message:'is connected now',user:data.user});
         socket.emit('userSet', {username: data.user});
         socket.join(data.chat_room);
   });
   socket.on('msg', function(data){
      io.in(data.chat_room).emit('newmsg', data);
   })
});
http.listen(port,function(){
   console.log('listening on localhost:',port);
});