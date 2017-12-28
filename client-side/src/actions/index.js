import axios from 'axios';
import { browserHistory } from 'react-router';
import { ROOT_URL, AUTH_TOKEN_SESSION_KEY } from '../constants';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

export const authError = error => ({
    type: AUTH_ERROR,
    payload: error
});

export const signinUser = ({ email, password }) => dispatch => {
    axios
        .post(`${ROOT_URL}/signin`, {
            email,
            password
        })
        .then(response => {
            dispatch({ type: AUTH_USER });
            localStorage.setItem(AUTH_TOKEN_SESSION_KEY, response.data.token);
            browserHistory.push('/feature');
        })
        .catch(error => dispatch(authError('Bad Login Info')));
};

export const signoutUser = () => {
    localStorage.removeItem(AUTH_TOKEN_SESSION_KEY);
    return { type: UNAUTH_USER };
};

export const signupUser = ({ email, password }) => dispatch => {
    axios
        .post(`${ROOT_URL}/signup`, {
            email,
            password
        })
        .then(response => {
            dispatch({ type: AUTH_USER });
            localStorage.setItem(AUTH_TOKEN_SESSION_KEY, response.data.token);
            browserHistory.push('/feature');
        })
        .catch(response => dispatch(authError(response.response.data.error)));
};

export const fetchMessage = () => dispatch => {
    axios
        .get(ROOT_URL, {
            headers: {
                authorization: localStorage.getItem(AUTH_TOKEN_SESSION_KEY)
            }
        })
        .then(response =>
            dispatch({
                type: FETCH_MESSAGE,
                payload: response.data.message
            })
        );
};
