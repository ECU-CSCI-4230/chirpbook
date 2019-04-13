const express = require('express');
const app = express();

const router = express.Router();

const commentmanagement = require('../commentmanagement');
const UserManagement = require('../usermanagement');

const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var log = require('console-log-level')({level: 'info'});

const auth = require('../config/auth');

router.post('/comments/add', auth.jwtMW, function(req, res)
{
    var commentText = req.body.comment_text
    var postid = req.body.postid
    var parentCommentid = req.body.parent_commentid
    var gmail = jwt_decode(req.headers.authorization.split(' ')[1]).gmail;

    if(gmail && commentText)
    {
        UserManagement.getUser(gmail, userRows =>
        {
            if(userRows.length == 1)
            {
                commentmanagement.createComment(postid, parentCommentid, userRows[0].userid, commentText, function(comment_rows)
                {
                    if(comment_rows && comment_rows.rowCount == 1)
                    {
                        res.status(201).json({
                            commentid: comment_rows.rows[0].commentid,
                            success: true,
                            err: null
                        });
                    } else
                    {
                        res.status(404).json({
                            success: false,
                            err: "Cannot add comment"
                        });
                    }
                });
            }
        });
    }
})

router.get('/comments/get/:postid', auth.jwtMW, function(req, res)
{
    var postid = req.params.postid

    commentmanagement.getPostComments(postid, function(result)
    {
        if(result)
        {
            res.status(200).json({
                success: true,
                err: null,
                comments: result.rows,
            });
        } else
        {
            res.status(404).json({
                success: false,
                err: 'Cannot get comments'
            })
        }
    });
});

router.delete('/comments/delete/:commentid', auth.jwtMW, function(req, res)
{
    var commentid = req.params.commentid

    commentmanagement.deleteComment(commentid, function(delete_comment_rows)
    {
        if(delete_comment_rows == 1)
        {
            res.status(201).json({
                success: true,
                err: null
            })
        } else
        {
            res.status(404).json({
                success: false,
                err: "Cannot delete comment"
            })
        }
    })
})

router.post('/comments/like', auth.jwtMW, function(req, res)
{
    var like = req.body.like_type
    var cid = req.body.commentid

    // console.log(req.body)

    var gmail = jwt_decode(req.headers.authorization.split(' ')[1]).gmail;

    if(gmail)
    {
        UserManagement.getUser(gmail, userRows =>
        {
            if(userRows.length == 1)
            {

                commentmanagement.addCommentLike(cid, userRows[0].userid, like, function(result)
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
                        commentmanagement.editCommentLike(cid, userRows[0].userid, like, function(res2)
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

router.delete('/comments/like', auth.jwtMW, function(req, res)
{
    var cid = req.body.commentid

    var gmail = jwt_decode(req.headers.authorization.split(' ')[1]).gmail;

    if(gmail)
    {
        UserManagement.getUser(gmail, userRows =>
        {
            if(userRows.length == 1)
            {
                commentmanagement.removeCommentLike(cid, userRows[0].userid, function(res3)
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