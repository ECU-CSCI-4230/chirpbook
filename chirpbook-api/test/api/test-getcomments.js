const assert = require('assert');

const request = require('request');
const {basepath, CommentManagement, PostManagement} = require('../common');

console.log(basepath)

var pid = null;
var cid = null;

it('create test post', function(done)
{
    PostManagement.createPost(0, 'testing', function(result)
    {
        pid = result.rows[0].postid 
        assert.strictEqual(1,result.rowCount);
        done();
    });
});

it('get no comments on post', function(done){
    const path = `http://localhost:8080/api/v1//post/comments/${pid}`;
        
    request.post(path, {
        url: path,
        headers: {'Content-Type': 'application/json'},
    }, function(err, res)
        {
            var body = JSON.parse(res.body)
            console.log(body)
            assert.strictEqual(true, body.sucess);
            assert.strictEqual(0, body.comments.length)
            done();
    });
});

it('create one comment on post', function(done)
{
    CommentManagement.createComment(pid, null, 0, 'testing', function(result)
    {
        cid = result.rows[0].commentid
        assert.strictEqual(1,result.rowCount);
        done();
    });
});

it('get one comment on post', function(done){
    const path = `http://localhost:8080/api/v1//post/comments/${pid}`;
        
    request.post(path, {
        url: path,
        headers: {'Content-Type': 'application/json'},
    }, function(err, res)
        {
            var body = JSON.parse(res.body)
            console.log(body)
            assert.strictEqual(true, body.sucess);
            assert.strictEqual(1, body.comments.length)
            done();
    });
});




