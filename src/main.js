import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import service from './utils/request'
import Cookie from 'js-cookie'

Vue.config.productionTip = false

// elementui全局引入
Vue.use(ElementUI)

// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  // 判断token存不存在
  const token = Cookie.get('token')
  if (!token && to.name !== 'login') {
    // 如果token不存在，用户未登录，应该跳转登录
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    // 如果token存在，用户登录，跳转至首页
    next({ name: 'home' })
  } else {
    // 剩下执行默认
    next()
  }
})

new Vue({
  router,
  store,
  service,
  render: h => h(App),
}).$mount('#app')
