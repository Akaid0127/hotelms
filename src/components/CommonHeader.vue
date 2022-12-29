<template>
    <div class="header">
        <!-- 头部左侧 -->
        <div class="left-content">
            <!-- 左侧菜单展开折叠 -->
            <el-button type="info" plain size="mini" @click="handleMenu">
                <i class="el-icon-menu"></i>
            </el-button>

            <!-- 面包屑 -->
            <div class="Breadcrumb">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item
                        v-for="item in tags"
                        :key="item.name"
                        :to="{ path: item.path}"
                    >{{item.label}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>

        <!-- 头部右侧 -->
        <div class="right-content">
            <!-- 头像加下拉菜单 -->
            <el-dropdown trigger="click" size="mini" @command="handleClick">
                <span>
                    <img class="user" :src="userImg" />
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="signOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
// vuex辅助函数
import { mapState } from "vuex";
import Cookie from "js-cookie";
export default {
    name: "CommonHeader",
    data() {
        return {
            userImg: require("../assets/images/user.jpg"),
        };
    },

    methods: {
        handleMenu() {
            this.$store.commit("isCollapseMenu");
        },

        handleClick(command) {
            if (command === "signOut") {
                // 清除cookie的token信息
                Cookie.remove("token");
                // 跳转登录页面
                this.$router.push('/login')
            }
        },
    },

    computed: {
        ...mapState({
            tags: (state) => state.tab.tabsList,
        }),
    },

    mounted() {
        // console.log(this.tags);
    },
};
</script>

<style lang="less" scoped>
.header {
    height: 60px;
    display: flex;
    // 垂直居中
    align-items: center;
    // 水平两端分布
    justify-content: space-between;
    padding: 0 16px;

    .left-content {
        display: flex;
        align-items: center;
        .el-button {
            margin-right: 16px;
        }
        // 样式的穿刺
        /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner {
                font-weight: normal;
                &.is-link {
                    color: #666;
                }
            }
        }
    }

    .right-content {
        .user {
            width: 40px;
            border-radius: 50%;
        }
    }
}
</style>