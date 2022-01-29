const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const routes = require('./routes/index');
const PORT = process.env.PORT || 3000 
const cors = require('cors');
const fs = require('fs')


const app = express();

/** Express **/

app.use(cors());
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({
    extended: true,
}));

/** Подключаем роуты **/
app.use(routes);
app.use(express.static(__dirname + '/uploads'));

http.createServer(app).listen(PORT, function () {
    console.log(`server has been started on http://localhost:${PORT}/`);
});


module.exports = app;