<template>
    <div>
        <el-form :label-position="labelPosition" label-width="80px" style="width:400px;" :model="category">
            <el-form-item label="分类名">
                <el-input v-model="category.title"></el-input>
            </el-form-item>
            <el-form-item label="分类排序">
                <el-input-number v-model="category.index" @change="handleChange" :min="1" label="分类排序"></el-input-number>
            </el-form-item>
            <el-form-item label="分类图标">
                <el-upload class="avatar-uploader" action="https://upload-z1.qiniup.com" :data="this.token" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="category.icon" :src="category.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addType">添加分类</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            labelPosition: "right",
            category: {
                title: "",
                index: "",
                icon: ""
            },
            token: {
                token: ""
            }
        };
    },
    methods: {
        addType() {
           this.$axios.post("/category", this.category).then(res => {
                if (res.code == 200) {
                    this.$message.success("添加分类成功");
                    this.$router.push("booktype");
                }
                // console.log(res);
            });
        },
        handleChange(value) {
            this.category.index = value;
        },
        handleAvatarSuccess(res, file) {
            // this.imageUrl = URL.createObjectURL(file.raw);
            this.category.icon = res.url;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        getToken() {
            axios
                .get("http://upload.yaojunrong.com/getToken")
                .then(res => {
                    this.token.token = res.data.data;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    created() {
        this.getToken();
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
    width: 178px;
    height: 178px;
    display: block;
}
</style>
