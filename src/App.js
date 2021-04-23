import React from 'react';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Browse from './Components/Browse';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const App = ()=>{
    return(
        <Router>
            <div>
                <Navbar/>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/browse" component={Browse}/>
                </Switch>
            </div>
        </Router>
    )
}
export default App;