const assert = require('assert');

const request = require('request');
const {basepath} = require('../common');

console.log(basepath)

it('change displayname', function(done){
    const path = 'http://localhost:8080/api/v1//users/set_displayname/0';

    var reqBody = { display_name: "Johnny Test" }
    
    request.post(path, {
        url: path,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(reqBody),
    }, function(err, res)
        {
            var body = JSON.parse(res.body)
            assert.strictEqual(true, body.sucess);
            done();
    });
})