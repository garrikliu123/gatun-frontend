export const user = (state) => {
    return state.user
}

export const fullScreenLoading = (state) => {
    return state.fullScreenLoading
}

export const productList = (state) => {
    return state.productList
}

export const productListObj = (state) => {
    const obj = {};
    state.productList.forEach(item => {
        obj[item.productId] = item;
    })

    return obj;
}

export const categoryList = (state) => {
    return state.categoryList
}

export const productCategoryList = (state) => {
    return state.productCategoryList
}

export const articleList = (state) => {
    return state.articleList
}

export const topicList = (state) => {
    return state.topicList
}

export const topicCategoryList = (state) => {
    return state.topicCategoryList
}

export const shoppingCart = (state) => {
    return state.shoppingCart
}

export const orderHistory = (state) => {
    return state.orderHistory
}

export const screenWidth = (state) => {
    return state.screenWidth
}

export const isPhoneSize = (state) => {
    return state.isPhoneSize
}

export const homeSectionList = (state) => {
    const list = [];

    state.homeSectionList.forEach(item => {
        const obj = JSON.parse(item.sectionData);
        obj.sectionId = item.sectionId;
        list.push(obj);
    })

    return list;
}