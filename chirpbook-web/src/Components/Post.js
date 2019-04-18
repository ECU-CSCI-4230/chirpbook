import React, {Component} from 'react';

import {withStyles, List} from '@material-ui/core';

import ChirpItem from "./ChirpItem";
import CommentItem from "./CommentItem";
import AuthHelpers from '../Auth/AuthHelpers.js'
import withAuth from '../Auth/withAuth';

const Auth = new AuthHelpers();

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: '10px',
        maxWidth: '100vw',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.up(800)]: {
            maxWidth: '800px',
        },
    },
    chirpIcon: {
        marginBottom: 'auto',
        marginTop: '8px',
        padding: '0px',
    },
});

class Post extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            post: null,
            comments: null,
        };
        console.log(props);
        this.renderThread = this.renderThread.bind(this);
        this.updateHomepage = this.updateHomepage.bind(this);

    }
    componentWillMount()
    {
        this.updateHomepage();
    }
    updateHomepage()
    {
        let get_post = `/posts/get/${this.props.match.params.postid}`;
        Auth.fetch(get_post, {method: 'GET'}).then((res) =>
        {
            console.log(res)
            if(res.post)
            {
                console.log(res.post[0])
                this.setState({
                    post: res.post[0]
                });
            }
        }).catch((error) => console.log(error));

        let get_comments = `/comments/get/${this.props.match.params.postid}`;
        Auth.fetch(get_comments, {method: 'GET'}).then((res) =>
        {
            console.log(res.comments)
            if(res.comments)
            {
                let comment_map = {}
                res.comments.map(comment =>
                {
                    if(comment_map[comment.parent_comment])
                    {
                        comment_map[comment.parent_comment].unshift(comment);
                    } else
                    {
                        comment_map[comment.parent_comment] = [comment];

                    }
                });
                this.setState({
                    comments: comment_map
                });
            }
        }).catch((error) => console.log(error));
    }

    renderThread(parent_comment, depth)
    {
        return (
            <React.Fragment>
                {this.state.comments[parent_comment] ? this.state.comments[parent_comment].map((comment, index) =>
                    <React.Fragment>
                        <CommentItem updateHomepage={this.updateHomepage} chirp={comment} depth={depth} key={'commentd' + depth + 'i' + index} />
                        {this.renderThread(comment.commentid, depth + 1)}
                    </React.Fragment>
                ) : null}
            </React.Fragment>
        );
    }

    render()
    {
        const {classes} = this.props;

        return (
            <List className={classes.root}>
                {this.state.post ?
                    <ChirpItem
                        chirp={this.state.post}
                        showComment
                        history={this.props.history}
                        updateHomepage={this.updateHomepage}
                    /> : null}
                {this.state.comments ?
                    this.renderThread(null, 1) : null}
            </List>
        );
    }
}


export default withStyles(styles)(Post);