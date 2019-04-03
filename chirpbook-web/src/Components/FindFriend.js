import React, {Component} from 'react';

import {withStyles, List, Typography, TextField, Grid, TableBody, Button} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import {ListItem, ListItemAvatar, ListItemText, IconButton} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {AccountCircle, CheckCircleSharp} from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddIcon from '@material-ui/icons/Add';


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

class FindFriend extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name: '',
            users: [],
        };
        this.search = this.search.bind(this)
        this.addFriend = this.addFriend.bind(this)
    }

    handleChange = name => event =>
    {
        this.setState({[name]: event.target.value});
    };

    search(user)
    {
        let path = `/users/search/${user}`

        Auth.fetch(path, {method: 'GET'}).then((res) =>
        {
            if(res.success)
            {
                this.setState({users: res.users})
            }

        }).catch((err) => console.log(err))
    }

    addFriend(key)
    {
        var myfriend = this.state.users[key]

        let path = `/friends_requests/send/${Auth.getUser()}/${myfriend.userid}`

        Auth.fetch(path, {method: 'POST'}).then((res) =>
        {
            if(res.success)
            {
                this.props.getFriendRequests()
                this.setState({users: []})
            }

        }).catch((err) => console.log(err))
    }

    render()
    {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <Grid
                    container
                    spacing={16}
                    alignItems='center'
                    alignContent='center'
                    direction='column'
                >
                    <Grid item>
                        <TextField
                            id="standard-name"
                            label="Name"
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item>
                        <Button variant='contained' onClick={() => this.search(this.state.name)}>Search</Button>
                    </Grid>
                    <Grid item>

                        <List className={classes.root}>
                            {this.state.users.map((curRequest, key) =>
                                <React.Fragment key={'user' + key}>
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
                                            <IconButton onClick={() => this.addFriend(key)} value={key}>
                                                <AddIcon fontSize="medium" />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>

                                    {this.state.users.length - 1 == key ? null :
                                        <li>
                                            <Divider variant="inset" />
                                        </li>
                                    }
                                </React.Fragment>
                            )}
                        </List>
                    </Grid>


                </Grid>

            </React.Fragment>
        )
    }
}

export default withAuth(withStyles(styles)(FindFriend));
