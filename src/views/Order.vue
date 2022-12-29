<template>
    <div>
        <div class="orderTable">
            <el-card>
                <!-- 订单表格 -->
                <el-table :data="orderTableData" stripe style="width: 100%" height="720">
                    <el-table-column prop="userID" label="用户ID" width="100"></el-table-column>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="sex" label="性别" width="100">
                        <template slot-scope="scope">
                            <span>{{scope.row.sex === 1?'男':'女'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="birth" label="出生日期"></el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                            <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    name: "Order",
	data() {
		return {
			orderTableData: [],
		}
	},
};
</script>

<style scoped lang="less">
.orderTable {
    margin: 16px;
    .el-card {
        height: 820px;
    }
}
</style>
