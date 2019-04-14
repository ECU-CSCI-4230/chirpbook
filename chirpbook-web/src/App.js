import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import NavBar from './Components/Navbar';
import Homepage from './Components/Homepage';
import LoginPage from './Components/LoginPage'
import FriendsPage from "./Components/FriendsPage";
import FriendRequestPage from "./Components/FriendRequestPage";
import Post from "./Components/Post";
import SettingsPage from "./Components/SettingsPage";
import Register from "./Components/Register"
import TagPage from "./Components/TagPage";
import UploadPicture from "./Components/UploadPicture";

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
                        <Route path="/profile/:userid" component={Homepage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/friends" component={FriendsPage} />
                        <Route path='/friend_requests' component={FriendRequestPage} />
                        <Route path='/post/:postid' component={Post} />
                        <Route path='/settings' component={SettingsPage} />
                        <Route path="/register" component={Register} />
                        <Route path="/posts/:tag" component={TagPage} />
                        <Route path="/upload_picture" component={UploadPicture} />
                    </Switch>
                </React.Fragment >
            </Router>
        );
    }
}

export default App;
