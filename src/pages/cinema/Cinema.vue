<template >
  <div>
    <c-channel :channel="channelList" :channelselect="channelSelect" @channel="channelval"></c-channel>
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
      hallId:'99'
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
        // console.log(res.data);
      },(error) => {
        console.log(error);
      })
    },
    channelval:function(msg) {
      switch(msg.type){
        case 1:
        this.channelSelect.brandselect = msg.id;
        this.brandId = msg.id;
        break;
        case 2:
        this.channelSelect.areaselect = msg.id;
        this.areaId = msg.id;
        break;
        case 3:
        this.channelSelect.hallselect = msg.id;
        this.hallId = msg.id;
        break;
      }
      // this.getmovieList();
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
    this.getchannel();
  }
}
</script>

<style lang="less" scoped>

</style>
