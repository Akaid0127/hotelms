import { orderGet, orderAdd, orderDelete, orderEdit } from "../../utils/data.js";
import moment from "moment";
import { Message } from 'element-ui';

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
					Message({
						message: "创建订单成功",
						center: true,
						type: "success",
					});
					store.commit('addOrder', response.data)
				})
				.catch((err) => {
					console.log(err);

					if (err.response.status == 404) {
						Message({
							message: "用户或房间不存在",
							center: true,
							type: "error",
						});
					}
				});
		},

		// 编辑订单
		editOrderAsync(store, value) {
			orderEdit(value)
				.then((response) => {
					store.commit('editOrder', response.data)
				})
				.catch((err) => {
					if (err.response.status == 404) {
						Message({
							message: "订单不存在",
							center: true,
							type: "error",
						});
					}
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

		// 搜索订单--状态
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


		// 计算所有订单数
		ordersTotalCount(state) {
			state.orderTotal = 0
			state.orderData.forEach(() => {
				state.orderTotal++
			})
		},

		// 计算所有已支付订单数
		orderTotalPaidCount(state) {
			state.orderTotalPaid = 0
			state.orderData.forEach((item) => {
				if (item.payment_status == "paid") {
					state.orderTotalPaid++
				}
			})
		},

		// 计算月度营业额
		orderPaidMonth(state) {
			state.orderPaidMonthArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			state.orderData.forEach((item) => {
				let orderMonth = parseInt(moment(item.check_in_time).format("MM"))
				state.orderPaidMonthArr[orderMonth - 1] += item.expense
			})
		},


		// 计算月度订单数
		orderNumMonth(state) {
			state.orderNumMonthArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			state.orderData.forEach((item) => {
				let orderMonth = parseInt(moment(item.check_in_time).format("MM"))
				state.orderNumMonthArr[orderMonth - 1] += 1
			})
		},

		// 计算星期订单数
		orderNumWeek(state) {
			state.orderNumWeekArr = [0, 0, 0, 0, 0, 0, 0]
			state.orderData.forEach((item) => {
				let orderWeek = parseInt(moment(item.check_in_time).format("d"))
				state.orderNumWeekArr[orderWeek] += 1
			})
		}


	},

	state: {
		orderData: [
			{
				order_number: "initFailOrder"
			}
		],

		orderTotal: 0,

		orderTotalPaid: 0,

		orderPaidMonthArr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

		orderNumMonthArr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

		orderNumWeekArr: [0, 0, 0, 0, 0, 0, 0],
	},

	getters: {

	},
}