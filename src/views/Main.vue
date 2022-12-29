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
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
export default {
    name: "Main",
	components:{
		CommonAside,
        CommonHeader,
	}
};
</script>

<style>
.el-header{
    padding: 0;
    background-color: #C8C6C6;
}

.el-main{
    padding: 0;
    background-color: #F7F6F2;
}
</style>
