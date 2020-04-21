import Vue from "vue";
import ElementUI from "element-ui";
import {
    ElementTiptapPlugin
} from "element-tiptap";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import format from 'vue-text-format';
import locale from 'element-ui/lib/locale/lang/en';

Vue.use(ElementUI, {
    locale
});
Vue.use(ElementTiptapPlugin, {});
Vue.use(format);

// 引入 element ui
import "element-ui/lib/theme-chalk/index.css";
// import element-tiptap 样式
import "element-tiptap/lib/index.css";

// 全局样式
import "common/style/reset.css";
import "common/style/index.css";
import "common/style/variable.less";



Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");