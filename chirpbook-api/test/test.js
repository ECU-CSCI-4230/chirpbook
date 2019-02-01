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
    importTest("FriendRequestManagement", './database/test-friendrequestmanagement');
    importTest("LikeManagement", './database/test-likemanagement');

    after(function()
    {

    });
});
