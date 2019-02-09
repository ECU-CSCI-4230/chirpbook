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

//var passport = require('passport');
//var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

//router.use(passport.initialize());

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(config.client_id);



//creates or updates user and validates google token
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

        //console.log(use  rid)

        var gmail = payload.email
        var pictureLink = payload.picture

        UserManagement.getUser(payload.email, function(user_row){
            console.log('hi')
            if(user_row.length == 1){
                
                UserManagement.updateProfilePicture(user_row[0].userid, pictureLink, function(picture_row){
                    res.status(201).json({
                        sucess: true,
                        err: null,
                        gmail: gmail,
                        userid: userid,
                        picture: pictureLink,
                        token: req.body.idToken
                    })
                })
                
            }else{
                UserManagement.createUser(gmail, pictureLink, function(newUser){
                    res.status(201).json({
                        sucess: true,
                        err: null,
                        gmail: gmail,
                        userid: userid,
                        picture: pictureLink,
                        token: req.body.idToken
                    })
                })
            }
        })
    }
    verify().catch(console.error);
    
});

module.exports = router;