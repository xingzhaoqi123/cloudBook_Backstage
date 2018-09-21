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
                <template slot-scope="scope" :token="this.token" props:{ token:{ type:Object, required:true } },>
                    <router-link :to="{path:'booklist',query:{id:scope.row._id}}">
                        <el-button type="primary" size="small">获取分类下图书</el-button>
                    </router-link>
                    <el-button type="primary" size="small" @click="transinfo(scope.row)">修改分类</el-button>
                    <el-dialog title="修改分类" :visible.sync="dialogFormVisible">
                        <el-form :label-position="this.labelPosition" label-width="80px">
                            <el-form-item label="封面标题" :label-width="formLabelWidth">
                                <el-input v-model="changeinfo.title" ></el-input>
                            </el-form-item>
                            <el-form-item label="头像">
                                <el-upload class="avatar-uploader" action="https://upload-z1.qiniup.com" :data="token" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="分类排序" prop="scope.row.index" :label-width="formLabelWidth">
                                <el-input-number v-model="changeinfo.index" @change="handleChange" :min="1" label="描述文字"></el-input-number>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="changeType(scope.row._id)">确 定</el-button>
                        </div>
                    </el-dialog>
                    <el-button type="danger" @click="deleteType(scope.row._id)" size="small">删除分类</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="Pagination" background @current-change='changePage' :page-size='this.size' layout="prev, pager, next" :total="this.count">
        </el-pagination>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            token: {
                token: ""
            },
            num1: 1,
            labelPosition: "right",
            bookType: [],
            count: 0,
            page: 1,
            size: 5,
            imageUrl:'',
            dialogFormVisible: false,
            formLabelWidth: "120px",
            changeinfo: {
                title: "",
                icon: "",
                index: ""
            }
        };
    },
    methods: {
        deleteType(id) {
            this.$confirm("此操作将删除该分类, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$message({
                        type: "info",
                        message: "请确保该分类下没有图书。"
                    });
                })
                .then(() => {
                    this.$axios
                        .delete(`/category/${id}`, id)
                        .then(res => {
                            if (res.code == 200) {
                                this.$message.success("删除成功");
                            }
                            this.getType();
                        })
                        .catch(err => {
                            console.log(err);
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
        changeType(id) {
            console.log(this.changeinfo)
            this.$axios
                .put(`/category/${id}`, this.changeinfo)
                .then(res => {
                    console.log(res)
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg);
                    }else{
                        this.$message.error(res.data.msg)}
                     this.getType();
                    this.dialogFormVisible = false;
                })
                .catch(err => {
                    this.$message.error("修改分类失败");
                    this.dialogFormVisible = false;
                });
        },
        handleChange(value) {
            this.changeinfo.index = value;
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
            this.imageUrl = URL.createObjectURL(file.raw);
            this.changeinfo.icon = res.url;
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
        transinfo(typeobj) {
            this.changeinfo = typeobj;
            this.dialogFormVisible = true;
        },
        changePage(page) {
            this.page = page;
            this.getType();
        },
        getType() {
            this.$axios
                .get("/category", { pn: this.page, size: this.size })
                .then(res => {
                    this.bookType = res.data;
                    this.count = res.count;     
                });
        }
    },
    created() {
        this.getToken();
        this.getType();
    }
};
</script>

<style>
.Pagination {
    width: 400px;
    margin: 30px auto;
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
