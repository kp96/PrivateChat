var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var validate = require('./routes/validate');
var chat = require('./routes/chat');
var index = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/public',  express.static(__dirname + '/public'));
app.use('/',index);
app.use('/validate',validate);
app.use('/chat',chat);
io.on('connection', function(client) {  
    console.log('Client connected...');
    client.on('join', function(data) {
        client.emit('online',data);
        client.broadcast.emit('online',data);
    });
    client.on('messages',function(data){
        client.emit('broad',data);
        client.broadcast.emit('broad',data);
    });
});

server.listen(4200);  