const express = require('express');
const router = require('./router');
const fs = require('fs');
const https = require('https');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json())
app.use('/', router);

const privateKey = fs.readFileSync('./https/michaelchan.top.key', 'utf8');
const pem = fs.readFileSync('./https/michaelchan.top.pem','utf8');
const credentials = {
    key: privateKey,
    cert: pem
}

const httpServer = https.createServer(credentials, app);
function errorHandle (err, req, res, next) {
    res.status(500).json({
        error: -1,
        message: err.toString()
    })
}

app.use(errorHandle)

const  server = app.listen(3054, function () {
    const { address, port } = server.address();
    console.log('启动成功', address, port);
})

httpServer.listen(18082, function () {
    console.log('18082启动成功', 18082)
})