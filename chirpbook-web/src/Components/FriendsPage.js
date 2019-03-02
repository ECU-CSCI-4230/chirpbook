import React, {Component} from 'react';

import {withStyles, List, Typography} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import {ListItem, ListItemAvatar, ListItemText, IconButton} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {AccountCircle} from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


import AuthHelpers from '../Auth/AuthHelpers.js'
import withAuth from '../Auth/withAuth';

const Auth = new AuthHelpers();

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '50vw',
        marginTop: '10px',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: theme.palette.background.paper,
    },
    friendText: {
        padding: '10px'
    },
    icon: {
        marginBottom: 'auto',
        marginTop: '0px',
        padding: '0px',
    },
    user: {
        fontWeight: 'bold',
        marginRight: '.5rem',
        paddingTop: '100px',

    },
});

//TODO: setup delete buttons

class FriendsPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            userid: Auth.getUser(),
            friends: []};
        this.updateFriendsPage = this.updateFriendsPage.bind(this);
        this.deleteFriend = this.deleteFriend.bind(this)
    }

    updateFriendsPage()
    {
        // TODO have loggedin user always be user 1 
        let path = `/friends/${this.state.userid}`
        console.log(path)
        Auth.fetch(path, {method: 'GET'}).then((res) =>
        {
            //ensure that loggedin user is user 1
            if(res.friends_list)
            {
                for(var i = 0; i < res.friends_list.length; i++){
                    var f = res.friends_list[i]
                    //swap
                    if(f.user1 != this.state.userid){
                        var tempUser = f.user1
                        var tempPic = f.profile_picture1
                        var tempGmail = f.gmail1
                        var tempDisplayName = f.display_name1

                        f.user1 = f.user2
                        f.profile_picture1 = f.profile_picture2
                        f.gmail1 = f.gmail2
                        f.display_name1 = f.display_name2

                        f.user2 = tempUser
                        f.profile_picture2 = tempPic
                        f.gmail2 = tempGmail
                        f.display_name2 = tempDisplayName
                    }
                }
                this.setState({
                    friends: res.friends_list
                });
            }
        }).catch((error) => console.log(error));
    }

    componentWillMount()
    {
        this.updateFriendsPage();
    }


    deleteFriend(event)
    {
        console.log('delete')
        console.log(event.target.value)
        console.log(this.state.userid)
        var curUser = this.state.userid
        var userToDelete = this.state.friends[event.target.value].user2
        
        var path
        if(userToDelete < curUser){
            path = `/friends/remove/${userToDelete}/${curUser}`
        }else{
            path = `/friends/remove/${curUser}/${userToDelete}`
        }

        console.log(path)
        var newFriends = [...this.state.friends]

        newFriends.splice(event.target.value, 1)
        
        Auth.fetch(path, {method: 'POST'}).then((res) =>
        {
            if(res.success){
                this.setState({friends: newFriends})
            }
            
        })
    }

    render()
    {
        const {classes} = this.props;

        return (
            <List className={classes.root}>
                {this.state.friends.map((curFriend, key) =>
                    <React.Fragment key={'friend' + key}>
                        <ListItem alignItems="flex-start">
                        <ListItemAvatar className={classes.icon} children={IconButton} >
                            <Avatar>
                                {/* TODO make this the user's profile picture  */}
                                <AccountCircle />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            disableTypography
                            primary={
                                <React.Fragment>
                                    <Typography inline className={classes.user} color="textPrimary" >
                                        {curFriend.gmail2}
                                    </Typography>
    
                                </React.Fragment>
                            }
                        />
                        <ListItemSecondaryAction>
                            <IconButton aria-label="Delete" onClick={this.deleteFriend} value={key}>
                                <DeleteIcon fontSize="medium"/>
                            </IconButton>
                        </ListItemSecondaryAction>
                        </ListItem>
                        
                        {this.state.friends.length - 1 == key ? null : 
                            <li>
                                <Divider variant="inset" />
                            </li>
                        }
                    </React.Fragment>
                )}
            </List>
        );

    }
}

export default withAuth(withStyles(styles)(FriendsPage));