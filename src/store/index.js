import Vue from 'vue'
import Vuex from 'vuex'
<<<<<<< HEAD
import tab from './tab'
import { user } from './user'
import { room } from './room'
import { order } from './order'
=======
import createPersistedState from 'vuex-persistedstate'
import tab from './tab'
import { user } from './modules/user'
import { room } from './modules/room'
import { order } from './modules/order'
>>>>>>> 3bc577c (123)



Vue.use(Vuex)

// 创建Vuex实例
export default new Vuex.Store({
	// 模块化
	modules: {
		tab,
		user,
		room,
		order,
<<<<<<< HEAD
	}
=======
	},

	plugins: [
		// veux持久化配置
		createPersistedState({
			key: 'hotelms-client',
			paths: ['user', 'room', 'order']
		})
	]

>>>>>>> 3bc577c (123)
})