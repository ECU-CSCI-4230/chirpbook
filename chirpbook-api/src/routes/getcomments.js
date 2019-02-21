const express = require('express');
const app = express();

const router = express.Router();

const PostManagement = require('../postmanagement');

const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

var log = require('console-log-level')({level: 'info'});



router.post('/post/comments/:postid', function(req, res){
    var postid = req.params.postid

    PostManagement.getPostComments(postid, function(result){
        if(result.rowCount >= 0){
            res.status(201).json({
                comments: result.rows,
                sucess: true,
                err: null
            })
        }else{
            res.status(404).json({
                sucess: false,
                err: 'Posts not found'
            })
        }
    })
    
})

module.exports = router;


