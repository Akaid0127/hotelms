<template>
    <div class="home">
        <el-row>
            <el-col :span="8">
                <!-- 管理员信息卡片 -->
                <el-card class="box-card">
                    <div class="user">
                        <img :src="userImg" />
                        <div class="user-info">
                            <p class="name">火花骑士可莉</p>
                            <p class="access">经理管理员</p>
                        </div>
                    </div>
                    <div class="login-info">
                        <p>
                            上次登录的时间：
                            <span>2022-10-19</span>
                        </p>
                        <p>
                            上次登录的地点：
                            <span>江苏南京</span>
                        </p>
                    </div>
                </el-card>

                <!-- 其他管理员信息卡片 -->
                <el-card class="box-card2">
                    <el-table :data="tableData" style="width: 100%" height="480">
                        <el-table-column prop="AdminID" label="编号" width="80"></el-table-column>
                        <el-table-column prop="AdminName" label="管理员姓名" width="140"></el-table-column>
                        <el-table-column prop="AdminTel" label="手机号" width="130"></el-table-column>
                        <el-table-column prop="AdminPosi" label="职位" width="80">
                            <template slot-scope="scope">
                                <el-tag
                                    size="medium"
                                    :type="adminStatus(scope.row.AdminPosi)"
                                >{{ scope.row.AdminPosi=="1"? "经理":"员工" }}</el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>

            <el-col :span="16">
                <div class="right-top-content">
                    <!-- 订单信息 -->
                    <div class="box-card3">
                        <el-card
                            class="box-card3-item"
                            v-for="item in countData"
                            :key="item.name"
                            :body-style="{display:'flex',padding:0}"
                        >
                            <div>
                                <i
                                    class="icon"
                                    :class="`el-icon-${item.icon}`"
                                    :style="{background:item.color}"
                                ></i>
                            </div>
                            <div class="detail">
                                <p class="deNum">{{item.value}}</p>
                                <p class="deTxt">{{item.name}}</p>
                            </div>
                        </el-card>
                    </div>

                    <!-- 日历 -->
                    <el-card class="box-card4">
                        <clock class="home-clock"></clock>
                    </el-card>
                </div>

                <!-- 折线图 -->
                <el-card class="box-chart1">
                    <div ref="echarts1" class="echarts1"></div>
                </el-card>

                <div class="box-chart2">
                    <!-- 直方图 -->
                    <el-card class="childChart1">
                        <div ref="echarts2" class="echarts2"></div>
                    </el-card>
                    <!-- 饼图 -->
                    <el-card class="childChart2">
                        <div ref="echarts3" class="echarts3"></div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as echarts from "echarts";
import Clock from "../components/Clock.vue";

