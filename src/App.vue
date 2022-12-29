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
        stateLoad(){
            this.getUserAsync()
            this.getRoomAsync()
        }
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
    height: 100vh;
    background-color: #F7F6F2;
}
</style>
