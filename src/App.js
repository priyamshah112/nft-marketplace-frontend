import React from 'react';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Browse from './Components/Browse';
import Home from './Components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from './Components/Profile';
import Settings from './Components/Settings';
import CreateAsset from './Components/CreateAsset';
import EditAsset from './Components/EditAsset';

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/browse" component={Browse} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/createAsset" component={CreateAsset} />
                    <Route path='/editAsset' component={EditAsset}/>
                </Switch>
            </div>
        </Router>
    )
}
export default App;
