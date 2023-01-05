<template>
    <div>
        <el-row>
            <el-col :span="6">
                <!-- 订房表单 -->
                <el-card class="content1">
                    <div class="title">
                        <i class="el-icon-lock"></i>
                        查看空房信息
                    </div>
                    <div>
                        <el-form
                            ref="form"
                            :model="orderRoomForm"
                            label-width="200px"
                            label-position="top"
                        >
                            <el-form-item prop="type_" label="房型选择">
                                <el-radio-group v-model="orderRoomForm.type_">
                                    <div class="room-radio">
                                        <el-radio
                                            v-for="item in roomTypeList"
                                            :key="item.itemValue"
                                            :label="item.itemValue"
                                            border
                                        >{{item.itemName}}</el-radio>
                                    </div>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item prop="check_in_time" label="入住日期">
                                <el-date-picker
                                    v-model="orderRoomForm.check_in_time"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    style="width: 97%;"
                                ></el-date-picker>
                            </el-form-item>

                            <el-form-item prop="stay_length" label="入住天数">
                                <el-input-number
                                    v-model="orderRoomForm.stay_length"
                                    :min="1"
                                    :max="999"
                                    style="width: 97%;"
                                ></el-input-number>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="10">
                <!-- 酒店介绍 -->
                <div class="content2">
                    <div class="title">
                        <span>
                            <h2>南工杨氏集团宾馆</h2>
                        </span>
                        <el-tag size="mini" type="info">推荐双人入住</el-tag>
                        <el-tag size="mini" type="info">机场班车</el-tag>
                        <el-tag size="mini" type="success">可持续旅行住宿</el-tag>
                        <br />
                        <i class="el-icon-map-location"></i>
                        <span class="loaction">
                            南京市, 浦口区, 浦珠南路30号南苑10-616 -
                            <span class="map">位置超赞 - 查看地图</span> - 靠近地铁站
                        </span>
                    </div>
                    <div class="roomImage">
                        <div class="image-top">
                            <div class="image-left">
                                <div class="image-left-top">
                                    <img src="../assets/images/additionImage/room1.jpg" alt />
                                </div>
                                <div class="image-left-bottom">
                                    <img src="../assets/images/additionImage/room2.jpg" alt />
                                </div>
                            </div>
                            <div class="image-right">
                                <img src="../assets/images/additionImage/room3.jpg" alt />
                            </div>
                        </div>

                        <div class="image-bottom">
                            <div>
                                <img src="../assets/images/additionImage/room4.jpg" alt />
                            </div>
                            <div>
                                <img src="../assets/images/additionImage/room5.jpg" alt />
                            </div>
                            <div>
                                <img src="../assets/images/additionImage/room6.jpg" alt />
                            </div>
                            <div>
                                <img src="../assets/images/additionImage/room7.jpg" alt />
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <!-- 顾客评价 -->
                <el-card class="content3">
                    <!-- 评价分数 -->
                    <div class="top">
                        <div class="score">8.5</div>
                        <div class="txt">
                            <div class="txt-top">非常好</div>
                            <div class="txt-bottom">412条住客点评</div>
                        </div>
                    </div>
                    <hr />
                    <!-- 评价 -->
                    <div class="bottom">
                        <div class="comments" v-for="item in userComments" :key="item.userName">
                            <div class="user">
                                <div class="user-head">{{item.userName.slice(0,1)}}</div>
                                <div class="user-info">
                                    <div class="user-name">{{item.userName}}</div>
                                    <div class="user-loca">{{item.userLoaction}}</div>
                                </div>
                            </div>
                            <div class="content">"{{item.content}}"</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="15">
                <!-- 筛选表房间表格 -->
                <el-card class="content4">
                    <el-table :data="roomTableData" stripe style="width: 100%" height="300">
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
                        <el-table-column prop="operation" label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="ConfirmRes(scope.row)">确认预定</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <el-dialog
                        title="确认订购房间"
                        :visible.sync="dialogVisible"
                        width="30%"
                        :before-close="handleClose"
                    >
                        <el-form
                            label-position="top"
                            label-width="80px"
                            :model="userData"
                            :rules="userDataRules"
                            ref="userData"
                            :hide-required-asterisk="true"
                        >
                            <el-form-item prop="userID">
                                <el-input
                                    v-model="userData.userID"
                                    placeholder="请输入用户ID"
                                    prefix-icon="el-icon-user"
                                ></el-input>
                            </el-form-item>
                        </el-form>

                        <el-descriptions direction="vertical" :column="2" border>
                            
                            <el-descriptions-item label="房间号">{{confirmRoomData.room_number}}</el-descriptions-item>
                            <el-descriptions-item
                                label="房间类型"
                            >{{roomFomatter(orderRoomForm.type_,roomTypeList)}}</el-descriptions-item>

                            <el-descriptions-item label="入住天数">{{orderRoomForm.stay_length+"天"}}</el-descriptions-item>
                            <el-descriptions-item label="花费">{{confirmRoomData.price}}</el-descriptions-item>
                            <el-descriptions-item
                                label="入住时间"
                            >{{dataFormat(orderRoomForm.check_in_time)}}</el-descriptions-item>
                        </el-descriptions>

                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="submit">确 定</el-button>
                        </span>
                    </el-dialog>
                </el-card>
            </el-col>

            <el-col :span="9">
                <!-- 文字手风琴 -->
                <el-card class="content5">
                    <txt-accordion></txt-accordion>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import moment from "moment";
