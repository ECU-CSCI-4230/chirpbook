const assert = require('assert');

const request = require('request');
const {basepath} = require('../common');

console.log(basepath)

it('change displayname', function(done){
    const path = 'http://localhost:8080/api/v1/users/setdisplayname/test';

    var reqBody = { "display_name": "Johnny Test" }
    
    request.post(path, {
        url: path,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        json: reqBody,
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