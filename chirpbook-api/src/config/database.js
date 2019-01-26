// PostgreSQL library
const Pool = require('pg-pool');

// Handles routing
const express = require('express');
const app = express();
const router = express.Router();

app.set('db_host', process.env.DB_HOST || 'cbook_database');
app.set('db_user', process.env.DB_USER ||'postgres');
app.set('db', process.env.DB || 'cbook');
app.set('db_pw', process.env.DB_PW || 'password');
app.set('db_port', process.env.DB_PORT || 5432);

const Connection =
{
	user: app.get('db_user'),
	host: app.get('db_host'),
	database: app.get('db'),
	password: app.get('db_pw'),
	port: app.get('db_port'),
};

var pool = new Pool(Connection);

module.exports.con = Connection;

module.exports.connect = function(cb)
{
	pool.connect((err, client, done) =>
	{
		if (err)
		{
			console.error('Connection Failed', err);
		}
		else
		{
			cb(client, err);
		}
	});
};