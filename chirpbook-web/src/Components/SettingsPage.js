import React, { Component } from 'react';

import { withStyles, Grid, TextField } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AuthHelpers from '../Auth/AuthHelpers.js'
import withAuth from '../Auth/withAuth';
import logo from '../favicon.png';
import Navbar from './Navbar.js';

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

class SettingsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userid: Auth.getUser(),
            displayName: '',
            newDisplayName: '',
            profile_picture: null,
            email: ''
        };
        this.deleteUser = this.deleteUser.bind(this);
        // this.updateProfilePicture = this.updateProfilePicture.bind(this);
        this.setDisplayName = this.setDisplayName.bind(this);
        this.getUserDetails = this.getUserDetails.bind(this);

        this.getUserDetails()
    }

    deleteUser() {
        var userid = Auth.getUser()
        let path = `/users/delete/${userid}`

        Auth.fetch(path, { method: 'DELETE' }).then((res) => {
            if (res.success) {
                Auth.logout()
                this.setState({ isAuthenticated: false, token: '', user: null })
                this.props.history.replace('/login')
            }

        })
    }

    setDisplayName() {
        var userid = Auth.getUser()
        let path = `/users/set_displayname/${userid}`

        Auth.fetch(
            path, {
                method: 'POST',
                body: JSON.stringify({
                    display_name: this.state.newDisplayName
                })
            }).then((res) => {
                if (res.success) {
                    this.setState({displayName: this.state.newDisplayName})
                }
            })
    }

    getUserDetails() {
        var userid = Auth.getUser()
        let path = `/users/${userid}`

        Auth.fetch(
            path, {method: 'GET'}).then((res) => {
                if (res.success) {
                    this.setState({displayName: res.display_name, profile_picture: res.profile_picture,
                                    email: res.email})
                }
            })
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    render() {
        const { classes } = this.props;

        console.log(this.state.displayName + " " + this.state.newDisplayName)

        return (
            <React.Fragment>
                <div>
                    <Grid container direction="column" justify="center" alignItems="center" style={{ padding: 10 }}>
                        <Grid item="userProfilePicture">
                            <img src={logo} width="500" height="500"></img>
                        </Grid>
                        <Grid item="userDisplayName">
                            <Typography>{this.state.displayName}</Typography>
                        </Grid>
                        <Grid container direction="column" justify="center" alignItems="center" style={{ padding: 10 }}>
                            <Grid item="updateProfileBtn" style={{ padding: 10 }}>
                                <Button variant="contained" color="primary">Update Profile Picture</Button>
                            </Grid>
                            <Grid item="setDiplayNameBtn" style={{ padding: 10 }} onClick={() => this.setDisplayName()}>
                                <Button variant="contained" color="primary" >Set Display Name</Button>
                            </Grid>
                            <Grid style={{ padding: 10 }}>
                                <TextField id="newDisplayName" variant="outlined" onChange={this.handleChange('newDisplayName')} />
                            </Grid>
                            <Grid item="deleteAccountBtn" style={{ padding: 10 }} onClick={this.deleteUser}>
                                <Button variant="contained" color="primary">Delete Account</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

export default withAuth(SettingsPage);