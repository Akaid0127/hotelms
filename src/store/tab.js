export default {
	mutations: {
		// 更新菜单展开收起方法
		isCollapseMenu(state) {
			state.isCollapse = !state.isCollapse
		},

		// 更新面包屑数据方法
		selectMenu(state, val) {
			// 判断添加的数据是否为首页
			if (val.name !== 'home') {
				// 如果存在返回当前数据的索引，如果不存在返回-1
				const index = state.tabsList.findIndex(item => item.name === val.name)
				if (index === -1) {
					state.tabsList.push(val)
				}
			}
		}
	},

	state: {
		isCollapse: false, // 控制菜单展开还是收起
		tabsList: [
			{
				path: "/",
				name: "home",
				label: "首页",
				icon: "date",
				url: "Home/Home",
			},
		] // 面包屑的初始化数据 后续在mutation里更新
	}
}
