///// --[#]-- [SETTING UP SEED FILE] ----- >>>>>
    // Connect to the Mongo Database
    require('dotenv').config();

    const   mongoose=require('mongoose');
            mongoose.connect(process.env.MONGODB_URI);

    // Import the relevant models
    const Listing     = require('../models/listing');
    const ListingType = require('../models/sub-models/listing/listing-type');
    const LocatedIn   = require('../models/location-data');

    const currentUser = 'test';
///// --[@]-- [SETTING UP SEED FILE] ----- -END-

///// --[#]-- [LISTINGS SEED ARRAY] ----- >>>>>
    const Listings =
    [
    ///// --[#]-- [FIRST SEED - FACILITY -] ----- >>>>>
        {
        title: 'General Use Toolshop',
        type: 'facility',
        equipmentProvided:
            [
            'Several different Air Drills with various RPM ratings',
            'Air-Hammer',
            'Drill Press',
            'Rivet Squeeze',
            'Bridgeport Lathe'
            ],
        // Links to listing sub-model with a call like 'listing.for.facility...'
        for: new ListingType({
            facility:
                {
                facilitySubType: 'Garage',
                traits: [
                        'Air-Conditioning',
                        'On-Site Air Compressor',
                        'Ventilation System',
                        'Internet',
                        'Variac'
                        ],
                description: 'Basically a garage full of tools and gadgets.',
                multiUser: false,
                equipment:  [
                            'Several different Air Drills with various RPM ratings',
                            'Air-Hammer',
                            'Drill Press',
                            'Rivet Squeeze',
                            'Bridgeport Lathe'
                            ],
                ppeProvided: true,
                ppeList:    [
                            'respirator',
                            'hearing protection',
                            'dust mask'
                            ],
                safetyFeatures: [
                                'Fire Extinguisher',
                                'Chicken Stick',
                                'Dedicated Power Supply'
                                ],
                additionalNotes: 'Tools are mainly for metal machining, but wood works too.'
                },
            equipment : {},
            service   : {}
        }),

        // Links to location-data sub-model
        location: new LocatedIn({
                zip: 33322,
                city: 'Plantation',
                state: 'Florida',
                country: 'United States'
        }),

        // Initialize with an empty array of objects
        ratings:[],

        // Not a required, since this will always be populated by API whe a listing is generated
        // Automatically put req.user into this field
        provider: currentUser,

        // Either Yes or No
        hasPrerequisites: false,

        // Should Ideally be using a created sub-model, but for now, this will do
        pricePolicy:
            {
            price: 5.00,
            perRate: 'Day',
            deposit: false,
            depositAmount: 0.00,
            cancellationWindow: 24
            },

        // In other words, this is completely open availability, since it's just now being posted
        reservedDates: [],

        // All of the photos the poster/provider uploads
        photoUrls: [],
        additionalInfo: 'This is just a test listing.'
        },
    ///// --[@]-- [FIRST SEED - FACILITY -] ----- -END-

    ///// --[#]-- [SECOND SEED - FACILITY - DIFFERENT EQUIPMENT -] ----- >>>>>
        {
        title: 'High-Precision Machine Shop',
        type: 'facility',
        equipmentProvided:
            [
            'CNC Mill',
            'Refractory Furnace',
            'Crucible',
            'Grinders',
            'Bridgeport Lathe'
            ],
        // Links to listing sub-model with a call like 'listing.for.facility...'
        for: new ListingType({
            facility:
                {
                facilitySubType: 'Machine Shop',
                traits: [
                        'Air-Conditioning',
                        'On-Site Air Compressor',
                        'Ventilation System',
                        'Internet',
                        'Variac'
                        ],
                description: 'A Machine Shop I built behind my house for making custom car parts and model airplanes',
                multiUser: false,
                equipment:  [],
                ppeProvided: true,
                ppeList:    [
                            'respirator',
                            'hearing protection',
                            'dust mask',
                            'fire cabinet'
                            ],
                safetyFeatures: [
                                'Fire Extinguisher',
                                'Chicken Stick',
                                'Dedicated Power Supply',
                                'Sprinkler System',
                                'Forge Handler Gear'
                                ],
                additionalNotes: 'Mills and lathe are open for use, but contact me for more details if you want to use the forge'
                },
            equipment : {},
            service   : {}
        }),

        // Links to location-data sub-model
        location: new LocatedIn({
                zip: 33322,
                city: 'Plantation',
                state: 'Florida',
                country: 'United States'
        }),

        // Initialize with an empty array of objects
        ratings:[],

        // Not a required, since this will always be populated by API whe a listing is generated
        // Automatically put req.user into this field
        provider: currentUser,

        // Either Yes or No
        hasPrerequisites: false,

        // Should Ideally be using a created sub-model, but for now, this will do
        pricePolicy:
            {
            price: 15.00,
            perRate: 'Day',
            deposit: false,
            depositAmount: 50.00,
            cancellationWindow: 24
            },

        // In other words, this is completely open availability, since it's just now being posted
        reservedDates: [],

        // All of the photos the poster/provider uploads
        photoUrls: [],
        additionalInfo: 'This is just a test listing.'
        },
    ///// --[@]-- [SECOND SEED - FACILITY - DIFFERENT EQUIPMENT -] ----- -END-
    ];
///// --[@]-- [LISTINGS SEED ARRAY] ----- -END-

///// --[#]-- [SAVE TO DB AND CLOSE CONNECTION] ----- >>>>>
    // bin/seeds.js
    Listing.create(Listings, (err, listings) => {
        if (err) {
            throw err;
        }

    listings.forEach((listing) => {
        console.log(listing.title)
    });
    mongoose.connection.close();
    });
///// --[@]-- [SAVE TO DB AND CLOSE CONNECTION] ----- -END-
