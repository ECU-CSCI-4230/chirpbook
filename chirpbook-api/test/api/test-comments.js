const assert = require('assert');

const request = require('request');
const {basepath} = require('../common');

var token1
var uid

it('login user 1', function(done)
{
    const path = `http://${basepath}/login`

    reqBody = {gmail: 'email@email.com', 'password': 'password'}
    request.post(path, {
        headers: {'Content-Type': 'application/json'},
        url: path,
        body: JSON.stringify(reqBody),
    }, function(err, res)
        {
            let body = JSON.parse(res.body)
            token1 = 'Bearer ' + body.token
            uid = body.userid
            assert.strictEqual(body.success, true)
            done()
        })
})

var pid

it('make post', function(done)
{
    const path = `http://${basepath}/posts/add`;

    var reqBody = {post_text: "Hi!"}

    request.post(path, {
        url: path,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token1
        },
        body: JSON.stringify(reqBody),
    }, function(err, res)
        {
            var body = JSON.parse(res.body)
            pid = body.postid
            assert.strictEqual(true, body.success);
            done();
        });
})


var commentid;

it("create comment", function(done)
{
    const path = `http://${basepath}/comments/add`;

    var reqBody = {
        userid: uid,
        postid: pid,
        parent_commentid: null,
        comment_text: 'hi',
    }

    request.post(path, {
        url: path,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token1
        },
        body: JSON.stringify(reqBody),
    }, function(err, res)
        {
            var body = JSON.parse(res.body)
            commentid = body.commentid
            assert.strictEqual(true, body.success);
            done();
        });
})

it("get comment", function(done)
{
    const path = `http://${basepath}/comments/get/${pid}`;


    request.get(path, {
        url: path,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token1
        },
    }, function(err, res)
        {
            var body = JSON.parse(res.body)
            assert.strictEqual(true, body.success);
            assert.strictEqual(true, body.comments.length >= 1)
            done();
        });
})

it("delete comment", function(done)
{
    const path = `http://${basepath}/comments/delete/${commentid}`;

    request.delete(path, {
        url: path,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token1
        },
    }, function(err, res)
        {
            var body = JSON.parse(res.body)
            assert.strictEqual(true, body.success);
            done();
        });
})


it('remove post', function(done)
{
    const path = `http://${basepath}/posts/remove/${pid}`;

    request.delete(path, {
        url: path,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token1
        },
        body: JSON.stringify(reqBody),
    }, function(err, res)
        {
            var body = JSON.parse(res.body)
            assert.strictEqual(true, body.success);
            assert.strictEqual(true, body.post_text == '[Redacted]')
            done();
        });
})
