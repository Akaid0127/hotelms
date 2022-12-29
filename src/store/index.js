import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import { user } from './user'
import { room } from './room'


Vue.use(Vuex)

// 创建Vuex实例
export default new Vuex.Store({
	// 模块化
	modules: {
		tab,
		user,
		room,
	}
})