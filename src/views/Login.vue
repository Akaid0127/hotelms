<template>
    <div class="login">
        <el-card>
            <el-form ref="form" :model="loginForm" :rules="rules" :hide-required-asterisk="false">
                <h3 class="title">宾馆管理系统</h3>
                <el-form-item label="管理员工号" prop="adminName">
                    <el-input v-model="loginForm.adminName" placeholder="请输入工号"></el-input>
                </el-form-item>
                <el-form-item label="管理员密码" prop="passward">
                    <el-input type="passward" v-model="loginForm.passward" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import Cookie from "js-cookie";
import { permitLogin } from "../utils/data.js";
export default {
    name: "Login",
    data() {
        return {
            // 登录表单
            loginForm: {
                adminName: "",
                passward: "",
            },

            // 登录表单验证
            rules: {
                adminName: [
                    {
                        required: true,
                        message: "姓名不能为空",
                        trigger: "blur",
                    },
                ],
                passward: [
                    {
                        required: true,
                        message: "密码不能为空",
                        trigger: "blur",
                    },
                ],
            },
        };
    },

    methods: {
        /*  
            如何实现路由守卫
            Token
            当管理员输入完用户名和密码，可以登录主页
            通过Token进行权限的判断
            登录接口登录之后，后端会返回一个Token过来
            我们再调用具体的接口的时候再带上Token这个请求头
            后端进行Token的验证
            
            Cookie
            npm i js-cookie
            三种方法：set remove get
            存储Cookie信息
            Token信息存入cookie用于不同页面的通信

            全局前置守卫
            当一个导航触发时，全局前置守卫按照创建顺序调用
            守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中
        */

        // 登录
        submit() {
            // 校验通过
            this.$refs.form.validate((valid) => {
                if (valid) {
                    permitLogin(this.loginForm)
                        .then(({ data }) => {
                            if (data.access_token && data.access_token !== "") {
                                this.$message({
                                    message: "登录成功",
                                    center: true,
                                    type: "success",
                                });
                                // token信息存入cookie用于不同页面的通信
                                Cookie.set("token", data.access_token);
                                // 跳转到首页
                                this.$router.push("/home");
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            if (err.message === "Network Error") {
                                this.$message({
                                    message: "未连接到后台",
                                    center: true,
                                    type: "error",
                                });
                            }
                            if (
                                err.response.data.detail ===
                                "Incorrect phone_number or password"
                            ) {
                                this.$message({
                                    message: "账号或密码错误",
                                    center: true,
                                    type: "error",
                                });
                            }
                        });
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
.login {
    width: 400px;
    height: 600px;
    margin: 0 auto;
    padding-top: 200px;
    .title {
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
    }

    .el-button {
        width: 200px;
        margin-top: 20px;
        margin-left: 80px;
    }
}
</style>