const db = require('./config/database')

var log = require('console-log-level')({level: 'warn'})

class LikeManagement
{
    static addLike(postid, userid, liketype, callback)
    {
        db.connect(function(client)
        {
            client.query(`INSERT INTO public."Like_Dislike" (postid, userid, liketype)
								VALUES ($1, $2, $3)`, [postid, userid, liketype],
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



    static removeLike(postid, userid, callback)
    {
        db.connect(function(client)
        {
            client.query(`DELETE FROM public."Like_Dislike" WHERE postid = $1 AND userid = $2`,
                [postid, userid],
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

    static editLike(postid, userid, liketype, callback)
    {
        db.connect(function(client)
        {
            client.query(`UPDATE public."Like_Dislike"
            SET liketype = $3
            WHERE postid = $1 and userid = $2`,
                [postid, userid, liketype],
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

module.exports = LikeManagement