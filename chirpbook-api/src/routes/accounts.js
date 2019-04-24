const config = require('../config/config.json');


const express = require('express');
const app = express();

const router = express.Router();

const UserManagement = require('../usermanagement');
const CommentManagement = require('../commentmanagement')

const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var log = require('console-log-level')({level: 'info'});

//var GoogleTokenStrategy = require('passport-google-id-token');

const auth = require('../config/auth');

//-------------------------------------------------
// 				Google Login
//-------------------------------------------------

//var passport = require('passport');
//var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

//router.use(passport.initialize());

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(config.client_id);


router.post('/users/set_displayname/:userid', auth.jwtMW, function(req, res)
{
    var userid = jwt_decode(req.headers.authorization.split(' ')[1]).userid
    var displayName = req.body.display_name
    console.log(displayName)

    UserManagement.setDisplayName(userid, displayName, function(result)
    {
        if(result.rowCount == 1)
        {
            res.status(201).json({
                success: true,
                err: null
            })
        } else
        {
            res.status(404).json({
                success: false,
                err: 'User not found'
            })
        }
    })

})

router.post('/users/set_profile_picture', auth.jwtMW, function(req, res)
{
    var userid = jwt_decode(req.headers.authorization.split(' ')[1]).userid;
    var pic = req.body.picture

    UserManagement.updateProfilePicture(userid, pic, function(result)
    {
        if(result.rowCount == 1)
        {
            res.status(201).json({
                success: true,
                err: null
            })
        } else
        {
            res.status(404).json({
                success: false,
                err: 'User not found'
            })
        }
    })

})

router.delete('/users/delete/:userid', auth.jwtMW, function(req, res)
{
    var userid = jwt_decode(req.headers.authorization.split(' ')[1]).userid

    CommentManagement.deleteAllComments(userid, function(result_delete_comments)
    {
        UserManagement.deleteUser(userid, function(delete_result)
        {
            if(delete_result.rowCount == 1)
            {
                res.status(201).json({
                    success: true,
                    err: null
                })
            } else
            {
                res.status(404).json({
                    success: false,
                    err: 'User not found'
                })
            }
        })
    })

})

router.get('/users/search/:gmail', auth.jwtMW, function(req, res)
{ // might need to change '/user'

    var userid = jwt_decode(req.headers.authorization.split(' ')[1]).userid;
    // Need some variables here
    var gmail = req.params.gmail

    UserManagement.searchUser(gmail, userid, function(result)
    {

        if(result.length > 0)
        {
            res.status(201).json({
                success: true,
                err: null,
                users: result
            })
        } else
        {
            res.status(400).json({
                success: false,
                err: true
            })
        }

    })
})

router.get('/users/profile_picture/:userid', auth.jwtMW, function(req, res)
{
    var userid = req.params.userid

    UserManagement.getProfilePicture(userid, function(result)
    {
        if(result.length == 1)
        {
            res.status(201).json({
                success: true,
                err: null,
                profile_picture: result[0].profile_picture
            })
        } else
        {
            res.status(404).json({
                success: false,
                err: 'User not found'
            })
        }
    })
})

router.get('/users/:userid', auth.jwtMW, function(req, res)
{
    var userid = req.params.userid

    UserManagement.getUserDetails(userid, function(result)
    {
        if(result.length == 1)
        {
            res.status(201).json({
                success: true,
                err: null,
                profile_picture: result[0].profile_picture,
                display_name: result[0].display_name,
                email: result[0].gmail
            })
        } else
        {
            res.status(404).json({
                success: false,
                err: 'User not found'
            })
        }
    })
})

module.exports = router;