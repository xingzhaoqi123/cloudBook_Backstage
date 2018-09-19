<template>
    <div>
        <div class="book_item" :data="books" v-for="(item,index) in books" :key="index" :lable='item'>
            <div>
                <img :src="item.img" class="book_img">
            </div>
            <div class="book_info">
                <p >{{item.title}}</p>
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
}
.book_info {
    font-size: 15px;

    text-align: center;
}
</style>

