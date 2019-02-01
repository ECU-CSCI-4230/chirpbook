import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
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
        const token = JSON.stringify({idToken: response.accessToken})
        //{type : 'application/json'});
        console.log('sucess')
        console.log(token)
        const options = {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: token,
        };
        //const tokenH = r.headers.get('x-auth-token');
        fetch('http://localhost/api/v1/google/auth', options).then(r => r.json())
        .then(data =>{
            console.log(data)
        });

    };

    render() {
    let content = !!this.state.isAuthenticated ?
            (
                <div>
                    <p>Authenticated</p>
                    <div>
                        {this.state.user.email}
                    </div>
                    <div>
                        <button onClick={this.logout} className="button">
                            Log out
                        </button>
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