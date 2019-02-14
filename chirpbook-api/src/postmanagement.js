const db = require('./config/database');

var log = require('console-log-level')({level: 'warn'});

class PostManagement
{

    static createPost(userid, post_text, cb)
    {
        db.connect(function(client)
        {
            client.query(`INSERT INTO public."Post" (userid, post_text)
                            VALUES ($1, $2)`, [userid, post_text],
                function(err, result)
                {
                    client.release();
                    if(err)
                    {
                        log.error(err);
                    }
                    if(result)
                    {
                        log.info(result);
                        cb(result.rowCount);
                    } else
                    {
                        cb(0);
                    }
                });
        });
    }

    static getUserPosts(userid, cb)
    {
        db.connect(function(client)
        {
            client.query(`SELECT postid, post_text, time_posted FROM public."Post"
                            WHERE userid = $1`, [userid],
                function(err, result)
                {
                    client.release();
                    if(err)
                    {
                        log.error(err);
                    }
                    if(result)
                    {
                        log.info(result);
                        cb(result);
                    } else
                    {
                        cb({rows: [], rowCount: 0});
                    }
                });
        });
    }

    static getPost(postid, cb)
    {
        db.connect(function(client)
        {
            client.query(`SELECT userid, post_text, time_posted FROM public."Post"
                            WHERE postid = $1`, [postid],
                function(err, result)
                {
                    client.release();
                    if(err)
                    {
                        log.error(err);
                    }
                    if(result)
                    {
                        log.info(result);
                        cb(result);
                    } else
                    {
                        cb({rows: [], rowCount: 0});
                    }
                });
        });
    }

    static removePost(postid, cb)
    {
        db.connect(function(client)
        {
            client.query(`UPDATE public."Post" SET post_text = '[Redacted]', userid = 0 WHERE postid = $1`, [postid],
                function(err, result)
                {
                    client.release();
                    if(err)
                    {
                        log.error(err);
                    }
                    if(result)
                    {
                        log.info(result);
                        cb(result.rowCount);
                    } else
                    {
                        cb(0);
                    }
                });
        });
    }

    static removeUserPosts(userid, cb)
    {
        db.connect(function(client)
        {
            client.query(`UPDATE public."Post" SET post_text = '[Redacted]', userid = 0 WHERE userid = $1`, [userid],
                function(err, result)
                {
                    client.release();
                    if(err)
                    {
                        log.error(err);
                    }
                    if(result)
                    {
                        log.info(result);
                        cb(result.rowCount);
                    } else
                    {
                        cb(0);
                    }
                });
        });
    }

    static editPost(postid, newText, cb)
    {
        db.connect(function(client)
        {
            client.query(`UPDATE public."Post" SET post_text = $1 WHERE postid = $2;`, [newText, postid],
                function(err, result)
                {
                    client.release();
                    if(err)
                    {
                        log.error(err);
                    }
                    if(result)
                    {
                        log.info(result);
                        cb(result.rowCount);
                    } else
                    {
                        cb(0);
                    }
                });
        });
    }

    static getPostComments(postid, cb)
    {
        db.connect(function(client)
        {
            client.query(`SELECT commentid, postid, userid, comment_text, time_posted FROM public."Comment" WHERE postid = $1`, [postid],
                function(err, result)
                {
                    client.release();
                    if(err)
                    {
                        log.error(err);
                    }
                    if(result)
                    {
                        log.info(result);
                        cb(result);
                    } else
                    {
                        cb({rows: [], rowCount: 0});
                    }
                });
        });
    }

    static getUserPosts(userid, cb)
    {
        db.connect(function(client)
        {
            client.query(`SELECT public."Post".userid, public."Post".postid, post_text, time_posted, COALESCE(likes, 0) as likes, COALESCE(dislikes,0) as dislikes
            FROM public."Post" NATURAL LEFT JOIN
            (SELECT count(liketype) as likes, postid FROM public."Like_Dislike"
              WHERE postid in (SELECT postid FROM public."Post") and liketype = 1
              GROUP BY postid
            ) as likeQuery NATURAL LEFT JOIN
            (SELECT count(liketype) as dislikes, postid FROM public."Like_Dislike"
              WHERE postid in (SELECT postid FROM public."Post") and liketype = 0
              GROUP BY postid
            ) as dislikeQuery
              WHERE userid=$1
             `, [userid],
                function(err, result)
                {
                    client.release();
                    if(err)
                    {
                        log.error(err);
                    }
                    if(result)
                    {
                        log.info(result);
                        cb(result);
                    } else
                    {
                        cb({rows: [], rowCount: 0});
                    }
                });
        });
    }

    static getFriendPosts(userid, cb)
    {
        db.connect(function(client)
        {
            client.query(`SELECT public."Post".userid, public."Post".postid, post_text, time_posted, COALESCE(likes, 0) as likes, COALESCE(dislikes,0) as dislikes FROM public."Post"
            NATURAL LEFT JOIN
            (SELECT count(liketype) as likes, postid FROM public."Like_Dislike"
              WHERE postid in (SELECT postid FROM public."Post") and liketype = 1
              GROUP BY postid
            ) as likeQuery NATURAL LEFT JOIN
            (SELECT count(liketype) as dislikes, postid FROM public."Like_Dislike"
              WHERE postid in (SELECT postid FROM public."Post") and liketype = 0
              GROUP BY postid
            ) as dislikeQuery
              WHERE userid in ((SELECT user2 as user FROM public."Friend" WHERE user1 = $1)
                      UNION (SELECT user1 as user FROM public."Friend" WHERE user2 = $1)) or userid = $1

             `, [userid],
                function(err, result)
                {
                    client.release();
                    if(err)
                    {
                        log.error(err);
                    }
                    if(result)
                    {
                        log.info(result);
                        cb(result);
                    } else
                    {
                        cb({rows: [], rowCount: 0});
                    }
                });
        });
    }

}

module.exports = PostManagement;