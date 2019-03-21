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

router.post('/comments/add', function(req, res)
{
    var commentText = req.body.comment_text
    var postid = req.body.postid
    var parentCommentid = req.body.parent_commentid
    var gmail = jwt_decode(req.headers.authorization.split(' ')[1]).email;

    if(gmail && commentText)
    {
        UserManagement.getUser(gmail, userRows =>
        {
            if(userRows.length == 1)
            {
                commentmanagement.createComment(postid, parentCommentid, userRows[0].userid, commentText, function(comment_rows)
                {
                    if(comment_rows.rowCount == 1)
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

router.get('/comments/get/:postid', function(req, res)
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

router.delete('/comments/delete/:commentid', function(req, res)
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





module.exports = router;