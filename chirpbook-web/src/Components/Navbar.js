import React, {Component} from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import config from '../config.json';
import {AppBar, withStyles, Toolbar, Button} from '@material-ui/core';
import AuthHelpers from '../Auth/AuthHelpers.js'

const Auth = new AuthHelpers();

const styles = theme => ({

});

class NavBar extends Component
{

    constructor()
    {
        super();
        this.state = {isAuthenticated: Auth.isLoggedIn(), user: null, token: ''};
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
        alert('error');
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

    openTestPage = () => {
        this.props.history.replace('/test')
    }
    
    render()
    {
        const {classes} = this.props;
        return (
            <AppBar position="static"  >
                <Toolbar>

                    {
                        !!this.state.isAuthenticated ?

                            <Button variant="contained" color="secondary" onClick={this.logout}>
                            Logout
                            </Button>
                            :
                            <GoogleLogin
                                clientId={config.GOOGLE_CLIENT_ID}
                                buttonText="Login"
                                onSuccess={this.googleResponse}
                                onFailure={this.onFailure}
                            />
                    }
                    <Button variant="contained" color="primary" onClick={this.openTestPage}>
                            Open Test page
                            </Button>

                </Toolbar>
            </AppBar>
        );

    }
}

export default withStyles(styles)(NavBar);