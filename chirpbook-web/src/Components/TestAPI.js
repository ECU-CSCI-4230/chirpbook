import React, {Component} from 'react';

import {Button, Grid} from '@material-ui/core';

import AuthHelpers from '../Auth/AuthHelpers.js'
import withAuth from '../Auth/withAuth';

const Auth = new AuthHelpers();

class Homepage extends Component
{

    constructor(props)
    {
        super(props);
        //conviently access your user id with code: this.state.userid
        this.state = {
            userid: this.props.userid 
        }
    }

    testApi = () => {

        var path = `http://localhost/api/v1/users/set_displayname/${this.state.userid}`

        const b = {
            'display_name': 'Johnny Test'
        }

        console.log(this.state.userid)

        const options = {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            json: b
        };
        //const tokenH = r.headers.get('x-auth-token');
        fetch(path, options).then(r => r.json())
            .then(data =>
            {
                console.log('hi')
                console.log(data)
            });
    }

    render()
    {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                >
                    <Grid item>
                        <div style={{padding: 15}}>
                            Put your api call in function testApi and click the button to execute it. log the output to the console to see if its working.
                        </div>
                    </Grid>

                    <Grid item>
                        <div style={{padding: 15}}>
                            Example code is provided
                         </div>
                    </Grid>

                    <Grid item>
                        <div style={{padding: 15}}>
                            <Button
                              variant="contained" 
                              size="large" 
                              color="primary"
                              onClick={this.testApi}> 
                              Testy Test
                            </Button>
                        </div>
                    </Grid>


                </Grid>


                
            </React.Fragment>
        );

    }
}

export default withAuth(Homepage);