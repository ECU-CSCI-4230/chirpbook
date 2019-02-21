const {PostManagement, UserManagement, LikeManagement, FriendManagement, CommentManagement, assert} = require("../common");

var userid = null;
it('create a test user', function(done)
{
    UserManagement.createUser('potato@gmail.com', '', function(result)
    {
        assert.strictEqual(result.rowCount, 1);
        userid = result.rows[0].userid
        done();
    });
});

var userid2 = null;
it('create another test user', function(done)
{
    UserManagement.createUser('test@gmail.com', '', function(result)
    {
        assert.strictEqual(result.rowCount, 1);
        userid2 = result.rows[0].userid
        done();
    });
});

var userid3 = null;
it('create another test user', function(done)
{
    UserManagement.createUser('test2@gmail.com', '', function(result)
    {
        assert.strictEqual(result.rowCount, 1);
        userid3 = result.rows[0].userid
        done();
    });
});


it('create post from user 1', function(done)
{
    PostManagement.createPost(userid, 'a fake post', function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        done();
    });
});

it('create post from user 2', function(done)
{
    PostManagement.createPost(userid2, 'a different fake post for the second test', function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        done();
    });
});

it('create a post to edit from user 1', function(done)
{
    PostManagement.createPost(userid, 'we will edit this post', function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        done();
    });
});

var userPosts = [];

it('get user\'s recent post', function(done)
{
    PostManagement.getUserPosts(userid, function(result)
    {
        userPosts = result.rows;
        assert.strictEqual(result.rowCount, 2)
        done();
    });
});

var user2Posts = [];

it('get user2\'s recent post', function(done)
{
    PostManagement.getUserPosts(userid2, function(result)
    {
        user2Posts = result.rows;
        assert.strictEqual(result.rowCount, 1)
        done();
    });
});

it('edit a post', function(done)
{
    PostManagement.editPost(userPosts[userPosts.length - 1].postid, 'this is the edited text',
        function(result)
        {
            assert.strictEqual(result, 1)
            done();
        });
});

it('test add like', function(done)
{
    LikeManagement.addLike(userPosts[userPosts.length - 1].postid, userid3, 1, function(result)
    {
        assert.strictEqual(result, 1)
        done();
    });
});


it('test add dislike', function(done)
{
    LikeManagement.addLike(userPosts[userPosts.length - 1].postid, userid, 0, function(result)
    {
        assert.strictEqual(result, 1)
        done();
    });
});

it('test add dislike', function(done)
{
    LikeManagement.addLike(userPosts[userPosts.length - 1].postid, userid2, 0, function(result)
    {
        assert.strictEqual(result, 1)
        done();
    });
});

it('check post was edited', function(done)
{
    PostManagement.getPost(userPosts[userPosts.length - 1].postid, function(result)
    {
        assert.strictEqual(result.rows[0].post_text, 'this is the edited text');
        done();
    });
});

var commentid;
it('test create comment', function(done)
{
    CommentManagement.createComment(userPosts[userPosts.length - 1].postid, null, userid, "hello!", function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        commentid = result.rows[0].commentid;
        done();
    });
});

it('check get post comments', function(done)
{
    PostManagement.getPostComments(userPosts[userPosts.length - 1].postid, function(result)
    {
        assert.strictEqual(result.rowCount, 1);
        done();
    });
});

it('test delete comment', function(done)
{
    CommentManagement.deleteComment(commentid, function(result)
    {
        assert.strictEqual(result, 1);
        done();
    });
});

it('get all of user1\'s posts', function(done)
{
    PostManagement.getUserPosts(userid, function(result)
    {
        assert.strictEqual(parseInt(result.rows[result.rowCount - 1].dislikes), 2);
        assert.strictEqual(parseInt(result.rows[result.rowCount - 1].likes), 1);
        assert.strictEqual(parseInt(result.rows[result.rowCount - 2].dislikes), 0);
        assert.strictEqual(parseInt(result.rows[result.rowCount - 2].likes), 0);
        assert.strictEqual(result.rowCount, 2);
        done();
    });
});

it('test create friend', function(done)
{
    FriendManagement.createFriend(userid, userid2, function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        done();
    });
});

it('get user1\'s friend\'s posts', function(done)
{
    PostManagement.getFriendPosts('potato@gmail.com', function(result)
    {
        assert.strictEqual(result.rowCount, 3);
        done();
    });
});

it('test delete friend', function(done)
{
    FriendManagement.deleteFriend(userid, userid2, function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        done();
    });
});

it('test remove like', function(done)
{
    LikeManagement.removeLike(userPosts[userPosts.length - 1].postid, userid3, function(result)
    {
        assert.strictEqual(result, 1)
        done();
    });
});

it('test remove dislike', function(done)
{
    LikeManagement.removeLike(userPosts[userPosts.length - 1].postid, userid, function(result)
    {
        assert.strictEqual(result, 1)
        done();
    });
});

it('test remove dislike', function(done)
{
    LikeManagement.removeLike(userPosts[userPosts.length - 1].postid, userid2, function(result)
    {
        assert.strictEqual(result, 1)
        done();
    });
});

it('remove all user posts', function(done)
{
    PostManagement.removeUserPosts(userid, function(result)
    {
        assert.strictEqual(result >= 1, true);

        done()

    });
});

it('remove all user2 posts', function(done)
{
    PostManagement.removeUserPosts(userid2, function(result)
    {
        assert.strictEqual(result >= 1, true);

        done()

    });
});

// it('remove all user3 posts', function(done)
// {
//     PostManagement.removeUserPosts(userid3, function(result)
//     {
//         assert.strictEqual(result >= 1, true);

//         done()

//     });
// });

it('delete user', function(done)
{
    UserManagement.deleteUser(userid, function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        done()
    });
});

it('delete user2', function(done)
{
    UserManagement.deleteUser(userid2, function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        done()
    })
});

it('delete user3', function(done)
{
    UserManagement.deleteUser(userid3, function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        done()
    });
});
