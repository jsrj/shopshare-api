
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
///// --[@]-- [API CONFIGURATION] ----- -END-

///// --[#]-- [PATH TO ALL PRIMARY ROUTES] ----- >>>>>
  const index    = require('./routes/index');
  const user     = require('./routes/user-routes');
  const provider = require('./routes/provider-routes');
  const listing  = require('./routes/listing-routes');
  const message  = require('./routes/message-routes');

  app.use('/api'     , index);
  app.use('/user'    , user);
  app.use('/provider', provider);
  app.use('/listing' , listing );
  app.use('/message' , message );
///// --[@]-- [PATH TO ALL PRIMARY ROUTES] ----- -END-

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

