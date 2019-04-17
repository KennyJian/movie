<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="order">
      <p class="order_head">我的订单</p>
    <div class="order_content">
      <div class="content_item" v-for="(item,index) of orderList" :key="index">
        <div class="item_head">
          <div class="head_left">
            <p class="date">{{timestampToTime(item.orderTimestamp)}}</p>
            <p class="order_num"> 订单号:{{item.orderId}}</p>
          </div>
          <div class="head_right">
            <img src="../../../static/imgs/delete.png" alt="">
          </div>
        </div>
        <div class="item_center">
          <div class="left">
            <div class="media_img">
              <img :src="item.filmImgAddress" alt="">
            </div>
            <div class="media_right">
              <p class="media_name">《{{item.filmName}}》</p>
              <p class="place">{{item.cinemaName}}</p>
              <p class="seat">{{item.filmHallName}} {{item.seatsName}}</p>
              <p class="time">{{item.fieldTime}}</p>
            </div>
          </div>
          <div class="right">
            <p class="price">￥{{item.orderPrice}}</p>
            <p v-if="item.orderStatus == '已支付'" class="status">已支付</p>
            <p v-else-if="item.orderStatus == '待支付'" class="status">待支付</p>
            <p v-else>已关闭</p>
            <p  v-if="item.orderStatus == '待支付'" style="color:red" class="details" v-on:click="getQrCode(item.orderId)">前往支付</p>
            <p v-else class="details">查看详情</p>
            <el-dialog
              title="支付二维码"
              :visible.sync="centerDialogVisible"
              width="30%"
              center>
              <img :src="qrCodeImg" style="margin-left:25%"></img>
              <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">关 闭</el-button>
                <el-button type="danger" @click="getPayResult(selectItem)">查询支付结果</el-button>
              </span>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deleteIndex:'',
      orderList:[],
      qrCodeImg:'',
      centerDialogVisible: false,
      selectItem:''
    }
  },
  methods: {
    getList() {
      this.$api.post({},"/order/getOrderInfo", (res)=> {
        if(res.status == 200) {
          this.orderList = {...res.data};
          console.log(this.orderList);
        }
      })
    },
    timestampToTime (cjsj) {
      var date = new Date(cjsj*1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y+M+D+h+m+s
    },
    getQrCode: function (orderId) {
      var that = this;
      that.selectItem=orderId
      this.$api.post({
        orderId: orderId,
      }, "/order/getPayInfo", (res) => {
        if (res.status == 200) {
          that.qrCodeImg = res.imgPre + res.data.qRCodeAddress
          console.log(that.qrCodeImg)
          that.centerDialogVisible=true
        } else {
          alert("获取支付二维码失败")
        }
      })
    },
    getPayResult (orderId) {
      var that = this;
      console.log(orderId)
      this.$api.post({
        orderId: orderId,
      }, "/order/getPayResult", (res) => {
        if (res.status == 200) {
          alert(res.data.orderMsg)
        } else {
          alert("获取支付结果失败")
        }
      })
    }
  },
  mounted() {
    this.getList();
  }

}
</script>

<style lang="less" scoped>
  .order_head {
    width: 100%;
    padding: 26px 0;
    color: #ec443f;
    font-size: 18px;
    border-bottom: 1px solid #e1e1e1;
    margin-bottom: 30px;
  }
  .order_content{
    width: 100%;
    .content_item {
      border: 1px solid #e5e5e5;
      margin: 0 40px 30px 0;
      .item_head {
        width:100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f7f7f7;
        p {
          display: inline-block;
          font-size: 14px;
        }
        .date {
          color:#333;
          margin-left: 20px;
        }
        .order_num {
          color:#999;
          margin-left: 30px;
        }
        img {
          width: 17px;
          height: 18px;
          margin-right: 20px;
        }
      }
      .item_center {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0 20px 20px;
        .left > div {
          display: inline-block;
        }
        .left {
          flex: 1;
          .media_img {
            width: 66px;
            height: 90px;
            vertical-align: top;
          }
          .media_right {
            margin-left: 11px;
            .media_name {
              font-size:16px;
              color: #333;
              margin-bottom: 7px;
            }
            .place , .seat {
              font-size: 12px;
              color: #999;
              margin-bottom: 4px;
            }
            .time {
              font-size: 12px;
              color: #f03d37;
            }
          }

        }
        .right {
          flex:1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          p {
            font-size:14px;
            color: #333;
          }
          .price {
            margin-left: 20px;
          }
          .details {
            margin-right: 30px;
          }
        }
      }
    }
  }
</style>
