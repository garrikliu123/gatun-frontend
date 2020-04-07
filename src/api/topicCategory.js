import axios from './config';

const BASE_URL = "/api/topicCategory/";

function getTopicCategoryList() {
    return axios.get(BASE_URL + 'getTopicCategoryList');
}

export default {
    getTopicCategoryList
}