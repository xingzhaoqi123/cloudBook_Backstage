<template>
    <div>
        <el-table :data="bookType" style="width: 100%">
            <el-table-column label="分类封面">
                <template slot-scope="scope">
                    <img :src="scope.row.icon" class="avatar">
                </template>
            </el-table-column>
            <el-table-column prop="title" label="分类标题">
            </el-table-column>
            <el-table-column prop="index" label="分类排序">
            </el-table-column>
            <el-table-column label="操作" width="600">
                <template slot-scope="scope">
                    <router-link :to="{path:'booklist',query:{id:scope.row._id}}">
                    <el-button type="primary" size="small">获取分类下图书</el-button>
                    </router-link>
                     <!-- <router-link :to=""> -->
                    <el-button type="primary" size="small">修改分类</el-button>
                    <!-- </router-link>  -->
                    <el-button type="danger">删除分类</el-button>
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
            bookType: [],
            count: 0,
            page: 1,
            size: 5
        };
    },
    methods: {
        changePage(page) {
            this.page = page;
            this.getType();
        },
        getType() {
            this.$axios.get("/category",{pn:this.page,size:this.size}).then(res => {
                this.bookType = res.data;
                this.count=res.count
                console.log(res.data);
            });
        }
    },
    created() {
        this.getType();
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
