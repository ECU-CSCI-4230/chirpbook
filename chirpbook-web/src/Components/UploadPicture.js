import React, {Component} from 'react';

import {withStyles, Grid} from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AuthHelpers from '../Auth/AuthHelpers.js';
import withAuth from '../Auth/withAuth';
import logo from '../favicon.png';
import Navbar from './Navbar.js';
import Avatar from '@material-ui/core/Avatar';
import {AccountCircle} from '@material-ui/icons';

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
            nPic: null,
            curPic: '',
            err: null
        };

        this.fileChangedHandler = this.fileChangedHandler.bind(this)
        this.uploadHandler = this.uploadHandler.bind(this)
        this.getProfilePicture = this.getProfilePicture.bind(this)
    }


    fileChangedHandler = event =>
    {
        this.setState({nPic: event.target.files[0]})
    }

    uploadHandler = () =>
    {
        if(this.state.nPic !== null)
        {
            var reader = new FileReader()
            reader.readAsDataURL(this.state.nPic)
            reader.onloadend = () =>
            {
                const path = `/users/set_profile_picture`
                var b = JSON.stringify({
                    picture: reader.result
                })
                Auth.fetch(path,
                    {
                        method: 'POST',
                        body: b
                    }).then((res) =>
                    {
                        console.log(res)
                        if(res.success === true)
                        {
                            this.getProfilePicture()
                            this.setState({err: ''})
                        }
                    }).catch((error) => this.setState({err: 'Something went wrong'}));
            }
        }
    }

    getProfilePicture()
    {
        var userid = Auth.getUser()
        let path = `/users/profile_picture/${userid}`
        Auth.fetch(path, {method: 'GET'}).then((res) =>
        {
            if(res.success == true)
            {
                this.setState({
                    curPic: res.profile_picture
                });
            }
        }).catch((error) => console.log(error));
    }


    componentWillMount()
    {
        this.getProfilePicture();
    }

    render()
    {
        const {classes} = this.props;

        return (
            <React.Fragment>

                <Grid container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                    style={{padding: 10}}
                    spacing={24}>

                    <Grid item >


                        {this.state.err === '' ? null :
                            <Typography variant="h4" color="error">

                                {this.state.err}

                            </Typography>


                        }
                    </Grid>

                    <Grid item>
                        <Button variant="contained" color="default" onClick={this.uploadHandler}>
                            Upload <CloudUploadIcon />
                        </Button>
                    </Grid>
                    <Grid item>
                        <input type="file" onChange={this.fileChangedHandler} />
                    </Grid>
                    <Grid item>
                        {this.state.curPic === '' ? null :
                            <Avatar src={this.state.curPic}>
                                <AccountCircle />
                            </Avatar>}
                    </Grid>

                </Grid>

            </React.Fragment>
        );

    }
}

export default withAuth(UploadPicture);