///// --[#]-- [ROUTER PRE-REQS] ----- >>>>>
  const express       = require('express');
  const router        = express.Router();
///// --[@]-- [ROUTER PRE-REQS] ----- -END-


///// --[#]-- [PRIMARY PROVIDER MODEL] ----- >>>>>
  const Provider      = require('../models/provider-user');
///// --[@]-- [PRIMARY PROVIDER MODEL] ----- -END-


///// --[#]-- [PROVIDER SUB-MODELS] ----- >>>>>

  /*
  * NOTE: All of these will have to connect to an existing user model first, and then inject these attributes
  *  into the relevant fields of that model. As such, the user-model, upon creation, should provide these fields as
  *  an empty or blank version of their respective type. e.g. Array [], object {}, string''
  */
      // Validation specific Models
      const OwnerLiscense = require('../models/sub-models/user/owner-liscense');
      const Qualification = require('../models/sub-models/user/qualifications');

      // Identity and Location related Models
      const LocationData  = require('../models/location-data');
      const Identity      = require('../models/sub-models/user/identification');

      // Financial Specific Models
      const PayableAcct   = require('../models/sub-models/user/provider-payable-account-data');

      // Rating Specific Models
      const ProvRating    = require('../models/sub-models/user/provider-rating');
///// --[@]-- [PROVIDER SUB-MODELS] ----- -END-



///// --[#]-- [CRUD ACTIONS] ----- >>>>>

  ///// --[#]-- [(C) - POST] ----- >>>>>
  ///// --[@]-- [(C) -POST] ----- -END-

  ///// --[#]-- [(R) - GET] ----- >>>>>
  ///// --[@]-- [(R) -GET] ----- -END-

  ///// --[#]-- [(U) - PATCH] ----- >>>>>
  ///// --[@]-- [(U) - PATCH] ----- -END-

  ///// --[#]-- [(D) - DELETE] ----- >>>>>
  ///// --[@]-- [(D) - DELETE] ----- -END-

///// --[@]-- [CRUD ACTIONS] ----- -END-



///// --[#]-- [EXPORT - ROUTER] ----- >>>>>
  module.exports = router;
///// --[@]-- [EXPORT - ROUTER] ----- -END-