const assert = require('assert');

const request = require('request');
const {basepath} = require('../common');

var commentid;

it("create comment", function(done){
    const path = 'http://localhost:8080/api/v1/comments/add';

    var reqBody = { 
        userid: 0,
        postid: 0,
        parent_commentid: null,
        comment_text: 'hi',
    }
    
    request.post(path, {
        url: path,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(reqBody),
    }, function(err, res)
        {
            var body = JSON.parse(res.body)
            commentid = body.commentid
            assert.strictEqual(true, body.success);
            done();
    });
})

it("delete comment", function(done){
    const path = `http://localhost:8080/api/v1/comments/delete/${commentid}`;

    request.delete(path, {
        url: path,
        headers: {'Content-Type': 'application/json'},
    }, function(err, res)
        {
            var body = JSON.parse(res.body)
            assert.strictEqual(true, body.success);
            done();
    });
})