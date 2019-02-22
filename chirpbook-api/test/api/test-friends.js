const assert = require('assert');

const request = require('request');
const {basepath} = require('../common');

console.log(basepath)

it('add new friend', function(done){
    const path = 'http://localhost:8080/api/v1/friends/add/0/1';

    request.post(path, {
        url: path,
        headers: {'Content-Type': 'application/json'},
    }, function(err, res)
        {
            var body = JSON.parse(res.body)
            assert.strictEqual(true, body.success);
            done();
    });
})

it('get all friends', function(done){
    const path = 'http://localhost:8080/api/v1/friends/0';

    request.get(path, {
        url: path,
        headers: {'Content-Type': 'application/json'},
    }, function(err, res)
        {
            var body = JSON.parse(res.body)
            assert.strictEqual(true, body.success);
            assert.strictEqual(true, body.friends_list.length == 1);
            done();
    });
})

it('remove friend', function(done){
    const path = 'http://localhost:8080/api/v1/friends/remove/0/1';

    request.post(path, {
        url: path,
        headers: {'Content-Type': 'application/json'},
    }, function(err, res)
        {
            var body = JSON.parse(res.body)
            assert.strictEqual(true, body.success);
            done();
    });
})

it('get all friends', function(done){
    const path = 'http://localhost:8080/api/v1/friends/0';

    request.get(path, {
        url: path,
        headers: {'Content-Type': 'application/json'},
    }, function(err, res)
        {
            var body = JSON.parse(res.body)
            assert.strictEqual(true, body.success);
            assert.strictEqual(true, body.friends_list.length == 0);
            done();
    });
})
