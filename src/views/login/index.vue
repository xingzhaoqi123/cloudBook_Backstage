<template>
    <div class="container">
        <div class="title">后台管理系统登录</div>
        <div class="login">
            <el-input type='text' v-model="loginMsg.username" placeholder="请输入用户名" class="username"></el-input>
            <el-input type="password" v-model="loginMsg.password" placeholder="请输入密码" class="password"></el-input>
            <el-button type="primary" plain class="btn" @click="login">登录</el-button>
        </div>
    </div>
</template>

<script>
import router from "vue-router";
export default {
    data() {
        return {
            loginMsg: {
                username: "admin",
                password: "admin"
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
                if (res.code == 200) {
                    this.$message({
                        message: "恭喜你，登陆成功",
                        type: "success"
                    });
                    this.$router.push("/layout");
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
        margin-top: 100px;
    }
    .login {
        width: 600px;
        height: 400px;
        border: 3px solid #c4967f;
        border-radius: 8px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .username {
            width: 70%;
            margin: 0 auto;
        }
        .password {
            width: 70%;
            margin: 0 auto;
        }
        .btn {
            width: 70%;
            margin: 0 auto;
        }
    }
}
</style>
