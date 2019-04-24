const config = require('../config/config.json');

const express = require('express');
const app = express();

const router = express.Router();

const FriendManagement = require('../friendmanagement');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');


const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var log = require('console-log-level')({level: 'info'});

const auth = require('../config/auth');

// Request to create a friendship between two given users
router.post('/friends/add/:userid/:userid2', auth.jwtMW, function(req, res)
{
    var userid = req.params.userid
    var userid2 = req.params.userid2

    var u1
    var u2

    if(userid < userid2)
    {
        u1 = userid
        u2 = userid2
    } else
    {
        u1 = userid2
        u2 = userid
    }

    FriendManagement.createFriend(u1, u2, function(addFriendship)
    {
        res.status(201).json({
            success: true,
            error: null
        })
    })
});

// Request to remove a friendship between two given users
router.post('/friends/remove/:userid/:userid2', auth.jwtMW, function(req, res)
{
    var userid = req.params.userid
    var userid2 = req.params.userid2
    var loggedInUser = jwt_decode(req.headers.authorization.split(' ')[1]).userid

    if(userid == loggedInUser || userid2 == loggedInUser)
    {
        FriendManagement.deleteFriend(userid, userid2, function(removeFriendship)
        {
            res.status(201).json({
                success: true,
                error: null
            })
        })
    } else
    {
        res.status(401).json({
            success: false,
            error: "Failed to delete freind request"
        })
    }
});

// Request for getting all current friends for the given user id.
router.get('/friends/:userid', auth.jwtMW, function(req, res)
{
    var userid = jwt_decode(req.headers.authorization.split(' ')[1]).userid

    FriendManagement.getAllFriends(userid, function(currentFriends)
    {
        var all_friends = currentFriends.rows
        res.status(201).json({
            success: true,
            error: null,
            friends_list: all_friends
        })
    })
});

module.exports = router;