const {
    CommentManagement,
    UserManagement,
    PostManagement,
    assert
} = require("../common");

var userid

it('create user', function(done)
{
    UserManagement.createUser('test@gmail.com', 'http://hasthelargehadroncolliderdestroyedtheworldyet.com/', '', function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        userid = result.rows[0].userid
        done();
    });
});

var pid

it('create post', function(done)
{
    PostManagement.createPost(userid, 'a fake post', function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        pid = result.rows[0].postid
        done();
    });
});

var comid;

it('test create comment', function(done)
{
    CommentManagement.createComment(pid, null, userid, "hello!", function(result)
    {
        //console.log(result)
        assert.strictEqual(result.rowCount, 1)
        comid = result.rows[0].commentid;
        done();
    });
});

// test editing a comment

it('test edit comment', function(done)
{
    CommentManagement.editComment(comid, "modified", function(result)
    {
        //console.log(result)
        assert.strictEqual(result, 1) // might need to change this assert
        done();
    });
});

// test deleting a comment
it('test delete comment', function(done)
{
    CommentManagement.deleteComment(comid, function(result)
    {
        //console.log(result)
        assert.strictEqual(result, 1) // might need to change this assert
        done();
    });
});

it('delete post', function(done)
{
    PostManagement.removePost(pid, function(result)
    {
        assert.strictEqual(result.rowCount, 1);
        done()
    });
});

it('delete user', function(done)
{
    UserManagement.deleteUser(userid, function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        done()
    })
})