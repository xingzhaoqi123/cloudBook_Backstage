<template>
    <div>
        <el-form :label-position="this.labelPosition" v-model="swiper" label-width="110px" size="small" style="width:600px;">
            <el-form-item label="轮播图标题">
                <el-input v-model="swiper.title"></el-input>
            </el-form-item>
            <el-form-item label="书">
                <el-input v-model="swiper.book"></el-input>
            </el-form-item>
            <el-form-item label="排序">
                <el-input v-model="swiper.index"></el-input>
            </el-form-item>
            <el-form-item label="轮播图图片">
                <el-upload class="avatar-uploader" action="https://upload-z1.qiniup.com" :data="this.token" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="swiper.img" :src="swiper.img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            labelPosition: "right",
            swiper: {
                title: "",
                img: "",
                book: "",
                index: ""
            }
        };
    },
    methods: {
        addswiper() {
            this.$axios.post("/swiper", {}).then(res => {
                console.log(res);
            });
        }
    }
};
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 128px;
    height: 128px;
    display: block;
}
</style>
