<template>
    <div>
        <el-form :label-position="this.labelPosition" v-model="swiper" label-width="110px" size="small" style="width:600px;">
            <el-form-item label="轮播图标题">
                <el-input v-model="swiper.title"></el-input>
            </el-form-item>
            <el-form-item label="轮播图书籍">
                <el-select v-model="swiper.typeId" @change="typechange" placeholder="请选择分类">
                    <el-option v-for="(item,index) in bookType" :key="index" :label="item.title" :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <div class="add_book">
                    <div class="add_book_img clearfloat">
                        <img :src="this.addbookdata.img" alt="">
                    </div>
                    <div class="add_book_info clearfloat">
                        <p class="book_title">标题：{{this.addbookdata.title}}</p>
                        <p>作者：{{this.addbookdata.author}}</p>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model="number" @change="handleChange" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="轮播图图片">
                <el-upload class="avatar-uploader" action="https://upload-z1.qiniup.com" :data="this.token" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="swiper.img" :src="swiper.img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
        <el-dialog title="书籍信息" :visible.sync="dialogTableVisible">
            <el-table :data="bookData">
                <el-table-column label="图书封面" width="150">
                    <template slot-scope="scope">
                        <img :src="scope.row.img" class="avatar">
                    </template>
                </el-table-column>
                <el-table-column property="title" label="书名" width="200">
                </el-table-column>
                <el-table-column property="author" label="作者"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="addbook(scope.row._id)">添加</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            dialogTableVisible: false,
            labelPosition: "right",
            number: 1,
            token: {
                token: ""
            },
            addbookdata: {
                id: "",
                img: "",
                title: "",
                author: ""
            },
            bookType: [],
            bookData: [],
            bookcount: 0,
            swiper: {
                title: "",
                img: "",
                book: "",
                index: "",
                typeId: ""
            }
        };
    },
    methods: {
        addbook(bookid) {
            this.$axios.get(`/book/${bookid}`, { id: bookid }).then(res => {
                if (res.code == 200) {
                    this.$message.success("添加成功");
                    this.addbookdata = res.data;
                    this.dialogTableVisible=false
                }else{
                    this.$message.error('添加失败')
                }
                console.log(res);
            }).catch(err=>{
                console.log(err)
            });
        },
        async getbookData() {
            const { data, count } = await this.$axios.get(
                `/category/${this.swiper.typeId}/books`
            );
            (this.bookData = data.books), (this.bookcount = count);
            console.log(this.bookData);
        },
        typechange() {
            this.getbookData();
            this.dialogTableVisible = true;
        },
        getType() {
            this.$axios.get("/category").then(res => {
                this.bookType = res.data;
                // this.count = res.count;
                console.log(res.data);
            });
        },
        handleChange(value) {
            this.swiper.index = value;
        },
        handleAvatarSuccess(res, file) {
            // this.imageUrl = URL.createObjectURL(file.raw);
            this.swiper.img = res.url;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        getToken() {
            axios
                .get("http://upload.yaojunrong.com/getToken")
                .then(res => {
                    this.token.token = res.data.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        addswiper() {
            this.$axios
                .post("/swiper", this.swiper)
                .then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$message.success("添加成功");
                        this.$router.push("swiperList");
                    } else {
                        this.$message.error("添加失败");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    created() {
        this.getType();
        this.getToken();
    }
};
</script>

<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 128px;
    height: 128px;
    display: block;
}
.add_book {
    width: 450px;
    height: 210px;
    border: 1px solid #333;
    border-radius: 6px;
    .add_book_img {
        img {
            width: 140px;
            height: 167px;
            border:1px solid #C6979D;
            border-radius: 6px;
        }
        margin: 20px;
        float: left;
        
    }
    .clearfloat:after {
        content: "";
        display: block;
        clear: both;
        visibility: hidden;
        height: 0;
    }
    .add_book_info {
        width: 220px;
        height: 167px;
        float: left;
        margin: 20px;
    }
}
.book_title{
    font-weight: 700
}
</style>
