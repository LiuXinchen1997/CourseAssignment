'use strict';

/* 
auth: 蒋雪瑶
function: web服务监听主函数，与接口入口
*/

const { promisify } = require('util');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const config = require('./config');
const mntner = require('./actions/mntner');
const router = require('./actions/router');
const autnum = require('./actions/autnum');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/static'));

app.post('/router/newRouter', promisify(router.newRouter));
app.post('/router/updateRouter', promisify(router.updateRouter));
app.post('/router/whois', promisify(router.whois));
app.post('/router/getRouter', promisify(router.getRouter));
app.post('/router/test', promisify(router.test));




app.post('/autnum/addAS', promisify(autnum.addAS));
app.post('/autnum/updateAS', promisify(autnum.updateAS));
app.post('/autnum/getAS', promisify(autnum.getAS));
app.post('/autnum/getAllAS', promisify(autnum.getAllAS));




app.get('/', function(req, res) {
    res.redirect("/index_test.html");
});

const server = app.listen(config.server.port, function() {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`server is running ${host}:${port}`);
});