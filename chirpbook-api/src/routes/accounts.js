const config = require('../config/config.json');

const express = require('express');
const app = express();

const router = express.Router();

const UserManagement = require('../usermanagement');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


//var GoogleTokenStrategy = require('passport-google-id-token');



//-------------------------------------------------
// 				Google Login
//-------------------------------------------------

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

router.use(passport.initialize());

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(config.client_id);


router.post('/auth/google', function(req, res){
    console.log('============================================')
    console.log(req.body)
    //console.log(res)
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: req.body.idToken,
            audience: config.client_id,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        console.log(payload)
        //console.log(userid)
        res.status(201).json({
            sucess: true,
            err: null,
            email: payload.email,
        })
    }
    verify().catch(console.error);
    
});

module.exports = router;