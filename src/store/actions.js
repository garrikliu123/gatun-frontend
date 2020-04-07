import * as types from "./mutation-type";

import categoryApi from "api/category";
import productApi from "api/product";
import productCategoryApi from "api/productCategory";
import topicCategoryApi from "api/topicCategory";
import articleApi from "api/article";
import topicApi from "api/topic";
import homeSectionApi from "api/homeSection";
import userApi from "api/user";

export const setFullScreenLoading = function({
    commit
}, value) {
    commit(types.SET_FULLSCREEN_LOADING, value);

};

export const setUser = function({
    commit
}, value) {
    commit(types.SET_USER, value);
    window.localStorage.setItem('userEmail', value.userEmail);
};

export const logout = function({
    commit
}) {
    commit(types.SET_USER, null);
    window.localStorage.removeItem('userEmail');
};


export const getProductList = function({
    commit
}) {
    return productApi.getProductList().then(res1 => {
        productCategoryApi.getProductCategoryList().then(res2 => {
            commit(types.SET_PRODUCT_LIST, res1.data);
            commit(types.SET_PRODUCT_CATEGORY_LIST, res2.data);
        })

    })
};

export const getArticleList = function({
    commit
}) {
    return articleApi.getArticleList().then(res => {
        commit(types.SET_ARTICLE_LIST, res.data);
    })
};

export const getTopicList = function({
    commit
}) {
    return topicApi.getTopicList().then(res1 => {
        topicCategoryApi.getTopicCategoryList().then(res2 => {
            commit(types.SET_TOPIC_LIST, res1.data);
            commit(types.SET_TOPIC_CATEGORY_LIST, res2.data);
        })
    })
};

export const getCategoryList = function({
    commit
}) {
    return categoryApi.getCategoryList().then(res => {
        commit(types.SET_CATEGORY_LIST, res.data);
    })
};

export const getHomeSectionList = function({
    commit
}) {
    return homeSectionApi.getSectionList().then(res => {
        commit(types.SET_HOME_SECTION_LIST, res.data);
    })
};


// 启动播放器
export const initSite = function({
    dispatch,
}) {
    dispatch("getProductList").then(() => {
        return dispatch("getCategoryList");
    }).then(() => {
        return dispatch("getArticleList");
    }).then(() => {
        return dispatch("getTopicList");
    }).then(() => {
        return dispatch("getHomeSectionList");
    }).then(() => {
        const email = window.localStorage.getItem("userEmail");
        if (email) {
            userApi.getUserByEmail(email).then(res => {
                if (res.success) {
                    dispatch("setUser", {
                        userEmail: res.data.userEmail,
                        isManager: res.data.userType == 'manager'
                    })
                }
            })
        }
    })
};