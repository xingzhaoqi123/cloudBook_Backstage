<template>
    <div>
        <el-form :label-position="this.labelPosition" v-model="swiperDetail" label-width="80px" size="small" style="width:600px;">
            <el-form-item label="封面">
                <img :src="swiperDetail.img" class="avatard">
            </el-form-item>
            <el-form-item label="书名">
                <el-input v-model="swiperDetail.title" disabled></el-input>
            </el-form-item>
            <el-form-item label="作者">
                <el-input v-model="swiperDetail.author" disabled></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-input v-model="swiperDetail.createTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input type="textarea" rows="8  " cols="20" v-model="swiperDetail.desc" disabled></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: "",
            swiperDetail: {},
            labelPosition: "right"
        };
    },
    methods:{
        getswiperinfo(){
              this.$axios.get(`/swiper/${this.id}`, { id: this.id }).then(res => {
                console.log(res);
                this.swiperDetail=res.data.book
            });
        }
    },
    created() {
        this.id = this.$route.query.id;
        this.getswiperinfo();
    }
};
</script>

<style>
.avatard {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
