import { roomGet, roomAdd, roomDelete, roomEdit } from "../../utils/data.js";
import moment from "moment";
import { Message } from 'element-ui';
export const room = {
	namespaced: true,//开启命名空间

	actions: {
		// 获取房间
		getRoomAsync(store) {
			roomGet()
				.then((response) => {
					store.commit('getRoom', response.data)
				})
				.catch((err) => {
					console.log(err);
				});
		},

		// 添加房间
		addRoomAsync(store, value) {
			roomAdd(value)
				.then((response) => {
					Message({
						message: "创建房间成功",
						center: true,
						type: "success",
					});
					store.commit('addRoom', response.data)
				})
				.catch((err) => {
					if (err.response.status == 409 && err.response.statusText == "Conflict") {
						Message({
							message: "房间号已注册",
							center: true,
							type: "error",
						});
					} else if (err.response.status == 422 && err.response.statusText == "Unprocessable Entity") {
						Message({
							message: "房间号格式不正确",
							center: true,
							type: "error",
						});
					}
					console.log(err);
				});
		},

		// 编辑房间
		editRoomAsync(store, value) {
			roomEdit(value)
				.then((response) => {
					store.commit('editRoom', response.data)
				})
				.catch((err) => {
					if (err.response.status == 404) {
						Message({
							message: "房间不存在",
							center: true,
							type: "error",
						});
					}
					console.log(err);
				});
		},

		// 删除房间
		deleteRoomAsync(store, value) {
			roomDelete(value)
				.then(() => {
					store.commit('deleteRoom', value)
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},

	mutations: {
		// 获取房间
		getRoom(state, value) {
			// 先清空
			state.roomData.splice(0, state.roomData.length)
			// 接着一个一个push
			value.forEach(item => {
				state.roomData.push(item)
			})
		},

		// 添加房间
		addRoom(state, value) {
			// push追加到数组末尾
			// unshift追加到数组顶部
			state.roomData.push(value)
		},

		// 编辑房间
		editRoom(state, value) {
			// 遍历后替换

			let idIndex = state.roomData.findIndex((item) => item.id == value.id)
			state.roomData.splice(idIndex, 1, value)
		},

		// 删除房间
		deleteRoom(state, value) {
			state.roomData.forEach((item, index) => {
				if (item.id == value) {
					state.roomData.splice(index, 1)
				}
			})
		},

		// 根据房间类型模糊查询房间
		searchRoomByType(state, value) {
			let queryData = state.roomData.filter((p) => {
				return p.type_.indexOf(value) !== -1
			})
			state.roomData.splice(0, state.roomData.length)
			queryData.forEach(item => {
				state.roomData.push(item)
			})
		},

		// 根据房间状态模糊查询房间
		searchRoomByStatus(state, value) {
			let queryData = state.roomData.filter((p) => {
				return p.room_status.indexOf(value) !== -1
			})
			state.roomData.splice(0, state.roomData.length)
			queryData.forEach(item => {
				state.roomData.push(item)
			})
		},

		// 获取一房间所有预定时间--return数组YYYY-MM-DD
		roomReservedDay(state, id) {
			// 先清空
			state.reservedArray.splice(0, state.reservedArray.length)
			// number型的id 字符串型的id-yes
			let queryRoom = []
			id = parseInt(id)
			state.roomData.forEach(item => {
				if (item.id == id) {
					queryRoom.push(item)
				}
			})
			queryRoom[0].orders.forEach((item) => {
				let itemDate = moment(item.check_in_time).format("YYYY-MM-DD");
				// state.reservedArray.push(itemDate);
				for (let index = 1; index <= item.stay_length; index++) {
					state.reservedArray.push(
						moment(moment(itemDate).add(index - 1, "days")).format(
							"YYYY-MM-DD"
						)
					)
				}
			})
		},

		// 计算所有房间数
		roomTotalCount(state) {
			state.roomTotal = 0
			state.roomData.forEach(() => {
				state.roomTotal++
			})
		},

		// 计算所有已预订房间数
		roomTotalPaidCount(state) {
			state.roomTotalRes = 0
			state.roomData.forEach((item) => {
				if (item.room_status == "reserved") {
					state.roomTotalRes++
				}
			})
		},

		// 计算各类型房间数量
		roomTypeNum(state) {
			state.roomTypeNumArr = [0, 0, 0]
			state.roomData.forEach((item) => {
				if (item.type_ === "single") {
					state.roomTypeNumArr[0] += 1
				} else if (item.type_ === "twin") {
					state.roomTypeNumArr[1] += 1
				} else if (item.type_ === "family") {
					state.roomTypeNumArr[2] += 1
				}
			})
		},

		// 筛选可预订房间
		/*
			params(Object)
				-type_
				-check_in_time
				-stay_length
		*/
		reservableRoom(state, params) {
			state.reservableData.splice(0, state.reservableData.length)
			state.roomData.forEach((item) => {
				// 房间类型筛选
				if (item.type_ === params.type_) {
					let OriginalRes = [] // 原房间预定日数组
					let RequiredRes = [] // 需求房间预定日数组
					let result = false // 数组无重合
					item.orders.forEach((item) => {
						let itemDate = moment(item.check_in_time).format("YYYY-MM-DD");
						for (let index = 1; index <= item.stay_length; index++) {
							OriginalRes.push(
								moment(moment(itemDate).add(index - 1, "days")).format(
									"YYYY-MM-DD"
								)
							)
						}
					})
					for (let index = 1; index <= params.stay_length; index++) {
						RequiredRes.push(
							moment(moment(moment(params.check_in_time).format("YYYY-MM-DD")).add(index - 1, "days")).format(
								"YYYY-MM-DD"
							)
						)
					}
					// 判断是否重合
					for (let index = 0; index < OriginalRes.length; index++) {
						if (RequiredRes.includes(OriginalRes[index])) {
							result = true;
							break;
						}
					}

					// 无重合push
					if (result === false) {
						state.reservableData.push(item)
					}
				}
			})
		}

	},

	state: {
		roomData: [
			{
				room_number: "initFailRoom"
			}
		],
		// 一房间所有预定时间
		reservedArray: [],
		roomTotal: 0,
		roomTotalRes: 0,
		roomTypeNumArr: [0, 0, 0],
		reservableData: [],
	},

	getters: {

	},
}