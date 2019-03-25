import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
    icon: {
        marginBottom: 'auto',
        marginTop: '0px',
        padding: '0px',
    },
    user: {
        fontWeight: 'bold',
        marginRight: '.5rem',
        paddingTop: '100px',

    },
});

class SettingsPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            userid: Auth.getUser()
        };
        // this.deleteUser = this.deleteUser.bind(this);
        // this.updateProfilePicture = this.updateProfilePicture.bind(this);
        // this.setDisplayName = this.setDisplayName.bind(this);
    }
    render()
    {
        const {classes} = this.props;

        return (
            <React.Fragment>

            <div>
                <Button variant="contained">Delete Account</Button>
            </div>

            </React.Fragment>
        );

    }
}

export default SettingsPage;