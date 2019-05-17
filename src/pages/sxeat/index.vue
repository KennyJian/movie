<template>
  <div class="xseat_center">
    <div class="xseat">
      <div class="xseat_left">
        <div class="left_header">
          <div class="icon_item">
            <img src="../../../static/imgs/selectable-seat.png" alt>
            <span>可选座位</span>
          </div>
          <div class="icon_item">
            <img src="../../../static/imgs/sold-seat.png" alt>
            <span>已售座位</span>
          </div>
          <div class="icon_item">
            <img src="../../../static/imgs/selected-seat.png" alt>
            <span>已选座位</span>
          </div>
        </div>
        <div class="left_content">
          <div class="content_top">
            <img src="../../../static/imgs/screen-center.png" alt>
          </div>
          <div class="content_center">
            <div class="center_left">
              <p class="left_clumn" v-for="(item,index) of single" :key="index">{{item[index].row}}</p>
            </div>
            <div class="center_right">
              <div class="right_row" v-for="(row,index) of single" :key="index">
                <div class="seat_item" v-for="clumn of row" :key="clumn.seatId">
                  <div
                    v-show="clumn.sold == 1"
                    @click="selectSeat(clumn.row,clumn.column,index,clumn.seatId)"
                    class="seat_unselect"
                  >
                    <img src="../../../static/imgs/selectable-seat.png" alt>
                  </div>
                  <div
                    @click="deleteSeat(clumn.seatId,clumn.row,clumn.column)"
                    v-show="clumn.sold == 2"
                    class="seat_unselect"
                  >
                    <img src="../../../static/imgs/selected-seat.png" alt>
                  </div>
                  <div v-show="clumn.sold == 3 " class="seat_unselect">
                    <img src="../../../static/imgs/sold-seat.png" alt>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="xseat_right">
        <div class="right_head">
          <div class="xseat_movie">
            <img :src="filmInfo.imgAddress" alt>
          </div>
          <div class="movie_intro">
            <p>{{filmInfo.filmName}}</p>
            <p>
              类型：
              <span>{{filmInfo.filmCats}}</span>
            </p>
            <p>
              时长：
              <span>{{filmInfo.filmLength}}分钟</span>
            </p>
          </div>
        </div>
        <div class="xseat_content">
          <p>
            影院：
            <span>{{cinemaInfo.cinemaName}}</span>
          </p>
          <p>
            影厅：
            <span>{{hallInfo.hallName}}</span>
          </p>
          <p>
            版本：
            <span>{{filmInfo.filmType}}</span>
          </p>
          <p>
            场次：
            <span>{{beginDate}}</span>
          </p>
          <p>
            票价：
            <span>￥{{hallInfo.price}}/张</span>
          </p>
        </div>
        <div class="xseat_select">
          <div class="right_select">
            <div class="select_sxeat">
              <p>
                座位:
                <span v-show="!select">一次最多选6个座位</span>
              </p>
              <div
                v-show="select"
                class="sxeat_item"
                v-for="(item,index) of selectSingle"
                :key="index"
              >
                <img
                  @click="deleteSeat(item.seatId,item.row,item.column)"
                  src="../../../static/imgs/icon-close.png"
                  alt
                >
                <p>{{item.row}}排{{item.column}}座</p>
              </div>
            </div>
            <p v-show="!select">
              请
              <span>点击左侧</span>座位图选择座位
            </p>
            <p>
              总价:
              <span>￥{{totalPrice}}</span>
            </p>
          </div>
        </div>
        <div class="select_enter">
          <div v-if="!select" class="xseat_button">确认选座</div>
          <div v-else @click="submitOrder" class="xseat_button button_enter">确认选座</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axio from "axios";
