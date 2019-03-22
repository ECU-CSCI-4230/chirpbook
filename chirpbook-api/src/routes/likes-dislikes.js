const express = require('express');
const app = express();

const router = express.Router();

const LikeManagement = require('../likemanagement');
const UserManagement = require('../usermanagement');

const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var log = require('console-log-level')({level: 'info'});

const auth = require('../config/auth');

router.post('/like', auth.jwtMW, function(req, res)
{
    var like = req.body.like_type
    var pid = req.body.postid

    // console.log(req.body)

    var gmail = jwt_decode(req.headers.authorization.split(' ')[1]).gmail;

    if(gmail)
    {
        UserManagement.getUser(gmail, userRows =>
        {
            if(userRows.length == 1)
            {

                LikeManagement.addLike(pid, userRows[0].userid, like, function(result)
                {

                    // console.log("==========add like===========\n" + result)

                    if(result == 1)
                    {
                        res.status(201).json({
                            success: true,
                            err: null
                        })
                    } else
                    {
                        LikeManagement.editLike(pid, userRows[0].userid, like, function(res2)
                        {

                            // console.log("==========edit like===========\n" + res2)

                            if(res2 == 1)
                            {
                                res.status(201).json({
                                    success: true,
                                    err: null
                                });
                            } else
                            {
                                res.status(400).json({
                                    success: false,
                                    err: 'edit like error'
                                });
                            }
                        });

                    }
                });
            }
        });
    }

});

router.delete('/like', auth.jwtMW, function(req, res)
{
    var pid = req.body.postid

    var gmail = jwt_decode(req.headers.authorization.split(' ')[1]).gmail;

    if(gmail)
    {
        UserManagement.getUser(gmail, userRows =>
        {
            if(userRows.length == 1)
            {
                LikeManagement.removeLike(pid, userRows[0].userid, function(res3)
                {
                    if(res3 == 1)
                    {
                        res.status(201).json({
                            success: true,
                            err: null
                        })
                    } else
                    {
                        res.status(400).json({
                            success: false,
                            err: 'remove like error'
                        })
                    }
                });
            }
        });
    }
});

module.exports = router;