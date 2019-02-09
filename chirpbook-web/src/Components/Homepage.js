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

const testChirps = [
    {
        user: "Zac Catalano",
        userName: 'zaccatalano',
        timeSent: 'idk today',
        chripText: 'Here is a test CHIRP! #ChirpOn',
        likes: 2323,
        dislikes: 82,
        comments: [],
        isLiked: true,
        isDisliked: false,
    },
    {
        user: "John Doe",
        userName: 'johnDoe29',
        timeSent: 'sometime',
        chripText: 'Chrip sucks! #ChirpOff',
        likes: 1,
        dislikes: 934,
        comments: [],
        isLiked: false,
        isDisliked: true,
    }

];


class Homepage extends Component
{

    constructor()
    {
        super();
        console.log();
    }

    render()
    {
        console.log(this.props.userid)
        const {classes} = this.props;

        return (
            <List className={classes.root}>
                <SendChirpItem />
                {testChirps.map((currChirp, key) =>
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

export default withStyles(styles)(withAuth(Homepage));