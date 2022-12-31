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

    methods: {
        // 提前更新vuexstate数据
        ...mapActions("user", {
            getUserAsync: "getUserAsync", // 获取用户all
        }),

        ...mapActions("room", {
            getRoomAsync: "getRoomAsync", // 获取房间all
        }),
        stateLoad() {
            this.getUserAsync();
            this.getRoomAsync();
        },

        bodyScale() {
            let devicewidth = document.documentElement.clientWidth; //获取当前分辨率下的可是区域宽度
            let widthScale = devicewidth / 1707; // 分母——设计稿的尺寸
            document.body.style.zoom = widthScale; //放大缩小相应倍数
            let heightScale = document.documentElement.clientHeight;
            document.body.style.height = heightScale;
        },
    },
    // 解决刷新数据丢失问题
    // created() {
    //     //在页面加载时读取sessionStorage里的状态信息,然后删除sessionStorage
    //     if (sessionStorage.getItem("store")) {
    //         this.$store.replaceState(
    //             Object.assign(
    //                 {},
    //                 this.$store.state,
    //                 JSON.parse(sessionStorage.getItem("store"))
    //             )
    //         );
    //         sessionStorage.removeItem("store");
    //     }
    //     //在页面刷新时将vuex里的信息保存到sessionStorage里
    //     window.addEventListener("beforeunload", () => {
    //         sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    //     });
    // },

    mounted() {
        //console.log(document.documentElement.clientWidth)
        this.bodyScale();
        // this.stateLoad()
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
