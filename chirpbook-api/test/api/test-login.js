const assert = require('assert');

const request = require('request');
const {basepath} = require('../common');

var token1
var token2

it('create user test user 1', function(done)
{
    const path = `http://${basepath}/signup`

    reqBody = {gmail: 'email@email.com', 'password': 'password', display_name: 'test'}
    request.post(path, {
        headers: {'Content-Type': 'application/json'},
        url: path,
        body: JSON.stringify(reqBody),
    }, function(err, res)
        {
            let body = JSON.parse(res.body)
            token1 = 'Bearer ' + body.token
            assert.strictEqual(true, body.err === 'Account already exists.' || body.msg === 'Account created')
            done()
        })
})


it('create user test user 2', function(done)
{
    const path = `http://${basepath}/signup`

    reqBody = {gmail: 'email2@email.com', 'password': 'password', display_name: 'test2'}
    request.post(path, {
        headers: {'Content-Type': 'application/json'},
        url: path,
        body: JSON.stringify(reqBody),
    }, function(err, res)
        {
            let body = JSON.parse(res.body)
            token2 = 'Bearer ' + body.token
            assert.strictEqual(true, body.err === 'Account already exists.' || body.msg === 'Account created')
            done()
        })
})

it('test login user 1', function(done)
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
            assert.strictEqual(body.sucess, true)
            done()
        })
})

it('test login user 2', function(done)
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
            assert.strictEqual(body.sucess, true)
            done()
        })
})