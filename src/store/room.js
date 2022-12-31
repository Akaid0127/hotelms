import { roomGet, roomAdd, roomDelete, roomEdit } from "../utils/data.js";

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
					// 这里我需要返回的刚添加新的对象
					store.commit('addRoom', response.data)
				})
				.catch((err) => {
					console.log(err);
				});
		},

		// 编辑房间
		editRoomAsync(store, value) {
			roomEdit(value)
				.then(() => {
					store.commit('editRoom', value)
				})
				.catch((err) => {
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

	},

	state: {
		roomData: [
			{
				room_number: "initFailRoom"
			}
		],

	},

	getters: {

	},
}