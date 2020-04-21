import axios from './config';

const BASE_URL = "/api/order/";




function addOrder(order) {
    return axios.post(BASE_URL + 'addOrder', JSON.stringify(order), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    });
}


function deleteOrder(orderId) {
    return axios.post(BASE_URL + 'deleteOrder', JSON.stringify({
        orderId
    }), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
    });
}

function getOrderListByUserId(userId) {
    return axios.get(BASE_URL + 'getOrderListByUserId', {
        params: {
            userId,
        }
    });
}

export default {
    addOrder,
    getOrderListByUserId,
    deleteOrder
}