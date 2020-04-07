import axios from './config';

const BASE_URL = "/api/article/";

function addArticle(article) {
    return axios.post(BASE_URL + 'addArticle', JSON.stringify(article), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    });
}

function updateArticle(article) {
    return axios.post(BASE_URL + 'updateArticle', JSON.stringify(article), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    });
}

function deleteArticle(articleId) {
    return axios.post(BASE_URL + 'deleteArticle', JSON.stringify({
        articleId
    }), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    });
}

function getArticleList() {
    return axios.get(BASE_URL + 'getArticleList');
}

export default {
    addArticle,
    getArticleList,
    updateArticle,
    deleteArticle
}