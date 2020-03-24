import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, NavLink } from './react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
import Login from './components/Login';
import Private from './components/Private';
import NavHeader from './components/NavHeader';
import 'bootstrap/dist/css/bootstrap.css';
/**
 * Router是路由容器
 * Route是路由规则,一个Route代表一个路由规则
 */
ReactDOM.render(
    <Router>
        <>
            <div className="navbar navbar-inverse">
                <div className="container-fluid">
                    <NavHeader title="珠峰" />
                    <ul className="nav navbar-nav">
                        <li><NavLink exact={true} to="/">Home</NavLink></li>
                        <li><NavLink to="/user">User</NavLink></li>
                        <li><NavLink to="/profile">Profile</NavLink></li>
                        <li><NavLink to="/login">Login</NavLink></li>
                    </ul>
                    <ul className="nav navbar-right">
                        张三
                    </ul>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Switch>
                            <Route exact={true} path="/" component={Home} />
                            <Route path="/user" component={User} />
                            <Private path="/profile" component={Profile} />
                            <Route path="/login" component={Login} />
                            <Redirect from="/home" to="/" />
                        </Switch>
                    </div>
                </div>
            </div>
        </>
    </Router>, document.getElementById('root')
);

/* switch(xx){
    case 1:
        break;
    case 2:
            break;
} */