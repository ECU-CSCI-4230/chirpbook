const express = require('express');
const app = express();

const router = express.Router();

const LikeManagement = require('../likemanagement');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var log = require('console-log-level')({ level: 'info' });

router.post('/like', function (req, res) {
    var userid = req.body.userid
    var like = req.body.like_type
    var pid = req.body.postid

    // console.log(req.body)

    LikeManagement.addLike(pid, userid, like, function (result) {

        // console.log("==========add like===========\n" + result)

        if (result == 1) {
            res.status(201).json({
                success: true,
                err: null
            })
        } else {
            LikeManagement.editLike(pid, userid, like, function (res2) {

                // console.log("==========edit like===========\n" + res2)

                if (res2 == 1) {
                    res.status(201).json({
                        success: true,
                        err: null
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        err: 'edit like error: u stupid'
                    })
                }
            })

        }
    })


})

router.delete('/like', function (req, res) {
    var pid = req.body.postid
    var userid = req.body.userid

    LikeManagement.removeLike(pid, userid, function (res3) {
        if (res3 == 1) {
            res.status(201).json({
                success: true,
                err: null
            })
        } else {
            res.status(400).json({
                success: false,
                err: 'remove like error: u stupid'
            })
        }
    })
})

module.exports = router;