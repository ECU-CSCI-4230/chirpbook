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

    static getFriendPosts(email, cb)
    {
        db.connect(function(client)
        {
            client.query(`SELECT display_name, public."Post".userid, public."Post".postid, post_text, time_posted, COALESCE(likes, 0) as likes, COALESCE(dislikes,0) as dislikes, gmail,
            COALESCE(isLiked, false) as isLiked,COALESCE(isDisliked, false) as isDisliked
                FROM public."Post" NATURAL LEFT JOIN
                (SELECT count(liketype) as likes, postid FROM public."Like_Dislike"
                WHERE postid in (SELECT postid FROM public."Post") and liketype = 1
                GROUP BY postid
                ) as likeQuery NATURAL LEFT JOIN
                (SELECT count(liketype) as dislikes, postid FROM public."Like_Dislike"
                WHERE postid in (SELECT postid FROM public."Post") and liketype = 0
                GROUP BY postid
                ) as dislikeQuery
                NATURAL LEFT JOIN (SELECT postid, CASE liketype WHEN 0 THEN true END AS isDisliked FROM public."Like_Dislike" NATURAL JOIN public."User" WHERE gmail = $1 ) as getIsLiked
                NATURAL LEFT JOIN (SELECT postid, CASE liketype WHEN 1 THEN true END AS isLiked FROM public."Like_Dislike" NATURAL JOIN public."User" WHERE gmail = $1 ) as getIsDisliked
                NATURAL JOIN public."User"
                WHERE userid in ((SELECT user2 as user FROM public."Friend" NATURAL JOIN (SELECT gmail, userid as user1 FROM public."User") as user2Gen WHERE gmail = $1)
                UNION (SELECT user1 as user FROM public."Friend" NATURAL JOIN (SELECT gmail, userid as user2 FROM public."User") as user1Gen WHERE gmail = $1)) or gmail = $1
                ORDER BY time_posted DESC
             `, [email],
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