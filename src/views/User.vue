<template>
    <div class="user">
        <div class="top">
            <!-- 用户添加 -->
            <div class="add-user">
                <el-dialog
                    :title="dialogType===0?'新增用户':'编辑用户'"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose"
                >
                    <!-- 新增用户表单 -->
                    <el-form
                        label-position="left"
                        label-width="80px"
                        :model="userFormData"
                        :rules="userRules"
                        ref="userForm"
                    >
                        <el-form-item label="用户姓名" prop="name">
                            <el-input v-model="userFormData.name"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="phone_number">
                            <el-input v-model="userFormData.phone_number"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号" prop="identity_number">
                            <el-input v-model="userFormData.identity_number"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancel">取 消</el-button>
                        <el-button type="primary" @click="submit">确 定</el-button>
                    </span>
                </el-dialog>
                <!-- dialogVisible = true -->
                <el-button type="info" plain @click="addUserBtn">新增用户</el-button>
            </div>
            <!-- 用户搜索 -->
            <div class="search-user">
                <el-select v-model="searchOptionValue" placeholder="请选择">
                    <el-option
                        v-for="item in searchOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <el-input v-model="searchKeyWord" placeholder="请输入关键词"></el-input>
                <el-button type="info" plain @click="search">搜索用户</el-button>
                <el-button type="info" plain @click="searchReset">重置</el-button>
            </div>
        </div>

        <div class="middle">
            <!-- 用户表格 -->
            <!-- 表格信息 -->
            <el-table :data="userTableData" stripe style="width: 100%" height="750" :border="true">
                <el-table-column prop="id" label="用户ID"></el-table-column>
                <el-table-column prop="name" label="用户姓名"></el-table-column>
                <el-table-column prop="phone_number" label="手机号码"></el-table-column>
                <el-table-column prop="identity_number" label="身份证号"></el-table-column>
                <el-table-column prop="balance" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="bottom">
            <!-- 用户表格分页 -->
        </div>
    </div>
</template>

