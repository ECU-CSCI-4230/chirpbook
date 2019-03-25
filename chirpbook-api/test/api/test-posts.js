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

it('get post', function(done)
{
    const path = `http://${basepath}/posts/get/${pid}`;

    request.get(path, {
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
            assert.strictEqual(1, body.post.length)
            assert.strictEqual("Hi!", body.post[0].post_text)
            done();
        });
})

it('get homepage', function(done)
{
    const path = `http://${basepath}/posts/get_homepage`;

    request.get(path, {
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
            assert.strictEqual(true, body.posts.length >= 1)
            done();
        });
})

it('get post from single user', function(done)
{
    const path = `http://${basepath}/posts/get/user/${uid}`;

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
            assert.strictEqual(true, body.post.length >= 1)
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
            done();
        });
})