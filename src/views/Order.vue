<template>
    <div class="order">
        <div class="top">
            <!-- 订单添加 -->
            <div class="add-order">
                <el-dialog
                    title="新增订单"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose"
                >
                    <!-- 订单表单 -->
                    <el-form
                        label-position="left"
                        label-width="80px"
                        :model="orderFormData"
                        :rules="orderRules"
                        ref="orderForm"
                        :hide-required-asterisk="true"
                    >
                        <el-form-item label="用户ID" prop="user_id">
                            <el-input v-model="orderFormData.user_id" placeholder="请输入用户ID"></el-input>
                        </el-form-item>

                        <el-form-item label="房间ID" prop="room_id">
                            <el-input v-model="orderFormData.room_id" placeholder="请输入房间ID"></el-input>
                        </el-form-item>

                        <el-form-item label="入住时间" prop="check_in_time">
                            <el-date-picker
                                v-model="orderFormData.check_in_time"
                                type="datetime"
                                placeholder="选择日期时间"
                                :picker-options="pickerOptions"
                            ></el-date-picker>
                        </el-form-item>

                        <el-form-item label="入住天数" prop="stay_length">
                            <el-input-number
                                v-model="orderFormData.stay_length"
                                :min="1"
                                :max="999"
                                label="入住天数"
                            ></el-input-number>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancel">取 消</el-button>
                        <el-button type="primary" @click="submit">确 定</el-button>
                    </span>
                </el-dialog>

                <!-- dialogVisible = true -->
                <el-button type="info" plain @click="addOrderBtn">新增订单</el-button>
            </div>

            <!-- 订单搜索 -->
            <div class="search-order">
                <el-select v-model="searchOptionValue" placeholder="请选择">
                    <el-option
                        v-for="item in searchOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <el-select v-model="searchKeyWord" placeholder="请选择">
                    <el-option
                        v-for="item in searchKeyWordOptions1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <el-button type="info" plain @click="search">搜索订单</el-button>
                <el-button type="info" plain @click="searchReset">重置</el-button>
            </div>
        </div>

        <div class="middle">
            <!-- 订单表格 -->
            <!-- 表格信息 -->
            <el-table :data="orderTableData" stripe style="width: 100%" height="750" :border="true">
                <el-table-column prop="id" label="订单ID"></el-table-column>
                <el-table-column prop="user_id" label="订单用户"></el-table-column>
                <el-table-column prop="room_id" label="订单房间"></el-table-column>
                <el-table-column
                    prop="check_in_time"
                    label="入住时间"
                    :formatter="(row) => dataFormat(row.check_in_time)"
                ></el-table-column>
                <el-table-column prop="stay_length" label="入住天数（天）"></el-table-column>
                <el-table-column prop="expense" label="订单费用（元）"></el-table-column>
                <el-table-column
                    prop="payment_status"
                    label="订单状态"
                    :formatter="(row) => orderFomatter(row.payment_status, orderStatusList)"
                >
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.payment_status === 'paid' ? 'success' : 'warning'"
                        >{{scope.row.payment_status=="paid"?"已支付":"未支付"}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="balance" label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.row)"
                        >{{scope.row.payment_status=="unpaid"?"立即支付":"取消支付"}}</el-button>
                        <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="bottom"></div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import moment from "moment";
