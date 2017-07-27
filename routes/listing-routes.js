///// --[#]-- [ROUTER PRE-REQS] ----- >>>>>
    const express       = require('express');
    const router        = express.Router();
///// --[@]-- [ROUTER PRE-REQS] ----- -END-


///// --[#]-- [PRIMARY LISTING MODEL] ----- >>>>>
    const Listing       = require('../models/listing');
///// --[@]-- [PRIMARY LISTING MODEL] ----- -END-



///// --[#]-- [LISTING SUB-MODELS] ----- >>>>>
// ** UNCOMMENT ONCE POST ROUTES ARE CREATED **
//
const ListingType   = require('../models/sub-models/listing/listing-type');
//   const ListingRating = require('../models/sub-models/listing/listing-rating');
  const LocatedIn  = require('../models/location-data');
//
///// --[@]-- [LISTING SUB-MODELS] ----- -END-

///// --[#]-- [CRUD ACTIONS] ----- >>>>>

    ///// --[#]-- [(C) - POST NEW LISTING --!!! HIGH PRIORITY !!!-- ] ----- >>>>> !!! HIGH PRIORITY !!!
                router.post('/new/:listingType', (req, res) => {

                    let currentUser = '';
                    if (!req.user) {
                        currentUser = 'Anonymous';
                    } else {
                        currentUser = req.user.userName;
                    }

                    let newListingType = {};
                    if (req.params.listingType === 'facility') {
                        console.log('requested new facility listing');
                        console.log(req.body.listingType);
                        newListingType = new ListingType ({
                            facility:
                                {
                                facilitySubType: req.body.listingFacilitySubType,
                                traits:          req.body.listingFacilityTraits,
                                description:     req.body.listingFacilityDescription,
                                multiUser:       req.body.listingIsMultiUser,
                                ppeProvided:     req.body.listingPPEProvided,
                                ppeList:         req.body.listingPPEList,
                                safetyFeatures:  req.body.listingSafetyFeatures,
                                additionalNotes: req.body.listingAdditionalNotes
                                }
                        });
                    }
                    if (req.params.listingType === 'equipment') {
                        console.log('requested new equipment listing');
                        console.log(req.body.listingType);
                        newListingType = new ListingType ({
                            equipment :
                                {
                                powerType:        req.body.listingPowerType,
                                isRestricted:     req.body.listingEquipmentIsRestricted,
                                requiredLiscense: req.body.listingRequiredLiscense,
                                isPortable:       req.body.listingIsPortable,
                                isHazardous:      req.body.listingIsHazardous,
                                extras:           req.body.listingExtras
                                }
                            });
                    }
                    if (req.params.listingType === 'service')   {
                        newListingType = new ListingType ({
                            service   :
                                {
                                physicalOnly:  req.body.listingIsPhysicalLocation,
                                skillsOffered: req.body.listingSkillsOffered,
                                description:   req.body.listingDescription
                                }
                            });
                    }

                    const newListing = {
                        title:             req.body.listingTitle,
                        type:              req.body.listingType,
                        equipmentProvided: req.body.equipmentArray,

                        // Links to listing sub-model with a call like 'listing.for.facility...'
                        for: newListingType,

                        // Links to location-data sub-model
                        location: new LocatedIn ({
                                zip:     req.body.listingZip,
                                city:    req.body.listingCity,
                                state:   req.body.listingState,
                                country: req.body.listingCountry
                        }),

                        // Initialize with an empty array of objects
                        ratings:[],

                        // Not a required, since this will always be populated by API whe a listing is generated
                        // Automatically put req.user into this field
                        provider: currentUser,

                        // Either Yes or No
                        hasPrerequisites: req.body.listingHasPrerequisites,

                        // Should Ideally be using a created sub-model, but for now, this will do
                        pricePolicy:
                            {
                            price:              req.body.listingPrice,
                            perRate:            req.body.listingPerRate,
                            deposit:            req.body.listingDeposit,
                            depositAmount:      req.body.listingDepositAmount,
                            cancellationWindow: req.body.listingCancellationWindow
                            },

                        // In other words, this is completely open availability, since it's just now being posted
                        reservedDates: [],

                        // All of the photos the poster/provider uploads
                        photoUrls: [],
                        additionalInfo:        req.body.listingAdditionalInfo
                        };

                    Listing.create(newListing, (err, listing) => {
                        if (err) {
                            throw err;
                        }
                        console.log(listing.title);
                        console.log(listing.type);
                        res.json(listing.title);
                    });
            });
    ///// --[@]-- [(C) - POST NEW LISTING] ----- -END-          <== POST Route WORKS

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

        ///// --[#]-- [GET LISTING BY ID] ----- >>>>>
            router.get(`/view/:ListingId`, (req, res) => {
                // Takes in the passed in parameter as provider name
                const listingId = req.params.ListingId;

                Listing.findById(listingId)
                    .exec((err, singleListing) => {

                            if (err) {
                                res.json(err);
                                return;
                            }

                            res.json(singleListing);
                        });
            });
        ///// --[@]-- [GET LISTING BY ID] ----- -END-               <== Route In-Progress

    ///// --[@]-- [(R) - GET] ----- -END-           <== GET Routes working

    ///// --[#]-- [(U) - PATCH] ----- >>>>>
        // router.patch(`/edit/:ListingId`, (req, res) => {
        //     // Takes in the passed in parameter as provider name
        //     const listingId = req.params.ListingId;

        //     Listing.findByIdAndUpdate(listingId)
        //         .exec((err, singleListing) => {
        //             if (!singleListing)
        //                 console.log(err);
        //             else {
        //                 // do your updates here. Include constructor for sub-models as well
        //                 singleListing.modified = new Listing();
        //                 }
        //                 singleListing.save(function(err) {
        //                 if (err) {
        //                     console.log(err);
        //                 } else {
        //                     console.log(`Listing ${listingId} updated successfully.`);
        //                 }
        //                 res.json(singleListing);
        //             });
        // });
    ///// --[@]-- [(U) - PATCH] ----- -END-         <== PATCH Route In-Progress

    ///// --[#]-- [(D) - DELETE] ----- >>>>>
        router.delete(`/delete/:id`, (req, res) => {
            // Takes in the passed in parameter as provider name
            const listingToDelete = req.params.id;

            Listing.findByIdAndRemove(listingToDelete)
                // .delete()
                .exec((err, deletedListing) => {

                        if (err) {
                            res.json(err);
                            return;
                        }

                        res.json({message: `Deleted ${deletedListing.title} from database.`});

                    });
        });
    ///// --[@]-- [(D) - DELETE] ----- -END-        <== DELETE Route Working

///// --[@]-- [CRUD ACTIONS] ----- -END-



///// --[#]-- [EXPORT - ROUTER] ----- >>>>>
    module.exports = router;
///// --[@]-- [EXPORT - ROUTER] ----- -END-