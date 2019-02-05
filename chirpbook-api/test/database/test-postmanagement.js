const {PostManagement, UserManagement, assert} = require("../common");

// should use the created user after the functionality is added
var user = 1;
it('create a test user', function(done)
{
    UserManagement.createUser('potato@gmail.com', function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        done();
    });
});

it('create post', function(done)
{
    PostManagement.createPost(1, 'a fake post', function(result)
    {
        assert.strictEqual(result, 1)
        done();
    });
});

it('create another post', function(done)
{
    PostManagement.createPost(1, 'a different fake post for the second test', function(result)
    {
        assert.strictEqual(result, 1)
        done();
    });
});

it('create a post to edit', function(done)
{
    PostManagement.createPost(1, 'we will edit this post', function(result)
    {
        assert.strictEqual(result, 1)
        done();
    });
});

var userPosts = [];

it('get user\'s recent post', function(done)
{
    PostManagement.getUserPosts(1, function(result)
    {
        userPosts = result.rows;
        assert.strictEqual(result.rowCount, 3)
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


it('check post was edited', function(done)
{
    PostManagement.getPost(userPosts[userPosts.length - 1].postid, function(result)
    {
        assert.strictEqual(result.rows[0].post_text, 'this is the edited text');
        done();
    });
});

it('remove all user posts', function(done)
{
    let numToProcess = userPosts.length;
    userPosts.forEach(row =>
    {
        PostManagement.removePost(parseInt(row.postid), function(result)
        {
            assert.strictEqual(result, 1);
            numToProcess--;
            if(numToProcess === 0)
            {
                done()
            }
        });
    });
});