export default {
    name: "Home",
    components: {
        Clock,
    },
    data() {
        return {
            // 当前管理员信息
            userImg: require("../assets/images/user.jpg"),
            // 其他管理员信息
            tableData: [
                {
                    AdminID: "A1001",
                    AdminPosi: "1",
                    AdminName: "火花骑士可莉",
                    AdminTel: "19085071972",
                },

                {
                    AdminID: "B1002",
                    AdminPosi: "2",
                    AdminName: "胡桃专业服务",
                    AdminTel: "15857865699",
                },

                {
                    AdminID: "B1003",
                    AdminPosi: "2",
                    AdminName: "宫本武藏",
                    AdminTel: "15054902445",
                },
            ],
            // 订单数据
            countData: [
                {
                    name: "本月新增订单",
                    value: 128,
                    icon: "document",
                    color: "#C8C6C6",
                },
                {
                    name: "总计所有订单",
                    value: 342,
                    icon: "document-copy",
                    color: "#C8C6C6",
                },
                {
                    name: "未处理订单",
                    value: 18,
                    icon: "document-delete",
                    color: "#F0E5CF",
                },

                {
                    name: "已处理订单",
                    value: 324,
                    icon: "document-checked",
                    color: "#F0E5CF",
                },
            ],
            // 折线图数据
            // x轴月份数据
            charts1DataMonth: [
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月",
            ],
            // y轴数据
            // 月总订单
            charts1DataY1: [22, 29, 34, 36, 38, 43, 41, 29, 32, 38, 40, 30],
            // 月未处理订单
            charts1DataY2: [9, 4, 6, 8, 3, 2, 5, 4, 6, 8, 4, 2],
            // 月已处理订单
            charts1DataY3: [13, 25, 28, 28, 35, 41, 36, 25, 26, 30, 36, 28],

            // 直方图数据
            // x轴星期数据
            charts2DataDay: [
                "星期一",
                "星期二",
                "星期三",
                "星期四",
                "星期五",
                "星期六",
                "星期日",
            ],
            // 总订单数（按星期划分）
            charts2DataY: [88, 86, 74, 63, 102, 165, 210],

            // 饼图数据
            // 普通用户数量和vip用户数量
            charts3Data: [
                { name: "普通用户", value: 120 },
                { name: "VIP用户", value: 34 },
            ],


        };
    },

    methods: {
        // card2-判断管理员身份
        adminStatus(status) {
            if (status === "1") {
                return "success";
            } else if (status === "2") {
                return "warning";
            }
        },
        
    },

    mounted() {
        // 折线图
        const echarts1 = echarts.init(this.$refs.echarts1);
        let xDataArr = this.charts1DataMonth;
        let yDataArr1 = this.charts1DataY1;
        let yDataArr2 = this.charts1DataY2;
        let yDataArr3 = this.charts1DataY3;
        const lineOption = {
            xAxis: {
                type: "category",
                data: xDataArr,
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    name: "月订单数",
                    data: yDataArr1,
                    type: "line",
                    // 数值显示
                    label: {
                        show: true, // 是否显示数值
                        position: "top", // 显示位置
                        color: "#4B6587",
                    },
                    // 线条控制
                    lineStyle: {
                        color: "#4B6587",
                        type: "solid", // dotted solid dashed
                    },
                    markLine: {
                        data: [{ type: "average" }],
                    },
                },
                {
                    name: "月未处理订单",
                    data: yDataArr2,
                    type: "line",
                    // 线条控制
                    lineStyle: {
                        color: "#C8C6C6",
                        type: "dashed", // dotted solid dashed
                    },
                    markLine: {
                        data: [{ type: "average" }],
                    },
                },
                {
                    name: "月已处理订单",
                    data: yDataArr3,
                    type: "line",
                    // 线条控制
                    lineStyle: {
                        color: "#F0E5CF",
                        type: "dashed", // dotted solid dashed
                    },
                },
            ],
            legend: {
                data: ["月订单数", "月未处理订单", "月已处理订单"], // 起到筛选作用
            },
        };
        echarts1.setOption(lineOption);

        // 直方图
        const echarts2 = echarts.init(this.$refs.echarts2);
        let barxDataArr = this.charts2DataDay;
        let baryDataArr = this.charts2DataY;
        let barOption = {
            xAxis: {
                type: "category",
                data: barxDataArr,
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    name: "订单总数(按星期划分)",
                    type: "bar",
                    data: baryDataArr,
                    color: "#4B6587",
                    // 标记点
                    markPoint: {
                        data: [
                            {
                                type: "max", // 标记最大值
                                name: "最大值",
                            },
                            {
                                type: "min", // 标记最小值
                                name: "最小值",
                            },
                        ],
                    },
                    // 标记线
                    markLine: {
                        data: [
                            {
                                type: "average",
                                name: "平均值",
                            },
                        ],
                    },
                    // 柱宽度
                    barWidth: "35%",
                },
            ],
            legend: {
                data: ["订单总数(按星期划分)"], // 起到筛选作用
            },
        };
        echarts2.setOption(barOption);

        // 饼图
        const echarts3 = echarts.init(this.$refs.echarts3);
        let pieDataArr = this.charts3Data
        let pieOption = {
            series: [
                {
                    type: "pie",
                    data: pieDataArr,
                    color:["#C8C6C6","#F0E5CF"],
                        

                    // 饼图文字显示
                    label: {
                        // 显示文字
                        show: true,
                        // 显示文字的内容
                        formatter: function (arg) {
                            return (
                                arg.name +
                                ": " +
                                arg.value +
                                " 位"
                            );
                        },
                    },
                    // 圆环设置
                    radius:['50%','75%'],
                },
            ],
        };
        echarts3.setOption(pieOption);
    },
};
</script>

<style lang="less" scoped>
.home {
    padding: 16px 16px;
}
// card1样式
.box-card {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    .user {
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid #999;
        padding-bottom: 20px;
        margin-bottom: 20px;
        img {
            width: 150px;
            border-radius: 50%;
            margin-right: 40px;
        }
        .user-info {
            .name {
                font-size: 32px;
                margin-bottom: 6px;
                color: #4b6587;
            }
            .access {
                color: #999;
                margin-left: 4px;
            }
        }
    }
    .login-info {
        line-height: 28px;
        font-size: 14px;
        color: #999;
        span {
            margin-left: 20px;
        }
    }
}

// card2样式
.box-card2 {
    height: 510px;
}

.right-top-content {
    display: flex;
    width: 98%;
    height: 220px;
    margin: 0 16px;
    margin-bottom: 16px;
}

// card3样式 订单
.box-card3 {
    flex: 1.2;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-right: 16px;
    .icon {
        width: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 90px;
        color: white;
    }

    .box-card3-item {
        border: none;
        display: flex;
        flex-direction: row;
        width: 48%;
        height: 90px;
        .detail {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 200px;
            height: 90px;
            margin-left: 8px;
            .deNum {
                font-size: 30px;
                color: #4b6587;
                line-height: 40px;
                margin-bottom: 4px;
            }
            .deTxt {
                font-size: 14px;
                color: #c8c6c6;
            }
        }
    }
}

// 日历样式
.box-card4 {
    flex: 1;
    .home-clock {
        margin-top: -12px;
    }
}

// 折线图样式
.box-chart1 {
    height: 282px;
    margin-left: 16px;
    margin-bottom: 16px;
    padding-bottom: 8px;
    .echarts1 {
        height: 310px;
    }
}

// 直方图和饼图
.box-chart2 {
    display: flex;
    justify-content: space-between;
    margin-left: 16px;
    .childChart1 {
        height: 276px;
        width: 49%;
        .echarts2 {
            margin-left: -5px;
            height: 280px;
        }
    }
    .childChart2 {
        height: 276px;
        width: 49%;
        .echarts3 {
            margin-top: -15px;
            height: 280px;
        }
    }
}
</style>
