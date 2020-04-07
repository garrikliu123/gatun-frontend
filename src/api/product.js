import axios from './config';

const BASE_URL = "/api/product/";

function addProduct(product) {
    return axios.post(BASE_URL + 'addProduct', JSON.stringify(product), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    });
}

function updateProduct(product) {
    return axios.post(BASE_URL + 'updateProduct', JSON.stringify(product), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    });
}

function deleteProduct(productId) {
    return axios.post(BASE_URL + 'deleteProduct', JSON.stringify({
        productId
    }), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    });
}

function getProductList() {
    return axios.get(BASE_URL + 'getProductList');
}

export default {
    addProduct,
    getProductList,
    deleteProduct,
    updateProduct
}