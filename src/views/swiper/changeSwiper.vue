<template>
    <div>
        <el-form :label-position="labelPosition" v-model="swiperinfo" label-width="80px" size="small" style="width:600px;">
            <el-form-item label="头像">
                <el-upload class="avatar-uploader" action="https://upload-z1.qiniup.com" :data="this.token" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="swiperinfo.img" :src="swiperinfo.img" class="avatars">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="swiperinfo.title"></el-input>
            </el-form-item>
            <el-form-item label="排序">
                <el-input v-model="swiperinfo.index"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="changeinfo" size="small">修改信息</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            _id: "",
            imageUrl: "",
            token: {
                token: ""
            },
            labelPosition: "right",
            swiperinfo:{}
        };
    },
    methods: {
        getswiperinfo() {
            this.$axios.get(`/swiper/${this._id}`, { id: this._id }).then(res => {
                console.log(res);
                this.swiperinfo=res.data
            });
        },
        changeinfo() {
               let param = {
                ...this.swiperinfo,
                book: this.swiperinfo.book._id
            };
            this.$axios
                .put(`/swiper/${this._id}`, param)
                .then(res => {
                    console.log(res);
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
            this.imageUrl = URL.createObjectURL(file.raw);
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
        this.getToken();
        this._id = this.$route.query.id;
        this.getswiperinfo();
    }
};
</script>

<style>
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
</style>
