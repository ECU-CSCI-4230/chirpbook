import React, {Component} from 'react';

import {withStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

class LoginPage extends Component{
    render()
    {
        const {classes} = this.props;

        return (
            <React.Fragment>

            <Typography align="center" variant="h1">Please Login</Typography>

            </React.Fragment>
        );

    }
}

export default LoginPage;