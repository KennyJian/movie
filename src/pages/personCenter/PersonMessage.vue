<template>
  <div class="message">
    <p class="message_head">基本信息</p>
    <div class="message_content">
      <div class="content_left">
        <div class="user_img">
          <img :src="userImg" alt>
        </div>
        <div class="img_upload">
          <!-- <p>上传图片</p> -->
          <!-- <input type="file"> -->
          <el-upload
          class="uploadImg"
          action="http://127.0.0.1:9095/user/upload"
          :name="headImgFile"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          >上传图片</el-upload>
        </div>
        <p class="tips">支持JPG,JPEG,PNG格式,且文件需小于1M</p>
      </div>
      <div class="content_right">
        <!-- 昵称 -->
        <div class="content_name">
          <label for>昵称：</label>
          <input v-model="name" type="text">
        </div>

        <div class="content_phone">
          <label for>电话：</label>
          <input v-model="phone" type="text">
        </div>
        <!-- 邮箱 -->
        <div class="content_email">
          <label for>邮箱：</label>
          <input v-model="email" type="text">
        </div>
        <!-- 性别 -->
        <div class="content_sex">
          <label for>性别：</label>
          <div class="sex_radio">
            <input type="radio" name="sex" value="0" v-model="sex">
            <span>男</span>
          </div>
          <div class="sex_radio">
            <input type="radio" name="sex" value="1" v-model="sex">
            <span>女</span>
          </div>
        </div>
        <!-- 生日 -->
        <div class="content_birthday">
          <label for>生日：</label>
          <div class="date">
            <input type="text" v-model="year">
            <span>年</span>
          </div>
          <div class="date">
            <input type="text" v-model="month">
            <span>月</span>
          </div>
          <div class="date">
            <input type="text" v-model="day">
            <span>日</span>
          </div>
        </div>
        <!-- 生活状态 -->
        <div class="content_sex">
          <label for>婚姻状态：</label>
          <div class="sex_radio">
            <input type="radio" name="status" value="0" v-model="status">
            <span>单身</span>
          </div>
          <div class="sex_radio">
            <input type="radio" name="status" value="1" v-model="status">
            <span>热恋中</span>
          </div>
          <div class="sex_radio">
            <input type="radio" name="status" value="2" v-model="status">
            <span>已婚</span>
          </div>
          <div class="sex_radio">
            <input type="radio" name="status" value="3" v-model="status">
            <span>为人父母</span>
          </div>
        </div>

        <!-- 个性签名 -->
        <div class="content_biography">
          <label for>个性签名：</label>
          <input type="text" v-model="biography">
        </div>
        <div class="submit" @click="update">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import {getCookie} from '../../common/utils'
export default {
  inject:['reload'],
  data() {
    return {
      name: "", //昵称
      sex: "", //性别
      year: "", //年
      month: "", //月份
      day: "", //日期
      status: "", //生活状态
      userImg: "", //用户头像
      phone: "", //联系电话，
      email: "",
      biography: "",
      date:'',
      headImgFile:"headImgFile"
    };
  },
  methods: {
    // 获取用户信息
    getuserInfo() {
      var that = this;
      this.$api.post({}, "/user/getUserInfo", res => {
        console.log(res.data);
        that.userImg = res.imgPre + res.data.headUrl;
        that.name = res.data.nickName;
        that.phone = res.data.userPhone;
        that.email = res.data.email;
        let date = res.data.birthday.split("-");
        that.year = date[0];
        that.month = date[1];
        that.day = date[2];
        that.sex = res.data.userSex;
        that.status = res.data.lifeState;
        that.biography = res.data.biography;
      });
    },
    // 更新信息
    update() {
      // console.log("update");
      this.data();
      var that = this;
      this.$api.post({
        nickName:that.name,
        email:that.email,
        userPhone:that.phone,
        userSex:that.sex,
        birthday:that.date,
        lifeState:that.status,
        biography:that.biography
      },"/user/updateUserInfo",(res) => {
        console.log(res);
        if(res.status == 200) {
          alert("修改成功");
        } else {
          alert(res.msg)
        }
      })
    },
    data() {
      this.date = this.year + "-" + this.month + "-" + this.day;
    },
    // 上传图片
     handleAvatarSuccess(res, file) {
        this.userImg = URL.createObjectURL(file.raw);
        this.reload();
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isLt2M) {
          alert('上传头像图片大小不能超过 1MB!')
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        // this.$api.post({
        //   headImgFile:file,
        // },"/user/upload",(res) => {
        //   console.log(res);
        //   if(res.status == 200) {
        //     alert("上传成功");
        //   } else {
        //     alert(res.msg)
        //   }
        // })
        return  isLt2M;
      }

  },
  computed: {
    headers(){
      return{
        "Authorization": "Bearer " + getCookie("key")
      }
    }
  },
  mounted() {
    this.getuserInfo();
  }
};
</script>

<style lang="less" scoped>
.message_head {
  width: 100%;
  padding: 26px 0;
  color: #ec443f;
  font-size: 18px;
  border-bottom: 1px solid #e1e1e1;
  margin-bottom: 30px;
}
.message_content > div {
  display: inline-block;
}
.message_content {
  width: 100%;
  .content_left {
    width: 258px;
    .user_img {
      width: 258px;
      height: 258px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .img_upload {
      .uploadImg {
        cursor: pointer;
        margin: 20px auto 0;
        width: 182px;
        height: 56px;
        line-height: 56px;
        color: #5b5b5b;
        background-color: #e6e6e6;
        border-radius: 10px;
        border: 1px;
        font-size: 18px;
        padding: 0;
        text-align: center;
      }
    }
    .tips {
      margin-top: 10px;
      color: #999;
      font-size: 18px;
      line-height: 30px;
      text-align: center;
    }
  }
  .content_right > div:nth-child(n + 2) {
    margin: 30px 0;
  }
  .content_right > div:last-child {
    margin: 30px 0px 30px 90px;
  }
  .content_right {
    vertical-align: top;
    margin-left: 80px;
    label {
      display: inline-block;
      width: 80px;
      text-align: right;
      margin-right: 5px;
      font-size: 16px;
      color: #333;
    }
    input {
      width: 240px;
      font-size: 12px;
      height: 30px;
      padding-left: 10px;
    }
    .content_sex {
      .sex_radio {
        display: inline-block;
        margin-right: 10px;
        input {
          width: 13px;
          height: 13px;
        }
      }
    }
    .content_birthday {
      .date {
        display: inline-block;
        input {
          width: 60px;
        }
      }
    }
    .submit {
      display: block;
      cursor: pointer;
      border-radius: 5px;
      width: 100px;
      height: 40px;
      color: #fff;
      font-size: 18px;
      line-height: 40px;
      border: none;
      background-color: #ed3931;
      text-align: center;
      margin-left: 80px;
    }
  }
}
</style>
