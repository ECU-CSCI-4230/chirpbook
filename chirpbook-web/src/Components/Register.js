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
        backgroundColor: theme.palette.background.paper
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
                    fetch('http://localhost/api/v1/signup', options).then(r => r.json())
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
            <React.Fragment>
                <Grid
                    container
                    spacing={16}
                    alignItems='center'
                    alignContent='center'
                    direction='column'
                >
                    <Grid item >


                        {this.state.errmsg === "" ? null :
                            <Typography variant="h4" color="error">

                                {this.state.errmsg}

                            </Typography>


                        }
                    </Grid>
                    <Grid item >
                        <TextField
                            id="standard-name"
                            label="Email"
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            margin="normal"
                        />
                    </Grid>

                    <Grid item >
                        <TextField
                            id="standard-name"
                            label="Display Name"
                            className={classes.textField}
                            value={this.state.d_name}
                            onChange={this.handleChange('d_name')}
                            margin="normal"
                        />
                    </Grid>

                    <Grid item >
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="dense"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                        />
                    </Grid>
                    <Grid item >
                        <TextField
                            id="standard-password-input"
                            label="Re-enter Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="dense"
                            value={this.state.rpassword}
                            onChange={this.handleChange('rpassword')}
                        />
                    </Grid>
                    <Grid item>
                        <Button onClick={this.submit} variant="contained" size="medium" color="primary" className={classes.margin}>
                            Signup
                    </Button>
                    </Grid>
                </Grid>

            </React.Fragment>

        )
    }
}

// export default withAuth(withStyles(styles)(Register));
export default withStyles(styles)(Register);