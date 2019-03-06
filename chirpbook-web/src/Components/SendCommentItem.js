import React, {Component} from 'react';

import {withStyles, Grid, TextField, Button, ListItem, IconButton} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {AccountCircle, Send} from '@material-ui/icons';
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
        this.state = {post_text: ''};
        this.post = this.post.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
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
        Auth.fetch('/comments/add', {
            method: 'post',
            body: JSON.stringify({
                comment_text: this.state.post_text,
                parent_commentid: this.props.chirp.commentid ? this.props.chirp.commentid : null,
                postid: this.props.chirp.postid
            })
        }).then((res) =>
        {
            this.props.updateHomepage();
            this.setState({post_text: ''})
        }).catch(err => console.log(err));
    }

    render()
    {
        const {classes} = this.props;

        return (
            <ListItem style={{paddingLeft: this.props.indent}} >
                <IconButton className={classes.chirpIcon}>
                    <Avatar>
                        <AccountCircle />
                    </Avatar>
                </IconButton>

                <TextField
                    ref='PostText'
                    id="outlined-textarea"
                    placeholder="Chirp here!"
                    onKeyPress={this.handleKeyPress}
                    value={this.state.post_text}
                    onChange={this.handleChange}
                    multiline
                    fullWidth
                    autoFocus
                    rows="1"
                    rowsMax="8"
                    className={classes.chirpSend}
                    margin="normal"
                    variant="standard"
                />
                <IconButton aria-label="SendComment"
                    onClick={this.post}
                    color="primary"

                >
                    <Send />
                </IconButton>
            </ListItem >
        );
    }
}

export default withStyles(styles)(SendChirpItem);