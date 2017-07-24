///// --[#]-- [ROUTER PRE-REQS] ----- >>>>>
  const express       = require('express');
  const router        = express.Router();
///// --[@]-- [ROUTER PRE-REQS] ----- -END-


///// --[#]-- [PRIMARY USER MODEL] ----- >>>>>
  const User          = require('../models/standard-user');
///// --[@]-- [PRIMARY USER MODEL] ----- -END-


///// --[#]-- [USER SUB-MODELS] ----- >>>>>
      // Identity and Location related Models
      const LocationData  = require('../models/location-data');
      const Identity      = require('../models/sub-models/user/identification');

      // Financial specific Models
      const PaymentData   = require('../models/sub-models/user/payment-data');

      // Standard User Specific Models
      const UserAge       = require('../models/sub-models/user/user-age');
      const UserRating    = require('../models/sub-models/user/user-rating');
///// --[@]-- [USER SUB-MODELS] ----- -END-



///// --[#]-- [CRUD ACTIONS] ----- >>>>>

  ///// --[#]-- [TEST] ----- >>>>>
    router.get('/test', (req, res, next) => {
      res.json({message: 'Hello World!'});
    });
  ///// --[@]-- [TEST] ----- -END-

  ///// --[#]-- [(C) - POST] ----- >>>>>
    /* CREATE a new user. Right now this is just a hard-coded test user */
    router.post('/new', (req, res, next) => {
      const newUser = new User({

          firstName: req.body.firstName,
          lastName : req.body.lastName,
          userName : req.body.userName,
          email    : req.body.email,
          encPW    : req.body.registerPassword,

          userLocation: new LocationData({
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            zip: req.body.zip
          }),
        isProvider: false,
        providerData: {}
      });

      newUser.save((err) => {
        if (err) {
          res.json(err);
          return;
        }

        res.json({
          message: 'New User created!',
          id     : newUser._id,
          user   : newUser
        });
      });
    });
  ///// --[@]-- [(C) -POST] ----- -END-       <== Route Works

  ///// --[#]-- [(R) - GET] ----- >>>>>
  // Retrieves data for all users. DO NOT put this into production.
  router.get('/all', (req, res, next) => {
    User.find((err, userList) => {
      if (err) {
        res.json(err);
        return;
      }
      res.json(userList);
    });
  });
  ///// --[@]-- [(R) -GET] ----- -END-

  ///// --[#]-- [(U) - PATCH] ----- >>>>>
  ///// --[@]-- [(U) - PATCH] ----- -END-

  ///// --[#]-- [(D) - DELETE] ----- >>>>>
  ///// --[@]-- [(D) - DELETE] ----- -END-

///// --[@]-- [CRUD ACTIONS] ----- -END-



///// --[#]-- [EXPORT - ROUTER] ----- >>>>>
  module.exports = router;
///// --[@]-- [EXPORT - ROUTER] ----- -END-