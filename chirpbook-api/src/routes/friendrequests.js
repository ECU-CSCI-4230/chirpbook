const config = require('../config/config.json');

const express = require('express');
const app = express();

const router = express.Router();

const FriendRequestManagement = require('../friendrequestmanagement');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');


const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var log = require('console-log-level')({level: 'info'});

const auth = require('../config/auth');

router.get('/friends_requests/:userid', auth.jwtMW, function(req, res)
{
    var userid = jwt_decode(req.headers.authorization.split(' ')[1]).userid
    FriendRequestManagement.getIncomingFriendRequests(userid, function(IncomingRequests)
    {
        FriendRequestManagement.getOutgoingFriendRequests(userid, function(OutgoingRequests)
        {
            //console.log(IncomingRequests)
            //console.log(OutgoingRequests)
            var friend_requests = IncomingRequests.rows.concat(OutgoingRequests.rows)
            res.status(201).json({
                success: true,
                errror: null,
                incoming_requests: IncomingRequests.rows,
                outgoing_requests: OutgoingRequests.rows
            })
        })
    })

});

router.post('/friends_requests/send/:sender/:receiver', auth.jwtMW, function(req, res)
{
    var sender = jwt_decode(req.headers.authorization.split(' ')[1]).userid
    var receiver = req.params.receiver
    FriendRequestManagement.createFriendRequest(sender, receiver, function(newFriendRequest)
    {
        res.status(201).json({
            success: true,
            error: null,
        })
    })
});

router.post('/friends_requests/reject/:sender/:receiver', auth.jwtMW, function(req, res)
{
    var loggedInUser = jwt_decode(req.headers.authorization.split(' ')[1]).userid

    var sender = req.params.sender
    var receiver = req.params.receiver

    if(loggedInUser === sender || loggedInUser == receiver)
    {
        FriendRequestManagement.deleteFriendRequest(sender, receiver, function(removedRequest)
        {
            res.status(201).json({
                success: true,
                error: null,
            })
        })
    } else
    {
        res.status(401).json({
            success: false,
            error: "Failed to reject freind request"
        })
    }


});

module.exports = router;