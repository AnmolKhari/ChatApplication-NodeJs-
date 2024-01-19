// index.js
// Node_Server which will handle Socket io Connections
const io=require('socket.io')(8000, {
    cors:{
        origin: "*"
    }
})
const users={};
io.on('connection', socket=>{
    socket.on('new-user-joined', name=>{
        users[socket.id]=name;
        console.log(name, "Aagaya");
        socket.broadcast.emit('user-joined', name);
    });
    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    });
    socket.on('disconnect', message=>{
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    })
});