const crypto = require('crypto');
const pg = require('pg');

const express = require('express');
const app = express();
const router = express.Router();

const auth = require('../config/auth');
const db = require('../config/database');
const jwt = require('jsonwebtoken');

const LocalStrategy = require('passport-local').Strategy;

const passport = require('passport');

// Read JSON responses, which is used to parse data sent from the client.
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.use(passport.initialize());

passport.use('signup', new LocalStrategy({
    usernameField: 'gmail',
    passwordField: 'password',
    passReqToCallback: true
},
    function(req, gmail, password, done)
    {
        let display_name = req.body.display_name || gmail;

        var rePattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        var arrMatches = gmail.match(rePattern);

        if(gmail.length == 0 || password.length == 0 || typeof req.body.gmail == 'undefined' || arrMatches === null)
        {
            req.res.status(401).json({
                sucess: false,
                token: null,
                err: 'Invalid gmail or password.',
            });
            done(null, false);
        }
        else if(typeof req.user == 'undefined')
        {
            db.connect(function(client)
            {
                client.query('SELECT "gmail" FROM public."User" WHERE "gmail" = $1 LIMIT 1', [gmail], (err, result) =>
                {
                    if(err)
                    {
                        req.res.status(401).json({
                            sucess: false,
                            token: null,
                            err: 'User already exists.'
                        });

                        console.log(err);
                    }
                    else
                    {
                        if(result.rowCount == 0)
                        {
                            // Generate password hash + salt.
                            var hash = generateHash(password, generateSalt());

                            const register = client.query('INSERT INTO public."User" ("display_name", "gmail", "pw_hash", "salt") VALUES ($1, $2, $3, $4) RETURNING public."User".userid', [display_name, gmail, hash.hash, hash.salt], function(err, res)
                            {
                                if(err)
                                {
                                    console.log(err);
                                }
                                else
                                {

                                    user = {
                                        'displayName': display_name,
                                        'gmail': gmail,
                                        'provider': 'local'
                                    };

                                    let token = jwt.sign({userid: user.userid, gmail: user.gmail}, auth.jwtSecret, {expiresIn: auth.jwtExpiration}); // Sigining the token

                                    req.res.status(200).json({
                                        sucess: true,
                                        err: null,
                                        token,
                                        msg: 'Account created'
                                    });

                                    done(null, user);
                                }

                                client.release();
                            });
                        }
                        else
                        {
                            req.res.status(401).json({
                                sucess: false,
                                token: null,
                                err: 'Account already exists.'
                            });
                            done(null, false);
                        }
                    }
                });
            });
        }
        else
        {
            done(null, req.user);
        }
    }));

passport.use('login', new LocalStrategy(
    {
        usernameField: 'gmail',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done)
    {
        // Regex pattern for determining if an gmail is valid.
        var rePattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        var arrMatches = username.match(rePattern);

        if(arrMatches === null)
        {
            req.res.status(401).json({
                sucess: false,
                token: null,
                err: 'Enter a valid gmail.'
            });
            done(null, false);
        }
        else
        {
            db.connect(function(client)
            {
                client.query('SELECT * FROM public."User" WHERE "gmail" = $1 LIMIT 1', [username], function(error, response)
                {
                    if(error)
                    {
                        done(null, false);
                    }
                    client.release();


                    if(response && response.rowCount > 0)
                    {
                        User = response.rows[0];

                        var hash = generateHash(password, User.salt);

                        if(User.pw_hash == hash.hash)
                        {
                            let token = jwt.sign({userid: User.userid, gmail: User.gmail}, auth.jwtSecret, {expiresIn: auth.jwtExpiration}); // Sigining the token
                            req.res.status(200).json({
                                sucess: true,
                                err: null,
                                token
                            });
                            return done(null, User);
                        }
                        else
                        {
                            req.res.status(401).json({
                                sucess: false,
                                token: null,
                                err: 'Username or password is incorrect'
                            });
                            return done(null, false);
                        }
                    }
                    else
                    {
                        req.res.status(401).json({
                            sucess: false,
                            token: null,
                            err: 'Username or password is incorrect'
                        });
                        return done(null, false);
                    }
                });
            });
        }
    }));

router.post('/login', passport.authenticate('login'));

router.post('/signup', passport.authenticate('signup'));

/**
 * This function generates a new salt used for passwords on local accounts.
 * @returns the new salt.
 */
function generateSalt()
{
    return crypto.randomBytes(16).toString('hex');
}

/**
 * Generates a new hash using a password and salt.
 * @param {string} password
 * @param {string} salt
 * @returns The hash and salt.
 */
function generateHash(password, salt)
{
    var h = crypto.createHmac('sha512', salt);
    h.update(password);
    return {
        hash: h.digest('hex'),
        salt: salt
    }
}
module.exports = router;
