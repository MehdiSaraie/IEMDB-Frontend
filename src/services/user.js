import axios from './base';
import { getToken } from '../hooks/use-auth';

export function signupUser(name, nickname, birthDate, email, password) {
    return axios('users/signup', {
        method: 'POST',
        params: {
            name,
            nickname,
            birthDate,
            email,
            password,
        }
    });
}

export function loginUser(email, password) {
    return axios('users/login', {
        method: 'POST',
        params: {
            email,
            password,
        },
    });
}


