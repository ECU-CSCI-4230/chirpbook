import React, {Component} from 'react';

import {withStyles, List, Typography} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import {ListItem, ListItemAvatar, ListItemText, IconButton} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {AccountCircle, CheckCircleSharp} from '@material-ui/icons';
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

class FriendRequestPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            userid: Auth.getUser(),
            friends: [],
            incomingRequests: [],
            outgoingRequests: []
        };
        this.getFriendRequests = this.getFriendRequests.bind(this);
        this.deleteIncomingFriendRequest = this.deleteIncomingFriendRequest.bind(this)
        this.deleteOutgoingFriendRequest = this.deleteOutgoingFriendRequest.bind(this)
        this.acceptRequest = this.acceptRequest.bind(this)
    }

    getFriendRequests()
    {
        // TODO have loggedin user always be user 1
        let path = `/friends_requests/${this.state.userid}`
        Auth.fetch(path, {method: 'GET'}).then((res) =>
        {
            this.setState({
                incomingRequests: res.incoming_requests,
                outgoingRequests: res.outgoing_requests
            });

        }).catch((error) => console.log(error));
    }

    componentWillMount()
    {
        this.getFriendRequests();
    }


    deleteIncomingFriendRequest(event)
    {
        var sender = this.state.incomingRequests[event.target.value].sender
        var receiver = this.state.incomingRequests[event.target.value].receiver

        let path = `/friends_requests/reject/${sender}/${receiver}`

        var newIncoming = [...this.state.incomingRequests]

        newIncoming.splice(event.target.value, 1)

        Auth.fetch(path, {method: 'POST'}).then((res) =>
        {
            if(res.success)
            {
                this.setState({incomingRequests: newIncoming})
            }

        })
    }

    deleteOutgoingFriendRequest(event)
    {
        var sender = this.state.outgoingRequests[event.target.value].sender
        var receiver = this.state.outgoingRequests[event.target.value].receiver

        let path = `/friends_requests/reject/${sender}/${receiver}`

        var newIncoming = [...this.state.outgoingRequests]

        newIncoming.splice(event.target.value, 1)

        Auth.fetch(path, {method: 'POST'}).then((res) =>
        {
            if(res.success)
            {
                this.setState({outgoingRequests: newIncoming})
            }

        })
    }

    acceptRequest(event)
    {
        event.persist()
        var curRequest = this.state.incomingRequests[event.target.value]
        var user1 = curRequest.sender
        var user2 = curRequest.receiver

        let path = `/friends/add/${user1}/${user2}`

        Auth.fetch(path, {method: 'POST'}).then((res) =>
        {
            if(res.success)
            {
                this.deleteIncomingFriendRequest(event)
            }

        })
    }

    render()
    {
        const {classes} = this.props;
        return (
            <React.Fragment>
                {this.state.incomingRequests.length == 0 ? null :
                    <div style={{padding: 15}}>
                        <Typography variant='h4' align='center'>Incoming Friend Requests</Typography>
                    </div>
                }
                <List className={classes.root}>
                    {this.state.incomingRequests.map((curRequest, key) =>
                        <React.Fragment key={'friend' + key}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar className={classes.icon} children={IconButton} >
                                    <Avatar src={curRequest.profile_picture}>
                                        <AccountCircle />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    disableTypography
                                    primary={
                                        <React.Fragment>
                                            <Typography inline className={classes.user} color="textPrimary" >
                                                {curRequest.display_name}
                                            </Typography>
                                            <Typography component="span" inline color="textSecondary">
                                                {curRequest.gmail}
                                            </Typography>

                                        </React.Fragment>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={this.acceptRequest} value={key}>
                                        <CheckCircleSharp fontSize="medium" />
                                    </IconButton>
                                    <IconButton aria-label="Delete" onClick={this.deleteIncomingFriendRequest} value={key}>
                                        <DeleteIcon fontSize="medium" />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>

                            {this.state.incomingRequests.length - 1 == key ? null :
                                <li>
                                    <Divider variant="inset" />
                                </li>
                            }
                        </React.Fragment>
                    )}
                </List>

                {this.state.outgoingRequests.length == 0 ? null :
                    <div style={{padding: 15}}>
                        <Typography variant='h4' align='center'>Outgoing Friend Requests</Typography>
                    </div>
                }
                <List className={classes.root}>
                    {this.state.outgoingRequests.map((curRequest, key) =>
                        <React.Fragment key={'friend' + key}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar className={classes.icon} children={IconButton} >
                                    <Avatar src={curRequest.profile_picture}>
                                        <AccountCircle />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    disableTypography
                                    primary={
                                        <React.Fragment>
                                            <Typography inline className={classes.user} color="textPrimary" >
                                                {curRequest.display_name}
                                            </Typography>
                                            <Typography component="span" inline color="textSecondary">
                                                {curRequest.gmail}
                                            </Typography>

                                        </React.Fragment>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Delete" onClick={this.deleteOutgoingFriendRequest} value={key}>
                                        <DeleteIcon fontSize="medium" />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>

                            {this.state.outgoingRequests.length - 1 == key ? null :
                                <li>
                                    <Divider variant="inset" />
                                </li>
                            }
                        </React.Fragment>
                    )}
                </List>
            </React.Fragment>
        );

    }
}

export default withAuth(withStyles(styles)(FriendRequestPage));