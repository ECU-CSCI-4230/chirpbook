import React, {Component} from 'react';
import AuthHelpers from './AuthHelpers';

export default function withAuth(AuthComponent)
{
    const Auth = new AuthHelpers();
    return class AuthWrapped extends Component
    {
        
        constructor()
        {
            super();
            this.state = {
                userid: null,
                token: null,
            };
        }

    

        componentWillMount()
        {
            if(!Auth.isLoggedIn())
            {
                this.props.history.replace('/login');
            }
            else
            {
                try
                {
                    const token = Auth.getToken();
                    const user = Auth.getUser()
                    console.log(user)
                    this.setState({
                        userid: user,
                        token,
                    });
                }
                catch(err)
                {
                    Auth.logout();
                    this.props.history.replace('/login');
                }
            }
        }

        render()
        {
            const {history, ...otherProps} = this.props;
            if(this.state.userid)
            {
                return (
                    <AuthComponent {...otherProps} history={history} userid={this.state.userid} Auth={Auth} />
                );
            }
            else
            {
                return null;
            }
        }
    }
}
