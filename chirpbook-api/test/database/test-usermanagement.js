const {UserManagement, assert} = require("../common");

var userid;

it('test create user', function(done)
{
    UserManagement.createUser('test47@gmail.com', 'http://hasthelargehadroncolliderdestroyedtheworldyet.com/', 'test47@gmail.com', function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        userid = result.rows[0].userid
        done();
    });
});

var user2;
it('test create user2', function(done) // added by Brandon
{
    UserManagement.createUser('testme@gmail.com', 'http://hasthelargehadroncolliderdestroyedtheworldyet.com/', 'test47@gmail.com', function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        user2 = result.rows[0].userid
        done();
    });
});


it('get user', function(done)
{
    UserManagement.getUser('test47@gmail.com', function(result)
    {
        assert.strictEqual(result.length, 1)
        assert.strictEqual(result[0].gmail, 'test47@gmail.com')
        done();
    })
})

it('search user', function(done)
{
    UserManagement.searchUser('est4', userid, function(result)
    {
        // console.log(result)
        assert.strictEqual(result.length, 0)
        done();
    })
})

it('search user2', function(done) // Added by Brandon
{
    UserManagement.searchUser('est4', user2, function(result)
    {
        assert.strictEqual(result.length, 1)
        done();
    })
})

it('set link', function(done)
{
    UserManagement.updateProfilePicture(userid, 'hi', function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        done()
    })
})

it('get link', function(done)
{
    UserManagement.getProfilePicture(userid, function(result)
    {
        assert.strictEqual(result[0].profile_picture, 'hi')
        done()
    })
})


it('delete user', function(done)
{
    UserManagement.deleteUser(userid, function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        done()
    })

})

it('delete user2', function(done) // Added by Brandon
{
    UserManagement.deleteUser(user2, function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        done()
    })

})
