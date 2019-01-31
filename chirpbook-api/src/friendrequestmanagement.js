const db = require('./config/database')

var log = require('console-log-level')({level: 'warn'})

class FriendRequestManagement
{
    static createFriendRequest(initiator, receiver, cb)
    {
        db.connect(function(client)
        {
            client.query(`INSERT INTO public."Friend_Request" (sender, receiver)
								VALUES ($1, $2)`, [initiator, receiver],
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

    static deleteFriendRequest(init, reci, cb)
    {
        db.connect(function(client)
        {
            client.query(`DELETE FROM public."Friend_Request" WHERE sender = $1 AND 
                            receiver = $2`, [init, reci],
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

module.exports = FriendRequestManagement