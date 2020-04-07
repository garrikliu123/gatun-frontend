import axios from './config';

const BASE_URL = "/api/category/";

function addCategory(category) {
    return axios.post(BASE_URL + 'addCategory', JSON.stringify(category), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    });
}

function updateCategory(category) {
    return axios.post(BASE_URL + 'updateCategory', JSON.stringify(category), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    });
}

function deleteCategory(categoryId) {
    return axios.post(BASE_URL + 'deleteCategory', JSON.stringify({
        categoryId
    }), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    });
}

function getCategoryList() {
    return axios.get(BASE_URL + 'getCategoryList');
}

export default {
    addCategory,
    getCategoryList,
    updateCategory,
    deleteCategory
}