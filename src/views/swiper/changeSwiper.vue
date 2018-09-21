<template>
    <div>
        <el-form :label-position="labelPosition" :model="swiperinfo" label-width="110px" size="small" style="width:600px;">
            <el-form-item label="轮播图">
                <el-upload class="avatar-uploader" action="https://upload-z1.qiniup.com" :data="this.token" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="swiperinfo.img" :src="swiperinfo.img" class="avatars">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="轮播图书籍">
                <el-select v-model="typeId" @change="typechange" placeholder="请选择分类">
                    <el-option v-for="(item,index) in bookType" :key="index" :label="item.title" :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-show="show">
                <div class="add_book">
                    <div class="add_book_img clearfloat">
                        <img :src="this.bookinfo.img" alt="">
                    </div>
                    <div class="add_book_info clearfloat">
                        <p class="book_title">标题：{{this.bookinfo.title}}</p>
                        <p>作者：{{this.bookinfo.author}}</p>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="swiperinfo.title"></el-input>
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model="swiperinfo.index" @change="handleChange" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="changeinfo" size="small">修改信息</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="书籍信息" :visible.sync="dialogTableVisible">
            <el-table :data="bookData">
                <el-table-column label="图书封面" width="150">
                    <template slot-scope="scope">
                        <img :src="scope.row.img" class="avatarc">
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
            typeId: "",
            dialogTableVisible: false,
            show: true,
            _id: "", //轮播图的ID
            // imageUrl: "",
            token: {
                token: ""
            },
            labelPosition: "right",
            swiperinfo: {
                //轮播图的信息 含有book信息
                title: "",
                img: "",
                book: "",
                index: ""
            },
            bookinfo: {},
            bookType: [],
            bookData: []
        };
    },
    methods: {
        handleChange(value) {
            this.swiperinfo.index = value;
        },
        addbook(bookid) {
            this.swiperinfo.book = bookid;
            this.$axios
                .get(`/book/${bookid}`, { id: bookid })
                .then(res => {
                    if (res.code == 200) {
                        this.$message.success("添加成功");
                        this.bookinfo = res.data;
                        this.show = true;
                    } else {
                        this.$message.error("添加失败");
                    }
                    this.dialogTableVisible = false;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getType() {
            this.$axios.get("/category").then(res => {
                this.bookType = res.data;
                // this.count = res.count;
                // console.log(res.data);
            });
        },
        async getbookData() {
            const { data, count } = await this.$axios.get(
                `/category/${this.typeId}/books`
            );
            (this.bookData = data.books), (this.bookcount = count);
            // console.log(this.bookData);
        },
        typechange() {
            this.getbookData();
            this.dialogTableVisible = true;
        },
        getswiperinfo() {
            this.$axios
                .get(`/swiper/${this._id}`, { id: this._id })
                .then(res => {
                    console.log(res);
                    this.swiperinfo = res.data;
                    this.bookinfo = res.data.book;
                });
        },
        changeinfo() {
            this.$axios
                .put(`/swiper/${this._id}`, this.swiperinfo)
                .then(res => {
                    // console.log(res);
                    if (res.data.code == 200) {
                        this.$message({
                            message: res.data.msg,
                            type: "success"
                        });
                        setTimeout(() => {
                            this.$router.push("swiperList");
                        }, 1000);
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: "error"
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
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
        handleAvatarSuccess(res, file) {
            this.swiperinfo.img = URL.createObjectURL(file.raw);
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
        }
    },
    created() {
        this.getType();
        this.getToken();
        this._id = this.$route.query.id; //轮播图的ID
        this.getswiperinfo();
    }
};
</script>

<style lang='scss'>
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
.avatars {
    width: 178px;
    height: 178px;
    display: block;
    border-radius: none;
}
.avatarc {
    width: 118px;
    height: 138px;
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
            border: 1px solid #c6979d;
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
.book_title {
    font-weight: 700;
}
</style>
