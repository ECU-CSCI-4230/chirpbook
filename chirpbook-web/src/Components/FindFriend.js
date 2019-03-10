import React, {Component} from 'react';

import {withStyles, List, Typography, TextField, Grid} from '@material-ui/core';
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
});

//TODO: setup delete buttons

class FindFriend extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            name: ''
        };
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
      };


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
                    <Typography>{this.state.name}</Typography>

                </Grid>


                </Grid>
               
            </React.Fragment>
        )
    }
}

export default withAuth(withStyles(styles)(FindFriend));
