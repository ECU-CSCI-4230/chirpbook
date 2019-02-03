import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import NavBar from './Components/Navbar';
import Homepage from './Components/Homepage';

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
                        <Route exact path="/" component={Homepage} />
                    </Switch>
                </React.Fragment >
            </Router>
        );
    }
}

export default App;