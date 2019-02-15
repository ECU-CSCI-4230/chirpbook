const express = require('express');
const app = express();

const router = express.Router();

const LikeManagement = require('../likemanagement');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var log = require('console-log-level')({level: 'info'});

router.post('/like', function(req, res) {
    var userid = req.userid
    var like = req.like_type
    var pid = req.postid

    LikeManagement.editLike(pid, userid, like, function(result) {
        console.log(result)
        if (result.rowCount == 1) {
            res.status(201).json({
                success: true,
                err: null
            })
        } else {
            res.status(400).json({
                success: false,
                err: 'u stupid'
            })
        }
    })
})

module.exports = router;