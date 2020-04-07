import * as types from './mutation-type';

const mutations = {
    [types.SET_FULLSCREEN_LOADING](state, fullScreenLoading) {
        state.fullScreenLoading = fullScreenLoading;
    },
    [types.SET_PRODUCT_LIST](state, productList) {
        state.productList = productList;
    },
    [types.SET_CATEGORY_LIST](state, categoryList) {
        state.categoryList = categoryList;
    },
    [types.SET_PRODUCT_CATEGORY_LIST](state, productCategoryList) {
        state.productCategoryList = productCategoryList;
    },
    [types.SET_ARTICLE_LIST](state, articleList) {
        state.articleList = articleList;
    },
    [types.SET_TOPIC_LIST](state, topicList) {
        state.topicList = topicList;
    },
    [types.SET_TOPIC_CATEGORY_LIST](state, topicCategoryList) {
        state.topicCategoryList = topicCategoryList;
    },
    [types.SET_HOME_SECTION_LIST](state, homeSectionList) {
        state.homeSectionList = homeSectionList;
    },
    [types.SET_USER](state, user) {
        state.user = user;
    },
}

export default mutations;