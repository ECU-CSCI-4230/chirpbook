const express = require('express');
const cors = require('cors');
const passport = require('passport');

const app = express();

app.set('port', process.env.PORT || 80);

app.use(cors());

//app.use(passport.initialize());

const base_url = '/api/v1';

app.use(base_url, require('./routes/accounts'));
app.use(base_url, require('./routes/likes-dislikes'))
app.use(base_url, require('./routes/friendrequests'));
app.use(base_url, require('./routes/posts'));
app.use(base_url, require('./routes/comments'));

// This is the main function, essentially.
app.listen(app.get('port'), function()
{
    console.log('listening on port ' + app.get('port'));
});
