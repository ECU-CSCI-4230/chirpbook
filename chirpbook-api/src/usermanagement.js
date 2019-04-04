const db = require('./config/database')

var log = require('console-log-level')({level: 'warn'})

class UserManagement
{
    static createUser(gmail, link, display_name, cb)
    {
        db.connect(function(client)
        {
            client.query(`INSERT INTO public."User" (gmail, display_name, profile_picture, pw_hash, salt)
								VALUES ($1, $2, $3, ' ', ' ') RETURNING userid`, [gmail, display_name, link],
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

    static getUser(gmail, cb)
    {
        db.connect(function(client)
        {
            client.query(`SELECT userid, gmail, display_name, profile_picture FROM public."User" WHERE gmail = $1`, [gmail],
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

    static getUserDetails(userid, cb)
    {
        db.connect(function(client)
        {
            client.query(`SELECT userid, gmail, display_name, profile_picture FROM public."User" WHERE userid = $1`, [userid],
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

    static getProfilePicture(userid, cb)
    {
        db.connect(function(client)
        {
            client.query(`SELECT profile_picture FROM public."User" WHERE userid = $1`, [userid],
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

    static searchUser(gmail, cb)
    {
        db.connect(function(client)
        {
            var mail = '%' + gmail + '%'
            client.query(`SELECT userid, gmail, display_name, profile_picture FROM public."User" WHERE gmail ILIKE $1 and userid != 0`, [mail],
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

    static deleteUser(userid, cb)
    {
        db.connect(function(client)
        {
            client.query(`delete FROM public."User" WHERE userid=$1`, [userid],
                function(err, result)
                {
                    client.release()
                    if(err)
                    {
                        log.error(err)
                        cb({rowCount: 0})
                    }
                    cb({rowCount: result.rowCount})
                });
        });
    }

    static updateProfilePicture(userid, link, cb)
    {
        db.connect(function(client)
        {
            client.query(`update public."User" set profile_picture = $2 WHERE userid = $1`, [userid, link],
                function(err, result)
                {
                    client.release()
                    if(err)
                    {
                        log.error(err)
                        cb({rowCount: 0})
                    }
                    cb({rowCount: result.rowCount})
                });
        });
    }

    static setDisplayName(userid, name, cb)
    {
        db.connect(function(client)
        {
            client.query(`update public."User" set display_name = $2 WHERE userid = $1`, [userid, name],
                function(err, result)
                {
                    //console.log(result)
                    client.release()
                    if(err)
                    {
                        log.error(err)
                        cb({rowCount: 0})
                    }
                    cb({rowCount: result.rowCount})
                });
        });
    }


}

module.exports = UserManagement
