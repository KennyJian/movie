<template>
  <div class="myheader">
    <div class="content">
      <!-- 菜单左边 -->
      <div class="left">
        <div class="logo">
          <img src="../../../static/imgs/logo@2x.png" alt="logo">
        </div>
        <my-city></my-city>
        <div class="tabs_wrap">
          <a
            class="url"
            v-for="(item,index) in navList"
            :href="item.src"
            :key="index"
          >{{item.label}}</a>
        </div>
      </div>
      <!-- 右边 -->
      <div class="right">
        <div class="search">
          <div class="search_input">
            <input class="input" type="text" placeholder="找影视剧、影人、影院">
            <div class="search_icon">
              <img src="../../../static/imgs/ic_hone_search@2x.png" alt>
            </div>
          </div>
        </div>
        <user-info></user-info>
      </div>
    </div>
  </div>
</template>

<script>
import MyCity from "./headutil/MyCity.vue";
import UserInfo from "./headutil/UserInfo.vue";
export default {
  name: "MyHeader",
  components: {
    MyCity,
    UserInfo
  },
  data() {
    return {
      navList: [
        {
          label: "首页",
          name: "1",
          src: "/"
        },
        {
          label: "电影",
          name: "2",
          src: "/movie"
        },
        {
          label: "影院",
          name: "3",
          src: "/cinema"
        }
      ]
    };
  },
  mounted() {}
};
</script>

<style lang="less">
.myheader {
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  z-index: 999;
  border-bottom: 1px solid #d8d8d8;
  background-color: #fff;
  .content {
    width: 1200px;
    height: inherit;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      cursor: pointer;
      .logo {
        display: inline-block;
        width: 130px;
        height: 40px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .tabs_wrap {
        font-size: 18px;
        margin-left: 10px;
        .url {
          display: inline-block;
          width: 80px;
          text-align: center;
          line-height: 80px;
          text-decoration: none;
          color: #333;
        }

        .url:hover {
          color: #ef4238;
        }

        .active {
          background: #ef4238;
          color: #fff;
        }

        .active:hover {
          color: #fff;
        }
      }
    }
    .right {
      cursor: pointer;
      display: inline-block;
      display: flex;
      align-items: center;
      .search {
        display: inline-block;
        .input {
          width: 215px;
          height: 40px;
          border-radius: 40px;
          outline: none;
          border: 1px solid #ccc;
          padding-left: 20px;
          padding-right: 45px;
          font-size: 14px;
          overflow: hidden;
        }
        .search_icon {
          display: inline-block;
          width: 40px;
          height: 40px;
          border-radius: 25px;
          background: #ef4238;
          position: relative;
          right: 45px;
          top: 5px;
          text-align: center;
          padding-top: 10px;
          img {
            display: inline-block;
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
}
</style>
