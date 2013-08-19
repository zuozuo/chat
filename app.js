
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/routes')
  , user = require('./routes/user')
  , sign_in = require('./routes/sign_in')
	, sign_up = require('./routes/sign_up')
	, flash = require('connect-flash')
	, helpers = require('./helpers/helpers')
	, _ = require('underscore')
	, util = require('util')
	, expressValidator = require('express-validator')
	, sugar = require('sugar')
  , http = require('http')
  , path = require('path');

var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log('mongo connected successfully !');
});


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(expressValidator());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());
app.use(express.cookieParser('keyboard cat'));
app.use(express.session({ cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(function(req, res, next) {
  res.locals.flash = req.flash();
  next();
})
app.use(helpers());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


app.get('/', routes.index);
app.get('/users', user.list);
app.get('/about', routes.about)

app.get('/sign_in', sign_in.show);
app.post('/sign_in', sign_in.create);

app.get('/sign_up', sign_up.show)
app.post('/sign_up', sign_up.create)







