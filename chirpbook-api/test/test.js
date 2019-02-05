var common = require("./common");

const {TIMEOUT_TIME} = common;
function importTest(name, path)
{

    describe(name, function()
    {
        require(path);
    });
}

describe("Database", function()
{
    this.timeout(TIMEOUT_TIME);

    beforeEach(function()
    {

    });

    importTest("UserManagement", './database/test-usermanagement');
    importTest("commentmanagement", './database/test-commentmanagement');
    
    after(function()
    {

    });
});