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
            router.get('/all', (req, res) => {
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
                // Takes in the passed in parameter as provider name
                const listingBy = req.params.provider;

                Listing.find({ provider: listingBy })
                    .exec((err, listingByProvider) => {

                            if (err) {
                                res.json(err);
                                return;
                            }

                            res.json(listingByProvider);
                        });
            });
        ///// --[@]-- [GET LISTINGS BY PROVIDER] ----- -END-        <== Route Works

        ///// --[#]-- [GET LISTING BY TYPE] ----- >>>>>
            // Same as by provider, we are just searching for a type instead
            router.get(`/type/:type`, (req, res) => {
                // Takes in the passed in parameter as provider name
                const listingType = req.params.type;

                Listing.find({ type: listingType })
                    .exec((err, listingByType) => {

                            if (err) {
                                res.json(err);
                                return;
                            }

                            res.json(listingByType);
                        });
            });
        ///// --[@]-- [GET LISTING BY TYPE] ----- -END-             <== Route Works

        ///// --[#]-- [GET LISTING BY EQUIPMENT] ----- >>>>>
            // Same as by provider and type, we are just searching for equipment instead
            router.get(`/equipment/:equipment`, (req, res) => {
                // Takes in the passed in parameter as equipment name
                // Mongoose then iterates through the 'equipmentProvided' Array and searches for
                // Any string in that array which matches the passed in parameter
                const equipmentAvailable = req.params.equipment;

                Listing.find({ equipmentProvided: equipmentAvailable })
                    .exec((err, listingByEquipment) => {

                            if (err) {
                                res.json(err);
                                return;
                            }

                            res.json(listingByEquipment);
                        });
            });
        ///// --[@]-- [GET LISTING BY EQUIPMENT] ----- -END-        <== Route Works

    ///// --[@]-- [(R) -GET] ----- -END-

  ///// --[#]-- [(U) - PATCH] ----- >>>>>
  ///// --[@]-- [(U) - PATCH] ----- -END-

  ///// --[#]-- [(D) - DELETE] ----- >>>>>
  ///// --[@]-- [(D) - DELETE] ----- -END-

///// --[@]-- [CRUD ACTIONS] ----- -END-



///// --[#]-- [EXPORT - ROUTER] ----- >>>>>
  module.exports = router;
///// --[@]-- [EXPORT - ROUTER] ----- -END-
