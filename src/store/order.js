import { orderGet, orderAdd, orderDelete, orderEdit } from "../utils/data.js";

export const order = {
	namespaced: true,//开启命名空间

	actions: {
		// 获取订单
		getOrderAsync(store) {
			orderGet()
				.then((response) => {
					store.commit('getOrder', response.data)
				})
				.catch((err) => {
					console.log(err);
				});
		},

		// 添加订单
		addOrderAsync(store, value) {
			orderAdd(value)
				.then((response) => {
					store.commit('addOrder', response.data)
				})
				.catch((err) => {
					console.log(err);
				});
		},

		// 编辑订单
		editOrderAsync(store, value) {
			orderEdit(value)
				.then(() => {
					store.commit('editOrder', value)
				})
				.catch((err) => {
					console.log(err);
				});
		},

		// 删除订单
		deleteOrderAsync(store, value) {
			orderDelete(value)
				.then(() => {
					store.commit('deleteOrder', value)
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},

	mutations: {
		// 获取订单
		getOrder(state, value) {
			// 先清空
			state.orderData.splice(0, state.orderData.length)
			// 接着一个一个push
			value.forEach(item => {
				state.orderData.push(item)
			})
		},

		// 添加订单
		addOrder(state, value) {
			// push追加到数组末尾
			// unshift追加到数组顶部
			state.orderData.push(value)
		},

		// 编辑订单
		editOrder(state, value) {
			// 遍历后替换
			let idIndex = state.orderData.findIndex((item) => item.id == value.id)
			state.orderData.splice(idIndex, 1, value)
		},

		// 删除订单
		deleteOrder(state, value) {
			state.orderData.forEach((item, index) => {
				if (item.id == value) {
					state.orderData.splice(index, 1)
				}
			})
		},

		searchOrderByStatus(state, value) {
			let queryData = state.orderData.filter((p) => {
				// paid 和 unpaid 都包含关键词paid
				return p.payment_status === value
			})
			state.orderData.splice(0, state.orderData.length)
			queryData.forEach(item => {
				state.orderData.push(item)
			})
		},

	},

	state: {
		orderData: [
			{
				order_number: "initFailOrder"
			}
		],

	},

	getters: {

	},
}