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
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <router-link :to="{path:'detail_swiper',query:{id:scope.row._id}}">
                        <el-button type="primary" @click="detail(scope.row.book)" size="small">详细信息</el-button>
                    </router-link>
                    <el-button type="danger" @click="delet(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: []
        };
    },
    methods: {
        detail(book) {
           this.$store.commit('GET_SWIPERDETAIL',book)
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
                            this.getSwiper()
                        })
                        .catch(err => {
                            console.log(err);
                            this.getSwiper()
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
            this.$axios.get("/swiper", { pn: 1, size: 20 }).then(res => {
                this.list = res.data;
                console.log(res.data);
            });
            // .catch(err => {
            //     console.log(err);
            // });
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
</style>
