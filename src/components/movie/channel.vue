<template>
   <div class="movies_channel">
        <ul class="channel_content">
          <li class="channel_list">
            <div class="list_title">类型：</div>
            <ul class="list_content">
              <li v-for="(item,index) of list.catInfo" :key="index" :class="{active:channelselect.catselected == item.catId}" ><p>{{item.catName}}</p></li>
            </ul>
          </li>
          <li class="channel_list">
            <div class="list_title">区域：</div>
            <ul class="list_content">
              <li v-for="(item,index) of list.sourceInfo" :key="index" :class="{active:channelselect.sourceselected == item.sourceId}"><p>{{item.sourceName}}</p></li>
            </ul>
          </li>
          <li class="channel_list">
            <div class="list_title">年代：</div>
            <ul class="list_content">
              <li v-for="(item,index) of list.yearInfo" :key="index" :class="{active:channelselect.yearselected == item.yearId}"><p>{{item.yearName}}</p></li>
            </ul>
          </li>
        </ul>
      </div>
</template>

<script>
export default {
  name:'Channel',
  props:{
    list:Object,
    channelselect:Object
  },
  data() {
    return {
    }
  },
  methods: {
    handleclick(cat,source,year){

    }
  }
}
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
      padding: 10px 0!important;
      font-size: 14px;
      .list_title {

        color: #999;
        float: left;
      }
      .list_content {
        list-style: none;
        margin-left: 40px;
        li{
          cursor: pointer;
          display: inline-block;
          padding: 3px 9px;
          margin-left: 12px;
          border-radius: 14px;
          p{
            color: #333;
          }
          p:hover {
            color: #ef4238;
          }
        }
        .active {
          background-color: #f34d41;
          color: #fff;
          p{
            color: #fff;
          }
        }
      }
    }
    .channel_list:nth-child(n+2) {
    border-top: 1px dotted #e5e5e5;
  }

  }
}
</style>
