const config = require('../config/config.json');

const express = require('express');
const app = express();

const router = express.Router();

const UserManagement = require('../usermanagement');
const jwt = require('jsonwebtoken');

const passport = require('passport');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

const GoogleStrategy = require('passport-google-oauth20').Strategy;

router.use(passport.initialize());

var GoogleTokenStrategy = require('passport-google-id-token');


//-------------------------------------------------
// 				Google Login
//-------------------------------------------------

passport.use(new GoogleTokenStrategy({
    clientID: config.client_id,
  },
  function(parsedToken, googleId, done) {
    User.findOrCreate({ googleId: googleId }, function (err, user) {
      return done(err, user);
    });
  }
));

//router.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}));

// the callback after google has authenticated the user
router.post('/google/auth',
    passport.authenticate('google-id-token'),
    function(req, res)
    {
        console.log(req)
        console.log(res)
        if(req.user != null){
            res.status(200).json({
                sucess: true,
                err: null,
                'user': req.user
            })
        }else{
            res.status(401).json({
                sucess: false
            })
        }
        
    }
);



/*router.post('/auth/google', passport.authenticate('google-token', {session: false}), function(req, res, next) {
        console.error(req)
        console.log(res)
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }
        req.auth = {
            id: req.user.id
        };

        next();
    }, generateToken, sendToken);

router.post('/google/auth', function(req, res){
    console.log('============================================')
    console.log(req.body)
    //console.log(res)
    res.status(201).json({
        sucess: true,
        err: null
    })
});
*/
module.exports = router;