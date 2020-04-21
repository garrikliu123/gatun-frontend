import axios from './config';

const BASE_URL = "/api/user/";

function login(user) {
    return axios.post(BASE_URL + 'login', JSON.stringify(user), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    });
}

function addUser(user) {
    return axios.post(BASE_URL + 'addUser', JSON.stringify(user), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    });
}

function updateUser(user) {
    return axios.post(BASE_URL + 'updateUser', JSON.stringify(user), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    });
}

function deleteUser(userEmail) {
    return axios.post(BASE_URL + 'deleteUser', JSON.stringify({
        userEmail
    }), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    });
}

function getUserList() {
    return axios.get(BASE_URL + 'getUserList');
}

function getUserByEmail(userEmail) {
    return axios.get(BASE_URL + 'getUserByEmail', {
        params: {
            userEmail,
        }
    });
}

function getUserById(userId) {
    return axios.get(BASE_URL + 'getUserById', {
        params: {
            userId,
        }
    });
}

export default {
    addUser,
    getUserList,
    updateUser,
    deleteUser,
    login,
    getUserByEmail,
    getUserById
}