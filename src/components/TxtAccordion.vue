<template>
    <div>
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="信息&价格 Information&Price" name="1">
                <div>对于一个真正能赚钱的人来说，真没必要为了省那点钱而影响第二天的工作效率和心情；</div>
                <div>本酒店比较适合与家人或者另一半旅行时入住，反正入住时间一般不长，也花不了几个钱，舒适度高心情更愉悦。</div>
            </el-collapse-item>
            <el-collapse-item title="设施 Facilities" name="2">
                <div>硬件方面，30公分的席梦思床垫，标配两个羽绒加两个羽丝棉枕头，至少的纯棉布草！洗漱间的空间很大，能施展手脚的那种。</div>
                <div>酒店客房的细节功能设计亦有很多，包括所有家具、灯具、窗帘、布草、洁具、五金件、水龙头、电器用品、消耗用品的功能、式样选择及其舒适性、实用性水平。</div>
            </el-collapse-item>
            <el-collapse-item title="规定 Regulations" name="3">
                <div>但是酒店行业基本规则来讲，一般情况下需要中午十二点退房，除部分会员制权益酒店以外享受会员权益可以延迟到下午二点。</div>
                <div>因为一般情况下的酒店客房基本第二天都会有预定。酒店本着服务客人的原则，规定了次日几点离店。以为下一波客人的到来，为保洁预留清洁时间。</div>
                <div>具体的来讲，两者是互相排斥的。但是按照酒店行业规则来讲，和大家相互利益来讲，你也不希望你到一个酒店。房间客房还被昨天的客人霸占着。</div>
            </el-collapse-item>
            <el-collapse-item title="预定须知 Booking Instructions" name="4">
                <div>拎包入住，结果可控</div>
                <div>保护隐私，无需担心</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
export default {
    name: "TxtAccordion",
    data() {
        return {
            activeName: "1",
        };
    },
};
</script>

<style>
</style>