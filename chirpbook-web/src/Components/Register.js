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

class Register extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            email: '',
            d_name: '',
            password: '',
            rpassword: '',
            errmsg: ''
        };
        this.submit = this.submit.bind(this)
    }

    handleChange = name => event =>
    {
        this.setState({[name]: event.target.value});
    };

    submit()
    {

        var e = this.state.email

        if(e.search('@') !== -1)
        {

            if(this.state.password === this.state.rpassword)
            {
                if(this.state.password.length >= 6)
                {
                    const b = JSON.stringify({'gmail': this.state.email, 'display_name': this.state.d_name, 'password': this.state.password})
                    const options = {
                        headers: {'Content-Type': 'application/json'},
                        method: 'POST',
                        body: b
                    };

                    //const tokenH = r.headers.get('x-auth-token');
                    fetch(`${Auth.domain}/signup`, options).then(r => r.json())
                        .then(data =>
                        {
                            if(data.err === null)
                            {
                                Auth.login(data.token)
                                this.props.history.replace('/home')
                            } else if(data.err === "Invalid gmail or password.")
                            {
                                this.setState({errmsg: 'Invalid gmail or password.'})
                            } else if(data.err === "User already exists.")
                            {
                                this.setState({errmsg: 'User already exists.'})
                            } else if(data.err === "Account already exists.")
                            {
                                this.setState({errmsg: "Account already exists."})
                            }
                        });
                } else
                {
                    this.setState({errmsg: 'Passsword should be six characters'})
                }

            } else
            {
                this.setState({errmsg: 'Passwords Not Matching'})
            }
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
                    container
                    spacing={16}
                    className={classes.root}
                    alignItems='center'
                    alignContent='center'
                    direction='column'
                >
                    <Grid item className={classes.child}>


                        {this.state.errmsg === "" ? null :
                            <Typography variant="h5" color="error">

                                {this.state.errmsg}

                            </Typography>


                        }
                    </Grid>
                    <Grid item className={classes.child}>


                        <Grid item className={classes.child}>
                            <TextField
                                id="display-name"
                                label="Display Name"
                                autoComplete="none"
                                className={classes.textField}
                                value={this.state.d_name}
                                onChange={this.handleChange('d_name')}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <TextField
                            id="email"
                            label="Email"
                            className={classes.textField}
                            value={this.state.email}
                            autoComplete="email"
                            onChange={this.handleChange('email')}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item className={classes.child}>
                        <TextField
                            id="new-password-input"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="new-password"
                            margin="normal"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            fullWidth
                        />
                    </Grid>
                    <Grid item className={classes.child}>
                        <TextField
                            id="confirm-password-input"
                            label="Re-enter Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="new-password"
                            margin="normal"
                            value={this.state.rpassword}
                            onChange={this.handleChange('rpassword')}
                            fullWidth
                        />
                    </Grid>
                    <Grid item className={classes.child}>
                        <Button onClick={this.submit} variant="contained" size="medium" color="primary" className={classes.child}>
                            Signup
                    </Button>
                    </Grid>
                </Grid>

            </div>

        )
    }
}

// export default withAuth(withStyles(styles)(Register));
export default withStyles(styles)(Register);