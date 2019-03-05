<template>
  <div>
    <div class="movie_header">
      <!-- 电影状态 -->
      <div class="top_header">
        <ul>
          <li class="active">正在热映</li>
          <li>即将上映</li>
          <li>经典影片</li>
        </ul>
      </div>
      <!-- 电影类型 -->
     <channel :list="channelList"></channel>
    </div>
    <!-- 电影内容 -->
    <div class="movie_content">
      <!-- 单选框 -->
      <div class="movie_sort">
        <div class="sort_item">
          <input type="radio">
          <span>按热门排序</span>
        </div>
        <div class="sort_item">
          <input type="radio">
          <span>按时间排序</span>
        </div>
        <div class="sort_item">
          <input type="radio">
          <span>按评价排序</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Channel from '@/components/movie/Channel'
export default {
  components:{
    Channel
  },
  data() {
    return {
      channelList:{}
    }
  },
  methods: {
    getList() {
      this.$api.get({},'/film/getConditionList',(res)=> {
         this.channelList ={...res.data};
         console.log(this.channelList);
      },(error) => {
        console.log(error);
      })
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style lang="less">
.top_header {
  width: 100%;
  height: 60px;
  background-color: #47464a;
  text-align: center;
  ul {
    display: inline-block;
    li {
      display: inline-block;
      line-height: 60px;
      color: #999;
      padding: 0 40px;
      cursor: pointer;
    }
    li:hover {
      color: #fff;
    }
    .active {
      color: #ef4238;
    }
    .active:hover {
      color: #ef4238;
    }
  }
}

.movie_content {
  width: 1120px;
  margin: 40px auto 0;
  .movie_sort {
    font-size: 14px;
    margin-left: 20px;
    .sort_item {
      display: inline-block;
      margin-right: 30px;
    }
  }
}
</style>
