const {commentmanagement, assert} = require("../common");

it('test create Comment', function(done)
{
    commentmanagement.createComment(0, null, 0, "hello!", function(result)
    {
        console.log(result)
        assert.strictEqual(result.rowCount, 1)
        done();
    });
});

