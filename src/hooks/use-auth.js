import React, { useState, useContext, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { loginUser, signupUser } from '../services';

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

ProvideAuth.propTypes = {
    children: PropTypes.node,
};

export const useAuth = () => {
    return useContext(authContext);
};

const storageKey = 'token';
export function getToken() {
    return localStorage.getItem(storageKey);
}

function getParamToken() {
    const params = new URLSearchParams(window.location.search);
    return params.get('token');
}

function useProvideAuth() {
    const [token, _setToken] = useState('');


    useEffect(() => {
        const paramToken = getParamToken();
        const storedToken = localStorage.getItem(storageKey);

        setToken(paramToken || storedToken || '');
    });

    const setToken = (token) => {
        _setToken(token);
        localStorage.setItem(storageKey, token);
    };

    const getIsLoggedIn = () => {
        return Boolean(getParamToken() || token);
    };

    const login = (email, password) => {
        return loginUser(email, password).then((resp) => setToken(resp.data.token));
    };

    const signup = (name, nickname, birthDate, email, password) => {
        return signupUser(
            name,
            nickname,
            birthDate,
            email,
            password,
        ).then((resp) => setToken(resp.data.token));
    };

    const logout = () => {
        return setToken('');
    };

    return {
        getIsLoggedIn,
        login,
        signup,
        logout,
    };
}

