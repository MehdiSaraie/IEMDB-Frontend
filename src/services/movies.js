import axios from './base';
import { getToken } from '../hooks/use-auth';

export function getMovies(name, genre, releaseDate, sortBy, actor_id) {
    return axios('/movies', {
        method: 'GET',
        params: {name, genre, releaseDate, sortBy, actor_id},
        headers: {
            'Authorization': getToken(),
        },
    });
}

export function getMovie(movie_id) {
    return axios(`/movies/${movie_id}`, {
        method: 'GET',
        headers: {
            'Authorization': getToken(),
        },
    });
}

export function addRate(movie_id, rate) {
    return axios(`/movies/${movie_id}/addRate`, {
        method: 'POST',
        param: {rate},
        headers: {
            'Authorization': getToken(),
        },
    });
}

export function addComment(movie_id, commentText) {
    return axios(`/movies/${movie_id}/addComment`, {
        method: 'POST',
        data: {
            commentText,
        },
        headers: {
            'Authorization': getToken(),
        },
    });
}
