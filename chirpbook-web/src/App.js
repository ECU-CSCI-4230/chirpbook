import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import config from './config.json';

class App extends Component {

    constructor() {
        super();
        this.state = { isAuthenticated: false, user: null, token: ''};
        //this.fetch = this.fetch.bind(this)
    }

    logout = () => {
        this.setState({isAuthenticated: false, token: '', user: null})
    };

    onFailure = (error) => {
        alert('error');
        console.log(this.state)
        console.log(error)
        console.log(config)
    };


    googleResponse = (response) => {
        const token = JSON.stringify({'idToken': response.tokenId})
        //{type : 'application/json'});
        console.log('sucess')
        console.log(response)
        const options = {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: token,
        };
        //const tokenH = r.headers.get('x-auth-token');
        fetch('http://localhost/api/v1/auth/google', options).then(r => r.json())
        .then(data =>{
            console.log(data.email)
            this.setState({isAuthenticated: true, user: data.email})
        });

    };

    render() {
    let content = !!this.state.isAuthenticated ?
            (
                <div>
                    <p>Authenticated {this.state.user.email}</p>
                    <div>
                        <GoogleLogout
                            buttonText="Logout"
                            onLogoutSuccess={this.logout}
                        >
                        </GoogleLogout>
                    </div>
                </div>
            ) :
            (
                <div>
                    <p>HI</p>
                    <GoogleLogin
                        clientId={config.GOOGLE_CLIENT_ID}
                        buttonText="Login"
                        
                        onSuccess={this.googleResponse}
                        onFailure={this.onFailure}
                    />
                </div>
            );

        return (
            <div className="App">
                {content}
            </div>
        );
    }
}

export default App;