const express = require('express');
const app = express();

const router = express.Router();

const UserManagement = require('../usermanagement');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var log = require('console-log-level')({ level: 'info' });

// ISSUE: API call for searching users by username or gmail

router.get('/user', function(req, res) { // might need to change '/user'

    // Need some variables here
    var gmail = req.body.gmail

    UserManagement.getUser(gmail, function(result) {

        if (result == 1) {
            res.status(201).json({
                success: true,
                err: null
            })
        } else {
            res.status(400).json({
                success: false,
                err: true
            })
        }

    })
})

module.exports = router