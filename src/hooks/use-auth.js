import React, { useContext, createContext } from 'react';

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

export const useAuth = () => {
    return useContext(authContext);
};

const storageKey = 'token';
export function getToken() {
    return localStorage.getItem(storageKey);
}

function useProvideAuth() {

    const setToken = (token) => {
        localStorage.setItem(storageKey, token);
    };

    const getIsLoggedIn = () => {
        return Boolean(getToken());
    };

    const login = (email, password) => {
        return loginUser(email, password).then((resp) => setToken(resp.data));
    };

    const signup = (name, nickname, birthDate, email, password) => {
        return signupUser(
            name,
            nickname,
            birthDate,
            email,
            password,
        ).then((resp) => setToken(resp.data));
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

