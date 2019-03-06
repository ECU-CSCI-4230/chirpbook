const config = require('../config/config.json');


const express = require('express');
const app = express();

const router = express.Router();

const UserManagement = require('../usermanagement');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var log = require('console-log-level')({level: 'info'});

//var GoogleTokenStrategy = require('passport-google-id-token');



//-------------------------------------------------
// 				Google Login
//-------------------------------------------------

//var passport = require('passport');
//var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

//router.use(passport.initialize());

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(config.client_id);


router.post('/users/set_displayname/:userid', function(req, res)
{
    var userid = req.params.userid
    var displayName = req.body.display_name

    UserManagement.setDisplayName(userid, displayName, function(result)
    {
        if(result.rowCount == 1)
        {
            res.status(201).json({
                sucess: true,
                err: null
            })
        } else
        {
            res.status(404).json({
                sucess: false,
                err: 'User not found'
            })
        }
    })

})

//creates or updates user and validates google token
router.post('/auth/google', function(req, res)
{
    async function verify()
    {
        const ticket = await client.verifyIdToken({
            idToken: req.body.idToken,
            audience: config.client_id,
        });

        const payload = ticket.getPayload();

        const userid = payload['sub'];

        var gmail = payload.email
        var pictureLink = payload.picture
        let display_name = payload.name
        UserManagement.getUser(payload.email, function(user_row)
        {
            if(user_row.length == 1)
            {
                let name = display_name ? user_row[0].display_name : display_name;
                UserManagement.updateProfilePicture(user_row[0].userid, pictureLink, function(picture_row)
                {
                    UserManagement.setDisplayName(user_row[0].userid, name, function(result)
                    {
                        res.status(201).json({
                            sucess: true,
                            err: null,
                            gmail: gmail,
                            userid: user_row[0].userid,
                            picture: pictureLink,
                            token: req.body.idToken
                        })
                    });
                });

            } else
            {
                UserManagement.createUser(gmail, pictureLink, display_name, function(newUser)
                {
                    res.status(201).json({
                        sucess: true,
                        err: null,
                        gmail: gmail,
                        userid: newUser.rows[0].userid,
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