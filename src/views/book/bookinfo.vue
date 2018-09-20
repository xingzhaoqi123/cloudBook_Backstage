<template>
    <div>
        <el-form :label-position="this.labelPosition" label-width="80px" size="small" style="width:600px;">
            <el-form-item>
                <img :src="bookinfo.img" class="avatarb">
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model="bookinfo.index" :disabled="true"></el-input-number>
            </el-form-item>
            <el-form-item label="作者">
                <el-input v-model="bookinfo.author" disabled></el-input>
            </el-form-item>
            <el-form-item label="书名">
                <el-input v-model="bookinfo.title" disabled></el-input>
            </el-form-item>
            <!-- <el-form-item label="邮箱">
                <el-input v-model="" disabled></el-input>
            </el-form-item> -->
            <el-form-item label="创建时间">
                <el-input v-model="bookinfo.createTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input v-model="bookinfo.desc" rows="8" type="textarea" disabled></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bookId: "",
            labelPosition: "right",
            bookinfo: {}
        };
    },
    methods: {
        get_book() {
            this.$axios
                .get(`/book/${this.bookId}`, { id: this.bookId })
                .then(res => {
                    this.bookinfo = res.data;
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    created() {
        this.bookId = this.$route.query.id;
        this.get_book();
    }
};
</script>

<style>
.avatarb {
    width: 147px;
    height: 157px;
}
</style>
