'use strict';

var express = require('express')
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
app.use(cors());

var env="dev";
var port="8087";

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));


var routes = require('./app/routes');
routes(app);

//listening on port
app.listen(port, function() {
   console.log('photoshooto app '+env+' api started on port: ' + port);
});