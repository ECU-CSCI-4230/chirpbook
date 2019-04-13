import React, {Component} from 'react';

import {withStyles, ListItem, ListItemAvatar, ListItemText, Typography, IconButton} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {AccountCircle, ThumbUp, ThumbDown, Comment, ThumbUpOutlined, ThumbDownOutlined, Delete} from '@material-ui/icons';
import {Grid, TextField, Button} from '@material-ui/core';
import SendChirpCommentItem from './SendCommentItem';
import AuthHelpers from '../Auth/AuthHelpers';

const Auth = new AuthHelpers();

const indent_len = 75;
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

class CommentItem extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            // isLiked: props.chirp.isliked,
            // isDisliked: props.chirp.isdisliked,
            // likes: parseInt(props.chirp.likes),
            // dislikes: parseInt(props.chirp.dislikes),
            indent: (props.depth * indent_len) + 'px',
            showComment: false,
            isLiked: false,
            isDisliked: false,
            likes: 0,
            dislikes: 0,
        }
        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);
        this.expandComment = this.expandComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);

    }

    deleteComment = () =>
    {
        let path = `/comments/delete/${this.props.chirp.commentid}`;

        Auth.fetch(path, {method: 'DELETE'}).then((res) =>
        {
            if(res.success)
            {
                this.props.updateHomepage();
            }
        }).catch((error) => console.log(error));
    }

    expandComment()
    {
        this.setState({showComment: !this.state.showComment});
    }

    dislike()
    {
        if(this.state.isDisliked)
        {
            Auth.fetch('/comments/like', {
                method: 'delete',
                body: JSON.stringify({
                    commentid: this.props.chirp.commentid,
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

            Auth.fetch('/comments/like', {
                method: 'post',
                body: JSON.stringify({
                    commentid: this.props.chirp.commentid,
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
            Auth.fetch('/comments/like', {
                method: 'delete',
                body: JSON.stringify({
                    commentid: this.props.chirp.commentid,
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
            Auth.fetch('/comments/like', {
                method: 'post',
                body: JSON.stringify({
                    commentid: this.props.chirp.commentid,
                    like_type: 1,
                })
            }).then((res) =>
            {
                this.setState({isLiked: true, likes: this.state.likes + 1});
            }).catch(err => console.log(err));

        }
    }

    getTimeSincePost = (time_posted) =>
    {
        let minutes = parseInt(((new Date().getTime() - new Date(time_posted).getTime()) / (1000 * 60)));

        if(minutes < 60)
        {
            return minutes + 'min ago';
        } else if(minutes < 1440)
        {
            return parseInt(minutes / 60) + 'hr ago';
        } else if(minutes < 2880)
        {
            return '1 day ago';
        } else
        {
            return parseInt(minutes / 1440) + ' days ago';

        }
    }

    render()
    {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <ListItem style={{paddingLeft: this.state.indent}} alignItems="flex-start">
                    <ListItemAvatar className={classes.chirpIcon} children={IconButton} >
                        <Avatar src={this.props.chirp.profile_picture}>
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
                                    {' · ' + this.getTimeSincePost(this.props.chirp.time_posted)}
                                </Typography>

                            </React.Fragment>
                        }
                        secondary={
                            <React.Fragment>
                                <Typography component="span" color="textPrimary">
                                    {this.props.chirp.comment_text}
                                </Typography>
                                <div className={classes.interactions}>
                                    {this.props.chirp.userid == Auth.getUser() ?
                                        <IconButton className={classes.likeChrip} aria-label="Delete"
                                            onClick={this.deleteComment}
                                        >
                                            <Delete className={classes.interactionIcon} />
                                        </IconButton>
                                        : null}
                                    <IconButton className={classes.likeChrip} aria-label="Comment"
                                        onClick={this.expandComment}
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
                {this.state.showComment ?
                    <SendChirpCommentItem chirp={this.props.chirp} updateHomepage={this.props.updateHomepage} indent={this.state.indent} showComment={this.props.showComment} />
                    : null}
            </React.Fragment >
        );

    }
}

export default withStyles(styles)(CommentItem);