export default {
  data() {
    return {
      fieldId: "",
      xseat: "",
      select: false, //
      cinemaInfo: {},
      filmInfo: {},
      hallInfo: {},
      beginDate: "", //开场时间
      price: 0, //单价,
      number: "", //单价
      totalPrice: 0, //总价
      ids: [], //ids
      single: [], //座位
      selectSingle: [], //被选择的座位
      selectSeats: "", //选择的座位id
      seatsName: "", //选择的座位
      soldSeats: [] //已售出的位置
    };
  },
  methods: {
    getXseat(filedId) {
      var that = this;
      this.$api.post({ fieldId: filedId }, "/cinema/getFieldInfo", res => {
        let data = res.data;
        if (res.status == 200) {
          console.log(res);
          that.cinemaInfo = { ...data.cinemaInfo };
          that.filmInfo = { ...data.filmInfo };
          that.hallInfo = { ...data.hallInfo };
          that.xseat = res.imgPre + res.data.hallInfo.seatFile;
          that.beginDate = data.beginTime;
          that.changeSold();
        }
      });
    },
    // 显示已经卖出去的座位
    changeSold() {
      let soldSeats = this.hallInfo.soldSeats;
      let soldArr = soldSeats.split(",");
      console.log(soldArr.length)
      for(let i=0; i<soldArr.length; i++) {
        let row,column;
        if(Math.floor(soldArr[i]/6)==soldArr[i]/6){
          row=Math.floor(soldArr[i]/6)-1
        }else{
          row=Math.floor(soldArr[i]/6)
        }
        if(soldArr[i]%6==0){
          column=5
        }else {
          column=soldArr[i]%6-1
        }
        this.single[row][column].sold =3;
      }
    },
    // 获取座位信息
    getdata() {
      var that = this;
      axio.get("../../../static/json/cgs.json").then(res => {
        that.ids = res.data.ids.split(",");
        that.single = { ...res.data.single };
      });
    },
    // 选择座位
    selectSeat(row, column, index, id) {
      this.select = true;
      this.single[index][column - 1].sold = 2;
      this.selectSingle.push({ row: row, column: column, seatId: id });
      this.totalPrice = this.selectSingle.length * this.hallInfo.price;
      if (this.selectSeats==""){
        this.selectSeats += id
      }else{
        this.selectSeats = this.selectSeats+","+id
      }
      if (this.seatsName==""){
        this.seatsName += "第" + row + "排" + "第" + column + "座";
      }else{
        this.seatsName += ",第" + row + "排" + "第" + column + "座";
      }
      console.log(this.selectSeats,this.seatsName)
    },
    // 删除座位
    deleteSeat(id, row, column) {
      for (let i = 0; i < this.selectSingle.length; i++) {
        if (this.selectSingle[i].seatId == id) {
          this.selectSingle.splice(i, 1);
          console.log(this.selectSingle);
        } else {
          continue;
        }
      }
      if (this.selectSeats==id){
        this.selectSeats=this.selectSeats.replace(id, "");
      }
      else if (this.selectSeats.indexOf(id)==0){
        this.selectSeats=this.selectSeats.replace(id+",", "");
      }else{
        this.selectSeats=this.selectSeats.replace(","+id, "");
      }

      if (this.seatsName=="第" + row + "排" + "第" + column + "座"){
        this.seatsName=this.seatsName.replace("第" + row + "排" + "第" + column + "座", "");
      }
      else if (this.seatsName.indexOf("第" + row + "排" + "第" + column + "座")==0){
        this.seatsName=this.seatsName.replace("第" + row + "排" + "第" + column + "座,", "");
      }else{
        this.seatsName=this.seatsName.replace(",第" + row + "排" + "第" + column + "座", "");
      }
      console.log(this.selectSeats)
      this.single[row - 1][column - 1].sold = 1;
      this.totalPrice = this.selectSingle.length * this.hallInfo.price;
    },
    submitOrder() {
      var that = this;
      this.$api.post(
        {
          fieldId: that.fieldId,
          soldSeats: that.selectSeats,
          seatsName: that.seatsName
        },
        "/order/buyTickets",
        res => {
          if (res.status == 200) {
            alert('购票成功')
            this.$router.push("/order");
          } else {
            alert(res.msg)
            console.log(res.msg);
          }
        }
      );
    }
  },
  mounted() {
    this.fieldId = this.$route.query.field;
    this.getXseat(this.fieldId);
    this.getdata();
  }
};
</script>

