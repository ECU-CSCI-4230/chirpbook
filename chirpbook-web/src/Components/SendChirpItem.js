import React, {Component} from 'react';

import {withStyles, Grid, TextField, Button, ListItem, IconButton} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {AccountCircle} from '@material-ui/icons';
import AuthHelpers from '../Auth/AuthHelpers.js'

const Auth = new AuthHelpers();

const styles = theme => ({
    chirpSend: {
        margin: '8px',
        width: '100%',
    },
    chirpSendButton: {
        display: 'block',
        marginRight: '-8px',
        marginLeft: 'auto',
    },
    chirpIcon: {
        marginBottom: 'auto',
        marginTop: '8px',
        padding: '0px',
    },
});

class SendChirpItem extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {post_text: '', profilePicture: ''};
        this.post = this.post.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.getProfilePicture = this.getProfilePicture.bind(this)
    }

    handleKeyPress(event)
    {
        if(event.key === 'Enter')
        {
            this.post();
        }
    }

    handleChange(event, newValue)
    {
        event.persist();
        this.setState({post_text: event.target.value});
    }

    post()
    {
        Auth.fetch('/posts/add', {
            method: 'post',
            body: JSON.stringify({post_text: this.state.post_text})
        }).then((res) =>
        {
            this.props.updateHomepage();
            this.setState({post_text: ''})
        }).catch(err => console.log(err));
    }

    getProfilePicture()
    {
        var userid = Auth.getUser()
        let path = `/users/profile_picture/${userid}`
        Auth.fetch(path, {method: 'GET'}).then((res) =>
        {
            if(res.sucess == true)
            {
                this.setState({
                    profilePicture: res.profile_picture
                });
            }
        }).catch((error) => console.log(error));
    }

    componentWillMount()
    {
        this.getProfilePicture();
    }

    render()
    {
        const {classes} = this.props;

        return (
            <ListItem >
                <IconButton className={classes.chirpIcon}>
                    <Avatar src={this.state.profilePicture}>
                        <AccountCircle />
                    </Avatar>
                </IconButton>

                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            ref='PostText'
                            id="outlined-textarea"
                            placeholder="Chirp here!"
                            onKeyPress={this.handleKeyPress}
                            value={this.state.post_text}
                            onChange={this.handleChange}
                            multiline
                            fullWidth
                            rows="2"
                            rowsMax="8"
                            className={classes.chirpSend}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <Button variant="outlined" size="medium"
                            color="primary"
                            className={classes.chirpSendButton}
                            onClick={this.post}
                        >
                            Chirp
                        </Button>
                    </Grid>
                </Grid>
            </ListItem >
        );
    }
}

export default withStyles(styles)(SendChirpItem);