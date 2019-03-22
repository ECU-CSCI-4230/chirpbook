const assert = require('assert');

const request = require('request');
const {basepath} = require('../common');

console.log(basepath)

var u1;
var u2;

var token1
var token2

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


it('create new friend request', function(done)
{
    const path = `http://${basepath}/friends_requests/send/${u1}/${u2}`;

    request.post(path, {
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

it('get all friend requests', function(done)
{
    const path = `http://${basepath}/friends_requests/${u1}`;

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
            assert.strictEqual(true, body.outgoing_requests.length == 1);
            done();
        });
})

it('reject friend request', function(done)
{
    const path = `http://${basepath}/friends_requests/reject/${u1}/${u2}`;

    request.post(path, {
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

it('get all friend requests', function(done)
{
    const path = `http://${basepath}/friends_requests/${u1}`;

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
            assert.strictEqual(true, body.incoming_requests.length == 0);
            assert.strictEqual(true, body.outgoing_requests.length == 0);
            done();
        });
})
