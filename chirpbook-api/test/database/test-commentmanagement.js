const {
  CommentManagement,
  assert
} = require("../common");

it('test create comment', function(done) {
  CommentManagement.createComment(0, null, 0, "hello!", function(result) {
    console.log(result)
    assert.strictEqual(result.rowCount, 1)
    done();
  });
});

// test editing a comment
var comid = 1;
it('test edit comment', function(done) {
  CommentManagement.editComment(comid, "modified", function(result) {
    console.log(result)
    assert.strictEqual(result, 1) // might need to change this assert
    done();
  });
});

// test deleting a comment
