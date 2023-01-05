<template>
    <div id="app">
        <!-- 路由出口 -->
        <!-- 路由所匹配的组件渲染在这里 -->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "App",

    methods: {
        bodyScale() {
            let devicewidth = document.documentElement.clientWidth; //获取当前分辨率下的可是区域宽度
            let widthScale = devicewidth / 1707; // 分母——设计稿的尺寸
            document.body.style.zoom = widthScale; //放大缩小相应倍数
            let heightScale = document.documentElement.clientHeight;
            document.body.style.height = heightScale;
        },
    },

    created() {
        this.bodyScale();
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
    padding-right: 0 !important;
}

/* 设置项目高占比视口100% */
#app {
    /* height: 100vh; */
    /* 如果采用zoom缩放适配，高度宽度都要写死 */
    height: 920px;
    background-color: #f7f6f2;
}
</style>
