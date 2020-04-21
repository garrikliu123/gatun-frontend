import * as types from "./mutation-type";

import categoryApi from "api/category";
import productApi from "api/product";
import productCategoryApi from "api/productCategory";
import topicCategoryApi from "api/topicCategory";
import articleApi from "api/article";
import topicApi from "api/topic";
import homeSectionApi from "api/homeSection";
import userApi from "api/user";
import orderApi from "api/order";
import _ from "lodash";

export const setFullScreenLoading = function({
    commit
}, value) {
    commit(types.SET_FULLSCREEN_LOADING, value);
};

export const setUser = function({
    commit
}, value) {
    commit(types.SET_USER, value);
    window.localStorage.setItem("gatunUserId", value.userId);
};

export const setCart = function({
    commit
}, list) {
    commit(types.SET_SHOPPING_CART, list);
    window.localStorage.setItem("gatunCart", JSON.stringify(list));

};

export const addProudctToCart = function({
    commit,
    state
}, product) {
    const list = _.cloneDeep(state.shoppingCart);
    const matchedProduct = list.find(item => {
        return item.productId == product.productId && item.option == product.option;
    });

    if (matchedProduct) {
        matchedProduct.amount += product.amount;
    } else {
        list.push(product);
    }

    commit(types.SET_SHOPPING_CART, list);
};

export const deleteProudctFromCart = function({
    commit,
    state
}, productId) {
    const list = [...state.shoppingCart];
    const index = list.findIndex(item => {
        item.id === productId;
    });

    list.splice(index, 1);
    commit(types.SET_SHOPPING_CART, list);
};

export const clearCart = function({
    commit
}) {
    commit(types.SET_SHOPPING_CART, []);
};

export const logout = function({
    commit
}) {
    commit(types.SET_USER, null);
    window.localStorage.removeItem("gatunUserId");
};

export const getProductList = function({
    commit
}) {
    return productApi.getProductList().then(res1 => {
        productCategoryApi.getProductCategoryList().then(res2 => {
            commit(types.SET_PRODUCT_LIST, res1.data);
            commit(types.SET_PRODUCT_CATEGORY_LIST, res2.data);
        });
    });
};

export const getOrderHistory = function({
    commit
}, userId) {
    return orderApi.getOrderListByUserId(userId).then(res => {
        if (res.success) {
            const orderHistory = res.orderlist.map(item => {
                item.orderDetail = JSON.parse(item.orderDetail);
                item.orderShipping = JSON.parse(item.orderShipping);
                return item;
            })
            commit(types.SET_ORDER_HISTORY, orderHistory);
        }
    });
};

export const getArticleList = function({
    commit
}) {
    return articleApi.getArticleList().then(res => {
        commit(types.SET_ARTICLE_LIST, res.data);
    });
};

export const getTopicList = function({
    commit
}) {
    return topicApi.getTopicList().then(res1 => {
        topicCategoryApi.getTopicCategoryList().then(res2 => {
            commit(types.SET_TOPIC_LIST, res1.data);
            commit(types.SET_TOPIC_CATEGORY_LIST, res2.data);
        });
    });
};

export const getCategoryList = function({
    commit
}) {
    return categoryApi.getCategoryList().then(res => {
        commit(types.SET_CATEGORY_LIST, res.data);
    });
};

export const getHomeSectionList = function({
    commit
}) {
    return homeSectionApi.getSectionList().then(res => {
        commit(types.SET_HOME_SECTION_LIST, res.data);
    });
};

// 启动播放器
export const initSite = function({
    dispatch
}) {
    dispatch("getProductList")
        .then(() => {
            return dispatch("getCategoryList");
        })
        .then(() => {
            return dispatch("getArticleList");
        })
        .then(() => {
            return dispatch("getTopicList");
        })
        .then(() => {
            return dispatch("getHomeSectionList");
        })
        .then(() => {
            const userId = window.localStorage.getItem("gatunUserId");
            const cartJson = window.localStorage.getItem("gatunCart");
            const cart = JSON.parse(cartJson);
            if (cart && Array.isArray(cart)) {
                dispatch("setCart", cart);
            } else {
                dispatch("setCart", []);
            }
            if (userId) {
                userApi.getUserById(userId).then(res => {
                    if (res.success) {
                        dispatch("setUser", res.user);
                        dispatch("getOrderHistory", userId);
                    }
                });
            }
        });
};