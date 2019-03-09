<template>
  <div class="search">
    <div class="search_head">
      <div class="search_input">
        <input type="text" @keyup.enter="searchFilm(searchVal)" v-model="searchVal" placeholder="请输入电影相关信息">
        <img class="submit" @click="searchFilm(searchVal)" src="../../../static/imgs/search.png">
      </div>
    </div>
    <div v-if="searchReturn" class="search_content">
      <div class="content_item" v-for="item of searchList" :key="item.filmId">
        <div class="movie_img">
          <img :src="item.filmImg" alt>
        </div>
        <div class="movie_intro">
          <p class="movie_title">{{item.filmName}}</p>
          <p class="movie_score">{{item.filmScore}}</p>
          <p class="movie_class">{{item.filmCats}}</p>
          <p class="movie_time">{{item.filmTime}}</p>
        </div>
      </div>
    </div>
    <!-- 为搜索到电影内容 -->
    <div v-else class="search_empty">
      <div class="empty_content">
        <h3>很抱歉，没找到相关的影视剧</h3>
        <p class="tip">小喵建议您：</p>
        <p class="lib">1. 请检查输入的关键词是否有误</p>
        <p class="lib">2. 请缩短关键词</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      searchReturn: true,
      searchVal: "",
      searchList:{}
    };
  },
  methods: {
    searchFilm(val) {
      this.$api.get(
        { filmName: val },
        "/film/searchFilm",
        res => {
          if (res.data) {
            if(res.data) {
              this.searchList = {...res.data}
            } else {
              this.searchReturn = false;
            }
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  },
  mounted() {
    let search = this.$route.query.search;
    this.searchFilm(search);
  }
};
</script>

<style lang="less" scoped>
.search_head {
  width: 100%;
  height: 126px;
  background-color: #47464a;
  display: flex;
  align-items: center;
  justify-content: center;
  .search_input {
    width: 560px;
    position: relative;
    input {
      width: 560px;
      padding: 15px 50px 15px 20px;
      height: 18px;
      border-radius: 20px;
      border: 1px solid #999;
      outline: none;
    }
    .submit {
      position: absolute;
      box-sizing: border-box;
      border: none;
      top: 4px;
      right: 8px;
      width: 23px;
      height: 23px;
      cursor: pointer;
    }
  }
}
.search_content {
  width:1000px;
  margin: 0 auto;
  .content_item {
    width: 460px;
    margin: 40px 0 0 30px;
    display: inline-block;
    .movie_img {
      width: 160px;
      height: 220px;
      display: inline-block;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .movie_intro {
      width: 275px;
      display: inline-block;
      vertical-align: top;
      height: 219px;
      border-bottom: 1px solid #e5e5e5;
      .movie_title {
        font-size: 26px;
        margin-top: 27px;
        letter-spacing: 2px;
      }
      .movie_score {
        color: #ffb400;
        font-size: 26px;
        margin-top: 25px;
        margin-bottom: 12px;
      }
      .movie_class {
        font-size: 16px;
        color: #333;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .movie_time {
        font-size: 16px;
        color: #999;
        margin-top: 5px;
      }
    }
  }
}
.empty_content {
  padding: 0 160px;
  margin-top: 98px;
  h3 {
    font-size: 26px;
    color: #999;
    font-weight: 400;
  }
  .tip {
    margin-top: 25px;
    color: #ef4238;
    font-size: 16px;
  }
  .lib {
    margin-top: 10px;
    font-size: 16px;
  }
}
</style>
