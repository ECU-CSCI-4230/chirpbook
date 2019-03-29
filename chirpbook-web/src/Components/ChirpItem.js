import React, {Component} from 'react';

import {withStyles, ListItem, ListItemAvatar, ListItemText, Typography, IconButton} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {AccountCircle, ThumbUp, ThumbDown, Comment, ThumbUpOutlined, ThumbDownOutlined, Delete} from '@material-ui/icons';

import SendChirpCommentItem from './SendCommentItem';
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
    likeChrip: {
        // marginLeft: 'auto',
        // display: 'block',
    },
    dislikeChirp: {
        // display: 'block',

    },
    interactions: {
        marginLeft: 'auto',
        display: 'block',
        width: 'fit-content',
    },
    interactionIcon: {
        marginRight: '.5rem',
    },
    chirpIcon: {
        marginBottom: 'auto',
        marginTop: '8px',
        padding: '0px',
    },
    user: {
        fontWeight: 'bold',
        marginRight: '.5rem',
    },
    iconText: {
        marginLeft: '.5rem',
    }
});

class ChirpItem extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isLiked: props.chirp.isliked,
            isDisliked: props.chirp.isdisliked,
            likes: parseInt(props.chirp.likes),
            dislikes: parseInt(props.chirp.dislikes),
            profilePicutre: props.chirp.profile_picture
        }

        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    deletePost = () =>
    {
        let path = `/posts/remove/${this.props.chirp.postid}`;

        Auth.fetch(path, {method: 'DELETE'}).then((res) =>
        {
            if(res.success)
            {
                this.props.updateHomepage();
            }
        }).catch((error) => console.log(error));
    }

    dislike()
    {
        if(this.state.isDisliked)
        {
            Auth.fetch('/like', {
                method: 'delete',
                body: JSON.stringify({
                    postid: this.props.chirp.postid,
                })
            }).then((res) =>
            {
                this.setState({isDisliked: false, dislikes: this.state.dislikes - 1});
            }).catch(err => console.log(err));
        } else
        {
            if(this.state.isLiked)
            {
                this.setState({isLiked: false, likes: this.state.likes - 1})
            }

            Auth.fetch('/like', {
                method: 'post',
                body: JSON.stringify({
                    postid: this.props.chirp.postid,
                    like_type: 0,
                })
            }).then((res) =>
            {
                this.setState({isDisliked: true, dislikes: this.state.dislikes + 1});
            }).catch(err => console.log(err));
        }
    }

    like()
    {
        if(this.state.isLiked)
        {
            Auth.fetch('/like', {
                method: 'delete',
                body: JSON.stringify({
                    postid: this.props.chirp.postid,
                })
            }).then((res) =>
            {
                this.setState({isLiked: false, likes: this.state.likes - 1});
            }).catch(err => console.log(err));

        } else
        {
            if(this.state.isDisliked)
            {
                this.setState({isDisliked: false, dislikes: this.state.dislikes - 1})
            }
            Auth.fetch('/like', {
                method: 'post',
                body: JSON.stringify({
                    postid: this.props.chirp.postid,
                    like_type: 1,
                })
            }).then((res) =>
            {
                this.setState({isLiked: true, likes: this.state.likes + 1});
            }).catch(err => console.log(err));

        }
    }

    render()
    {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar className={classes.chirpIcon} children={IconButton} >
                        <Avatar src={this.state.profilePicutre}>
                            {/* TODO make this the user's profile picture  */}
                            <AccountCircle />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        disableTypography
                        primary={
                            <React.Fragment>
                                <Typography component="span" inline className={classes.user} color="textPrimary" >
                                    {this.props.chirp.display_name}
                                </Typography>
                                <Typography component="span" inline color="textSecondary">
                                    {this.props.chirp.gmail}
                                    {' · ' + parseInt(((new Date().getTime() - new Date(this.props.chirp.time_posted).getTime()) / (1000 * 60))) + 'min ago'}
                                </Typography>

                            </React.Fragment>
                        }
                        secondary={
                            <React.Fragment>
                                <Typography component="span" color="textPrimary">
                                    {this.props.chirp.post_text}
                                </Typography>
                                <div className={classes.interactions}>
                                    {this.props.chirp.userid == Auth.getUser() ?
                                        <IconButton className={classes.likeChrip} aria-label="Delete"
                                            onClick={this.deletePost}
                                        >
                                            <Delete className={classes.interactionIcon} />
                                        </IconButton>
                                        : null}
                                    <IconButton className={classes.likeChrip} aria-label="Like"
                                        onClick={() => this.props.history.replace(`/post/${this.props.chirp.postid}`)}
                                        disabled={this.props.showComment}
                                    >
                                        <Comment className={classes.interactionIcon} />
                                    </IconButton>
                                    <IconButton className={classes.likeChrip} aria-label="Like"
                                        onClick={this.like}
                                    >
                                        {this.state.isLiked ?
                                            <ThumbUp className={classes.interactionIcon} /> :
                                            <ThumbUpOutlined className={classes.interactionIcon} />
                                        }
                                        <Typography component="span" inline className={classes.iconText} color="textSecondary">
                                            {this.state.likes}
                                        </Typography>

                                    </IconButton>
                                    <IconButton className={classes.dislikeChirp} aria-label="Dislike"
                                        onClick={this.dislike}
                                    >
                                        {this.state.isDisliked ?
                                            <ThumbDown className={classes.interactionIcon} /> :
                                            <ThumbDownOutlined className={classes.interactionIcon} />
                                        }
                                        <Typography component="span" inline className={classes.userName} color="textSecondary">
                                            {this.state.dislikes}
                                        </Typography>
                                    </IconButton>
                                </div>
                            </React.Fragment>
                        }
                    />
                </ListItem>
                {this.props.showComment ?
                    <SendChirpCommentItem chirp={this.props.chirp} history={this.props.history} updateHomepage={this.props.updateHomepage} indent={this.state.indent} />
                    : null}
            </React.Fragment >
        );

    }
}

export default withStyles(styles)(ChirpItem);