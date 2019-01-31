const {FriendRequestManagement, UserManagement, assert} = require("../common");

it('test create friend request', function(done)
{
   
    FriendRequestManagement.createFriendRequest(1, 2, function(result)
        {
            console.log(result)
            assert.strictEqual(result.rowCount, 1)
            done();
        });
    });

it('test delete friend request', function(done)
{
    FriendRequestManagement.deleteFriendRequest(1, 2, function(result)
    {
        console.log(result)
        assert.strictEqual(result.rowCount, 1)
        done();
    });
});