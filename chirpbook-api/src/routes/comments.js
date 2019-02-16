const express = require('express');
const app = express();

const router = express.Router();

const commentmanagement = require('../commentmanagement');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var log = require('console-log-level')({level: 'info'});

router.post('/comments/add', function(req, res){
    var commentText = req.body.comment_text
    var userid = req.body.userid
    var postid = req.body.postid
    var parentCommentid = req.body.parent_commentid
    
    commentmanagement.createComment(postid, parentCommentid, userid, commentText, function(comment_rows_c){
        if(comment_rows_c.rowCount == 1){
            res.status(201).json({
                success: true,
                err: null
            })
        }else{
            res.status(404).json({
                success: false,
                err: "Cannot add comment"
            })
        }
    })
})






module.exports = router;