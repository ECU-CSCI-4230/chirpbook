const assert = require('assert');

const request = require('request');
const {basepath} = require('../common');

var token2
var token1

var u1
var u2

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
            u1 = body.userid
            assert.strictEqual(body.success, true)
            done()
        })
})

it('login user 2', function(done)
{
    const path = `http://${basepath}/login`

    reqBody = {gmail: 'email2@email.com', 'password': 'password'}
    request.post(path, {
        headers: {'Content-Type': 'application/json'},
        url: path,
        body: JSON.stringify(reqBody),
    }, function(err, res)
        {
            let body = JSON.parse(res.body)
            token2 = 'Bearer ' + body.token
            u2 = body.userid
            assert.strictEqual(body.success, true)
            done()
        })
})

var p1
var p2

it('make post', function(done)
{
    const path = `http://${basepath}/posts/add`;

    var reqBody = {post_text: "sup!"}

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
            p1 = body.postid
            assert.strictEqual(true, body.success);
            done();
        });
})

it('make post', function(done)
{
    const path = `http://${basepath}/posts/add`;

    var reqBody = {post_text: "fam"}

    request.post(path, {
        url: path,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token2
        },
        body: JSON.stringify(reqBody),
    }, function(err, res)
        {
            var body = JSON.parse(res.body)
            p2 = body.postid
            assert.strictEqual(true, body.success);
            done();
        });
})

it("create comment", function(done)
{
    const path = `http://${basepath}/comments/add`;

    var reqBody = {
        userid: u1,
        postid: p1,
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


it("create comment", function(done)
{
    const path = `http://${basepath}/comments/add`;

    var reqBody = {
        userid: u2,
        postid: p1,
        parent_commentid: null,
        comment_text: 'hii',
    }

    request.post(path, {
        url: path,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token2
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

it("create comment", function(done)
{
    const path = `http://${basepath}/comments/add`;

    var reqBody = {
        userid: u1,
        postid: p2,
        parent_commentid: null,
        comment_text: 'hii',
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

it('delete user 2', function(done)
{
    const path = `http://${basepath}/users/delete/${u2}`;

    request.delete(path, {
        url: path,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token2
        },
    }, function(err, res)
        {
            var body = JSON.parse(res.body)
            assert.strictEqual(true, body.success);
            done();
        });
})

it('delete user 1', function(done)
{
    const path = `http://${basepath}/users/delete/${u1}`;

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