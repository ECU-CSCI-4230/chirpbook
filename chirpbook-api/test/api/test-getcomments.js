const assert = require('assert');

const request = require('request');
const {basepath} = require('../common');

console.log(basepath)

it('get comments on post', function(done){
    const path = 'http://localhost:8080/api/v1//post/comments/0';

    var reqBody = { postid: 0 }
    
    request.post(path, {
        url: path,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(reqBody),
    }, function(err, res)
        {
            var body = JSON.parse(res.body)
            assert.strictEqual(true, body.sucess);
            assert.strictEqual(2, body.comments.length)
            done();
    });
})
