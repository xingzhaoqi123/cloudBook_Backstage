<template>
    <div class="layout">
        <div class="header">云书后台管理系统
        </div>
        <div class="side_bar">
            <div class="personMsg">
                <div class="head_portrait"><img :src="userinfo.avatar" alt=""></div>
                <div class="head_desc">
                    <p class="loginMsg">{{userinfo.nickname}}</p>
                    <p class="loginMsg">{{userinfo.desc}}</p>
                    <P class="changeMsg">
                        <el-button type="info" round style="margin-left:50px;" @click="changeMsg">修改信息</el-button>
                    </P>
                </div>
            </div>
            <el-col :span="12" style=" width:200px;">
                <el-menu default-active="2" :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <!-- <template slot="title">用户管理</template> -->
                            <el-menu-item index="/">登录页</el-menu-item>
                            <el-menu-item index="admin">首页</el-menu-item>
                            <el-menu-item index="users">用户管理页面</el-menu-item>
                            <el-menu-item index="adduser">添加用户</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>图书管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="booklist">图书列表</el-menu-item>
                            <el-menu-item index="booktype" >图书分类</el-menu-item>
                            <el-menu-item index="users">用户管理页面</el-menu-item>
                            <el-menu-item index="adduser">添加用户</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span>轮播图管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="swiperList">轮播图列表</el-menu-item>
                            <el-menu-item index="addswiper" >添加轮播图</el-menu-item>
                            <el-menu-item index="users">用户管理页面</el-menu-item>
                            <el-menu-item index="adduser">添加用户</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
        </div>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userinfo: {
                username: "",
                password: "",
                nickname: "",
                desc: "",
                email: "",
                avatar: ""
            }
        };
    },
    methods: {
        handleOpen(key, keyPath) {},
        handleClose(key, keyPath) {},
        inituserinfo() {
            this.userinfo = {
                ...this.$store.state.userinfo
            };
        },
        changeMsg() {
            this.$router.push("changeuser");
        }
    },
    created() {
        this.inituserinfo();
    }
};
</script>

<style lang='scss'>
.header {
    height: 80px;

    text-align: center;
    line-height: 80px;
    margin-left: 200px;
    font-size: 26px;
    font-weight: 700;
    background-color: #d4b7a7;
}
.side_bar {
    height: 100vh;
    width: 200px;
    background-color: #545c64;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    /deep/ .el-menu {
        border-right: none;
    }
}
.content {
    margin: 10px 0 0 220px;
}
.personMsg {
    height: 200px;
    .head_portrait img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-left: 50px;
    }
    .head_desc {
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        color: #fff;
    }
}
.loginMsg {
    text-align: center;
    font-size: 14px;
    color: #fff;
}
</style>
