const express = require('express');

const app = express();
app.set('port', process.env.PORT || 80);


// This is the main function, essentially.
app.listen(app.get('port'), function()
{
    console.log('listening on port ' + app.get('port'));
});
