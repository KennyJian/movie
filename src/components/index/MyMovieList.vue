<template>
  <div>
    <div class="leaderboard">
      <p v-if="type" class="leaderboard_title">今日票房</p>
      <p v-else class="expect leaderboard_title">最受期待</p>
      <div class="content">
        <div id="list_item" @click="getDetail(item.filmId)" v-for="(item,index) of list" :key="index">
          <div v-if="index ==0" class="item_top">
            <img :src="item.imgAddress" alt>
            <div class="top_right">
              <p>{{item.filmName}}</p>
              <p v-if="type" class="box">{{item.boxNum}}万</p>
              <p v-else class="expeact">{{item.expectNum}}万</p>
            </div>
          </div>
          <div class="grossed_last" v-else>
            <p class="movie_name">
              <span :class="{top:index < 3&&type, topE:index<3&&!type  }">{{parseInt(index,10)+1}}</span>
              {{item.filmName}}
            </p>
            <p v-if="type" class="box">{{item.boxNum}}万</p>
            <p v-else class="expeact">{{item.expectNum}}万</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyList",
  props: {
    list:{},
    type: {
      type:Boolean
    }
  },
  methods:{
     getDetail(id) {
      this.$router.push({
        path:"/details",
        query:{filmId:id}
      });
    }
  }
};
</script>

<style lang="less"  scoped>
.leaderboard {
  width: 360px;
  height: 475px;
  margin-left: 130px;

  .leaderboard_title {
    font-size: 26px;
    color: #ef4238;
  }
  .expect {
    margin-top: 210px;
    color: #ffb400;
  }
  .content {
    margin-top: 15px;
    width: 100%;
    #list_item {
      cursor: pointer;
      width: 100%;
      // 排行第一
      .item_top {
        width: 100%;
        height: 78px;
        border: 1px solid #efefef;
        margin-bottom: 10px;
        img {
          display: inline-block;
          width: 120px;
          height: 78px;
        }
        .top_right {
          display: inline-block;
          height: 78px;
          vertical-align: top;
          padding: 20px 0 0 10px;
          p:first-child {
            font-size: 18px;
          }
          p:last-child {
            font-size: 14px;
            color: #ef4238;
            margin-top: 5px;
          }
        }
      }
      // 其他
      .grossed_last {
        width: 100%;
        height: 37px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .movie_name {
          display: inline-block;
          font-size: 16px;
          span {
            display: inline-block;
            width: 20px;
            font-size: 18px;
          }
          .top {
            color: #ef4238;
          }
        }
        .movie_grossed {
          font-size: 14px;
          color: #ef4238;
        }
      }
    }
    #list_item:hover {
      background-color: #f7f7f7;
    }
  }
}
.box {
  color: #ef4238;
  font-size: 14px;
}
.expeact {
  color: #fdb863;
  font-size: 14px;
}
.topE {
  color:#fdb863;
}
</style>
