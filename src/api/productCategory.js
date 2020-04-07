import axios from './config';

const BASE_URL = "/api/productCategory/";

function getProductCategoryList() {
    return axios.get(BASE_URL + 'getProductCategoryList');
}

export default {
    getProductCategoryList
}