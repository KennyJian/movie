<template>
  <div class="myheader">
    <div class="content">
      <!-- 菜单左边 -->
      <div class="left">
        <div class="logo" @click="routerto">
          <img src="../../../static/imgs/logo.jpg" alt="logo">
        </div>
        <my-city></my-city>
        <div class="tabs_wrap">
          <p
            class="url"
            v-for="(item, index) in navList"
            :key="index"
            :class="{active:index == selected}"
            @click="selectRouter(index)"
          >{{item.label}}</p>
        </div>
      </div>
      <!-- 右边 -->
      <div class="right">
        <div class="search">
          <input
            class="input"
            type="text"
            v-model="searchVal"
            @keyup.enter="search"
            placeholder="找影视剧、影人、影院"
          >
          <div class="search_icon">
            <img @click="search" src="../../../static/imgs/ic_hone_search@2x.png" alt>
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
import {SetStore,getStore} from '../../common/utils.js'
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
          src: "/"
        },
        {
          label: "电影",
          src: "/movie"
        },
        {
          label: "影院",
          src: "/cinema"
        }
      ],
      selected: 0,
      searchVal: ""
    };
  },
  methods: {
    selectRouter(index) {
      this.selected = index;
      switch (index) {
        case 0:
          this.$router.push("/");
          break;
        case 1:
          this.$router.push("/movie");
          break;
        case 2:
          this.$router.push("/cinema");
          break;
      }
    },
    search() {
      this.$router.push({
        path: "/search",
        query: { search: this.searchVal }
      });
      this.selected = 4;
      this.searchVal = "";
    },
    routerto() {
      this.$router.push('/');
    }
  },
  watch: {
  },
  mounted() {
    if(this.$route.path == '/' || this.$route.path == '/index') {
      this.selected = 0
    }else if(this.$route.path == '/movie') {
      this.selected = 1;
    } else if(this.$route.path == '/') {
      this.selected = 2;
    }
  }
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
        width: 250px;
        position: relative;
        margin-right: 40px;
        .input {
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
          width: 40px;
          height: 40px;
          border-radius: 25px;
          background: #ef4238;
          position: absolute;
          right: 5px;
          top: 0;
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
