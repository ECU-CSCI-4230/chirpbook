const db = require('../src/config/database');
const fs = require('fs');
const assert = require('assert');
const TIMEOUT_TIME = 3000;

const UserManagement = require('../src/usermanagement');
const FriendRequestManagement = require('../src/friendrequestmanagement');
const LikeManagement = require('../src/likemanagement');
const PostManagement = require('../src/postmanagement');
const CommentManagement = require('../src/commentmanagement.js');
const FriendManagement = require('../src/friendmanagement.js');

module.exports = {
  db,
  fs,
  assert,
  TIMEOUT_TIME,
  UserManagement,
  FriendRequestManagement,
  LikeManagement,
  PostManagement,
  CommentManagement,
  FriendManagement
};
