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

import Login from './login/Login';
import Signup from './login/Signup';
import MoviePage from './movie/Movie';
import Movies from './movies/Movies'
import Home from './home/Home';
import { ProvideAuth, useAuth } from '../hooks/use-auth.js';
import Actor from './actor/Actor';
import Watchlist from './watchlist/Watchlist';

function PrivateRoute({ render, ...rest }) {
    const auth = useAuth();
    return (
        <Route
            {...rest}
            render={({ location, match }) => {
                return auth.getIsLoggedIn() ? (
                    render(match)
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            // state: { from: location },
                        }}
                    />
                )}
            }
        />
    );
}

function PublicRoute({ children, ...rest }) {
    const auth = useAuth();

    return (
        <Route
            {...rest}
            render={({ location }) => {
                // return !auth.getIsLoggedIn() ? (
                //     children
                // ) : (
                //     <Redirect
                //         to={{
                //             pathname: '/',
                //             state: { from: location },
                //         }}
                //     />
                // )}
                return children
            }}
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
                            <PrivateRoute path="/movies/:id" render={(match) => <MoviePage match={match} />} />
                            <PrivateRoute path="/movies" render={(match) => <Movies match={match} />} />
                            <PrivateRoute path="/actors/:id" render={(match) => <Actor match={match} />} />
                            <PrivateRoute path="/watchlist" render={(match) => <Watchlist match={match} />} />
                            <PrivateRoute path="/" render={(match) => <Home match={match} />} />
                        </Switch>
                    </div>

                </div>

                <ToastContainer />
            </Router>
        </ProvideAuth>
    );

}
