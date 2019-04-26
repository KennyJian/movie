<template>
  <div>
    <div @click="showCommit" class="commit_button">写短评</div>
    <div v-show="show" class="commit_input">
      <div  class="input_content">
        <div @click="hidden" class="cancel">
          <img src="../../../static/imgs/cancel.png" alt="">
        </div>
        <textarea v-model="text" cols="60" rows="15" placeholder="请输入你的看法"></textarea>
        <p @click="commit">提交</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject:['reload'],
  name: "Review",
  props:{
    filmId:String
  },
  data() {
    return {
      show:false,
      text:'',
    };
  },
  methods: {
    commit() {
      if(this.text == "") {
        return false;
      } else {
        var that = this;
        this.$api.post({filmId:that.filmId,
        comment:that.text},'/comment/commit',(res)=> {
          if(res.status == 200) {
            alert("评论成功");
            that.hidden();
            this.reload()
          }else {
            alert(res.msg);
          }
        })
      }

    },
    showCommit(){
      this.show = true;
    },
    hidden() {
      this.show = false;
    }
  }
};
</script>

<style lang="less">
.commit_button {
  cursor: pointer;
  height: 30px;
  padding: 0 10px;
  border-radius: 15px;
  border: 1px solid #ef4238;
  text-align: center;
  font-size: 14px;
  line-height: 30px;
  color: #ef4238;
}
.commit_input {
  width: 550px;
  height: 380px;
  position: fixed;
  display: block;
  opacity: 1;
  z-index: 10000;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-color: #b2b2b2;
  border: 10px solid rgba(0, 0, 0, 0.3);
  padding-top: 20px;
  .input_content {
    text-align: center;
    position: relative;
    .cancel {
      position: absolute;
      top: -40px;
      right: -20px;
      width: 45px;
      height: 45px;
      border-radius: 40px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
    textarea {
      padding: 10px;
    }
    p {
      cursor: pointer;
      display: inline-block;
      width: 120px;
      height: 40px;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      line-height: 40px;
      color: #fff;
      background-color: #df2d2d;
      margin-top: 20px;
    }
  }
}
</style>
