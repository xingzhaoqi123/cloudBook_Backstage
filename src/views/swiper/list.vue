<template>
    <div>
        <el-table :data="list" style="width: 100%" header-align='center'>
            <el-table-column label="轮播图片" width="180">
                <template slot-scope="scope">
                    <img :src="scope.row.img" class="avatar">
                </template>
            </el-table-column>
            <el-table-column prop="book.title" label="书名" width="180">
            </el-table-column>
            <el-table-column prop="book.author" label="作者" width="180">
            </el-table-column>
            <el-table-column prop="book.createTime" label="创建时间">
            </el-table-column>
            <el-table-column prop="index" label="排序">
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <router-link :to="{path:'detail_swiper',query:{id:scope.row._id}}">
                        <el-button type="primary" @click="detail(scope.row)" size="small">详细信息</el-button>
                    </router-link>
                    <router-link :to="{path:'changeSwiper',query:{id:scope.row._id}}">
                        <el-button type="primary" @click="detail(scope.row)" size="small">修改信息</el-button>
                    </router-link>
                    <el-button type="danger" size="small" @click="delet(scope.row._id)">删除</el-button>
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
            list: [],
            count: 0,
            page: 1,
            size: 5
        };
    },
    methods: {
        changePage(page) {
            this.page = page;
            this.getSwiper();
        },
        detail(swiper) {
            this.$store.commit("GET_SWIPERDETAIL", swiper);
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
                        .post("/swiper/delete", { ids: id })
                        .then(res => {
                            this.getSwiper();
                        })
                        .catch(err => {
                            console.log(err);
                            this.getSwiper();
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
        getSwiper() {
            this.$axios
                .get("/swiper", { pn: this.page, size: this.size })
                .then(res => {
                    this.list = res.data;
                    this.count = res.count;
                });
        }
    },
    created() {
        this.getSwiper();
    }
};
</script>

<style>
.avatar {
    width: 127px;
    height: 127px;
}
.Pagination {
    width: 400px;
    margin: 30px auto;
}
</style>
