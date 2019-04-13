import React, {Component} from 'react';

import {withStyles, Grid} from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AuthHelpers from '../Auth/AuthHelpers.js';
import withAuth from '../Auth/withAuth';
import logo from '../favicon.png';
import Navbar from './Navbar.js';

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

class UploadPicture extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            userid: Auth.getUser(),
            nPic: null
        };

        this.fileChangedHandler = this.fileChangedHandler.bind(this)
        this.uploadHandler = this.uploadHandler.bind(this)
    }


    fileChangedHandler = event =>
    {
        this.setState({nPic: event.target.files[0]})
    }

    uploadHandler = () =>
    {
        // may be an api call here
    }


    render()
    {
        const {classes} = this.props;

        return (
            <React.Fragment>

                <Grid container direction="column" justify="center" alignItems="center" style={{padding: 10}}>
                    <Grid item="userProfilePicture">
                        <Button variant="contained" color="default" onClick={this.uploadHandler}>
                            Upload <CloudUploadIcon />
                        </Button>
                        <input type="file" onChange={this.fileChangedHandler} />

                        {this.state.nPic == null ? null :
                        <img src={URL.createObjectURL(this.state.nPic)} />}
                    </Grid>

                </Grid>

            </React.Fragment>
        );

    }
}

export default withAuth(UploadPicture);