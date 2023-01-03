<template>
    <div>
        <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            background-color="#4B6587"
            text-color="#fff"
            active-text-color="#ffd04b"
            ref="elMenu"
        >
            <!-- 根据是否展开显示名称 -->
            <h3>{{isCollapse ? '后台' : '宾馆后台管理系统'}}</h3>

            <!-- 左侧一级菜单 -->
            <!-- v-for遍历循环 -->
            <!-- index：菜单选项唯一标识 -->
            <!-- :index 动态绑定 -->
            <!-- clickMenu传递数据item中的path -->
            <el-menu-item
                v-for="item in noChildren"
                :key="item.name"
                :index="item.name"
                @click="clickMenu(item)"
            >
                <!-- 模板字符串拼接 -->
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{item.label}}</span>
            </el-menu-item>

            <!-- 左侧二级菜单 -->
            <!-- 遍历meunData中有子元素的菜单 -->
            <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
                <template slot="title">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{item.label}}</span>
                </template>

                <el-menu-item-group v-for="itemChildren in item.children" :key="itemChildren.label">
                    <!-- click事件要设置在点击菜单的子项目上 -->
                    <el-menu-item
                        :index="itemChildren.label"
                        @click="clickMenu(itemChildren)"
                    >{{itemChildren.label}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "CommonAside",
    data() {
        return {
            // isCollapse: false, // 控制左侧菜单是否折叠
            // 左侧菜单选项
            menuData: [
                {
                    path: "/",
                    name: "home",
                    label: "首页",
                    icon: "date",
                    url: "Home/Home",
                },
                {
                    path: "/addition",
                    name: "addition",
                    label: "订购房间",
                    icon: "alarm-clock",
                    url: "Addition/Addition",
                },
                {
                    path: "/order",
                    name: "order",
                    label: "订单管理",
                    icon: "edit-outline",
                    url: "OrderManage/OrderManage",
                },
                {
                    path: "/room",
                    name: "room",
                    label: "客房管理",
                    icon: "suitcase",
                    url: "RoomManage/RoomManage",
                },

                {
                    path: "/user",
                    name: "user",
                    label: "顾客管理",
                    icon: "user",
                    url: "UserManage/UserManage",
                },

                {
                    path: "/other",
                    label: "其他",
                    icon: "connection",
                    children: [
                        {
                            path: "/system",
                            name: "system",
                            label: "系统介绍",
                            icon: "setting",
                            url: "other/System",
                        },
                        {
                            path: "/contact",
                            name: "contact",
                            label: "联系方式",
                            icon: "phone-outline",
                            url: "other/Contact",
                        },
                    ],
                },
            ],
        };
    },

    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },

        // 点击菜单事件
        clickMenu(item) {
            // 调用router本身的push方法
            // 重复点击会报错，所以需要添加一个容错的逻辑
            // 即判断当前跳转的路径是否一致
            // this.$route.path获取当前路由路径
            if (
                this.$route.path !== item.path &&
                !(this.$route.path === "/home" && item.path === "/")
            ) {
                this.$router.push(item.path);
            }

            // 调用面包屑传递item
            this.$store.commit("selectMenu", item);
        },
    },

    computed: {
        // 计算属性需要return出去
        // 没有子菜单，得到没有子菜单的一级菜单数组
        noChildren() {
            return this.menuData.filter((item) => !item.children);
        },

        // 有子菜单，得到有子菜单的一级菜单数组（含二级菜单）
        hasChildren() {
            return this.menuData.filter((item) => item.children);
        },

        isCollapse() {
            return this.$store.state.tab.isCollapse;
        },
    },

    mounted() {
        // console.log(document.documentElement.clientHeight)
        this.$refs.elMenu.$el.style.height = document.documentElement.clientHeight
    },
};
</script>

<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    // min-height: 100vh;
    height: 924px;
    
}

.el-menu {
    // 设置占比窗口视口100%
    height: 924px;
    border: none;
    h3 {
        height: 48px;
        color: #fff;
        text-align: center;
        line-height: 48px;
    }
}
</style>