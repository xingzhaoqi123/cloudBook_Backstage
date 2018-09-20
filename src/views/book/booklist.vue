<template>
    <div>
        <div class="book_item" :data="books" v-for="(item,index) in books" :key="index" :lable='item'>
            <div class="">
                <router-link :to="{path:'bookinfo',query:{id:item._id}}">
                    <img :src="item.img" class="book_img ">
                </router-link>
            </div>
            <div class="book_info">
                <p>{{item.title}}</p>
            </div>  
            <div class="book_btn">
                <el-button type="primary" icon="el-icon-edit" circle></el-button>
                <el-button type="danger" icon="el-icon-delete" @click="delete_book(item._id)" circle></el-button>
            </div>
        </div>

        <el-dialog :visible.sync="dialogVisible">
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            typeid: "",
            books: [],
            dialogImageUrl: "",
            dialogVisible: false
        };
    },
    methods: {
        delete_book(id) {
            this.$axios
                .delete(`/category/${this.typeid}/book/${id}`, {
                    id: typeid,
                    bookid: id
                })
                .then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$message.success("删除成功。");
                    } else {
                        this.$message.error("删除失败。");
                    }
                    this.get();
                })
                .catch(err => {
                    console.log(err);
                });
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview() {
            this.dialogImageUrl = "";
            this.dialogVisible = true;
        },
        get() {
            this.$axios
                .get(`/category/${this.typeid}/books`, { pn: 1, size: 20 })
                .then(res => {
                    console.log(res);
                    this.books = res.data.books;
                });
        }
    },
    created() {
        this.typeid = this.$route.query.id;
        this.get();
    }
};
</script>

<style lang="scss">
.book_item {
    width: 220px;
    height: 260px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: #eaeeed;
    float: left;
    margin: 20px;
}
.book_img {
    width: 157px;
    height: 157px;
    display: block;
    margin: 0 auto;
    cursor: pointer;
}
.book_info {
    font-size: 15px;
    text-align: center;
}
.book_btn {
    margin: 0 auto;
}
</style>

