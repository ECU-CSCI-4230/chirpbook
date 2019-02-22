const config = require('../config/config.json');

const express = require('express');
const app = express();

const router = express.Router();

const FriendManagement = require('../friendmanagement');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var log = require('console-log-level')({level: 'info'});

// Request to creat a friendship between two given users
router.post('/friends/add/:userid/:userid2', function(req, res){
    var userid = req.params.userid
    var userid2 = req.params.userid2
    
    FriendManagement.createFriend(userid, userid2, function(addFriendship){
        res.status(201).json({
            success: true,
            error : null
        })
    }) 
});

// Request to remove a friendship between two given users
router.post('/friends/remove/:userid/:userid2', function(req, res){
    var userid = req.params.userid
    var userid2 = req.params.userid2
    
    FriendManagement.deleteFriend(userid, userid2, function(removeFriendship){
        res.status(201).json({
            success: true,
            error : null
        })
    }) 
});

// Request for getting all current friends for the given user id.
router.get('/friends/:userid', function(req, res){
    var userid = req.params.userid
    
    FriendManagement.getAllFriends(userid, function(currentFriends){
        var all_friends = currentFriends.rows
        res.status(201).json({
            success: true,
            error : null,
            friends_list : all_friends
        })
    }) 
});

module.exports = router;