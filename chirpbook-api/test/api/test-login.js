const assert = require('assert');

const request = require('request');
const {basepath} = require('../common');

var token1

it('create user test user 1', function(done)
{
    const path = `http://${basepath}/signup`

    console.log(path)
    reqBody = {gmail: 'email@email.com', 'password': 'password', display_name: 'test'}
    request.post(path, {
        headers: {'Content-Type': 'application/json'},
        url: path,
        body: JSON.stringify(reqBody),
    }), function(err, res)
        {
            let body = JSON.parse(res.body)
            console.log(body)
            token1 = 'Bearer ' + body.token
            assert.strictEqual(body.sucess, true)
            done()
        }
})