const {
  CommentManagement,
  assert
} = require("../common");

var comid;
it('test create comment', function(done) {
  CommentManagement.createComment(0, null, 0, "hello!", function(result) {
    //console.log(result)
    assert.strictEqual(result.rowCount, 1)
    comid = result.rows[0].commentid;
    done();
  });
});

// test editing a comment

it('test edit comment', function(done) {
  CommentManagement.editComment(comid, "modified", function(result) {
    //console.log(result)
    assert.strictEqual(result, 1) // might need to change this assert
    done();
  });
});

// test deleting a comment
it('test delete comment', function(done) {
  CommentManagement.deleteComment(comid, function(result) {
    //console.log(result)
    assert.strictEqual(result, 1) // might need to change this assert
    done();
  });
});