<template>
  <div class="movies_channel">
    <ul class="channel_content">
      <li class="channel_list">
        <div class="list_title">品牌：</div>
        <ul class="list_content">
          <li
            v-for="item of channel.brandList"
            :key="item.brandId"
            :class="{active:channelselect.brandselect == item.brandId}"
            @click="handleclick(item.brandId,'','')"
          >
            <p>{{item.brandName}}</p>
          </li>
        </ul>
      </li>
      <li class="channel_list">
        <div class="list_title">行政区：</div>
        <ul class="list_content">
          <li
            v-for="item of channel.areaList"
            :key="item.areaId"
            :class="{active:channelselect.areaselect == item.areaId}"
            @click="handleclick('',item.areaId,'')"
          >
            <p>{{item.areaName}}</p>
          </li>
        </ul>
      </li>
      <li class="channel_list">
        <div class="list_title">特殊区：</div>
        <ul class="list_content">
          <li
            v-for="item of channel.hallTypeList"
            :key="item.hallTypeId"
            :class="{active:channelselect.hallselect == item.hallTypeId}"
            @click="handleclick('','',item.hallTypeId)"
          >
            <p>{{item.hallTypeName}}</p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CChannel",
  props: {
    channel: Object,
    channelselect: Object
  },
  data() {
    return {
      channelType:1,
      id:''
    };
  },
  methods: {
    handleclick(cat, source, year) {
      if(cat) {
        this.channelType = 1;
        this.id = cat;
        this.$emit("channel", {id:this.id,type:this.channelType});
      } else if(source) {
        this.channelType = 2;
        this.id = source;
        this.$emit("channel", {id:this.id,type:this.channelType});
      } else if(year) {
        this.channelType = 3;
        this.id = year;
        this.$emit("channel", {id:this.id,type:this.channelType});
      }
    }
  },
  mounted() {

  }
};
</script>

<style lang="less" scoped>
.movies_channel {
  margin: 40px auto 0;
  width: 1160px;
  padding: 0 20px;
  border: 1px solid #e5e5e5;
  .channel_content {
    margin: 0;
    padding: 0;
    .channel_list {
      padding: 10px 0 !important;
      font-size: 14px;
      .list_title {
        color: #999;
        float: left;
      }
      .list_content {
        list-style: none;
        margin-left: 40px;
        li {
          cursor: pointer;
          display: inline-block;
          padding: 3px 9px;
          margin-left: 12px;
          border-radius: 14px;
          p {
            color: #333;
          }
          p:hover {
            color: #ef4238;
          }
        }
        .active {
          background-color: #f34d41;
          color: #fff;
          p {
            color: #fff;
          }
        }
      }
    }
    .channel_list:nth-child(n + 2) {
      border-top: 1px dotted #e5e5e5;
    }
  }
}
</style>
