const exec = require('child_process').exec;

const express = require('express');
const app = express();

module.exports.execute = function(cmd, cb) 
{
    exec(cmd, cb);
}
