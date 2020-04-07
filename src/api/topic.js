import axios from './config';

const BASE_URL = "/api/topic/";

function addTopic(topic) {
    return axios.post(BASE_URL + 'addTopic', JSON.stringify(topic), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    });
}

function updateTopic(topic) {
    return axios.post(BASE_URL + 'updateTopic', JSON.stringify(topic), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    });
}

function deleteTopic(topicId) {
    return axios.post(BASE_URL + 'deleteTopic', JSON.stringify({
        topicId
    }), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    });
}

function getTopicList() {
    return axios.get(BASE_URL + 'getTopicList');
}

export default {
    addTopic,
    getTopicList,
    updateTopic,
    deleteTopic
}