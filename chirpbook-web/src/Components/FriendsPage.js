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
    }

    updateFriendsPage()
    {
        let path = `/friends/${this.state.userid}`
        console.log(path)
        Auth.fetch(path, {method: 'GET'}).then((res) =>
        {
            if(res.friends_list)
            {
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
    }

    render()
    {
        const {classes} = this.props;

        return (
            <List className={classes.root}>
                {this.state.friends.map((curFriend, key) =>
                    <React.Fragment key={'friend' + key}>
                        {curFriend.user1 == this.state.userid ?
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
                        :
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
                                            {curFriend.gmail1}
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
                        }

                        {console.log(this.state.friends.length >= key - 1)}
                        
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