<style lang="less" scoped>
.xseat_center {
  padding-top: 40px;
}
.xseat {
  width: 1198px;
  height: 670px;
  border: 1px solid #e5e5e5;
  .xseat_left {
    display: inline-block;
    width: 69.5%;
    height: 100%;
    .left_header {
      display: flex;
      align-items: center;
      text-align: center;
      height: 86px;
      .icon_item {
        flex: 1;
        span {
          display: inline-block;
          vertical-align: top;
        }
      }
    }
    .left_content {
      margin-top: 10px;
      .content_top {
        margin-left: 60px;
      }
      .content_center {
        margin-top: 50px;
        .center_left {
          width: 65px;
          height: 100%;
          vertical-align: top;
          margin-left: 10px;
          margin-top: -12px;
          p {
            height: 56px;
            line-height: 56px;
            margin-left: 10px;
          }
        }
        .center_right {
          .right_row {
            .seat_item {
              display: inline-block;
              width: 60px;
              height: 56px;
              margin: 0 15px;
              text-align: center;
              img {
                display: inline-block;
                line-height: inherit;
              }
            }
          }
        }
      }
      .content_center > div {
        display: inline-block;
      }
    }
  }
  .xseat_right {
    vertical-align: top;
    display: inline-block;
    width: 30%;
    height: 100%;
    padding: 20px;
    background-color: #f9f9f9;
    .right_head {
      .xseat_movie {
        display: inline-block;
        width: 115px;
        height: 158px;
        border: 2px solid #fff;
        box-shadow: 0 2px 7px 0 hsla(0, 0%, 53%, 0.5);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .movie_intro {
        display: inline-block;
        vertical-align: top;
        margin-left: 15px;
      }
      .movie_intro > p {
        font-size: 12px;
        color: #999;
        margin-bottom: 4px;
        span {
          color: #151515;
        }
      }
      .movie_intro > p:nth-child(1) {
        font-size: 20px;
        font-weight: 700;
        color: #333;
        margin: 0 0 14px;
      }
    }
    .xseat_content {
      margin-top: 20px;
      margin-bottom: 10px;
      p {
        font-size: 14px;
        color: #999;
        margin-bottom: 4px;
        span {
          color: #333;
        }
      }
    }
    .xseat_content > p:nth-child(4) {
      span {
        color: #f03d37;
      }
    }
    .xseat_select {
      padding: 20px 0 10px;
      border-top: 1px dashed #e5e5e5;
      border-bottom: 1px dashed #e5e5e5;
      p {
        display: inline-block;
        font-size: 14px;
        color: #999;
        margin: 0;
      }
      p:nth-child(2) {
        font-size: 14px;
        color: #333;
        text-align: center;
        margin: 28px 0 39px;
        display: block;

        span {
          color: #f03d37;
        }
      }
      p:nth-child(3) {
        font-size: 14px;
        color: #333;
        margin-top: 20px;
        span {
          color: #f03d37;
          font-size: 24px;
        }
      }
      .sxeat_item {
        position: relative;
        cursor: default;
        position: relative;
        font-size: 12px;
        display: inline-block;
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin: 0 12px 10px 0;
        background: url("../../../static/imgs/bg-seat.png") no-repeat;
        p {
          color: #f03d37 !important;
          margin: 0;
        }
        img {
          width: 15px;
          height: 15px;
          position: absolute;
          top: -7px;
          right: -7px;
          display: none;
        }
      }
      .sxeat_item:hover {
        img {
          display: inline-block;
        }
      }
    }
    .select_enter {
      margin-top: 20px;
      text-align: center;
      .xseat_button {
        margin-top: 20px;
        display: inline-block;
        width: 260px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        border-radius: 21px;
        background-color: #dedede;
      }
      .button_enter {
        cursor: pointer;
        background-color: #f03d37;
        color: #fff;
      }
    }
  }
}
</style>
