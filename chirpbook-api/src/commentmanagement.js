const db = require('./config/database')

var log = require('console-log-level')({
    level: 'warn'
})

class commentmanagement
{
    static createComment(postid, parent_comment, userid, comment_text, cb)
    {
        db.connect(function(client)
        {
            client.query(
                `INSERT INTO public."Comment"
      (postid, parent_comment, userid, comment_text, deleted)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING commentid`,
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
                        //log.info(result)
                        cb(result)
                    } else
                    {
                        //log.info(`no results`)
                        cb(result)
                    }
                });
        });
    }

    static editComment(commentid, comment_text, cb)
    {

        db.connect(function(client)
        {
            client.query(
                `UPDATE public."Comment"
        SET comment_text = $2
        WHERE commentid = $1`,
                [commentid, comment_text],

                function(err, result)
                {
                    client.release()
                    if(err)
                    {
                        log.error(err)
                    }
                    if(result)
                    {
                        //console.log(result)
                        log.info(result)
                        cb(result.rowCount);
                    }
                    else
                    {
                        // log.info(`no results`)
                        cb(0);
                    }
                });
        });
    }

    static getPostComments(postid, cb)
    {
        db.connect(function(client)
        {
            client.query(`SELECT * FROM public."Comment" NATURAL JOIN public."User" WHERE postid = $1`, [postid],
                function(err, result)
                {
                    client.release()
                    if(err)
                    {
                        log.error(err)
                    }
                    log.info(result)
                    cb(result);
                }
            );
        });
    }

    static deleteComment(commentid, cb)
    {
        db.connect(function(client)
        {
            client.query(
                `UPDATE public."Comment"
        SET deleted = true, comment_text = '[Redacted]', userid = 0
        WHERE commentid = $1`,
                [commentid],

                function(err, result)
                {
                    client.release()
                    if(err)
                    {
                        log.error(err)
                    }
                    if(result)
                    {
                        //console.log(result)
                        log.info(result)
                        cb(result.rowCount);
                    }
                    else
                    {
                        // log.info(`no results`)
                        cb(0);
                    }
                });
        });
    }

}



module.exports = commentmanagement
