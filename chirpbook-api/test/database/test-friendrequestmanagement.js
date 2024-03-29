const {FriendRequestManagement, UserManagement, assert} = require("../common");

var userid;
var userid2;

it('test create user', function(done)
{
    UserManagement.createUser('test@gmail.com', 'http://hasthelargehadroncolliderdestroyedtheworldyet.com/', 'jim', function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        userid = result.rows[0].userid
        done();
    });
});

it('test create user2', function(done)
{
    UserManagement.createUser('test2@gmail.com', 'http://hasthelargehadroncolliderdestroyedtheworldyet.com/', 'frien', function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        userid2 = result.rows[0].userid
        done();
    });
});

it('test create friend request', function(done)
{
    FriendRequestManagement.createFriendRequest(userid, userid2, function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        done();
    });
});

it('test get incoming friend requests', function(done)
{
    FriendRequestManagement.getIncomingFriendRequests(userid2, function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        done();
    });
});

it('test get outgoing friend requests', function(done)
{
    FriendRequestManagement.getOutgoingFriendRequests(userid, function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        done();
    });
});

it('test delete friend request', function(done)
{
    FriendRequestManagement.deleteFriendRequest(userid, userid2, function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        done();
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

it('delete user2', function(done)
{
    UserManagement.deleteUser(userid2, function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        done()
    })
})
