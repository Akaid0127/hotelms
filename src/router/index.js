import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue' //done
import Addition from '../views/Addition.vue' //todo
import Order from '../views/Order.vue'
import Room from '../views/Room.vue'
import User from '../views/User.vue'
import System from '../views/other/System.vue'
import Contact from '../views/other/Contact.vue'

import Login from '../views/Login.vue'

// 1、创建路由组件
Vue.use(VueRouter)

// 2、将组件与路由进行映射
const routes = [
	// 主路由
	{
		path: '/',
		component: Main,
<<<<<<< HEAD
		redirect: '/login', // 重定向到home
=======
		redirect: '/login', // 重定向到login
>>>>>>> 3bc577c (123)
		children: [
			// 子路由
			{ path: '/home', name: 'home', component: Home },			// 首页
			{ path: '/addition', name: 'addition', component: Addition },			// 开房
			{ path: '/order', name: 'order', component: Order },		// 订单
			{ path: '/room', name: 'room', component: Room },			// 房间
			{ path: '/user', name: 'user', component: User },			// 顾客
			{ path: '/system', name: 'system', component: System },		// 系统
			{ path: '/contact', name: 'contact', component: Contact },	// 联系
		]
	},

	{
		path: '/login',
		name: 'login',
		component: Login,
	}
]

// 3、创建router实例
const router = new VueRouter({
	routes
})

// 对外进行暴露
export default router

