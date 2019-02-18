const config = require('../config/config.json');

const express = require('express');
const app = express();

const router = express.Router();

const FriendRequestManagement = require('../friendrequestmanagement');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var log = require('console-log-level')({level: 'info'});


router.post('/friends_requests/:userid', function(req, res){
    var userid = req.params.userid
    FriendRequestManagement.getIncomingFriendRequests(userid, function(IncomingRequests){
        FriendRequestManagement.getOutgoingFriendRequests(userid, function(OutgoingRequests){
            var friend_requests = IncomingRequests.rows.concat(OutgoingRequests.rows)
            res.status(201).json({
                success : true,
                errror : null,
                all_requests: friend_requests
            })
        })
    })
    
});

router.post('/friends_requests/send/:sender/:receiver', function(req, res){
    var sender = req.params.sender
    var receiver = req.params.receiver
    FriendRequestManagement.createFriendRequest(sender, receiver, function(newFriendRequest){
        res.status(201).json({
            success : true,
            error : null,
        })
    })
});

router.post('/friends_requests/reject/:sender/:receiver', function(req, res){
    var sender = req.params.sender
    var receiver = req.params.receiver
    FriendRequestManagement.deleteFriendRequest(sender, receiver, function(removedRequest){
        res.status(201).json({
            success : true,
            error : null,
        })
    })
});

module.exports = router;