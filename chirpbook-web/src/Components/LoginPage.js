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
        maxWidth: '100vw',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.up(400)]: {
            maxWidth: '400px',
        },

    },
    child: {
        width: '100%'
    }

});

class LoginPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            email: '',
            password: '',
            errmsg: ''
        };
        this.submit = this.submit.bind(this)
        this.moveToRegister = this.moveToRegister.bind(this)
    }

    handleChange = name => event =>
    {
        this.setState({[name]: event.target.value});
    };

    moveToRegister()
    {
        this.props.history.replace('/Register');
    }

    submit()
    {

        var e = this.state.email

        if(e.search('@') !== -1)
        {


            const b = JSON.stringify({'gmail': this.state.email, 'password': this.state.password})
            const options = {
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                body: b
            };
            //const tokenH = r.headers.get('x-auth-token');
            fetch(`${Auth.domain}/login`, options).then(r => r.json())
                .then(data =>
                {
                    if(data.err === null)
                    {
                        Auth.login(data.token)
                        this.props.history.replace('/home')
                    } else if(data.err === 'Enter a valid gmail.')
                    {
                        this.setState({errmsg: 'Enter a valid email.'});
                    } else if(data.err === 'Username or password is incorrect')
                    {
                        this.setState({errmsg: 'Username or password is incorrect.'});

                    } else
                    {
                        this.setState({errmsg: 'Something went wrong.'});

                    }
                })
        } else
        {
            this.setState({errmsg: 'Not a Valid Email'})
        }
    }

    render()
    {
        const {classes} = this.props;

        return (
            <div className={classes.root} >
                <Grid
                    className={classes.root}
                    container
                    spacing={16}
                    alignItems='center'
                    alignContent='center'
                    direction='column'
                >
                    <Grid item className={classes.child}>


                        {this.state.errmsg === '' ? null :
                            <Typography variant="h5" color="error">

                                {this.state.errmsg}

                            </Typography>


                        }
                    </Grid>
                    <Grid item className={classes.child}
                    >
                        <TextField
                            id="standard-name"
                            label="Email"
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>

                    <Grid item className={classes.child}>
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="dense"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            fullWidth
                        />
                    </Grid>
                    <Grid item className={classes.child}>
                        <Button onClick={this.submit} variant="contained" size="medium" color="primary" className={classes.child}>
                            Log In
                    </Button>
                    </Grid>
                    <Grid item className={classes.child}>
                        <Button onClick={this.moveToRegister} variant="contained" size="medium" color="primary" className={classes.child}>
                            Sign Up
                    </Button>
                    </Grid>
                </Grid>
            </ div>

        )
    }
}

// export default withAuth(withStyles(styles)(Register));
export default withStyles(styles)(LoginPage);