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
                        <el-form ref="form" :model="orderRoomForm">
                            <el-form-item>
                                <span>房型选择</span>
                                <el-radio-group v-model="orderRoomForm.type">
                                    <div class="room-radio">
                                        <el-radio label="豪华电竞房" border></el-radio>
                                        <el-radio label="亚太海景房" border></el-radio>
                                        <el-radio label="情侣主题房" border></el-radio>
                                        <el-radio label="高级大床房" border></el-radio>
                                        <el-radio label="标准双床房" border></el-radio>
                                        <el-radio label="简约单人房" border></el-radio>
                                    </div>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item>
                                <span>床位选择</span>
                                <br />
                                <el-select v-model="orderRoomForm.num" placeholder="请选择">
                                    <el-option
                                        v-for="item in bedNumOption"
                                        :key="item.value"
                                        :value="item.name"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <span>日期选择</span>
                                <br />
                                <el-date-picker
                                    v-model="orderRoomForm.data"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                ></el-date-picker>
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
                            <h2>吴氏集团宾馆</h2>
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
                        <el-table-column prop="id" label="房间号" width="80" align="center"></el-table-column>
                        <el-table-column
                            prop="type"
                            label="房间类型"
                            width="180"
                            align="center"
                            :formatter="(row) => roomFomatter(row.type, roomTypeList)"
                        ></el-table-column>
                        <el-table-column
                            prop="bed"
                            label="房间床位"
                            width="150"
                            align="center"
                            :formatter="(row) => roomFomatter(row.bed, bedTypeList)"
                        ></el-table-column>
                        <el-table-column prop="price" label="房间价格" width="150" align="center"></el-table-column>
                        <el-table-column
                            prop="status"
                            label="房间状态"
                            width="180"
                            align="center"
                            :formatter="(row) => roomFomatter(row.status, roomStatusList)"
                        ></el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    :type="roomStatusBtn(scope.row.status)"
                                    plain
                                    @click="handleEdit(scope.$index, scope.row)"
                                >{{scope.row.status == "1"||scope.row.status == "2" ?"不可订购":"订购房间"}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
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
import TxtAccordion from '../components/TxtAccordion.vue'
export default {
    name: "Addition",
    components:{
        TxtAccordion,
    },
    data() {
        return {
            // 房间筛选表单
            orderRoomForm: {
                type: "",
                num: "",
                data: "",
            },

            // 床位选择
            bedNumOption: [
                {
                    name: "1张床位",
                    value: 1,
                },
                {
                    name: "2张床位",
                    value: 2,
                },
            ],

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
            roomTableData: [
                {
                    id: "1001",
                    type: "1",
                    bed: "1",
                    price: "560",
                    status: "1",
                },
                {
                    id: "1002",
                    type: "2",
                    bed: "2",
                    price: "560",
                    status: "2",
                },
                {
                    id: "1003",
                    type: "2",
                    bed: "1",
                    price: "560",
                    status: "3",
                },
                {
                    id: "1004",
                    type: "1",
                    bed: "1",
                    price: "560",
                    status: "1",
                },
                {
                    id: "1005",
                    type: "2",
                    bed: "2",
                    price: "560",
                    status: "2",
                },
                {
                    id: "1006",
                    type: "2",
                    bed: "1",
                    price: "560",
                    status: "3",
                },
            ],

            // 房间类型
            roomTypeList: [
                { itemValue: "1", itemName: "豪华电竞房" },
                { itemValue: "2", itemName: "亚太海景房" },
                { itemValue: "3", itemName: "情侣主题房" },
                { itemValue: "4", itemName: "高级大床房" },
                { itemValue: "5", itemName: "标准双床房" },
                { itemValue: "6", itemName: "简约单人房" },
            ],
            // 床位类型
            bedTypeList: [
                { itemValue: "1", itemName: "一张床" },
                { itemValue: "2", itemName: "两张床" },
            ],
            // 房间状态
            roomStatusList: [
                { itemValue: "1", itemName: "已入住" },
                { itemValue: "2", itemName: "清理中" },
                { itemValue: "3", itemName: "空闲中" },
            ],
        };
    },

    computed: {
        // 房间类型计算 删
        roomType: (typeNum) => {
            if (typeNum === "1") {
                return "豪华电竞房";
            } else if (typeNum === "2") {
                return "亚太海景房";
            } else if (typeNum === "3") {
                return "情侣主题房";
            } else if (typeNum === "4") {
                return "高级大床房";
            } else if (typeNum === "5") {
                return "标准双床房";
            } else if (typeNum === "6") {
                return "简约单人房";
            }
        },
    },

    methods: {
        // 表格数据格式化
        roomFomatter(value, list) {
            if (value === "" || value == undefined) return "";
            const item = list.find((item) => item.itemValue == value);
            return item ? item.itemName : "";
        },

        // 房间是否可以预定按钮计算
        roomStatusBtn(status) {
            console.log(status);
            if (status === "1" || status === "2") {
                return "info";
            } else if (status === "3") {
                return "success";
            }
        },
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
    justify-content: center;
    align-items: center;
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