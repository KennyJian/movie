<template>
  <div class="movies_channel">
    <ul class="channel_content">
      <li class="channel_list">
        <div class="list_title">类型：</div>
        <ul class="list_content">
          <li
            v-for="item of channelList.catInfo"
            :key="item.catId"
            :class="{active:channelselect.catselect == item.catId}"
            @click="handleclick(item.catId,'','')"
          >
            <p>{{item.catName}}</p>
          </li>
        </ul>
      </li>
      <li class="channel_list">
        <div class="list_title">区域：</div>
        <ul class="list_content">
          <li
            v-for="item of channelList.sourceInfo"
            :key="item.sourceId"
            :class="{active:channelselect.sourceselect == item.sourceId}"
            @click="handleclick('',item.sourceId,'')"
          >
            <p>{{item.sourceName}}</p>
          </li>
        </ul>
      </li>
      <li class="channel_list">
        <div class="list_title">年代：</div>
        <ul class="list_content">
          <li
            v-for="item of channelList.yearInfo"
            :key="item.yearId"
            :class="{active:channelselect.yearselect == item.yearId}"
            @click="handleclick('','',item.yearId)"
          >
            <p>{{item.yearName}}</p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Channel",
  props: {
    list: Object,
    channelselect: Object
  },
  data() {
    return {
      channelType:1,
      id:'',
      channelList:{}
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
    this.channelList = {...this.list}
  }
};
</script>

<style lang="less" scoped>
.movies_channel {
  margin: 40px auto 0;
  width: 1078px;
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
