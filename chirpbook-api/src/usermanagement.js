const db = require('./config/database')

var log = require('console-log-level')({level: 'warn'})

class UserManagement
{
    static createUser(gmail, link, cb)
    {
        db.connect(function(client)
        {
            client.query(`INSERT INTO public."User" (gmail, display_name, profile_picture)
								VALUES ($1, $2, $3) RETURNING userid`, [gmail, gmail, link],
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
            client.query(`SELECT * FROM public."User" WHERE gmail = $1`, [gmail],
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