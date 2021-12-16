var bodyParser = require('body-parser');
var express = require('express');
var http = require('http');
var routes = require('./routes/index');
var PORT = process.env.PORT || 3000 
var cors = require('cors');
const fs = require('fs')


var app = express();

/** Express **/

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


/** Подключаем роуты **/
app.use(routes);

http.createServer(app).listen(PORT, function () {
    console.log(`server has been started on http://localhost:${PORT}/`);
});


module.exports = app;