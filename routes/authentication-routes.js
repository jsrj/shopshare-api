///// --[#]-- [ROUTER PRE-REQS] ----- >>>>>
    const express = require('express');
    const router  = express.Router();
///// --[@]-- [ROUTER PRE-REQS] ----- -END-

///// --[#]-- [AUTHENTICATION PRE-REQS] ----- >>>>>
    const passport     = require('passport'               );
    const bcrypt       = require('bcrypt'                 );
///// --[@]-- [AUTHENTICATION PRE-REQS] ----- -END-

///// --[#]-- [RELEVANT USER DATA MODELS] ----- >>>>>
    const StandardUser = require('../models/standard-user');
    const Location     = require('../models/location-data');

    const Message      = require('../models/sub-models/user/user-message');
    const DOB          = require('../models/sub-models/user/user-age');
///// --[@]-- [RELEVANT USER DATA MODELS] ----- -END-

///// --[#]-- [REGISTRATION POST ROUTE] ----- >>>>>
    // ** DONT FORGET ORDER OF ARGUMENTS (REQUEST, RESPONSE, NEXT...) **
    router.post('/signup', (req, res) => {

    // if NO credentials were provided
    if (!req.body.email || !req.body.registerPassword) {
        res.status(400).json({ message : ' Need both email and password' });
        return;
    }

    // If credentials WERE provided
    StandardUser.findOne(
        { email: req.body.email },
        (err, userFromDb) => {
        if (err) {
            // Server errors: the NSA probably intercepted the packet
            res.status(500).json({ message : 'Email check went to' });
            return;
        }

        if (userFromDb) {
        // Client errors: user needs to fix something
        res.status(400).json({ message : 'Email in use by another account. If this is your\'s, please sign in.' });
        return;
        }
        // HASHING USER'S PASSWORD
        const salt   = bcrypt.genSaltSync(10);
        const obsfPW = bcrypt.hashSync(req.body.registerPassword, salt);

        // ACTUAL GENERATION OF A NEW USER FROM REGISTRATION FORM
            const newStandardUser = new StandardUser({

                //FORM ONE FIELDS - BASIC IDENTITY
                firstName: req.body.firstName,
                lastName : req.body.lastName,
                userName : req.body.userName,
                email    : req.body.email,
                encPW    : obsfPW,

                //FORM TWO FIELDS - USER LOCATION
                userLocation : new Location({
                    city     : req.body.city,
                    state    : req.body.state,
                    country  : req.body.country,
                    zip      : req.body.zip,
                }),
                //INITIALIZE EMPTY FIELDS THAT WILL BE NEEDED LATER (TO SATISFY DEFAULT REQS)
                message      : new Message({

                    // MESSAGE HEADER
                    author   : 'Shopshare',
                    timestamp: new Date(),
                    userType : 'Admin',

                    // MESSAGE BODY
                    subject  : 'Welcome To Shopshare',
                    content  : `Welcome!,
                                bLAH BLAH BLEP BLAH BLOOP ADSFASFADFADF.
                                - Arjay`,
                    attachmentUrls: [],
                }),
                userRatings: [],
                qualifications: [],
                summary: '',
                proofOfID: {},
                phone: '',
                userAge: new DOB({
                    year : '2017',
                    month: '01',
                    day  : '01'
                })
            });

            newStandardUser.save((err) => {
                if (err) {
                res.status(500).json({ message : 'User save wen to blep'});
                return;
                }

                // Automatically logs in user after signup. req.login is defined by passport
                req.login(newStandardUser, (err) =>{
                if(err) {
                    res.json(err);
                }
                }); // Close New User Login
                newStandardUser.encPW = undefined;
                res.status(200).json(newStandardUser);
            }); // Close newStandardUser.save()
        }); // Close userModel.findOne()
    }); // Close router.post('./signup', ...
///// --[@]-- [REGISTRATION POST ROUTE] ----- -

///// --[#]-- [LOGIN POST ROUTE] ----- >>>>>
// POST login - we need to define a callback function since we dont want redirects. passport.authenticate() redirects
    router.post('/login', (req, res, next) => {
    const authenticateStandardUser = passport.authenticate('local', (err, standardUser, extr) => {
    if (err) {
        res.status(500).json({ message: 'Well man, who knows why, but something went wrong.' });
        return;
    }
    // Login failed for sure
    if (!standardUser) {
        // (Extr)aInfo already contains feedback messages from LocalStrategy
        res.status(418).json(extr);
        return;
    }

    //Login Successful
    req.login(standardUser, (err) => {
        if(err) {
        res.status(500).json({ message: 'Dat server done mussed up.'});
        return;
    }

        standardUser.encPW = undefined;
        res.status(200).json(standardUser);
    })
    });

    // Custom defined authentication strategy
    authenticateStandardUser(req, res, next);
    });
///// --[@]-- [LOGIN POST ROUTE] ----- -END-

///// --[#]-- [ROUTER EXPORT] ----- >>>>>
    module.exports = router;
///// --[@]-- [ROUTER EXPORT] ----- -END-