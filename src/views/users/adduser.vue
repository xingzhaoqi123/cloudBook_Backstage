<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: 'admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>添加用户</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :label-position="this.labelPosition" :rules="rules2" :model="params" ref="params" class="demo-dynamic" label-width="80px" size="small" style="width:600px;">
            <el-form-item label="账号" prop="username" :rules="rule_username">
                <el-input v-model="params.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="params.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="params.checkPass"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname" :rules="rule_nickname">
                <el-input v-model="params.nickname"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" :rules="rules_email">
                <el-input v-model="params.email"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input type="textarea" v-model="params.desc"></el-input>
            </el-form-item>
            <el-form-item label="头像">
                <el-upload class="avatar-uploader" action="https://upload-z1.qiniup.com" :data="this.token" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleMsg" class="upload">上传信息</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        var password = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                if (value.length >= 5) {
                    if (this.params.checkPass != "") {
                        this.$refs.params.validateField("checkPass");
                    }
                    callback();
                }else{
                    callback(new Error("密码要大于五位"))
                }
            }
        };
        var checkPass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value != this.params.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            params: {
                username: "",
                password: "",
                nickname: "",
                desc: "",
                email: "",
                avatar: "",
                checkPass: ""
            },
            imageUrl: "",
            labelPosition: "right",
            token: {
                token: ""
            },
            rules_email: [
                { required: true, message: "请输入邮箱地址", trigger: "blur" },
                {
                    type: "email",
                    message: "请输入正确的邮箱地址",
                    trigger: ["blur", "change"]
                }
            ],
            rule_username: [
                { required: true, message: "请输入账号", trigger: "blur" }
            ],
            rule_nickname: [
                { required: true, message: "请输入昵称", trigger: "blur" }
            ],
            rules2: {
                password: [
                    { required: true, validator: password, trigger: "blur" }
                ],
                checkPass: [
                    { required: true, validator: checkPass, trigger: "blur" }
                ]
            }
        };
    },
    created() {
        this.getToken();
    },
    methods: {
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.params.avatar = res.url;
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
            if (this.params.password != this.params.checkPass) {
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
                        }
                        this.$router.push("users");
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
