const db = require('../src/config/database');
const fs = require('fs');
const assert = require('assert');
const TIMEOUT_TIME = 3000;

const UserManagement = require('../src/usermanagement');

module.exports = {
    db,
    fs,
    assert,
    TIMEOUT_TIME,
    UserManagement,
};