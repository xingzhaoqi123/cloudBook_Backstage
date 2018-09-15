<template>
    <div class="layout">
        <div class="header">云书后台管理系统
        </div>
        <div class="side_bar">
            <el-col :span="12" style=" width:200px;">
                <el-menu default-active="2" :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">用户管理</template>
                            <el-menu-item index="/">登录页</el-menu-item>
                            <el-menu-item index="admin">首页</el-menu-item>
                            <el-menu-item index="users">用户管理页面</el-menu-item>
                            <el-menu-item index="adduser">添加管理员</el-menu-item>
                        </el-menu-item-group> 
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
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
    methods: {
        handleOpen(key, keyPath) {},
        handleClose(key, keyPath) {}
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
}
.content {
    margin: 10px 0 0 220px;
}
</style>
