const assert = require('assert');

const request = require('request');
const { basepath } = require('../common');

//console.log(basepath)

it('add like', function (done) {
    const path = 'http://localhost:8080/api/v1//like';

    var reqBody = { postid: 0, userid: 0, like_type: 1 }
    request.post(path, {
        url: path,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
    }, function (err, res) {
        var body = JSON.parse(res.body)
        //console.log(body)
        assert.strictEqual(true, body.success);
        done();
    })
})

it('edit like', function (done) {
    const path = 'http://localhost:8080/api/v1//like';

    var reqBody = { userid: 0, like_type: 1, postid: 0 }

    request.post(path, {
        url: path,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
    }, function (err, res) {
        var body = JSON.parse(res.body)
        //console.log(body)
        assert.strictEqual(true, body.success);
        done();
    });
})

it('remove like', function (done) {
    const path = 'http://localhost:8080/api/v1//like';

    var reqBody = { userid: 0, like_type: 1, postid: 0 }

    request.delete(path, {
        url: path,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
    }, function (err, res) {
        var body = JSON.parse(res.body)
        //console.log(body)
        assert.strictEqual(true, body.success);
        done();
    });
})