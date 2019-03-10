const db = require('./config/database')

var log = require('console-log-level')({level: 'warn'})

class FriendRequestManagement
{
    //Creates a friend request between 2 users
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

    //Deletes a friend request between 2 users
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

    //Gets all friend requests sent to a given user
    static getIncomingFriendRequests(userid, cb)
    {
        db.connect(function(client)
        {
            client.query(`SELECT * FROM public."Friend_Request" full outer join public."User"
                on sender = userid 
                WHERE receiver = $1`, [userid],
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

    //Gets all friend requests sent by a given user
    static getOutgoingFriendRequests(userid, cb)
    {
        db.connect(function(client)
        {
            client.query(`SELECT * FROM public."Friend_Request" full outer join public."User" 
                on receiver = userid
                WHERE sender = $1`, [userid],
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