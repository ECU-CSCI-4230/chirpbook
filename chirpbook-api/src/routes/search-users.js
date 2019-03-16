const express = require('express');
const app = express();

const router = express.Router();

const UserManagement = require('../usermanagement');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var log = require('console-log-level')({level: 'info'});

// ISSUE: API call for searching users by username or gmail

router.get('/user/search/:gmail', function(req, res)
{ // might need to change '/user'

    // Need some variables here
    var gmail = req.params.gmail

    UserManagement.searchUser(gmail, function(result)
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

module.exports = router