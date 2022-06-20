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
import MoviePage from './movie/Movie';
import Movies from './movies/Movies'
import Home from './home/Home';
import { ProvideAuth, useAuth } from '../hooks/use-auth.js';
import Actor from './actor/Actor';

function PrivateRoute({ render, ...rest }) {
    const auth = useAuth();
    console.log(auth.getIsLoggedIn())
    return (
        <Route
            {...rest}
            render={({ location, match }) =>
                auth.getIsLoggedIn() ? (
                    render(match)
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
                            <PrivateRoute path="/movies/:id" render={(match) => <MoviePage match={match} />}>
                            </PrivateRoute>
                            <PrivateRoute path="/movies" render={(match) => <Movies match={match} />}>
                            </PrivateRoute>
                            <PrivateRoute path="/actors/:id" render={(match) => <Actor match={match} />}>
                            </PrivateRoute>
                            <PrivateRoute path="/" render={(match) => <Home match={match} />}>
                            </PrivateRoute>
                        </Switch>
                    </div>

                </div>

                <ToastContainer />
            </Router>
        </ProvideAuth>
    );

}
