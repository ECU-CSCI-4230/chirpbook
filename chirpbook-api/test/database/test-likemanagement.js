const { LikeManagement, assert } = require("../common");

it('test add like', function (done) {
    LikeManagement.addLike(0, 0, 0, function (result) {
        //console.log(result)
        assert.strictEqual(result, 1)
        done();
    });
});

it('test remove like', function (done) {
    LikeManagement.removeLike(0, 0, function (result) {
        //console.log(result)
        assert.strictEqual(result, 1)
        done();
    });
});
