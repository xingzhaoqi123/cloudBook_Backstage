import axios from "axios";

const baseUrl = "/api/admin";
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 1000
});

const fetch = {
    get(url, data, config) {
    return new Promise((resolve, reject) => {
        instance.get(url,{params:data},config).then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  post(url,data,config){
      return new Promise((resolve,reject)=>{
        instance.post(url,data,config).then(res=>{
            if(res.data.code == 401){
                this.$message({
                    message: "恭喜你，登陆成功",
                    type: "success"
                });
              }
              resolve(res.data)
          }).catch(err=>{
              reject(err)
          })
      })
  }
};

export default  fetch 
