<template>
  <div>
    <div class="movie_header">
      <!-- 电影状态 -->
      <div class="top_header">
        <ul>
          <li v-for="(top,index) of type" :key="index" :class="{active:index==typeselected}">正在热映</li>

        </ul>
      </div>
      <!-- 电影类型 -->
     <channel :list="channelList" :channelselect="channelSelect"></channel>
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
      <div class="movie_list">
        <div class="list_item" v-for="(item,index) of movieList" :key="index">
          <div class="item_img">
            <img :src="item.imgAddress" alt="">
          </div>
          <p class="item_name">{{item.filmName}}</p>
          <p  v-if="item.filmType == 1" class="item_score">{{item.filmScore}}</p>
          <p v-else class="movie_want">234567人想看</p>
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
      type:[
        '正在热映',
        '即将上映',
        '经典影片'
      ],
      typeselected:0, //播放类型被选中
      channelSelect:{
        catselected:1, //电影类型被选中
        sourceselected:1,//被选中区域
        yearselected:1, //被选中年份
      },
      channelList:{},
      movieList: {},
      showType:'1', //查询类型
      sortId:'', // 排序方式
      catId:'', //类型编号
      sourceId:'',//区域编号
      yearId:'', //年代编号
      nowpage:'', //当前页
      pageSize:'' //每页显示条数
    }
  },
  methods: {
    getmovieList(showType,sortId,catId,sourceId,yearId) {
      this.$api.get({}, '/film/getFilms', (res)=> {
        this.movieList = {...res.data}
      },
      (error) => {
        console.log(error);
      })
    },
    // 获取搜索条件列表
    getChaneelList() {
      this.$api.get({},'/film/getConditionList',(res)=> {
         this.channelList ={...res.data};
        console.log(res.data) ;
      },(error) => {
        console.log(error);
      })
    }
  },
  mounted() {
    this.getChaneelList();
    this.getmovieList();
  }
};
</script>

<style lang="less" scoped>
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
  .movie_list {
    width: 1078px;
    margin: 0 auto;
    .list_item {
      width: 160px;
      margin-top: 30px;
      display: inline-block;
      .list_img {
        width: 160px;
        height: 220px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .item_name {
        color: #333;
        font-size: 16px;
        text-align: center;
        margin-top: 10px;
      }
      .item_score,.movie_want {
        margin-top: 10px;
        font-size: 16px;
        text-align: center;
        color: #ffb400;
      }
    }
    .list_item:nth-child(n+2) {
      margin:30px 0 0 23px;
    }
    .list_item:nth-child(6n+7) {
      margin-left: 0;
    }
  }
}
</style>
