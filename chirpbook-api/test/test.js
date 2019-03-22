var common = require("./common");

const {TIMEOUT_TIME} = common;
function importTest(name, path)
{

    describe(name, function()
    {
        require(path);
    });
}

describe.skip("Database", function()
{
    this.timeout(TIMEOUT_TIME);

    beforeEach(function()
    {

    });

    importTest("UserManagement", './database/test-usermanagement');
    importTest("FriendRequestManagement", './database/test-friendrequestmanagement');
    importTest("LikeManagement", './database/test-likemanagement');
    importTest("PostManagement", './database/test-postmanagement');
    importTest("CommentManagement", './database/test-commentmanagement.js');
    importTest("FriendManagement", './database/test-friendmanagement.js');

    after(function()
    {

    });
});

describe("API", function()
{
    this.timeout(TIMEOUT_TIME)

    beforeEach(function()
    {

    })

    importTest("test-login", "./api/test-login")
    importTest("accounts", './api/test-accounts')
    importTest("posts", "./api/test-posts")
    importTest("comments", './api/test-comments')
    importTest("likes/dislikes", './api/test-likes-dislikes')
    importTest("friendrequests", './api/test-friendrequests')
    importTest("friends", './api/test-friends')

    after(function()
    {

    })
})
