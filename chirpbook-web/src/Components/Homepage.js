import React, {Component} from 'react';

import {withStyles, List} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import SendChirpItem from './SendChirpItem';
import ChirpItem from './ChirpItem';

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
    chirpIcon: {
        marginBottom: 'auto',
        marginTop: '8px',
        padding: '0px',
    },
});

class Homepage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {posts: [], profilePicture: '', profileID: null};
        this.updateHomepage = this.updateHomepage.bind(this);

    }

    componentWillReceiveProps(nextProps)
    {
        if(this.props.match.params.userid !== nextProps.match.params.userid)
        {
            this.updateHomepage(nextProps.match.params.userid);
        }
    }

    updateHomepage(userid)
    {
        let path = `/posts/get_homepage`
        if(userid)
        {
            path = '/posts/get/user/' + userid;
        }

        Auth.fetch(path, {method: 'GET'}).then((res) =>
        {
            if(res.posts)
            {
                this.setState({
                    posts: res.posts
                });
            }
        }).catch((error) => console.log(error));
    }


    componentWillMount()
    {
        this.updateHomepage(this.props.match.params.userid);
    }

    render()
    {
        const {classes} = this.props;
        return (
            <List className={classes.root}>
                <SendChirpItem updateHomepage={this.updateHomepage} />
                {this.state.posts.map((currChirp) =>
                    <React.Fragment key={'chirpfrag' + currChirp.postid}>
                        <Divider variant="inset" />


                        <ChirpItem
                            chirp={currChirp}
                            updateHomepage={this.updateHomepage}
                            showComment={false}
                            history={this.props.history}
                        />
                    </React.Fragment>
                )}
            </List>
        );

    }
}

export default withAuth(withStyles(styles)(Homepage));