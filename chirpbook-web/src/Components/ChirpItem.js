import React, {Component} from 'react';

import {withStyles, ListItem, ListItemAvatar, ListItemText, Typography, IconButton} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {AccountCircle, ThumbUp, ThumbDown, ThumbUpOutlined, ThumbDownOutlined} from '@material-ui/icons';

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
            isLiked: props.chirp.isLiked,
            isDisliked: props.chirp.isDisliked,
            likes: props.chirp.likes,
            dislikes: props.chirp.dislikes,

        }
        this.like = this.like.bind(this);
        this.dislike = this.dislike.bind(this);
    }

    dislike()
    {
        if(this.state.isDisliked)
        {
            this.setState({isDisliked: false, dislikes: this.state.dislikes - 1});

        } else
        {
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
            this.setState({isLiked: true, likes: this.state.likes + 1});
        }
    }

    render()
    {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar className={classes.chirpIcon} children={IconButton} >
                        <Avatar>
                            <AccountCircle />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        disableTypography
                        primary={
                            <React.Fragment>
                                <Typography component="span" inline className={classes.user} color="textPrimary" >
                                    {this.props.chirp.user}
                                </Typography>
                                <Typography component="span" inline color="textSecondary">
                                    @{this.props.chirp.userName}
                                </Typography>

                            </React.Fragment>
                        }
                        secondary={
                            <React.Fragment>
                                <Typography component="span" color="textPrimary">
                                    {this.props.chirp.chripText}
                                </Typography>
                                <div className={classes.interactions}>

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
            </React.Fragment >
        );

    }
}

export default withStyles(styles)(ChirpItem);