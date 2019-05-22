import Vue from 'vue'

/** ElementUI */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/** App.vue */
import App from './App'
/** Router */
import router from './router'
/** Store */
import store from './store'
/** 图片预览组件 */
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

// require('./utils/global.js')
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/css/bootstrap-theme.css');

/** 阻止消息生产 */
Vue.config.productionTip = false;
/** 使用ElementUI */
Vue.use(ElementUI);
/** 使用文件预览组件 */
Vue.use(Viewer);

/** 构建父组件 */
Window.VueFather = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});


