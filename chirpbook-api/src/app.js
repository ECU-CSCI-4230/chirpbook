const express = require('express');
const cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 80);

app.use(cors());

const base_url = '/api/v1';
app.use(base_url, require('./routes/passport'));
app.use(base_url, require('./routes/accounts'));
app.use(base_url, require('./routes/getcomments'));
app.use(base_url, require('./routes/likes-dislikes'))
app.use(base_url, require('./routes/friendrequests'));
app.use(base_url, require('./routes/posts'));
app.use(base_url, require('./routes/comments'));
app.use(base_url, require('./routes/friends'));
app.use(base_url, require('./routes/search-users')) // Recently added: Brandon

// This is the main function, essentially.
app.listen(app.get('port'), function()
{
    console.log('listening on port ' + app.get('port'));
});
