<template>
    <div>
        <el-container>
            <el-aside width="auto">
                <common-aside></common-aside>
            </el-aside>
            <el-container>
                <el-header>
                    <common-header></common-header>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
import { mapActions, mapMutations } from "vuex";
export default {
    name: "Main",
    components: {
        CommonAside,
        CommonHeader,
    },
    methods: {
        // 提前更新vuexstate数据
        ...mapActions("user", {
            getUserAsync: "getUserAsync", // 获取用户all
        }),

        ...mapActions("room", {
            getRoomAsync: "getRoomAsync", // 获取房间all
        }),

        ...mapActions("order", {
            getOrderAsync: "getOrderAsync", // 获取订单all
        }),

        ...mapMutations("order", {
            ordersTotalCount: "ordersTotalCount", // 计算所有订单数
            orderTotalPaidCount: "orderTotalPaidCount", // 计算所有已支付订单数
        }),

        stateLoad() {
            // +页面重新刷新时执行
            this.getUserAsync();
            this.getRoomAsync();
            this.getOrderAsync();
        },

    },

    created() {
        this.stateLoad();
    },
};
</script>

<style>
.el-header {
    padding: 0;
    background-color: #c8c6c6;
}

.el-main {
    padding: 0;
    background-color: #f7f6f2;
}
</style>
