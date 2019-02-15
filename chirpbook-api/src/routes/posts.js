const config = require('../config/config.json');


const express = require('express');
const app = express();

const router = express.Router();

const PostManagement = require('../postmanagement');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var log = require('console-log-level')({level: 'info'});

router.get('/posts/get_homepage', function(req, res)
{
    var email = jwt_decode(req.headers.authorization.split(' ')[1]).email;
    PostManagement.getFriendPosts(email, function(result)
    {
        if(result)
        {
            res.status(200).json({
                sucess: true,
                err: null,
                posts: result.rows,
            });
        } else
        {
            res.status(404).json({
                sucess: false,
                err: 'Cannot get posts'
            })
        }
    })
});

module.exports = router;