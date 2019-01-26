const db = require('./config/database')

var log = require('console-log-level')({level: 'warn'})

class UserManagement
{
    static createUser(gmail, cb)
    {
        db.connect(function(client)
        {
            client.query(`INSERT INTO public."User" (gmail, display_name, profile_picture)
								VALUES ($1, $2, $3) RETURNING userid`, [gmail, gmail, 'TEST'],
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

module.exports = UserManagement