<template>
    <div id="app">
        <!-- 路由出口 -->
        <!-- 路由所匹配的组件渲染在这里 -->
        <router-view></router-view>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
    name: "App",
    components: {},
    data() {
        return {};
    },
    // computed: {
    //     ...mapState("order", ["orderData", "orderTotal", "orderTotalPaid"]),
    //     ...mapState("room", ["roomData", "roomTotal", "roomTotalRes"]),
    //     ...mapState("user", ["userData"]),
    // },
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

        bodyScale() {
            let devicewidth = document.documentElement.clientWidth; //获取当前分辨率下的可是区域宽度
            let widthScale = devicewidth / 1707; // 分母——设计稿的尺寸
            document.body.style.zoom = widthScale; //放大缩小相应倍数
            let heightScale = document.documentElement.clientHeight;
            document.body.style.height = heightScale;
        },
    },

    beforeMount() {},

    created() {
        this.bodyScale();
        this.stateLoad();
    },
};
</script>

<style>
/* 去除浏览器默认样式 */
html,
body,
p,
h3 {
    margin: 0;
    padding: 0;
}

/* 设置项目高占比视口100% */
#app {
    /* height: 100vh; */
    /* 如果采用zoom缩放适配，高度宽度都要写死 */
    height: 924px;
    background-color: #f7f6f2;
}
</style>
