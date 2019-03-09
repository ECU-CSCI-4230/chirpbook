import React, {Component} from 'react';

import {withStyles, ListItem, ListItemAvatar, ListItemText, Typography, IconButton} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {AccountCircle, ThumbUp, ThumbDown, Comment, ThumbUpOutlined, ThumbDownOutlined} from '@material-ui/icons';
import {Grid, TextField, Button} from '@material-ui/core';
import SendChirpCommentItem from './SendCommentItem';
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
    }

    expandComment()
    {
        this.setState({showComment: !this.state.showComment});
    }

    dislike()
    {
        if(this.state.isDisliked)
        {
            this.setState({isDisliked: false, dislikes: this.state.dislikes - 1});

        } else
        {
            if(this.state.isLiked)
            {
                this.setState({isLiked: false, likes: this.state.likes - 1})
            }
            this.setState({isDisliked: true, dislikes: this.state.dislikes + 1});

        }
    }

    like()
    {
        if(this.state.isLiked)
        {
            this.setState({isLiked: false, likes: this.state.likes - 1});

        } else
        {
            if(this.state.isDisliked)
            {
                this.setState({isDisliked: false, dislikes: this.state.dislikes - 1})
            }
            this.setState({isLiked: true, likes: this.state.likes + 1});
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
                                    {' · ' + parseInt(((new Date().getTime() - new Date(this.props.chirp.time_posted).getTime()) / (1000 * 60))) + 'min ago'}
                                </Typography>

                            </React.Fragment>
                        }
                        secondary={
                            <React.Fragment>
                                <Typography component="span" color="textPrimary">
                                    {this.props.chirp.comment_text}
                                </Typography>
                                <div className={classes.interactions}>
                                    <IconButton className={classes.likeChrip} aria-label="Like"
                                        onClick={this.expandComment}
                                    >
                                        <Comment className={classes.interactionIcon} />
                                    </IconButton>
                                    <IconButton className={classes.likeChrip} aria-label="Like"
                                        onClick={this.like}
                                        disabled
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
                                        disabled
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