<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: 'admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'users'}">用户信息</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'detailInfo'}">用户详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :label-position="this.labelPosition" label-width="80px" size="small" style="width:600px;">
            <el-form-item label="头像">
                <img  :src="params.avatar" class="avatar">
            </el-form-item>
            <el-form-item label="账号">
                <el-input v-model="params.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="params.nickname" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="params.email" disabled></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-input v-model="params.createdTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input v-model="params.desc" type="textarea" disabled></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            params: {
                username: "",
                nickname: "",
                desc: "",
                email: "",
                avatar: "",
                createdTime:''
            },
           
            labelPosition: "right"
        };

    },
    created(){
        this.params=this.$store.state.personInfo
    }
};
</script>

<style>
.avatar {
    width: 128px;
    height: 128px;
    display: block;
    border-radius: 50%;
}
</style>
