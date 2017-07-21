///// --[#]-- [ROUTER PRE-REQS] ----- >>>>>
    const express       = require('express');
    const router        = express.Router();
///// --[@]-- [ROUTER PRE-REQS] ----- -END-


///// --[#]-- [PRIMARY LISTING MODEL] ----- >>>>>
    const Listing       = require('../models/listing');
///// --[@]-- [PRIMARY LISTING MODEL] ----- -END-


///// --[#]-- [LISTING SUB-MODELS] ----- >>>>>
//   const ListingType   = require('../models/sub-models/listing/listing-type');
//   const ListingRating = require('../models/sub-models/listing/listing-rating');
//   const LocationData  = require('../models/location-data');
///// --[@]-- [LISTING SUB-MODELS] ----- -END-



///// --[#]-- [CRUD ACTIONS] ----- >>>>>

    ///// --[#]-- [(C) - POST] ----- >>>>>
    ///// --[@]-- [(C) - POST] ----- -END-

    ///// --[#]-- [(R) - GET] ----- >>>>>

        ///// --[#]-- [GET ALL LISTINGS] ----- >>>>>
            router.get('/listings', (req, res) => {
                Listing.find((err, allListings) => {

                    if (err) {
                        res.json(err);
                        return;
                    }

                    res.json(allListings);
                });
            });
        ///// --[@]-- [GET ALL LISTINGS] ----- -END-                <== Route Works

        ///// --[#]-- [GET LISTINGS BY PROVIDER] ----- >>>>>
            router.get(`/:provider`, (req, res) => {
                req.params.provider = provider;
            Listing
                    .find({ provider: provider }).
                    where('name.last').equals('Ghost').
                    where('age').gt(17).lt(66).
                    where('likes').in(['vaporizing', 'talking']).
                    limit(10).
                    sort ('-occupation').
                    select('name occupation').
                    exec  ((err, listingByProvider) => {

                            if (err) {
                                res.json(err);
                                return;
                            }

                            res.json(listingByProvider);
                        });
            });
        ///// --[@]-- [GET LISTINGS BY PROVIDER] ----- -END-        <== In-Progress

        ///// --[#]-- [GET LISTING BY TYPE] ----- >>>>>
        ///// --[@]-- [GET LISTING BY TYPE] ----- -END-             <== Create

        ///// --[#]-- [GET LISTING BY EQUIPMENT] ----- >>>>>
        ///// --[@]-- [GET LISTING BY EQUIPMENT] ----- -END-        <== Create

    ///// --[@]-- [(R) -GET] ----- -END-

  ///// --[#]-- [(U) - PATCH] ----- >>>>>
  ///// --[@]-- [(U) - PATCH] ----- -END-

  ///// --[#]-- [(D) - DELETE] ----- >>>>>
  ///// --[@]-- [(D) - DELETE] ----- -END-

///// --[@]-- [CRUD ACTIONS] ----- -END-



///// --[#]-- [EXPORT - ROUTER] ----- >>>>>
  module.exports = router;
///// --[@]-- [EXPORT - ROUTER] ----- -END-
