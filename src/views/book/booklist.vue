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
                <el-button type="primary" icon="el-icon-edit" @click="changebook(item._id)" circle></el-button>
                <el-button type="danger" icon="el-icon-delete" @click="delete_book(item._id)" circle></el-button>
            </div>
        </div>
        <div class="book_item">
            <div class="book_add">
                <div class="el-icon-plus plus" @click="add_book"></div>
            </div>
        </div>
        <el-dialog :visible.sync="dialogVisible">
            <el-form :label-position="labelPosition" label-width="100px" :model="add_book_info">
                <el-form-item label="看云图书链接">
                    <el-input v-model="add_book_info.url"></el-input>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="add_book_info.author"></el-input>
                </el-form-item>
                <el-form-item label="图书头图链接">
                    <el-input v-model="add_book_info.img"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="add">添加</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog :visible.sync="change_book" title="修改图书">
            <el-form :label-position="labelPosition" label-width="100px" :model="changebookinfo">
                <el-form-item label="书名">
                    <el-input v-model="changebookinfo.title" prop="bookinfo.title"></el-input>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="changebookinfo.author"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input-number v-model="changebookinfo.index" @change="handleChange" :min="1"></el-input-number>
                </el-form-item>
                <el-form-item label="类别">
                    <el-select v-model="changebookinfo.type" placeholder="请选择分类">
                        <el-option v-for="(item,index) in bookType" :key="index" :label="item.title" :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图书封面">
                    <el-upload class="avatar-uploader" action="https://upload-z1.qiniup.com" :data="this.token" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="changebookinfo.img" :src="changebookinfo.img" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input v-model="changebookinfo.desc" rows="5" type="textarea"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="modifybook">修改</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            change_book: false,
            token: {
                token: ""
            },
            labelPosition: "right",
            typeid: "",
            books: [],
            dialogImageUrl: "",
            dialogVisible: false,
            add_book_info: {
                url: "",
                author: "",
                img: "",
                typeId: ""
            },
            bookType: [],
            changebookinfo: {
                book_id: "",
                index: "",
                desc: "",
                author: "",
                img: "",
                type: "",
                title: ""
            }
        };
    },
    methods: {
        modifybook() {
            this.$axios.put("/book", this.changebookinfo).then(res => {
                console.log(res);
                this.change_book = false;
            });
        },
        get_book(bookid) {
            this.$axios
                .get(`/book/${bookid}`, { id: bookid })
                .then(res => {
                    this.changebookinfo = res.data;
                    this.changebookinfo.type = "";
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        },

        handleAvatarSuccess(res, file) {
            // this.imageUrl = URL.createObjectURL(file.raw);
            this.changebookinfo.img = res.url;
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
        getType() {
            this.$axios.get("/category").then(res => {
                this.bookType = res.data;
                // this.count = res.count;
                console.log(res.data);
            });
        },
        changebook(bookid) {
            this.changebookinfo.book_id = bookid;
            this.get_book(bookid);
            this.change_book = true;
        },
        add() {
            this.$axios.post("/book", this.add_book_info).then(res => {
                console.log(res);
                if (res.code == 200) {
                    this.$message.success(res.msg);
                } else {
                    this.$message.error(res.msg);
                }
                this.dialogVisible = false;
                this.get();
            });
        },
        handleChange(value) {
            this.changebookinfo.index = value;
        },
        add_book() {
            this.dialogVisible = true;
            this.add_book_info.typeId = this.typeid;
        },
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
        this.getToken();
        this.typeid = this.$route.query.id;
        this.get();
        this.getType();
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
    box-shadow: 6px 6px 3px #888888;
    .book_add {
        width: 150px;
        height: 190px;
        margin: 0 auto;
    }
}
.plus {
    font-size: 150px;
    margin: 0 auto;
    color: #6a707c;
    background-color: #f0ede8;
    box-shadow: 6px 6px 3px #888888;
    cursor: pointer;
}
.el-icon-plus:active {
    box-shadow: none;
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
.add_book {
    margin: 30px;
}
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
</style>



