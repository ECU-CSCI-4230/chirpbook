const db = require('./config/database')

var log = require('console-log-level')({level: 'warn'})

class FriendManagement{

    //Creates a new friendship between 2 users and
    //adds it to the Friend table
    static createFriend(user1, user2, cb)
    {
        db.connect(function(client)
        {
            client.query(`INSERT INTO public."Friend" (user1, user2)
								VALUES ($1, $2)`, [user1, user2],
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

    //Gets all of the friends that a given user has
    static getAllFriends(userid, cb)
    {
        db.connect(function(client)
        {
            client.query(`SELECT * FROM public."Friend" 
                            WHERE user1 = $1 OR user2 = $1`, [userid],
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

    //Deletes a friendship from the Friend table
    static deleteFriend(user1, user2, cb)
    {
        db.connect(function(client)
        {
            client.query(`DELETE FROM public."Friend" 
                            WHERE user1 = $1 AND user2 = $2`, [user1, user2],
                            
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

module.exports = FriendManagement