const assert = require('assert');

const request = require('request');
const { basepath } = require('../common');

console.log(basepath)

it('search user', function (done) {
    const path = 'http://localhost:8080/api/v1//user';

    var reqBody = { gmail: 'TEST@gmail.com' } // add some required parameters

    request.get(path, {
        url: path,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
    }, function (err, res) {
        var body = JSON.parse(res.body)
        console.log(body) // Maybe delete this later!
        assert.strictEqual(true, body.success);
        done();
    })
})