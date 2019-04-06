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

const auth = require('../config/auth');

router.get('/posts/get_homepage', auth.jwtMW, function(req, res)
{
    var email = jwt_decode(req.headers.authorization.split(' ')[1]).gmail;
    PostManagement.getFriendPosts(email, function(result)
    {
        if(result)
        {
            res.status(200).json({
                success: true,
                err: null,
                posts: result.rows,
            });
        } else
        {
            res.status(404).json({
                success: false,
                err: 'Cannot get posts'
            })
        }
    })
});

router.get('/posts/get/:tag', auth.jwtMW, function(req, res)
{
    var userid = jwt_decode(req.headers.authorization.split(' ')[1]).userid;
    var tag = req.params.tag
    PostManagement.getPostsWithTag(userid, tag, function(result)
    {
        console.log(result)
        if(result)
        {
            res.status(200).json({
                success: true,
                err: null,
                posts: result,
            });
        } else
        {
            res.status(404).json({
                success: false,
                err: 'Cannot get posts'
            })
        }
    })
});

router.get('/posts/get/:postid', auth.jwtMW, function(req, res)
{
    var postid = req.params.postid
    var email = jwt_decode(req.headers.authorization.split(' ')[1]).gmail;
    PostManagement.getPost(postid, email, function(result)
    {
        if(result && result.rowCount > 0)
        {
            res.status(200).json({
                success: true,
                err: null,
                post: result.rows,
            });
        } else
        {
            res.status(404).json({
                success: false,
                err: 'Cannot get post'
            })
        }
    })
});

router.post('/posts/add', auth.jwtMW, function(req, res)
{
    var postText = req.body.post_text;
    var gmail = jwt_decode(req.headers.authorization.split(' ')[1]).gmail;

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
                        var tokens = postText.split(/\s+/)
                        var tags = []
                        for(var i = 0; i < tokens.length; i++)
                        {
                            if(tokens[i].charAt(0) === '#' && tokens[i].length >= 2)
                            {
                                tags.push(tokens[i].slice(1))
                            }
                        }

                        PostManagement.createTags(post_res.rows[0].postid, tags, function(tagRes)
                        {
                            if(tagRes == true)
                            {
                                res.status(201).json({
                                    success: true,
                                    postid: post_res.rows[0].postid,
                                    err: null
                                });
                            }
                            else
                            {
                                res.status(401).json({
                                    success: false,
                                    err: "tags failed to post"
                                });
                            }
                        })


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

router.delete('/posts/remove/:postid', auth.jwtMW, function(req, res)
{
    var postid = req.params.postid

    PostManagement.removePost(postid, function(result)
    {
        if(result && result.rowCount > 0)
        {
            res.status(200).json({
                success: true,
                err: null,
            });
        } else
        {
            res.status(404).json({
                success: false,
                err: 'Cannot delete post'
            })
        }
    })
})

router.get('/posts/get/user/:userid', auth.jwtMW, function(req, res)
{
    var userid = req.params.userid;
    PostManagement.getUserPosts(userid, function(result)
    {
        if(result)
        {
            res.status(200).json({
                success: true,
                err: null,
                posts: result.rows,
            });
        }
        else
        {
            res.status(404).json({
                success: false,
                err: 'Cannot get posts from this user'
            });
        }
    });
})

module.exports = router;