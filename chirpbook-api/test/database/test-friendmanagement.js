const {FriendRequestManagement, UserManagement, FriendManagement, assert} = require("../common");

var userid;
var userid2;

it('test create user', function(done)
{
    UserManagement.createUser('test@gmail.com','http://hasthelargehadroncolliderdestroyedtheworldyet.com/', function(result)
    {
        userid = result.rows[0].userid
        done();
    });
});

it('test create user2', function(done)
{
    UserManagement.createUser('test2@gmail.com','http://hasthelargehadroncolliderdestroyedtheworldyet.com/', function(result)
    {
        userid2 = result.rows[0].userid
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

it('test get all friends', function(done)
{
    FriendManagement.getAllFriends(userid, function(result)
    {
        assert.strictEqual(result.rowCount, 1)
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

it('delete user', function(done){
    UserManagement.deleteUser(userid, function(result){
        done()
    })  
})

it('delete user2', function(done){
    UserManagement.deleteUser(userid2, function(result){
        done()
    })  
})