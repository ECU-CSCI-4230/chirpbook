const assert = require('assert');

const request = require('request');
const {basepath} = require('../common');

console.log(basepath)

it('get all friend requests', function(done){
    const path = 'http://localhost:8080/api/v1/friends_requests/0';
    
    request.post(path, {
        url: path,
        headers: {'Content-Type': 'application/json'},
    }, function(err, res)
        {
            var body = JSON.parse(res.body)
            assert.strictEqual(true, body.success);
            assert.strictEqual(true, body.all_requests.length == 1);
            done();
    });
})