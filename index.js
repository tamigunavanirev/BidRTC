const app = require('express')();
const http = require('http').Server(app);
const dotenv = require('dotenv');
dotenv.config();

const io = require('socket.io')
    (http, {
    cors: {
        origin: process.env.ALLOW_ORIGIN.split(',').map(origin => origin),
        methods: ["GET", "POST"]
    }
});
const port = process.env.PORT||3000;
console.log(process.env.ALLOW_ORIGIN.split(',').map(origin => origin));
app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/index.html');
res.send("hello");
});

io.on('connection', (socket) => {
    console.log("hai");

    socket.on('chat message', msg => {
        console.log("welcome");
        io.emit('chat message', msg);
    });
});

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});
