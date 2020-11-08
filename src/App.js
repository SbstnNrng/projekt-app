import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import Login from './views/login.js';
import Register from './views/register.js';
import Home from './views/home.js';
import Account from './views/account.js';
import Overview from './views/overview.js';
import Buy from './views/buy.js';
import Sell from './views/sell.js';


import './App.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <nav>
                    <ul>
                        <li>
                        <Link to="/">Home</Link>
                        </li>
                        <li>
                        <Link to="/register">Register</Link>
                        </li>
                        <li>
                        <Link to="/login">Login</Link>
                        </li>
                        <li>
                        <Link to="/account">Account</Link>
                        </li>
                        <li>
                        <Link to="/overview">Overview</Link>
                        </li>
                        <li>
                        <Link to="/buy">Buy</Link>
                        </li>
                        <li>
                        <Link to="/sell">Sell</Link>
                        </li>
                    </ul>
                    </nav>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/account" component={Account} />
                    <Route exact path="/overview" component={Overview} />
                    <Route exact path="/buy" component={Buy} />
                    <Route exact path="/sell" component={Sell} />
                </div>
            </Router>
        )
    }
}

export default App;
