<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: 'admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>修改信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :label-position="this.labelPosition" :model="params" :rules="rules2" ref="params" label-width="80px" size="small" style="width:600px;">
            <el-form-item label="账号">
                <el-input v-model="params.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="旧密码" prop="password">
                <el-input v-model="params.password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="new_password">
                <el-input v-model="params.new_password"></el-input>
            </el-form-item>
            <el-form-item label="昵称"  :rules="rule_nickname">
                <el-input v-model="params.nickname"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input v-model="params.desc"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :rules="rules_email">
                <el-input v-model="params.email"></el-input>
            </el-form-item>
            <el-form-item label="头像">
                <el-upload class="avatar-uploader" action="https://upload-z1.qiniup.com" :data="this.token" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="params.avatar" :src="params.avatar" class="avatar" @click="show">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleMsg" class="upload">修改信息</el-button>
                <el-button type="primary" @click="changePass" class="upload">修改密码</el-button>
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
                callback(new Error("请输入旧密码"));
            } else if (value.length >= 5) {
                callback();
            } else {
                callback(new Error("密码要大于五位"));
            }
        };
        var new_password = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入新密码"));
            } else if (value.length >= 5) {
                callback();
            } else {
                callback(new Error("密码要大于五位"));
            }
        };
        return {
            labelPosition: "right",
            // imageUrl: "",
            token: {
                token: ""
            },
            params: {
                username: "",
                nickname: "",
                desc: "",
                email: "",
                avatar: "",
                password: "",
                new_password: ""
            },

            rules_email: [
                { required: true, message: "请输入邮箱地址", trigger: "blur" },
                {
                    type: "email",
                    message: "请输入正确的邮箱地址",
                    trigger: ["blur", "change"]
                }
            ],
            rule_nickname: [
                { required: true, message: "请输入昵称", trigger: "blur" }
            ],
            rules2: {
                password: [
                    { required: true, validator: password, trigger: "blur" }
                ],
                new_password: [
                    { required: true, validator: new_password, trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        show(){
            console.log(this.token)
        },
        initParams() {
            this.params = {
                ...this.$store.state.userinfo
            };
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
        handleAvatarSuccess(res, file) {
            // this.imageUrl = URL.createObjectURL(file.raw);
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
        changePass() {
            this.$axios
                .put("user/password", this.params)
                .then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        this.$message({
                            message: res.data.msg,
                            type: "success"
                        });
                        this.$router.push("admin");
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        handleMsg() {
            this.$axios
                .put("/user/userInfo", this.params)
                .then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        let userinfo = res.data.data;
                        this.$store.commit("CHANGE_USERINFO", userinfo);
                        this.initParams();
                        this.$message({
                            message: res.data.msg,
                            type: "success"
                        });
                        this.$router.push("admin");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    created() {
        this.getToken();
        this.initParams();
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
