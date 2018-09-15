<template>
    <div class="container">
        <div>
            账号：
            <el-input v-model="params.username" class="input" placeholder="请输入账号"></el-input><br> 密码：
            <el-input v-model="params.password" type="password" class="input" placeholder="请输入密码"></el-input><br> 确认密码：
            <el-input v-model="checkPass" type="password" class="input" placeholder="请确认密码"></el-input><br> 昵称：
            <el-input v-model="params.nickname" class="input" placeholder="请输入昵称"></el-input><br> 简介：
            <el-input v-model="params.desc" class="input" placeholder="请输入个人简介"></el-input><br> 邮箱：
            <el-input v-model="params.email" class="input" placeholder="请输入邮箱地址"></el-input><br>

        </div>
        <div class="img">
            <p>上传头像</p>
            <el-upload action="https://upload-z1.qiniup.com" :headers="this.headers"  list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <el-button type="primary" @click="handleMsg" class="upload">上传信息</el-button>
        </div>
       
    </div>
</template>

<script>
import axios from "axios";

export default {
    // beforeUpload() {
    //     var form = new FormData();
    //     form.append("token", this.token);
    //     axios
    //         .post("https://upload-z1.qiniup.com", form, {
    //             headers: {"Content-Type": "multipart/form-data"}
    //         })
    //         .then(res => {
    //             console.log(res);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // },
    data() {
        return {
            params: {
                username: "",
                password: "",
                nickname: "",
                desc: "",
                email: ""
            },
            Token: "",
            checkPass: "",
            dialogImageUrl: "",
            dialogVisible: false,
            headers: { "Content-Type": "multipart/form-data",token:this.Token},
        };
    },
    created() {
        this.getToken();
    },
    methods: {
        getToken() {
            axios
                .get("http://upload.yaojunrong.com/getToken")
                .then(res => {
                    console.log(res);
                    this.Token = res.data.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
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
</style>
