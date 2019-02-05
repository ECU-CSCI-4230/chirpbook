const db = require('./config/database')

var log = require('console-log-level')({level: 'warn'})

class commentmanagement
{
    static createComment(postid, parent_comment, userid, comment_text, cb)
    {
        db.connect(function(client)
        {
            client.query(`INSERT INTO public."Comment" (postid, parent_comment, userid, comment_text, deleted) VALUES ($1, $2, $3, $4, $5) RETURNING commentid`, 
            [postid, parent_comment, userid, comment_text, false],
                function(err, result)
                {
                    client.release()
                    if(err)
                    {
                        log.error(err)
                    }
                    if(result)
                    {
                        log.info(result)
                        cb(result)
                    }
                    else
                    {
                        log.info(`no results`)
                        cb({rowCount: 0})
                    }
                });
        });
    }

}

module.exports = commentmanagement