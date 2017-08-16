var compression = require('compression');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');

var passport = require('passport');
var flash    = require('connect-flash');
var session      = require('express-session');

var index = require('./routes/index');
var auth = require('./routes/auth');
var notes = require('./routes/notes');
var settings = require('./routes/settings');

require('./config/passport')(passport); // pass passport for configuration

var app = express();
app.use(compression());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));

app.use( function(req, res, next) {
    if (req.originalUrl === '/login') {
        next();
        return;
    }

    req.isAuthenticated()
        ? next()
        : res.redirect('/login');
    // if(!req.isAuthenticated()) {
    //     //fixme - ajax request
    //     res.statusCode(401).redirect('/login');
    // } else {
    //     next();
    // }
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'ilovescotchscotchyscotchscotch',
    saveUninitialized: true,
    resave: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

// require('./routes/auth')(app, passport);

app.use('/', auth);
app.use('/login', auth);
app.use('/app', index);
app.use('/notes', notes);
app.use('/settings', settings);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found2');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.ejs');
});

module.exports = app;
