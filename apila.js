var dotenv = require('dotenv');

if(dotenv) {
  dotenv.load();
}

var debug = require('debug')('Express4');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
var path = require('path');

require('./app_api/services/activities.service')(io);

require('./app_api/models/db');
require('./app_api/config/passport');

// (commented out because routes in the server are not used)
// var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');

//app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb', extended: true}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

var url = "";

if (process.env.NODE_ENV === 'production') {
  url = "https://apila.care";
} else if (process.env.NODE_ENV === 'staging') {
  url = "https://apila.us";
}

/*
if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.get('*', function(req, res, next) {
    if(req.headers['x-forwarded-proto'] != 'https') {
        res.redirect(url + req.url);
      } else {
        next();
      }
  });
}
*/

app.use('/api', routesApi);
app.use('/files', express.static(__dirname + 'upload_storage'));

app.use(express.static(path.join(__dirname, 'app_client')));


app.use('/marketing', express.static(path.join(__dirname, '/marketing')));
app.use('/front', express.static(path.join(__dirname, '/front')));

app.get('*', function(req, res) {

  if(req.url === '/static/js/main.cd60acc0.js') {
    res.sendfile((path.join(__dirname, 'front/static/js/main.cd60acc0.js')));
  } else if(req.url === '/static/css/main.f626de8a.css') {
    res.sendfile((path.join(__dirname, 'front/static/css/main.f626de8a.css')));
  } else if(req.url === '/static/js/main.cd60acc0.js.map') {
    res.sendfile((path.join(__dirname, 'front/static/js/main.cd60acc0.js.map')));
  } else if(req.url === '/static/css/main.f626de8a.css.map') {
    res.sendfile((path.join(__dirname, 'front/static/css/main.f626de8a.css.map')));
  } else {
    res.sendfile((path.join(__dirname, 'marketing/index.html')));
  }
});

app.set('port', process.env.PORT || 3300);

var server = http.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});


module.exports = app;
