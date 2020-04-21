import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from 'views/Home';
import Manage from 'views/Manage';
import Category from 'views/Category';
import ProductList from 'views/Category/ProductList';
import Article from 'views/Article';
import Product from 'views/Product';
import Search from 'views/SearchResult';
import Section from 'views/ProductList';
import Account from 'views/Account';
import Checkout from 'views/Checkout';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        redirect: '/home',
    },
    // Home Page 首页
    {
        path: '/home',
        component: Home,
    },
    // Category 分类页
    {
        path: '/category/:categoryType',
        component: Category,
        props: true,
    },
    // Topic 分类页
    {
        path: '/topic/:topicName',
        component: ProductList,
        props: true,
    },
    // Product 商品页
    {
        path: '/product/:productId',
        component: Product,
        props: true,
        meta: {
            keepAlive: false
        }
    },
    {
        path: '/section/:sectionId',
        component: Section,
        props: true,
    },
    // Manage Page 管理页面
    {
        path: '/manage',
        component: Manage
    },
    {
        path: '/contact',
        component: Article,
        props: {
            title: "Contact Us"
        }
    },
    {
        path: '/about',
        component: Article,
        props: {
            title: "About Us"
        }
    },
    {
        path: '/search/:search',
        component: Search,
        props: true,
    },
    {
        path: '/account',
        component: Account,
    },
    {
        path: '/checkout',
        component: Checkout,
        meta: {
            keepAlive: false
        }
    },
    // No Match 没有匹配路径，重定向到首页
    {
        path: '*',
        redirect: '/'
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.keepAlive !== false) {
        to.meta.keepAlive = true;
    }

    const params = to.params;
    const fullPath = to.fullPath;

    if (fullPath.includes("/category")) {

        if (["products", "parameters", "applications"].indexOf(params.categoryType.toLowerCase()) ==
            -1) {
            next("/");
        }
    }

    next();


})

export default router;