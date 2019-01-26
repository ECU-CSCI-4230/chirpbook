const {UserManagement, assert} = require("../common");

it('test create user', function(done)
{
    UserManagement.createUser('potato@gmail.com', function(result)
    {
        console.log(result)
        assert.strictEqual(result.rowCount, 1)
        done();
    });
});

