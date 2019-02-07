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
it('test edit comment', function(done) {
  CommentManagement.editComment(0, 0, "modified", function(result) {
    console.log(result)
    assert.strictEqual(result, 1) // might to change this assert
    done();
  });
});

// test deleting a comment
