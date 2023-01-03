import { userGet, userAdd, userDelete, userEdit } from "../../utils/data.js";

export const user = {
	namespaced: true,//开启命名空间
	actions: {

		/* 
			问题1：
			如果把axios相关操作放在action中执行，页面刷新的时候，数据会丢失，并不是替换 
			尝试1：把axios请求放在mutations中同步执行试一试--fail
			尝试2：在App.vue中监听刷新--success
		*/

		/*
			问题2：
			第一次进入user页面数据不请求
			尝试1：直接操作App.vue生命周期，强制提前载入user的state，使其缓存--success
		*/

		/*
			问题3：
			vuex中state数组对象内容改变页面不刷新
			尝试1：扩展运算符深度拷贝，强制赋值--fail
			尝试2：有可能是state没有监听到对象内容的改变，需要vuex深度监听--fail
			尝试3：新建一个数组--fail
			尝试4：vue.set
		*/


		// 对数组来讲，修改数组的方法有
		// pop、shift、unshift、splice、sort、reverse 、push 七种方法


		// 获取用户
		getUserAsync(store) {
			// 使用axios发送异步请求
			userGet()
				.then((response) => {
					store.commit('getUser', response.data)
				})
				.catch((err) => {
					console.log(err);
				});
		},

		// 添加用户
		addUserAsync(store, value) {
			userAdd(value)
				.then((response) => {
					// 这里我需要返回的刚添加新的对象
					store.commit('addUser', response.data)
				})
				.catch((err) => {
					console.log(err);
				});
		},

		// 编辑用户
		editUserAsync(store, value) {
			userEdit(value)
				.then((response) => {
					store.commit('editUser', response.data)
				})
				.catch((err) => {
					console.log(err);
				});
		},

		// 删除用户
		deleteUserAsync(store, value) {
			userDelete(value)
				.then(() => {
					store.commit('deleteUser', value)
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
	
	mutations: {
		// 获取用户
		getUser(state, value) {
			// 先清空
			state.userData.splice(0, state.userData.length)
			// 接着一个一个push
			value.forEach(item => {
				state.userData.push(item)
			})
		},

		// 添加用户
		addUser(state, value) {
			// push追加到数组末尾
			// unshift追加到数组顶部
			state.userData.push(value)
		},

		// 编辑用户
		editUser(state, value) {
			// 遍历后替换
			let idIndex = state.userData.findIndex((item) => item.id == value.id)
			state.userData.splice(idIndex, 1, value)
		},

		// 删除用户
		deleteUser(state, value) {
			state.userData.forEach((item, index) => {
				if (item.id == value) {
					state.userData.splice(index, 1)
				}
			})
		},

		// 根据姓名模糊查询用户
		searchUserByName(state, value) {
			let queryData = state.userData.filter((p) => {
				return p.name.indexOf(value) !== -1
			})
			state.userData.splice(0, state.userData.length)
			queryData.forEach(item => {
				state.userData.push(item)
			})
		},

		// 根据手机模糊查询用户
		searchUserByPhone(state, value) {
			let queryData = state.userData.filter((p) => {
				return p.phone_number.indexOf(value) !== -1
			})
			state.userData.splice(0, state.userData.length)
			queryData.forEach(item => {
				state.userData.push(item)
			})
		},

		// 根据身份证号模糊查询用户
		searchUserByIdent(state, value) {
			let queryData = state.userData.filter((p) => {
				return p.identity_number.indexOf(value) !== -1
			})
			state.userData.splice(0, state.userData.length)
			queryData.forEach(item => {
				state.userData.push(item)
			})
		},

	},

	state: {
		userData: [
			{
				name: "initFailUser"
			}
		]
	},

	getters: {

	},
}