<script>
import { mapState,  mapActions, mapMutations } from "vuex";
export default {
    name: "User",
    data() {
        return {
            // 控制弹窗，支持.sync修饰符
            dialogVisible: false,
            // 用户表单项
            userFormData: {
                name: "", // 用户姓名
                phone_number: "", // 用户手机号码
                identity_number: "", // 用户身份证号码
            },

            // 编辑用户ID
            editUserID: 0,

            // 添加用户表单验证
            userRules: {
                name: [
                    {
                        required: true,
                        message: "请输入姓名",
                        trigger: "blur",
                    },
                ],
                phone_number: [
                    {
                        required: true,
                        message: "请输入手机号码",
                        trigger: "blur",
                    },
                ],
                identity_number: [
                    {
                        required: true,
                        message: "请输入身份证号",
                        trigger: "blur",
                    },
                ],
            },

            // 搜索用户下拉
            searchOptions: [
                {
                    value: "userName",
                    label: "用户姓名",
                },
                {
                    value: "userTel",
                    label: "手机号码",
                },
                {
                    value: "userIdentity",
                    label: "身份证号",
                },
            ],

            // 搜索用户下拉值
            searchOptionValue: "userName",

            // 搜索关键词
            searchKeyWord: "",

            // 表格数据
            userTableData: [],

            // 新增or编辑dialog
            dialogType: 0,
        };
    },

    computed: {
        ...mapState("user", ["userData"]),
    },

    methods: {
        ...mapActions("user", {
            getUserAsync: "getUserAsync", // 获取用户all
            addUserAsync: "addUserAsync", // 添加用户单个
            editUserAsync: "editUserAsync", // 添加用户单个
            deleteUserAsync: "deleteUserAsync", //删除用户单个
        }),
        ...mapMutations("user", {
            getUserMutation: "getUser", // 获取用户all
            addUserMutation: "addUser", // 添加用户单个
            editUserMutation: "editUser", // 添加用户单个
            deleteUserMutation: "deleteUser", // 删除用户单个
            searchUserByName: "searchUserByName", // 查询用户--姓名
            searchUserByPhone: "searchUserByPhone", // 查询用户--手机号
            searchUserByIdent: "searchUserByIdent", // 查询用户--身份证
        }),

        // 获取所有用户列表 数据
        getUser() {
            this.getUserAsync();
            // 更新表格用户数据
            this.userTableData = this.$store.state.user.userData;
        },

        // 新增用户按钮
        addUserBtn() {
            this.dialogType = 0;
            this.dialogVisible = true;
        },

        // 新增用户dialog关闭
        handleClose() {
            // 重置表单项数据
            this.$refs.userForm.resetFields();
            this.dialogVisible = false;
        },

        // 新增用户dialog取消
        cancel() {
            this.handleClose();
        },

        // 新增用户dialog确定提交
        submit() {
            /*
                validate()
                对整个表单进行校验的方法，参数为一个回调函数。
                该回调函数会在校验结束后被调用，并传入两个参数：
                是否校验成功和未通过校验的字段。
                若不传入回调函数，则会返回一个 promise
            */
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    if (this.dialogType === 0) {
                        // 后续对表单数据的处理
                        // 新建一个表单格式化对象
                        let addFormFormat = {
                            name: this.userFormData.name,
                            phone_number: this.userFormData.phone_number,
                            identity_number: this.userFormData.identity_number,
                            pwd: "initpassward",
                        };
                        // 调用添加接口
                        this.addUserAsync(addFormFormat).then(() => {
                            // 重新获取列表接口
                            this.getUser();
                        });
                    } else {
                        let editFormFormat = {
                            id: this.editUserID,
                            name: this.userFormData.name,
                            phone_number: this.userFormData.phone_number,
                            identity_number: this.userFormData.identity_number,
                        };

                        // 调用编辑接口
                        this.editUserAsync(editFormFormat).then(() => {
                            // 这里不能重新调用获取列表接口，会有概率使页面修改失效
                            // this.getUser();
                        });
                    }
                    // 清空表单数据
                    this.$refs.userForm.resetFields();
                    // 关闭弹窗
                    this.dialogVisible = false;
                }
            });
        },

        // 编辑用户
        handleEdit(row) {
            this.dialogType = 1;
            this.dialogVisible = true;
            // 注意对当前数据进行数据深拷贝，否则会出错
            // 将为表单对象赋值的操作放在对话框显示之后的一个执行周期执行
            this.$nextTick(() => {
                this.userFormData = { ...row };
            });
            this.editUserID = row.id;
        },

        // 删除用户
        handleDel(row) {
            console.log("row.id" + row.id);
            this.$confirm("此操作将永久删除该信息，是否继续？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "waring",
            })
                .then(() => {
                    this.deleteUserAsync(row.id).then(() => {
                        this.$message({
                            type: "success",
                            message: "删除成功",
                        });
                        // 重新获取列表接口
                        this.getUser();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },

        // 搜索用户
        search() {
            if (this.searchOptionValue === "userName") {
                this.searchUserByName(this.searchKeyWord);
            } else if (this.searchOptionValue === "userTel") {
                this.searchUserByPhone(this.searchKeyWord);
            } else if (this.searchOptionValue === "userIdentity") {
                this.searchUserByIdent(this.searchKeyWord);
            }
        },

        // 搜索用户重置
        searchReset() {
            // 重新获取表格数据
            this.getUser();
            // 搜索用户下拉值请空
            this.searchOptionValue = "userName";
            // 搜索关键词清空
            this.searchKeyWord = "";
        },
    },

    mount() {
        // 组件挂载获取后台数据
        this.getUser();
    },

    updated() {
        // 搜索input框为空时重新加载表格获取后台数据
        // if ((this.searchKeyWord == "")) {
        //     this.getUser();
        // }
    },

    created() {
        // 组件创造获取后台数据
        this.getUser();
    },
};
</script>

<style scoped lang="less">
.user {
    margin: 16px;
}

.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    .search-user {
        display: flex;
        justify-content: center;
        align-items: center;
        .el-select {
            margin-right: 8px;
        }
        .el-input {
            margin-right: 8px;
        }
    }
}
</style>