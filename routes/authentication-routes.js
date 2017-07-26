///// --[#]-- [ROUTER PRE-REQS] ----- >>>>>
    const express = require('express');
    const router  = express.Router();
    const multer  =require('multer');
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

    const myUploader   = multer({
        dest: __dirname + '/../public/uploads/'
    });
///// --[@]-- [RELEVANT USER DATA MODELS] ----- -END-

///// --[#]-- [ USER UPLOADS ] ----- >>>>>
    router.post('/userUploads', myUploader.single('file'), (req, res) => {
        // Save url to [user].profileImage
        if(req.file) {
            console.log(req.file);
                req.user.profileImage = `../public/uploads/${req.file.filename}`;
                console.log(req.user.profileImage);
        }
    });
///// --[@]-- [ USER UPLOADS ] ----- -END-


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

                //INITIALIZE EMPTY FIELDS THAT WILL BE NEEDED LATER (TO SATISFY DEFAULTS)
                message      : new Message({

                    // MESSAGE HEADER
                    author   : 'Shopshare',
                    timestamp: new Date(),
                    userType : 'Admin',

                    // MESSAGE BODY
                    subject  : 'Welcome To Shopshare',
                    content  : `Welcome! ${req.body.userName},
                    Welcome to buildershare.co! Navigate to your home page to view current listings, or get started posting your own!
                    - TheBuilderGuy`,
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
            console.log(extr);
            return;
        }

        //Login Successful
        req.login(standardUser, (err) => {
            if(err) {
            res.status(500).json({ message: 'Dat server done mussed up.'});
            console.log(err);
            return;
        }
            standardUser.online = true;
            standardUser.encPW = undefined;
            res.status(200).json(standardUser);
        })
        });

        // Custom defined authentication strategy
        authenticateStandardUser(req, res, next);
        });
///// --[@]-- [LOGIN POST ROUTE] ----- -END-

///// --[#]-- [CHECK ACTIVE USER SESSION] ----- >>>>>
    // GET  checklogin
        router.get('/session/check', (req, res, next) =>{
        if (!req.user) {
                res.status(401).json({
                loggedIn:   false,
                message: 'Nobody currently logged in' });
            return;
            } else {
                req.user.online = true;
                req.user.encPW = undefined;
                res.status(200).json(req.user);
                return;
            }
        });
///// --[@]-- [CHECK ACTIVE USER SESSION] ----- -END-

///// -[#]- [ LOGOUT ACTIVE USER ] ----- >>>>>
    // POST logout
    router.post('/session/end', (req, res, next) =>{
    req.user.online = false;
    req.logout();
    res.status(200).json({ message: 'Signed out successfully. Bye.' });
    });
///// -[@]- [ LOGOUT ACTIVE USER ] ----- -END-


///// --[#]-- [ROUTER EXPORT] ----- >>>>>
    module.exports = router;
///// --[@]-- [ROUTER EXPORT] ----- -END-