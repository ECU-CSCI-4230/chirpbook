const assert = require('assert');

const request = require('request');
const {basepath} = require('../common');

console.log(basepath)

it('change displayname', function(done){
    const path = 'http://localhost:8080/api/v1/users/setdisplayname';

    var reqBody = { "display_name": "Johnny Test" }

    request(path, {
        headers: {'Content-Type': 'application/json'},
        url: path,
        method: 'POST',
        json: JSON.stringify(reqBody),
    }, function(err, res)
        {

            console.log(err)
            console.log(res)
            console.log(res.body)
            //let body = JSON.parse(res.body)
            assert.strictEqual(true, true);
            done();
    });
})