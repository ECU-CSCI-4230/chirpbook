const {UserManagement, assert} = require("../common");

var userid;

it('test create user', function(done)
{
    UserManagement.createUser('test47@gmail.com','http://hasthelargehadroncolliderdestroyedtheworldyet.com/', function(result)
    {
        assert.strictEqual(result.rowCount, 1)
        userid = result.rows[0].userid
        done();
    });
});

it('get user', function(done){
    UserManagement.getUser('test47@gmail.com', function(result){
        assert.strictEqual(result.length, 1)
        assert.strictEqual(result[0].gmail, 'test47@gmail.com')
        done();
    })
})

it('set link', function(done){
    UserManagement.updateProfilePicture(userid, 'hi', function(result){
        assert.strictEqual(result.rowCount, 1)
        done()
    })
})

it('delete user', function(done){
    UserManagement.deleteUser(userid, function(result){
        assert.strictEqual(result.rowCount, 1)
        done()
    })
    
})
