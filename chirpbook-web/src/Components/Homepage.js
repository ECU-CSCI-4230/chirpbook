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
        this.state = {posts: []};

    }

    componentWillMount()
    {
        let path = `/posts/get_homepage`
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

    render()
    {
        const {classes} = this.props;

        return (
            <List className={classes.root}>
                <SendChirpItem />
                {this.state.posts.map((currChirp, key) =>
                    <React.Fragment key={'chirpfrag' + key}>
                        <li>
                            <Divider variant="inset" />
                        </li>

                        <ChirpItem chirp={currChirp} key={'chirp' + key} />

                    </React.Fragment>
                )}
            </List>
        );

    }
}

export default withAuth(withStyles(styles)(Homepage));