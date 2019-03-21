import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import NavBar from './Components/Navbar';
import Homepage from './Components/Homepage';
import LoginPage from './Components/LoginPage'
import FriendsPage from "./Components/FriendsPage";
import FriendRequestPage from "./Components/FriendRequestPage";
import Post from "./Components/Post";
import Register from "./Components/Register"

// import Loadable from "react-loadable";

// function Loading()
// {
//     return <h3>Loading...</h3>;
// }

class App extends React.Component
{
    render()
    {
        return (
            <Router>
                <React.Fragment>

                    <Route component={NavBar} />
                    <Switch >
                        <Route exact path="/home" component={Homepage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/friends" component={FriendsPage} />
                        <Route path='/friend_requests' component={FriendRequestPage} />
                        <Route path='/post/:postid' component={Post} />
                        <Route path="/register" component={Register} />
                    </Switch>
                </React.Fragment >
            </Router>
        );
    }
}

export default App;