export default {
    name: "Order",
    data() {
        let that = this;
        return {
            // 控制添加订单弹窗
            dialogVisible: false,

            // 添加--订单表单项
            orderFormData: {
                user_id: "", // 订单用户
                room_id: "", // 订单房间
                check_in_time: "", // 入住时间
                stay_length: "", // 入住天数
            },

            // 添加订单表单验证
            orderRules: {
                user_id: [
                    {
                        required: true,
                        message: "请输入订单用户id",
                        trigger: "blur",
                    },
                ],

                room_id: [
                    {
                        required: true,
                        message: "请输入订单房间id",
                        trigger: "blur",
                    },
                ],

                check_in_time: [
                    {
                        required: true,
                        message: "请输入入住时间",
                        trigger: "blur",
                    },
                ],

                stay_length: [
                    {
                        required: true,
                        message: "请输入入住天数",
                        trigger: "blur",
                    },
                ],
            },

            // 搜索订单下拉
            searchOptions: [
                {
                    value: "orderStatus",
                    label: "订单状态",
                },
            ],

            searchKeyWordOptions1: [
                {
                    value: "unpaid",
                    label: "未支付",
                },
                {
                    value: "paid",
                    label: "已支付",
                },
            ],

            searchKeyWordOptions2: [],

            // 两者配合实现搜索
            // 搜索订单下拉值
            searchOptionValue: "orderStatus",

            // 搜索关键词
            searchKeyWord: "",

            // 表格数据
            orderTableData: [],

            // 订单状态
            orderStatusList: [
                { itemValue: "unpaid", itemName: "未支付" },
                { itemValue: "paid", itemName: "已支付" },
            ],

            // 获取房间
            dayReserved: [],

            // 新增订单时对一房间已预订时间的禁用
            pickerOptions: {},
        };
    },

    watch: {
        // 监听对象单一属性的时候加引号
        "orderFormData.room_id": {
            handler(newVal, oldVal) {
                if (
                    typeof this.orderFormData.room_id === "string" &&
                    this.orderFormData.room_id !== ""
                ) {
                    this.dayReserved.splice(0, this.dayReserved.length);
                    this.reservedDayGet(newVal);
                    console.log(this.dayReserved);
                    this.pickerOptions = this.timeLimit();
                }
            },
            immediate: true,
            // 深度监听对象属性
            deep: true,
        },
    },

    computed: {
        ...mapState("order", ["orderData"]),
        ...mapState("room", ["reservedArray"]),
    },

    methods: {
        // test
        timeLimit() {
            let tempArr = this.dayReserved;
            return {
                disabledDate(time) {
                    // console.log(moment(time.getTime()).format("YYYY-MM-DD"));
                    let date = moment(time.getTime()).format("YYYY-MM-DD");
                    return tempArr.indexOf(date) == -1 ? false : true;
                },
            };
        },

        ...mapActions("order", {
            getOrderAsync: "getOrderAsync", // 获取订单all
            addOrderAsync: "addOrderAsync", // 添加订单单个
            editOrderAsync: "editOrderAsync", // 添加订单单个
            deleteOrderAsync: "deleteOrderAsync", //删除订单单个
        }),
        ...mapMutations("order", {
            getOrderMutation: "getOrder", // 获取订单all
            addOrderMutation: "addOrder", // 添加订单单个
            editOrderMutation: "editOrder", // 添加订单单个
            deleteOrderMutation: "deleteOrder", // 删除订单单个
            searchOrderByStatus: "searchOrderByStatus", // 查询订单--状态
        }),

        ...mapActions("room", {
            getRoomAsync: "getRoomAsync", // 获取订单all
        }),
        ...mapMutations("room", {
            roomReservedDay: "roomReservedDay", // 获取一房间预定时间
        }),

        // 获取所有订单列表 数据
        getOrder() {
            this.getOrderAsync();
            this.orderTableData = this.$store.state.order.orderData;
        },

        // 新增订单按钮
        addOrderBtn() {
            this.dialogVisible = true;
        },

        // 新增订单dialog关闭
        handleClose() {
            // 重置表单项数据
            this.$refs.orderForm.resetFields();
            this.dayReserved.splice(0, this.dayReserved.length);
            this.dialogVisible = false;
        },

        // 新增订单dialog取消
        cancel() {
            this.handleClose();
        },

        // 新增订单dialog确定提交
        submit() {
            this.$refs.orderForm.validate((valid) => {
                if (valid) {
                    // 添加
                    let addFormFormat = {
                        user_id: this.orderFormData.user_id,
                        room_id: this.orderFormData.room_id,
                        check_in_time: moment(
                            this.orderFormData.check_in_time
                        ).format("YYYY-MM-DD HH:mm:ss"),
                        stay_length: this.orderFormData.stay_length,
                    };
                    // 调用添加接口
                    this.addOrderAsync(addFormFormat).then(() => {
                        // 重新获取列表接口
                        this.getOrder();
                        // 及时更新room接口
                        this.getRoomAsync();
                    });
                    // 清空表单数据
                    this.$refs.orderForm.resetFields();
                    this.dayReserved.splice(0, this.dayReserved.length);
                    // 关闭弹窗
                    this.dialogVisible = false;
                }
            });
        },

        // 编辑订单
        handleEdit(row) {
            // 取反
            let editFormFormat = {
                id: row.id,
                user_id: row.user_id,
                room_id: row.room_id,
                check_in_time: row.check_in_time,
                stay_length: row.stay_length,
                expense: row.expense,
                payment_status:
                    row.payment_status == "unpaid" ? "paid" : "unpaid",
            };
            // 调用编辑接口
            this.editOrderAsync(editFormFormat).then(() => {
                if (editFormFormat.payment_status == "unpaid") {
                    this.$message({
                        message: "取消支付成功",
                        center: true,
                        type: "warning",
                    });
                } else {
                    this.$message({
                        message: "支付成功",
                        center: true,
                        type: "success",
                    });
                }
            });
        },

        // 删除订单
        handleDel(row) {
            this.$confirm("此操作将永久删除该信息，是否继续？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "waring",
            })
                .then(() => {
                    this.deleteOrderAsync(row.id).then(() => {
                        this.$message({
                            type: "success",
                            message: "删除成功",
                        });
                        // 重新获取列表接口
                        this.getOrder();
                        // 及时更新room接口
                        this.getRoomAsync();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },

        // 表格数据格式化
        orderFomatter(value, list) {
            if (value === "" || value == undefined) return "";
            const item = list.find((item) => item.itemValue == value);
            return item ? item.itemName : "";
        },

        // 搜索订单
        search() {
            if (this.searchOptionValue === "orderStatus") {
                console.log(this.searchKeyWord);
                this.searchOrderByStatus(this.searchKeyWord);
            }
        },

        // 搜索重置
        searchReset() {
            // 重新获取表格数据
            this.getOrder();
        },

        // 时间戳转换
        dataFormat(timeStamp) {
            return moment(timeStamp).format("YYYY年MM月DD日HH时");
        },

        // 房间预定日获取
        reservedDayGet(roomID) {
            this.roomReservedDay(roomID);
            let tempdata = this.$store.state.room.reservedArray;
            tempdata.forEach((item) => {
                this.dayReserved.push(item);
            });
        },
    },

    mount() {
        this.getOrder();
    },
    
    created() {
        this.getOrder();
    },
};
</script>


<style scoped lang="less">
.order {
    margin: 16px;
}

.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    .search-order {
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
