import React from 'react';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Browse from './Components/Browse';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from './Components/Profile';

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/browse" component={Browse} />
                    <Route path="/profile" component={Profile} />
                </Switch>
            </div>
        </Router>
    )
}
export default App;