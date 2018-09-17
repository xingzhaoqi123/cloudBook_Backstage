<template>
    <div class="container">
        <div class="title">后台管理系统</div>
        <div class="login">
            <div class="text">
                <p>请登录</p>
            </div>
            <el-form label-position="left" :model='loginMsg' status-icon :rules="rules2" ref="loginMsg" style="width:400px;margin:0 auto;color:#fff;">
                <el-form-item label="用户名" prop="username">
                    <el-input type='text' v-model="loginMsg.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginMsg.password" placeholder="请输入密码" @keyup.enter.native="login"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain class="btn" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import router from "vue-router";
export default {
    data() {
        var username = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入用户名"));
            } else {
                callback();
            }
        };
        var password = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value.length < 5) {
                callback(new Error("密码至少5位"));
            } else {
                callback();
            }
        };
        return {
            loginMsg: {
                username: "12345",
                password: "12345"
            },
            getMsg: {
                avatar: "",
                nickname: "",
                desc: ""
            },
            rules2: {
                username: [{ validator: username, trigger: "blur" }],
                password: [{ validator: password, trigger: "blur" }]
            }
        };
    },
    methods: {
        login() {
            let param = {
                username: this.loginMsg.username,
                password: this.loginMsg.password
            };
            this.$axios.post("/login", param).then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.$store.commit('CHANGE_USERINFO',res.data);
                    this.$message({
                        message: "恭喜你，登陆成功",
                        type: "success"
                    });
                    (this.getMsg.avatar = res.data.avatar),
                        (this.getMsg.nickname = res.data.nickname),
                        (this.getMsg.desc = res.data.desc),
                        this.$router.push("/layout");
                } else {
                    this.$message({
                        message: "账号密码有误！",
                        type: "error"
                    });
                }
            });
        }
    }
};
</script>

<style lang="scss">
.container {
    height: 100vh;
    background-color: #535b68;
    overflow: hidden;
    .title {
        margin: 0 auto;
        color: #c4967f;
        font-size: 28px;
        width: 450px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin-top: 50px;
    }
    .login {
        margin: 0 auto;
        width: 600px;
        height: 400px;
        border: 3px solid #c4967f;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        background-color: #fff;
    }
}
.btn {
    width: 400px;
}
.text {
    width: 100px;
    height: 50px;
    line-height: 50px;
    margin: 0 auto;
    font-size: 26px;
    font-weight: 700;
}
</style>
