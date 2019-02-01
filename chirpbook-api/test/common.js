const db = require('../src/config/database');
const fs = require('fs');
const assert = require('assert');
const TIMEOUT_TIME = 3000;

const UserManagement = require('../src/usermanagement');
const FriendRequestManagement = require('../src/friendrequestmanagement');
const LikeManagement = require('../src/likemanagement');

module.exports = {
    db,
    fs,
    assert,
    TIMEOUT_TIME,
    UserManagement,
    FriendRequestManagement,
    LikeManagement,
};
