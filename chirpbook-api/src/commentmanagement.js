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
            client.query(`SELECT public."Comment".userid, gmail, display_name, profile_picture,
            commentid, parent_comment, comment_text, time_posted, deleted, postid FROM public."Comment" NATURAL JOIN public."User" WHERE postid = $1`, [postid],
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

    static deleteComment(commentid, userid, cb)
    {
        db.connect(function(client)
        {
            client.query(
                `UPDATE public."Comment"
                SET deleted = true, comment_text = '[Redacted]', userid = 0
                WHERE commentid = $1 and userid = $2`,
                [commentid, userid],

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

    static deleteAllComments(userid, cb)
    {
        db.connect(function(client)
        {
            client.query(
                `UPDATE public."Comment"
                SET deleted = true, comment_text = '[Redacted]', userid = 0
                WHERE userid = $1`,
                [userid],

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
                        //log.info(result)
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

    static addCommentLike(commentid, userid, liketype, callback)
    {
        db.connect(function(client)
        {
            client.query(`INSERT INTO public."Comments_Like_Dislike" (commentid, userid, liketype)
								VALUES ($1, $2, $3)`, [commentid, userid, liketype],
                function(err, result)
                {

                    //console.log(result)

                    client.release()
                    if(err)
                    {
                        log.error(err)
                    }
                    if(result)
                    {
                        log.info(result)
                        callback(result.rowCount)
                    } else
                    {
                        callback(0);
                    }
                });
        });
    }



    static removeCommentLike(commentid, userid, callback)
    {
        db.connect(function(client)
        {
            client.query(`DELETE FROM public."Comments_Like_Dislike" WHERE commentid = $1 AND userid = $2`,
                [commentid, userid],
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
                        callback(result.rowCount)
                    } else
                    {
                        callback(0);
                    }
                });
        });
    }

    static editCommentLike(commentid, userid, liketype, callback)
    {
        db.connect(function(client)
        {
            client.query(`UPDATE public."Comments_Like_Dislike"
            SET liketype = $3
            WHERE commentid = $1 and userid = $2`,
                [commentid, userid, liketype],
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
                        callback(result.rowCount)
                    } else
                    {
                        callback(0);
                    }
                });
        });

    }


}



module.exports = commentmanagement
