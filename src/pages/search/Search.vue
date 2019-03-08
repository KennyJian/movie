<template>
  <div class="search">
    <div class="search_head">
      <div class="search_input">
        <input type="text" placeholder="请输入电影相关信息">
        <img class="submit" src="../../../static/imgs/search.png">
      </div>
    </div>
    <div v-if="searchReturn" class="search_content">

    </div>
    <div v-else class="search_empty">
      <div class="empty_content">
        <h1>很抱歉，没找到相关的影视剧</h1>
        <p>小喵建议您：</p>
        <p>1. 请检查输入的关键词是否有误</p>
        <p>2. 请缩短关键词</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      searchReturn: true,
      searchVal: ""
    };
  },
  methods: {
    searchFilm(val) {
      this.$api.get(
        { filmName: val },
        "/film/searchFilm",
        res => {
          if (res.data) {
            console.log(res.data);
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
    if (search) {
      this.searchReturn = false;
    }
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
      outline:none;
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
.empty_content {
  padding: 0 160px;
  margin-top: 98px;
}

</style>
