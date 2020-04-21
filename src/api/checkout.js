import axios from './config';

const BASE_URL = "/checkout/";



function createSession(data) {
    return axios.post(BASE_URL + 'createSession', data, {
        header: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
        }
    });
}

function checkSession(sessionId) {
    return axios.get(BASE_URL + 'checkSession', {
        params: {
            sessionId: sessionId
        }
    });
}

export default {
    createSession,
    checkSession
}