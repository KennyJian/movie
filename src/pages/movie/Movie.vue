<template>
  <div>
    <div class="movie_header">
      <!-- 电影状态 -->
      <div class="top_header">
        <ul>
          <li v-for="(top,index) of type" :key="index" :class="{active:index==typeselected}" @click="checkIndex(index)">{{top}}</li>
        </ul>
      </div>
      <!-- 电影类型 -->
      <channel :list="channelList" :channelselect="channelSelect" @channel="channelval"></channel>
    </div>
    <!-- 电影内容 -->
    <div class="movie_content">
      <!-- 单选框 -->
      <div class="movie_sort">
        <div class="sort_item">
          <input type="radio" name="radios" value="1" @click="radio(1)" v-model="sortId">
          <span>按热门排序</span>
        </div>
        <div class="sort_item">
          <input type="radio" name="radios" value="2" @click="radio(2)" v-model="sortId">
          <span>按时间排序</span>
        </div>
        <div class="sort_item" v-show="showType != '2'">
          <input type="radio" name="radios" value="3" @click="radio(3)" v-model="sortId">
          <span>按评价排序</span>
        </div>
      </div>
      <!-- 电影列表 -->
      <div v-if="show" class="movie_list">
        <div class="list_item" v-for="(item,index) of movieList" :key="index">
          <div class="item_img">
            <img :src="item.imgAddress" alt>
          </div>
          <p class="item_name">{{item.filmName}}</p>
          <p v-if="item.filmType == 1" class="item_score">{{item.filmScore}}</p>
          <p v-else class="movie_want">{{item.expectNum}}人想看</p>
        </div>
      </div>
      <!-- 查不到电影信息 -->
      <div v-else class="no_movie">
        抱歉，没有找到相关结果，请尝试用其他条件筛选。
      </div>
    </div>
  </div>
</template>

<script>
import Channel from "@/components/movie/Channel";
export default {
  components: {
    Channel
  },
  data() {
    return {
      type: ["正在热映", "即将上映", "经典影片"],
      typeselected: 0, //播放类型被选中
      channelSelect: {
        catselect: '99', //电影类型被选中
        sourceselect: '99', //被选中区域
        yearselect: '99', //被选中年份
      },
      channelList: {},
      movieList: {},
      showType:'1', //顶部电影情况
      sortId:'1', //排序方式
      catId:'99',
      sourceId:'99',
      yearId:'99',
      nowpage: "", //当前页
      pageSize: "" ,//每页显示条数
      show:true //数据展示
    };
  },
  methods: {
    // 顶部搜索
    checkIndex(index) {
      this.typeselected = index;
      this.showType = index + 1;
      this.getmovieList();
    },
    // 单选框搜索条件
    radio(index) {
      this.sortId = index
      this.getmovieList();
    },
    // 子组件传值实现筛选框样式转换
    channelval:function(msg) {
      switch(msg.type){
        case 1:
        this.channelSelect.catselect = msg.id;
        this.catId = msg.id;
        break;
        case 2:
        this.channelSelect.sourceselect = msg.id;
        this.sourceId = msg.id;
        break;
        case 3:
        this.channelSelect.yearselect = msg.id;
        this.yearId = msg.id;
        break;
      }
      this.getmovieList();
    },
    // 传入搜索条件
    getmovieList() {
      this.$api.get(
        {
          showType:this.showType,
          sortId:this.sortId,
          catId:this.catId,
          sourceId:this.sourceId,
          yearId:this.yearId
        },
        "/film/getFilms",
        (res) => {
          if(res.data != 0) {
            this.show = true;
            this.movieList = { ...res.data };
          } else {
            this.show = false;
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    // 获取搜索条件列表
    getChaneelList() {
      this.$api.get(
        {},
        "/film/getConditionList",
        (res) => {
          this.channelList.catInfo = this.ArraySplice(res.data.catInfo);
          this.channelList.sourceInfo = this.ArraySplice(res.data.sourceInfo);
          this.channelList.yearInfo = this.ArraySplice(res.data.yearInfo);

        },
        error => {
          console.log(error);
        }
      );
    },
    // 将数组逆序
    ArraySplice(array) {
      let length = array.length;
      let Array = []
      for (let i of array) {
        Array[length-1] = i;
        length--;
      }
      return Array;
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
      .item_score,
      .movie_want {
        margin-top: 10px;
        font-size: 16px;
        text-align: center;
        color: #ffb400;
      }
    }
    .list_item:nth-child(n + 2) {
      margin: 30px 0 0 23px;
    }
    .list_item:nth-child(6n + 7) {
      margin-left: 0;
    }
  }
  .no_movie {
    margin: 40px 0 0 20px;
    font-size: 16px;
    color: #333;
  }
}
</style>
