<template>
    <div>
        <el-form :label-position="this.labelPosition" label-width="80px" size="small" style="width:600px;">
            <el-form-item label="账号">
                <el-input v-model="params.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="params.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input type="password" v-model="checkPass"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="params.nickname"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input v-model="params.desc"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="params.email"></el-input>
            </el-form-item>
        </el-form>
        <el-upload class="avatar-uploader" action="https://upload-z1.qiniup.com" :data="this.token" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button type="primary" @click="handleMsg" class="upload">上传信息</el-button>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            params: {
                username: "",
                password: "",
                nickname: "",
                desc: "",
                email: "",
                avatar:''
            },
            imageUrl: "",
            labelPosition: "right",
            checkPass: "",
            token: {
                token: ""
            }
        };
    },
    created() {
        this.getToken();
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.params.avatar=res.url;
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
        }, 
        handleMsg() {
            console.log(this.params);
            if (this.params.password != this.checkPass) {
                this.$notify.error({
                    title: "错误",
                    message: "密码不一致，请重新输入"
                });
            } else {
                this.$axios
                    .post("/user", this.params)
                    .then(res => {
                        if (res.code == 400) {
                            this.$notify.error({
                                title: "错误",
                                message: res.msg
                            });
                        } else {
                            this.$router.push("users");
                        }
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }
};
</script>

<style>
.container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.input {
    margin-bottom: 20px;
    width: 600px;
}
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
