var express = require('express');
var router = express.Router();

///// --[#]-- [IMPORT ALL MODELS] ----- >>>>>

  // Listing-Specific Models
  const Listing       = require('../models/listing');
  const ListingType   = require('../models/listing-type');
  const ListingRating = require('../models/listing-rating');

  // Identity and Location related Models
  const LocationData  = require('../models/location-data');
  const Identity      = require('../models/identification');

  // Validation specific Models
  const OwnerLiscense = require('../models/owner-liscense');
  const Qualification = require('../models/qualifications');

  // Financial specific Models
  const PaymentData   = require('../models/payment-data');
  const PayableAcct   = require('../models/provider-payable-account-data');

  // User & Universal Models
  const User          = require('../models/standard-user');
  const UserAge       = require('../models/user-age');
  const UserMessage   = require('../models/user-message');
  const UserRating    = require('../models/user-rating');

  // Provider specific Models
  const Provider      = require('../models/provider-user');
  const ProvRating    = require('../models/provider-rating');
  
///// --[@]-- [IMPORT ALL MODELS] ----- -END-


/* GET Phones listing. This route is actually /api/phones since we are using /api as the root in app.js */
router.get('/phones', (req, res, next) => {
  Phone.find((err, phonesList) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(phonesList);
  });
});

/* CREATE a new Phone. */
router.post('/phones', (req, res, next) => {
  const thePhone = new Phone({
    brand: req.body.brand,
    name: req.body.name,
    specs: req.body.specs,
    image: req.body.image || ''
  });

  thePhone.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'New Phone created!',
      id: thePhone._id
    });
  });
});

module.exports = router;