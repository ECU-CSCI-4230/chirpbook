const db = require('./config/database');

var log = require('console-log-level')({level: 'warn'});

class PostManagement
{

    static createPost(userid, post_text, cb)
    {
        db.connect(function(client)
        {
            client.query(`INSERT INTO public."Post" (userid, post_text)
                            VALUES ($1, $2) returning postid`, [userid, post_text],
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
                        cb(result);
                    }
                });
        });
    }

    static getPost(postid, gmail, cb)
    {
        db.connect(function(client)
        {
            client.query(`SELECT public."Post".userid,  gmail, display_name, profile_picture, public."Post".postid, post_text, time_posted, COALESCE(likes, 0) as likes, COALESCE(dislikes,0) as dislikes, COALESCE(isLiked, false) as isLiked,COALESCE(isDisliked, false) as isDisliked
            FROM public."Post" NATURAL LEFT JOIN
            (SELECT count(liketype) as likes, postid FROM public."Like_Dislike"
              WHERE postid = $1 and liketype = 1
              GROUP BY postid
            ) as likeQuery NATURAL LEFT JOIN
            (SELECT count(liketype) as dislikes, postid FROM public."Like_Dislike"
              WHERE postid = $1 and liketype = 0
              GROUP BY postid
            ) as dislikeQuery
            NATURAL LEFT JOIN (SELECT postid, CASE liketype WHEN 0 THEN true END AS isDisliked FROM public."Like_Dislike" NATURAL JOIN public."User" WHERE gmail = $2 ) as getIsLiked
            NATURAL LEFT JOIN (SELECT postid, CASE liketype WHEN 1 THEN true END AS isLiked FROM public."Like_Dislike" NATURAL JOIN public."User" WHERE gmail = $2 ) as getIsDisliked
            NATURAL LEFT JOIN public."User"
            WHERE public."Post".postid = $1`, [postid, gmail],
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

    static removePost(postid, userid, cb)
    {
        db.connect(function(client)
        {
            client.query(`delete from public."Post" WHERE postid = $1 and (userid = $2 or userid = 0)`, [postid, userid],
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

                    }
                    cb(result);
                });
        });
    }

    static removeUserPosts(userid, cb)
    {
        db.connect(function(client)
        {
            client.query(`delete from public."Post" WHERE userid = $1`, [userid],
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
            client.query(`SELECT public."Comment".userid, gmail, display_name, profile_picture,
                        commentid, parent_comment, comment_text, time_posted, deleted
                        FROM public."Comment" NATURAL JOIN public."User" WHERE postid = $1`, [postid],
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
            client.query(`SELECT display_name, profile_picture, public."Post".userid, public."Post".postid, post_text, time_posted, COALESCE(likes, 0) as likes, COALESCE(dislikes,0) as dislikes, gmail, COALESCE(isLiked, false) as isLiked,COALESCE(isDisliked, false) as isDisliked
                FROM public."Post" NATURAL LEFT JOIN
                (SELECT count(liketype) as likes, postid FROM public."Like_Dislike"
                WHERE postid in (SELECT postid FROM public."Post") and liketype = 1
                GROUP BY postid
                ) as likeQuery NATURAL LEFT JOIN
                (SELECT count(liketype) as dislikes, postid FROM public."Like_Dislike"
                WHERE postid in (SELECT postid FROM public."Post") and liketype = 0
                GROUP BY postid
                ) as dislikeQuery
                NATURAL LEFT JOIN (SELECT postid, CASE liketype WHEN 0 THEN true END AS isDisliked FROM public."Like_Dislike" NATURAL JOIN public."User" WHERE userid = $1 ) as getIsLiked
                NATURAL LEFT JOIN (SELECT postid, CASE liketype WHEN 1 THEN true END AS isLiked FROM public."Like_Dislike" NATURAL JOIN public."User" WHERE userid = $1 ) as getIsDisliked
                NATURAL JOIN public."User"
                WHERE userid = $1
                ORDER BY time_posted DESC
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
                    }
                    cb(result);
                });
        });
    }

    static getFriendPosts(email, cb)
    {
        db.connect(function(client)
        {
            client.query(`SELECT display_name, profile_picture, public."Post".userid, public."Post".postid, post_text, time_posted, COALESCE(likes, 0) as likes, COALESCE(dislikes,0) as dislikes, gmail,
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

    static createTag(postid, tag_text, cb)
    {
        db.connect(function(client)
        {
            client.query(`INSERT INTO public."Tag" (postid, tag)
                            VALUES ($1, $2)`, [postid, tag_text],
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

    static createTags(postid, tagArray, cb)
    {
        if(tagArray.length == 0)
        {
            cb(true)
        }
        else
        {
            db.connect(function(client)
            {
                client.query("BEGIN", function(err, res)
                {
                    if(err)
                    {
                        log.error(err);
                    }
                    else
                    {
                        for(var i = 0; i < tagArray.length; ++i)
                        {
                            client.query(`INSERT INTO public."Tag" (postid, tag)
                                            VALUES ($1, $2)`, [postid, tagArray[i]]);
                        }
                    }
                    client.query("COMMIT");
                    client.release();
                    if(err)
                    {
                        cb(false);
                    }
                    else
                    {
                        cb(true)
                    }
                });
            });
        }
    }

    static removeTags(postid, cb)
    {
        db.connect(function(client)
        {
            client.query(`delete from public."Tag" WHERE postid = $1`, [postid],
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

                    }
                    cb(result);
                });
        });
    }

    //userid is the logged in users id
    //only posts with a tag of tag_text will be retreived
    static getPostsWithTag(userid, tag_text, cb)
    {
        db.connect(function(client)
        {
            client.query(`SELECT display_name, profile_picture, public."Post".userid, public."Post".postid, post_text, tag, time_posted, COALESCE(likes, 0) as likes, COALESCE(dislikes,0) as dislikes, gmail, COALESCE(isLiked, false) as isLiked,COALESCE(isDisliked, false) as isDisliked
                FROM public."Post" NATURAL LEFT JOIN
                (SELECT count(liketype) as likes, postid FROM public."Like_Dislike"
                WHERE postid in (SELECT postid FROM public."Post") and liketype = 1
                GROUP BY postid
                ) as likeQuery NATURAL LEFT JOIN
                (SELECT count(liketype) as dislikes, postid FROM public."Like_Dislike"
                WHERE postid in (SELECT postid FROM public."Post") and liketype = 0
                GROUP BY postid
                ) as dislikeQuery
                NATURAL LEFT JOIN (SELECT postid, CASE liketype WHEN 0 THEN true END AS isDisliked FROM public."Like_Dislike" NATURAL JOIN public."User" WHERE userid = $1 ) as getIsLiked
                NATURAL LEFT JOIN (SELECT postid, CASE liketype WHEN 1 THEN true END AS isLiked FROM public."Like_Dislike" NATURAL JOIN public."User" WHERE userid = $1 ) as getIsDisliked
                NATURAL LEFT JOIN public."Tag"
                NATURAL JOIN public."User"
                WHERE tag = $2
                ORDER BY time_posted DESC`, [userid, tag_text],
                function(err, result)
                {
                    client.release();
                    if(err)
                    {
                        log.error(err);
                    }
                    if(result)
                    {
                        log.info(result.rows);
                        cb(result.rows)
                    }
                    else
                    {
                        log.info(`no results`)
                        cb([])
                    }
                });
        });
    }

    //gets all posts with tag like tag_text
    static searchTag(userid, tag_text, cb)
    {
        db.connect(function(client)
        {
            var tag = '%' + tag_text + '%'
            client.query(`SELECT display_name, profile_picture, public."Post".userid, public."Post".postid, post_text, tag, time_posted, COALESCE(likes, 0) as likes, COALESCE(dislikes,0) as dislikes, gmail, COALESCE(isLiked, false) as isLiked,COALESCE(isDisliked, false) as isDisliked
            FROM public."Post" NATURAL LEFT JOIN
            (SELECT count(liketype) as likes, postid FROM public."Like_Dislike"
            WHERE postid in (SELECT postid FROM public."Post") and liketype = 1
            GROUP BY postid
            ) as likeQuery NATURAL LEFT JOIN
            (SELECT count(liketype) as dislikes, postid FROM public."Like_Dislike"
            WHERE postid in (SELECT postid FROM public."Post") and liketype = 0
            GROUP BY postid
            ) as dislikeQuery
            NATURAL LEFT JOIN (SELECT postid, CASE liketype WHEN 0 THEN true END AS isDisliked FROM public."Like_Dislike" NATURAL JOIN public."User" WHERE userid = $1 ) as getIsLiked
            NATURAL LEFT JOIN (SELECT postid, CASE liketype WHEN 1 THEN true END AS isLiked FROM public."Like_Dislike" NATURAL JOIN public."User" WHERE userid = $1 ) as getIsDisliked
            NATURAL LEFT JOIN public."Tag"
            NATURAL JOIN public."User"
            WHERE tag ILIKE $2
            ORDER BY time_posted DESC`, [userid, tag],
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
                        cb(result.rows)
                    }
                    else
                    {
                        log.info(`no results`)
                        cb([])
                    }
                });
        });
    }



}

module.exports = PostManagement;
