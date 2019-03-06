const config = require('../config/config.json');


const express = require('express');
const app = express();

const router = express.Router();

const PostManagement = require('../postmanagement');
const UserManagement = require('../usermanagement');
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

router.get('/posts/get/:postid', function(req, res)
{
    var postid = req.params.postid
    var email = jwt_decode(req.headers.authorization.split(' ')[1]).email;
    console.log(email)
    PostManagement.getPost(postid, email, function(result)
    {
        if(result && result.rowCount > 0)
        {
            res.status(200).json({
                sucess: true,
                err: null,
                post: result.rows,
            });
        } else
        {
            res.status(404).json({
                sucess: false,
                err: 'Cannot get post'
            })
        }
    })
});

router.post('/posts/add', function(req, res)
{
    var postText = req.body.post_text;
    var gmail = jwt_decode(req.headers.authorization.split(' ')[1]).email;
    if(gmail && postText)
    {
        UserManagement.getUser(gmail, userRows =>
        {
            if(userRows.length == 1)
            {
                PostManagement.createPost(userRows[0].userid, postText, function(post_res)
                {
                    if(post_res.rowCount == 1)
                    {
                        res.status(201).json({
                            success: true,
                            err: null
                        });
                    } else
                    {
                        res.status(404).json({
                            success: false,
                            err: "Cannot add post"
                        });
                    }
                });
            } else
            {
                res.status(404).json({
                    success: false,
                    err: "Cannot add post, invalid user."
                });
            }
        });
    }
})


module.exports = router;