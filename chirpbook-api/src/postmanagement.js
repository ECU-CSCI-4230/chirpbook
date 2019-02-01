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
            client.query(`DELETE FROM public."Post" WHERE postid = $1`, [postid],
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

}

module.exports = PostManagement;