import TxtAccordion from "../components/TxtAccordion.vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    name: "Addition",
    components: {
        TxtAccordion,
    },
    data() {
        return {
            // 房间筛选表单
            orderRoomForm: {
                type_: "single",
                check_in_time: moment(),
                stay_length: "1",
            },

            // 用户ID
            userData: {
                userID: "",
            },

            userDataRules: {
                userID: [
                    {
                        required: true,
                        message: "请输入用户ID",
                        trigger: "blur",
                    },
                ],
            },

            // 顾客评价
            userComments: [
                {
                    userName: "雷致远",
                    userLoaction: "江苏-南京",
                    content:
                        "各方面都很好，前台工作人员礼貌周到，处理问题让客人觉得很舒服",
                },
                {
                    userName: "杨一",
                    userLoaction: "江苏-南京",
                    content:
                        "酒店的位置、早餐都很好，楼层服务员小雷和小吴很热情，主动送水果",
                },
                {
                    userName: "吴文轩",
                    userLoaction: "江苏-南京",
                    content:
                        "地理位置和早餐非常好，今次入住遇到一点不愉快，跟前台反应，得到的圆满的解决，不得不说金陵饭店的服务真好！",
                },
                {
                    userName: "Messi梅西",
                    userLoaction: "阿根廷-圣菲省罗萨里奥",
                    content:
                        "El hardware es promedio, la habitación es pequeña, las instalaciones son antiguas y el servicio es bueno.",
                },
                {
                    userName: "姆巴佩姆总",
                    userLoaction: "法国-塞纳圣但尼",
                    content:
                        "Le matériel est moyen, la chambre est petite, les installations sont anciennes, le service est bon",
                },
            ],

            // 筛选表格数据
            roomTableData: [],

            // 确认订购dialog
            dialogVisible: false,

            // 确认订购房间信息
            confirmRoomData: {},

            // 房间类型
            roomTypeList: [
                { itemValue: "single", itemName: "豪华大床房" },
                { itemValue: "twin", itemName: "简约双床房" },
                { itemValue: "family", itemName: "温馨家庭房" },
            ],

            // 房间状态
            roomStatusList: [
                { itemValue: "1", itemName: "已入住" },
                { itemValue: "2", itemName: "清理中" },
                { itemValue: "3", itemName: "空闲中" },
            ],

            // 房间状态
            roomStatusList: [
                { itemValue: "vacant", itemName: "近期空闲中" },
                { itemValue: "reserved", itemName: "今后有预订" },
            ],

            // 房间状态表格内标签
            roomStatusTagList: [
                { itemValue: "近期空闲中", itemName: "success" },
                { itemValue: "今后有预订", itemName: "warning" },
            ],
        };
    },

    watch: {
        orderRoomForm: {
            handler(newvalue, oldvalue) {
                this.CalcFilterRoom();
            },
            deep: true,
        },
    },

    computed: {
        ...mapState("room", ["reservableData"]), // 计算筛选房间结果
    },

    methods: {
        ...mapActions("order", {
            getOrderAsync: "getOrderAsync", // 获取订单all
            addOrderAsync: "addOrderAsync", // 添加订单单个
        }),
        ...mapActions("room", {
            getRoomAsync: "getRoomAsync", // 获取房间all
        }),
        ...mapMutations("room", {
            reservableRoom: "reservableRoom", // 计算筛选房间
        }),

        // 表格数据格式化
        roomFomatter(value, list) {
            if (value === "" || value == undefined) return "";
            const item = list.find((item) => item.itemValue == value);
            return item ? item.itemName : "";
        },

        // 计算筛选房间
        CalcFilterRoom() {
            let tempParams = {
                type_: this.orderRoomForm.type_,
                check_in_time: this.orderRoomForm.check_in_time,
                stay_length: this.orderRoomForm.stay_length,
            };
            this.reservableRoom(tempParams);
            this.roomTableData = this.$store.state.room.reservableData;
        },

        // 确认订购房间（需输入用户ID）
        ConfirmRes(row) {
            this.dialogVisible = true;
            this.confirmRoomData = { ...row };
        },

        // dialog关闭
        handleClose(done) {
            this.dialogVisible = false;
        },

        // dialog提交
        submit() {
            this.$refs.userData.validate((valid) => {
                if (valid) {
                    // 提交post-order
                    let addFormFormat = {
                        user_id: this.userData.userID,
                        room_id: this.confirmRoomData.id,
                        check_in_time: moment(
                            this.orderRoomForm.check_in_time
                        ).format("YYYY-MM-DD HH:mm:ss"),
                        stay_length: this.orderRoomForm.stay_length,
                    };
                    // 调用添加接口
                    this.addOrderAsync(addFormFormat).then(() => {
                        // 重新获取列表接口
                        this.getOrderAsync();
                        // 及时更新room接口
                        this.getRoomAsync();
                        // 重新计算剩余房间
                        this.CalcFilterRoom();
                    });
                    // 清空表单数据
                    this.$refs.userData.resetFields();
                    // 关闭弹窗
                    this.dialogVisible = false;
                }
            });
        },

        // 时间戳转换
        dataFormat(timeStamp) {
            return moment(timeStamp).format("YYYY年MM月DD日HH时");
        },
    },

    mounted() {
        this.CalcFilterRoom();
    },
};
</script>

