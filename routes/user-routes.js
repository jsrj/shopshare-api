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

  ///// --[#]-- [(C) - POST] ----- >>>>>
    /* CREATE a new user. Right now this is just a hard-coded test user */
    router.post('/new', (req, res, next) => {
      const newUser = new User({

          firstName: 'Joe',

          lastName: 'Schmoe',

          userName: 'joe_mc_schmoe_69',

          email: 'joe@reaper420.com',

          encPW: 'zxcvbn',

          facebookID: 'none',

          googleID: 'none',

          profileImage: '',

          userAge: {
            day  : 01,
            month: 01,
            year : 2017
          },

          phone: '(555) 867-5309',

          proofOfID: {
            idType: 'Driver\'s Liscense',
            issuingState: 'Florida',
            issueDate: '01/01/2017',
            expirationDate: '01/02/2017',
            idNumber: 's87df6a8sd7fqw'
            },

          userLocation: {},
          summary: 'Like long walks on the beach, getting my hands dirty, and building ash trays...',
          qualifications: [{}],
          paymentData: {},
          userRatings: [{}],
          ratingHistory: [],
          message:[
                    {
                      author: 'ShopShare Admin',
                      timestamp: '19/07/2017',
                      userType: 'Admin',
                      subject: 'Welcome To ShopShare',
                      content: 'Blah blah blah, welcome to shopshare and stuff, test test test 1 2 3',
                      attachmentUrls: []
                    }
                  ],

          history: [],

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
  ///// --[@]-- [(C) -POST] ----- -END-

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