import React, {Component} from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import config from '../config.json';
import {AppBar, withStyles, Toolbar, Button, Typography, IconButton} from '@material-ui/core';
import AuthHelpers from '../Auth/AuthHelpers.js'
import logo from '../favicon.png';
import {Group, GroupAdd} from '@material-ui/icons';
import ProfileItem from './ProfileItem.js';

const Auth = new AuthHelpers();

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    loginBotton: {
        position: 'relative'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        float: 'right'

    },
});

class NavBar extends Component
{

    constructor()
    {
        super();
        this.state = {isAuthenticated: true, user: null, token: ''};
    }
    withStyles


    logout = () =>
    {
        Auth.logout()
        this.setState({isAuthenticated: false, token: '', user: null})
        this.props.history.replace('/login')
    };

    onFailure = (error) =>
    {
        console.log(this.state)
        console.log(error)
        console.log(config)
    };


    googleResponse = (response) =>
    {
        const token = JSON.stringify({'idToken': response.tokenId})
        const options = {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: token,
        };
        //const tokenH = r.headers.get('x-auth-token');
        fetch('http://localhost/api/v1/auth/google', options).then(r => r.json())
            .then(data =>
            {
                Auth.login(data.token, data.userid)
                this.setState({isAuthenticated: true, user: data.email, pictureLink: data.pictureLink})
                this.props.history.replace('/home')
            });

    };


    openFriendsPage = () =>
    {
        this.props.history.replace('/friends')
    }

    openFriendRequestPage = () =>
    {
        this.props.history.replace('/friend_requests')
    }

    openHomePage = () =>
    {
        this.props.history.replace('/home')
    }

    userButton = () =>
    {
        if(Auth.isLoggedIn())
        {
            Auth.logout();
            this.props.history.replace('/');
        } else
        {
            this.props.history.replace('/login');
        }
    }

    render()
    {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static"  >
                    <Toolbar>

                        <div style={{padding: 5}} onClick={this.openHomePage}>
                            <img src={logo} width="40" height="50"></img>
                        </div>
                        <Typography variant="h5" color="inherit" style={{flex: 1}}>ChirpBook</Typography>

                        <IconButton className={classes.menuButton} disabled={!this.state.isAuthenticated} onClick={this.openFriendRequestPage}>
                            <GroupAdd fontSize="large" />
                        </IconButton>

                        <IconButton className={classes.menuButton} disabled={!this.state.isAuthenticated} onClick={this.openFriendsPage}>
                            <Group fontSize="large" />
                        </IconButton>

                        <div className={classes.menuButton}>
                            {this.state.isAuthenticated ?

                                <ProfileItem history={this.props.history} user={Auth.getUser()} userButton={this.userButton.bind(this)} /> :
                                <Button type="button" className="form-submit" onClick={() => this.userButton()}>Login</Button>
                            }
                        </div>


                    </Toolbar>
                </AppBar>
            </div>
        );

    }
}

export default withStyles(styles)(NavBar);