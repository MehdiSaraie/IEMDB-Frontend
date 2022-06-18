import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Header';
import Login from './login/Login';
import Signup from './login/Signup';
import Movies from './movies/Movies'
import Home from './home/Home';
import { ProvideAuth, useAuth } from '../hooks/use-auth.js';

function PrivateRoute({ children, ...rest }) {
    const auth = useAuth();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.getIsLoggedIn() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}

PrivateRoute.propTypes = {
    children: PropTypes.node,
};

function PublicRoute({ children, ...rest }) {
    const auth = useAuth();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                !auth.getIsLoggedIn() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}

PublicRoute.propTypes = {
    children: PropTypes.node,
};


export default function App() {

    return (
        <ProvideAuth>
            <Router>
                <div className="body">
                    <div className="content">
                        <Switch>
                            <PublicRoute path="/login">
                                <Login />
                            </PublicRoute>
                            <PublicRoute path="/signup">
                                <Signup />
                            </PublicRoute>
                            <PrivateRoute path="/movies">
                                <Movies />
                            </PrivateRoute>
                            <PrivateRoute path="/">
                                <Home />
                            </PrivateRoute>
                        </Switch>
                    </div>

                </div>

                <ToastContainer />
            </Router>
        </ProvideAuth>
    );

}
