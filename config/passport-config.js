///// --[#]-- [PASSPORT PRE-REQS] ----- >>>>>
    const passport        = require('passport');
    const bcrypt          = require('bcrypt');
    const LocalStrategy   = require('passport-local');
    const StandardUser     = require('../models/standard-user');
///// --[@]-- [PASSPORT PRE-REQS] ----- -END-

///// --[#]-- [SERIALIZE/DESERIALIZE USER] ----- >>>>>
    // Save the user's ID as a Token (called when user logs in)
    passport.serializeUser((registeredUser, next) => {
        next(null, registeredUser._id);
    });


    // Retrieve the user's information from the DB with the stored ID Token
    passport.deserializeUser((idToken, next) => {
        StandardUser.findById (
        idToken,
        (err, userByToken) => {
            if (err) {
            next(err);
            return;
            }
            next(null, userByToken);

        }
        );
    });
///// --[@]-- [SERIALIZE/DESERIALIZE USER] ----- -END-

///// --[#]-- [LOGIN BY EMAIL AND PASSWORD] ----- >>>>>
    passport.use(new LocalStrategy(
    {
    // cant change - Names of inputs in login form
    usernameField: 'loginEmail',  // Sent through AJAX from Angular
    passwordField: 'loginPassword'// Sent through AJAX from Angular
    },
    (theEmail, thePassword, next) => {
    StandardUser.findOne(
        { email : theEmail },
        (err, userFromDb) => {
        if (err) {
            next(err);
            return;
        }

        if (userFromDb === null) {
            next(null, false, { message : 'Incorrect e-mail.' });
            return;
        }

        if (bcrypt.compareSync(thePassword, userFromDb.encPW) === false) {
            next(null, false, { message : 'Incorrect Password.' });
            return;
        }

        next(null, userFromDb, { message : 'Congration. U dun it.' });
        }
    ); // close UserModel.findOne()
    } // End of (theEmail, thePassword, next) callback
    ));
///// --[@]-- [LOGIN BY EMAIL AND PASSWORD] ----- -END-
