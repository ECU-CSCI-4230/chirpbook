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


it('change displayname', function(done)
{
    const path = `http://localhost:8080/api/v1/users/set_displayname/${uid}`;

    var reqBody = {display_name: "Johnny Test"}

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
            assert.strictEqual(true, body.success);
            done();
        });
})


it('search', function(done)
{
    const path = `http://localhost:8080/api/v1/users/search/email`;

    request.get(path, {
        url: path,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token1
        },
    }, function(err, res)
        {
            var body = JSON.parse(res.body)
            assert.strictEqual(true, body.users.length >= 1);
            done();
        });
})