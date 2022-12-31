<template>
    <div class="room">
        <div class="top">
            <!-- 房间添加 -->
            <div class="add-room">
                <el-dialog
                    title="新增客房"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose"
                >
                    <!-- 客房表单 -->
                    <el-form
                        label-position="left"
                        label-width="80px"
                        :model="roomFormData"
                        :rules="roomRules"
                        ref="roomForm"
                        :hide-required-asterisk="true"
                    >
                        <el-form-item label="房间号" prop="room_number">
                            <el-input v-model="roomFormData.room_number" placeholder="请输入房间号"></el-input>
                        </el-form-item>

                        <el-form-item label="客房价格" prop="price">
                            <el-input v-model="roomFormData.price" placeholder="请输入房间价格"></el-input>
                        </el-form-item>

                        <el-form-item label="客房类型">
                            <el-select v-model="roomFormData.type_" placeholder="请选择房间类型">
                                <el-option
                                    v-for="item in roomTypeList"
                                    :key="item.itemValue"
                                    :label="item.itemName"
                                    :value="item.itemValue"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancel">取 消</el-button>
                        <el-button type="primary" @click="submit">确 定</el-button>
                    </span>
                </el-dialog>

                <!-- dialogVisible = true -->
                <el-button type="info" plain @click="addRoomBtn">新增客房</el-button>
            </div>

            <!-- 客房搜索 -->
            <div class="search-room">
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
                        v-for="item in (searchOptionValue=='roomType'?searchKeyWordOptions1:searchKeyWordOptions2)"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <el-button type="info" plain @click="search">搜索客房</el-button>
                <el-button type="info" plain @click="searchReset">重置</el-button>
            </div>
        </div>

        <div class="middle">
            <!-- 房间表格 -->
            <!-- 表格信息 -->
            <el-table :data="roomTableData" stripe style="width: 100%" height="720" :border="true">
                <el-table-column prop="id" label="房间ID"></el-table-column>
                <el-table-column prop="room_number" label="房间号"></el-table-column>
                <el-table-column
                    prop="type_"
                    label="房间类型"
                    :formatter="(row) => roomFomatter(row.type_, roomTypeList)"
                ></el-table-column>
                <el-table-column prop="price" label="房间价格"></el-table-column>
                <el-table-column prop="room_status" label="房间状态">
                    <template slot-scope="scope">
                        <el-tag
                            :type="roomFomatter(roomFomatter(scope.row.room_status, roomStatusList),roomStatusTagList)"
                        >{{roomFomatter(scope.row.room_status, roomStatusList)}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="balance" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                title="编辑客房"
                :visible.sync="dialogVisibleEdit"
                width="30%"
                :before-close="handleCloseEdit"
            >
                <!-- 客房表单 -->
                <el-form
                    label-position="left"
                    label-width="80px"
                    :model="roomFormDataEdit"
                    ref="roomFormEdit"
                >
                    <el-form-item label="房间号" prop="room_number">
                        <el-input v-model="roomFormDataEdit.room_number"></el-input>
                    </el-form-item>

                    <el-form-item label="客房价格" prop="price">
                        <el-input v-model="roomFormDataEdit.price"></el-input>
                    </el-form-item>

                    <el-form-item label="客房类型">
                        <el-select v-model="roomFormDataEdit.type_" placeholder="请选择房间类型">
                            <el-option
                                v-for="item in roomTypeList"
                                :key="item.itemValue"
                                :label="item.itemName"
                                :value="item.itemValue"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="客房状态">
                        <el-select v-model="roomFormDataEdit.room_status" placeholder="请选择房间状态">
                            <el-option
                                v-for="item in roomStatusList"
                                :key="item.itemValue"
                                :label="item.itemName"
                                :value="item.itemValue"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelEdit">取 消</el-button>
                    <el-button type="primary" @click="submitEdit">确 定</el-button>
                </span>
            </el-dialog>
        </div>

        <div class="bottom"></div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
    name: "Room",
    data() {
        return {
            // 控制添加房间弹窗
            dialogVisible: false,
            // 控制编辑房间弹窗
            dialogVisibleEdit: false,

            // 添加--房间表单项
            roomFormData: {
                room_number: "", // 房间号
                type_: "", // 房间类型
                price: "", // 房间价格
            },

            // 编辑--房间表单项
            roomFormDataEdit: {
                room_number: "", // 房间号
                type_: "", // 房间类型
                price: "", // 房间价格
                room_status: "", // 房间状态
            },

            // 编辑房间ID
            editRoomID: 0,

            // 添加房间表单验证
            roomRules: {
                room_number: [
                    {
                        required: true,
                        message: "请输入房间房间号",
                        trigger: "blur",
                    },
                ],
                type_: [
                    {
                        required: true,
                        message: "请选择房型",
                        trigger: "change",
                    },
                ],

                price: [
                    {
                        required: true,
                        message: "请输入房间价格",
                        trigger: "blur",
                    },
                ],
            },

            // 搜索房间下拉
            searchOptions: [
                {
                    value: "roomType",
                    label: "房间类型",
                },
                {
                    value: "roomStatus",
                    label: "房间状态",
                },
            ],

            searchKeyWordOptions1: [
                {
                    value: "single",
                    label: "豪华大床房",
                },
                {
                    value: "twin",
                    label: "简约双床房",
                },
                {
                    value: "family",
                    label: "温馨家庭房",
                },
            ],

            searchKeyWordOptions2: [
                { value: "vacant", label: "空闲中" },
                { value: "occupied", label: "已住客" },
                { value: "dirty", label: "未清扫" },
                { value: "reserved", label: "已预订" },
            ],

            // 两者配合实现搜索
            // 搜索房间下拉值
            searchOptionValue: "roomType",

            // 搜索关键词
            searchKeyWord: "",

            // 表格数据
            roomTableData: [],

            // 新增or编辑dialog
            dialogType: 0,

            // 房间类型
            roomTypeList: [
                { itemValue: "single", itemName: "豪华大床房" },
                { itemValue: "twin", itemName: "简约双床房" },
                { itemValue: "family", itemName: "温馨家庭房" },
            ],

            // 房间状态
            roomStatusList: [
                { itemValue: "vacant", itemName: "空闲中" },
                { itemValue: "occupied", itemName: "已住客" },
                { itemValue: "dirty", itemName: "未清扫" },
                { itemValue: "reserved", itemName: "已预订" },
            ],

            // 房间状态表格内标签
            roomStatusTagList: [
                { itemValue: "空闲中", itemName: "success" },
                { itemValue: "已住客", itemName: "info" },
                { itemValue: "未清扫", itemName: "danger" },
                { itemValue: "已预订", itemName: "warning" },
            ],
        };
    },

    computed: {
        ...mapState("room", ["roomData"]),
    },

    methods: {
        ...mapActions("room", {
            getRoomAsync: "getRoomAsync", // 获取房间all
            addRoomAsync: "addRoomAsync", // 添加房间单个
            editRoomAsync: "editRoomAsync", // 添加房间单个
            deleteRoomAsync: "deleteRoomAsync", //删除房间单个
        }),
        ...mapMutations("room", {
            getRoomMutation: "getRoom", // 获取房间all
            addRoomMutation: "addRoom", // 添加房间单个
            editRoomMutation: "editRoom", // 添加房间单个
            deleteRoomMutation: "deleteRoom", // 删除房间单个
            searchRoomByType: "searchRoomByType", // 查询房间--类型
            searchRoomByStatus: "searchRoomByStatus", // 查询房间--状态
        }),

        // 获取所有房间列表 数据
        getRoom() {
            this.getRoomAsync();
            this.roomTableData = this.$store.state.room.roomData;
        },

        // 新增房间按钮
        addRoomBtn() {
            this.dialogVisible = true;
        },

        // 新增房间dialog关闭
        handleClose() {
            // 重置表单项数据
            this.$refs.roomForm.resetFields();
            this.dialogVisible = false;
        },

        handleCloseEdit() {
            // 重置表单项数据
            this.$refs.roomFormEdit.resetFields();
            this.dialogVisibleEdit = false;
        },

        // 新增房间dialog取消
        cancel() {
            this.handleClose();
        },

        // 编辑房间dialog取消
        cancelEdit() {
            this.handleCloseEdit();
        },

        // 新增房间dialog确定提交
        submit() {
            this.$refs.roomForm.validate((valid) => {
                if (valid) {
                    // 添加
                    let addFormFormat = {
                        room_number: this.roomFormData.room_number,
                        type_: this.roomFormData.type_,
                        price: this.roomFormData.price,
                    };
                    // 调用添加接口
                    this.addRoomAsync(addFormFormat).then(() => {
                        // 重新获取列表接口
                        this.getRoom();
                    });
                    // 清空表单数据
                    this.$refs.roomForm.resetFields();
                    // 关闭弹窗
                    this.dialogVisible = false;
                }
            });
        },

        submitEdit() {
            // 修改
            let editFormFormat = {
                id: this.editRoomID,
                room_number: this.roomFormDataEdit.room_number,
                type_: this.roomFormDataEdit.type_,
                price: this.roomFormDataEdit.price,
                room_status: this.roomFormDataEdit.room_status,
            };
            // 调用编辑接口
            this.editRoomAsync(editFormFormat);
            // 清空表单数据
            this.$refs.roomFormEdit.resetFields();
            // 关闭弹窗
            this.dialogVisibleEdit = false;
        },

        // 编辑房间
        handleEdit(row) {
            this.dialogVisibleEdit = true;
            // 注意对当前数据进行数据深拷贝，否则会出错
            this.$nextTick(() => {
                this.roomFormDataEdit.room_number = row.room_number;
                this.roomFormDataEdit.type_ = row.type_;
                this.roomFormDataEdit.price = row.price;
                this.roomFormDataEdit.room_status = row.room_status;
                this.editRoomID = row.id;
            });
        },

        // 删除房间
        handleDel(row) {
            this.$confirm("此操作将永久删除该信息，是否继续？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "waring",
            })
                .then(() => {
                    this.deleteRoomAsync(row.id).then(() => {
                        this.$message({
                            type: "success",
                            message: "删除成功",
                        });
                        // 重新获取列表接口
                        this.getRoom();
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
        roomFomatter(value, list) {
            if (value === "" || value == undefined) return "";
            const item = list.find((item) => item.itemValue == value);
            return item ? item.itemName : "";
        },

        // 搜索房间
        search() {
            if (this.searchOptionValue === "roomType") {
                this.searchRoomByType(this.searchKeyWord);
            } else if (this.searchOptionValue === "roomStatus") {
                this.searchRoomByStatus(this.searchKeyWord);
            }
        },

        // 搜索重置
        searchReset() {
            // 重新获取表格数据
            this.getRoom();
            // 搜索房间下拉值请空
            this.searchOptionValue = "roomType";
            // 搜索关键词清空
            this.searchKeyWord = "";
        },
    },

    mount() {
        this.getRoom();
    },
    created() {
        this.getRoom();
    },
};
</script>

<style scoped lang="less">
.room {
    margin: 16px;
}

.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    .search-room {
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
