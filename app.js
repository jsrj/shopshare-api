
///// --[#]-- [CONFIG TOOLS IMPORT] ----- >>>>>
  const express      = require('express');
  const path         = require('path');
  const favicon      = require('serve-favicon');
  const logger       = require('morgan');
  const cookieParser = require('cookie-parser');
  const bodyParser   = require('body-parser');
  const layouts      = require('express-ejs-layouts');
  const mongoose     = require('mongoose');
  const cors         = require('cors');

  //Auth Specific
  const session      = require('express-session');
  const passport     = require('passport');
///// --[@]-- [CONFIG TOOLS IMPORT] ----- -END-

///// --[#]-- [DATABASE DEFINITION] ----- >>>>>
  mongoose.connect('mongodb://localhost/shopshare-api');
///// --[@]-- [DATABASE DEFINITION] ----- -END-

///// --[#]-- [API CONFIGURATION] ----- >>>>>
  const app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  // default value for title local
  app.locals.title = 'ShopShare API | Usage Instructions';

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(layouts);

  // Auth Specific - Import passport config
  require('./config/passport-config');
///// --[@]-- [API CONFIGURATION] ----- -END-

///// --[#]-- [AUTHENTICATION SETUP] ----- >>>>>
  // Auth specific - configure session
  app.use(session({
    secret: 'er07fQLbR^R&xStty@#b7vzLjkTp6SBH686D**9ZKzWd!O26I^9TWW4aiV214AlS',
    resave: true, // needed to avoid wierd errors
    saveUninitialized: true
  }));

  // Auth Specific - configure passport
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cors({
    credentials: true,
    origin: [
              'http://localhost:3000',
              'http://localhost:4200'
            ]
  }));
  /* make sure to remember passport-config file */
///// --[@]-- [AUTHENTICATION SETUP] ----- -END-

///// --[#]-- [PATH TO ALL PRIMARY ROUTES] ----- >>>>>
  const user     = require('./routes/user-routes'          );
  const provider = require('./routes/provider-routes'      );
  const listing  = require('./routes/listing-routes'       );
  const message  = require('./routes/message-routes'       );
  const auth     = require('./routes/authentication-routes');

  app.use('/auth'    , auth    );
  app.use('/user'    , user    );
  app.use('/provider', provider);
  app.use('/listing' , listing );
  app.use('/message' , message );
///// --[@]-- [PATH TO ALL PRIMARY ROUTES] ----- -END-

///// --[#]-- [DEFAULT DIRECTORY PATH] ----- >>>>>
  app.use((req, res, next) => {
    res.sendFile( __dirname + '/public/index.html');
  });
///// --[@]-- [DEFAULT DIRECTORY PATH] ----- -END-

///// --[#]-- [ERROR CATCH] ----- >>>>>
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
///// --[@]-- [ERROR CATCH] ----- -END-

///// --[#]-- [APP EXPORT] ----- >>>>>
  module.exports = app;
///// --[@]-- [APP EXPORT] ----- -END-

