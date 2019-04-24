const {LikeManagement, UserManagement, PostManagement, assert} = require("../common");

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

it('test add like', function(done)
{
    LikeManagement.addLike(pid, userid, 0, function(result)
    {
        assert.strictEqual(result, 1)
        done();
    });
});

it('test remove like', function(done)
{
    LikeManagement.removeLike(pid, userid, function(result)
    {
        assert.strictEqual(result, 1)
        done();
    });
});

it('delete posts', function(done)
{
    PostManagement.removePost(pid, userid, function(result)
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