<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px;">
            <el-breadcrumb-item :to="{ path: 'admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="nickname" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="desc" label="个性签名" width="180">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="180">
            </el-table-column>
            <el-table-column label="用户头像">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" class="avatar">
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-button type="primary" @click="detail" size="small">详细信息</el-button>
                    <el-button type="danger" @click="delet(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="Pagination" background @current-change='changePage' :page-size='this.size' layout="prev, pager, next" :total="this.count">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            count: 0,
            page: 1,
            size: 5
        };
    },
    methods: {
        changePage(page) {
            this.page = page;
            this.getData();
            console.log(this.count);
        },
        getData() {
            this.$axios
                .get("/user", { pn: this.page, size: this.size })
                .then(res => {
                    console.log(res.data);
                    if (res.code == 200) {
                        this.count = res.count;
                        this.tableData = res.data;
                    }
                });
        },
        delet(id) {
            console.log(id);
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$axios
                        .post("/user/delete", { userIds: id })
                        .then(res => {
                            console.log(res);
                            this.getData();
                        })
                        .catch(err => {
                            console.log(err);
                            this.getData();
                        });
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        detail() {}
    },
    created() {
        this.getData();
    }
};
</script>

<style>
.avatar {
    width: 90px;
    height: 107px;
}
.Pagination {
    width: 400px;
    margin: 30px auto;
}
</style>
