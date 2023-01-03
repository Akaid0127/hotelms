<template>
    <div>
        <div class="addAdmin">
            <el-form ref="adminForm" :model="adminForm" label-width="80px">
                <el-form-item label="工号">
                    <el-input v-model="adminForm.job_number"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="adminForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="adminForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="createAdminBtn">立即创建</el-button>
                </el-form-item>
            </el-form>
            <el-input v-model="password"></el-input>
            <el-button type="danger" @click="adminDeleteBtn">删除me</el-button>
        </div>
    </div>
</template>

<script>
import { adminAdd, adminDelete } from "../../utils/data.js";

export default {
    name: "System",
    data() {
        return {
            adminForm: {
                job_number: "",
                name: "",
                password: "",
            },

            password: "",
        };
    },

    methods: {
        createAdminBtn() {
            adminAdd(this.adminForm);
        },

        adminDeleteBtn() {
            adminDelete(this.password);
        },
    },
};
</script>

<style>
.addAdmin {
    margin: 16px;
    width: 350px;
    height: 300px;
}
</style>
