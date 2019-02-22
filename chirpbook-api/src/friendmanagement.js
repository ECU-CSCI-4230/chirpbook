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
            client.query(`Select user1, user2, User1.gmail as gmail1, User1.display_name as display_name1, 
                User1.profile_picture as profile_picture1,
                User2.gmail as gmail2, User2.display_name as display_name2, User2.profile_picture as profile_picture2
                From public."Friend" full outer join public."User" as User1
                on user1 = User1.userid
                full outer join public."User" as User2
                on user2 = User2.userid
                where user1 = $1 or user2 = $1`, [userid],
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