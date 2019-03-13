<template >
  <div>
    <c-channel :channel="channelList" :channelselect="channelSelect" @channel="channelval"></c-channel>
    <div class="cinema_content">
      <p class="head_title">影院列表</p>
      <div class="cinema_item" v-for="item of cinemaList" :key="item.uuid">
        <div class="item_left">
          <p class="cinema_name">{{item.cinemaName}}</p>
          <p class="cinema_adress">{{item.address}}</p>
        </div>
        <div class="item_right">
          <p class="cinema_price">￥{{item.minimumPrice}}<span>起</span></p>
          <p class="cinema_select">选座购票</p>
        </div>
      </div>
    </div>
    <!-- 底部分页 -->
    <div class="cinema_bottom">
      <el-pagination
        background
        prev-text="上一页"
        next-text="下一页"
        @size-change="handleSizeChange"
        @current-change="currentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="prev, pager, next"
        :total="totalLength"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import CChannel from '@/components/cinema/CChannel.vue'
export default {
  components:{
    CChannel
  },
  data() {
    return {
      channelSelect: {
        areaselect: '99', //电影类型被选中
        brandselect: '99', //被选中区域
        hallselect: '99', //被选中年份
      },
      channelList:{},
      areaId:'99',
      brandId:'99',
      hallId:'99',
      cinemaList:[],
      currentPage:1,//当前页
      totalLength:-1, //数据总量
      pagesize:12 //每页的数据量
    }
  },
  methods: {
    // 获取筛选列表
    getchannel() {
      this.$api.get({},'/cinema/getCondition',(res) => {
        res.data.areaList =  this.ArraySplice(res.data.areaList);
        res.data.brandList =  this.ArraySplice(res.data.brandList);
        res.data.hallTypeList =  this.ArraySplice(res.data.hallTypeList);
        this.channelList = {...res.data};
      },(error) => {
        console.log(error);
      })
    },
    channelval:function(msg) {
      switch(msg.type){
        case 1:
        this.channelSelect.brandselect = msg.id;
        this.brandId = msg.id;
        console.log(this.brandId);
        break;
        case 2:
        this.channelSelect.areaselect = msg.id;
        this.areaId = msg.id;
        console.log(this.areaId);
        break;
        case 3:
        this.channelSelect.hallselect = msg.id;
        this.hallId = msg.id;
        break;
      }
      this.getcinema();
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
    },
    // 获取影院列表
    getcinema() {
      this.$api.get({
        brandId:this.brandId,
        hallType:this.hallId,
        districtId:this.areaId,
        pageSize:this.pagesize,
        nowPage:this.currentPage
      },'/cinema/getCinemas',(res)=> {
        this.cinemaList = res.data;
        this.currentPage = res.nowPage;
        this.totalLength = res.totalPage
      })
    },
    // 改变每页数据
    handleSizeChange:function(size) {
      this.pagesize = size;
    },
    currentChange(currentPage) {
      window.scroll(0, 0);
      this.currentPage = currentPage;
      this.first_row = (currentPage - 1) * this.pagesize;
      this.getcinema();
    }
  },
  mounted() {
    this.getchannel();
    this.getcinema();
  }
}
</script>

<style lang="less" scoped>
  .cinema_content {
    width:100%;
    margin-top: 40px;
    .head_title {
      font-size: 18px;
      color: #333;
      border-left: 4px solid #f03d37;
      padding-left: 6px;
      line-height: 18px;
    }
    .cinema_item {
      width: 100%;
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item_left {
        .cinema_name {
          font-size: 16px;
          line-height: 18px;
          color: #333;
          margin-bottom: 10px;
        }
        .cinema_adress {
          font-size: 14px;
          line-height: 14px;
          color: #999;
        }
      }
      .item_right {
        .cinema_price {
          display: inline-block;
          font-size: 16px;
          color: #f03d37;
          margin-right: 35px;
          span {
            color: #999;

            font-size: 12px;
          }
        }
        .cinema_select {
          display: inline-block;
          width: 80px;
          height: 30px;
          color: #fff;
          background-color: #f03d37;
          font-size: 14px;
          line-height: 30px;
          border-radius: 100px;
          text-align: center;
          -webkit-box-shadow: 0 2px 10px -2px #f03d37;
          box-shadow: 0 2px 10px -2px #f03d37;
        }
      }
    }
  }
</style>