<style scoped lang="less">
.el-row {
    margin: 16px;
}
/* 表单样式 */
.content1 {
    height: 460px;
    margin-right: 16px;
    display: flex;
    span {
        color: #4b6587;
    }
    .title {
        width: 100%;
        height: 32px;
        font-size: 14px;
        margin: 5px auto;
        background-color: #f7f6f2;
        color: #4b6587;
        border: 1px solid #4b6587;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
            margin-right: 5px;
        }
    }
    .room-radio {
        display: flex;
        flex-wrap: wrap;
        .el-radio.is-bordered + .el-radio.is-bordered {
            margin-left: 0;
        }
        .el-radio {
            width: 46%;
            margin-right: 12px;
            margin-bottom: 8px;
        }
    }

    .el-select {
        width: 96%;
    }
    .el-date-editor--daterange.el-input__inner {
        width: 96%;
    }
}

/* 酒店介绍样式 */
.content2 {
    width: 98%;
    height: 460px;
    margin-right: 16px;
    padding-left: 8px;
    img {
        border-radius: 4px;
    }
    .title {
        margin-top: -5px;
        h2 {
            display: inline-block;
            margin-right: 5px;
        }
        .el-tag {
            margin: 0 2px;
        }
        .loaction {
            font-size: 14px;
            color: #606266;
            font-weight: 500;
            .map {
                color: #4b6587;
            }
        }
    }
    .roomImage {
        width: 100%;
        height: 400px;
        display: flex;
        flex-direction: column;
        .image-top {
            flex: 1 1 auto;
            display: flex;
            flex-direction: row;
            margin-top: 8px;
            .image-left {
                display: flex;
                flex-direction: column;
                img {
                    width: 210px;
                    height: 120px;
                    overflow: hidden;
                    margin-right: 12px;
                    margin-bottom: 8px;
                }
            }
            .image-right {
                img {
                    width: 400px;
                    height: 252px;
                    margin-bottom: 8px;
                }
            }
        }
        .image-bottom {
            flex: 1 1 auto;
            display: flex;
            flex-direction: row;
            height: 100px;
            width: 500px;
            margin-top: -28px;
            img {
                // width: 50px;
                height: 92px;
                margin-right: 12px;
            }
        }
        .image-bottom:nth-child(1) {
            div {
                flex: 1;
            }
        }
        .image-bottom:nth-child(2) {
            div {
                flex: 2;
            }
        }
        .image-bottom:nth-child(3) {
            div {
                flex: 3;
            }
        }
        .image-bottom:nth-child(4) {
            div {
                flex: 4;
            }
        }
    }
}

/* 评价样式 */
.content3 {
    margin-left: 38px;
    height: 460px;
    .top {
        display: flex;
        flex-direction: row;
        align-items: center;
        .score {
            width: 35px;
            height: 35px;
            border-radius: 5px;
            background-color: #4b6587;
            color: #f7f6f2;
            font-size: 16px;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 6px;
        }
        .txt {
            display: flex;
            flex-direction: column;
        }
        .txt-top {
            font-size: 16px;
            color: #606266;
            font-weight: 500;
        }
        .txt-bottom {
            font-size: 14px;
            color: #909399;
            font-weight: 500;
        }
    }

    .bottom {
        height: 370px;
        overflow-y: scroll;
    }
    .user {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 6px;

        .user-head {
            width: 30px;
            height: 30px;
            background-color: #f09960;
            color: #f7f6f2;
            font-size: 14px;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            margin-right: 8px;
        }

        .user-info {
            display: flex;
            flex-direction: column;
            .user-name {
                font-size: 14px;
                color: #606266;
                font-weight: 800;
                margin-bottom: 2px;
            }

            .user-loca {
                font-size: 12px;
                color: #909399;
                font-weight: 500;
            }
        }
    }

    .content {
        font-size: 14px;
        color: #606266;
        font-weight: 500;
        margin-bottom: 18px;
    }
}

/* 筛选表格样式 */
.content4 {
    height: 340px;
    margin-right: 16px;

}

/* 简介样式 */
.content5 {
    height: 340px;
}
</style>