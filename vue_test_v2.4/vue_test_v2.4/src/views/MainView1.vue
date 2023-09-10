

<!-- 大屏的主要显示内容 包括地图和右边的排行榜 -->
<template>
  <div class="module-box">
  
    <div class="main" style="flex:0 1 100%" >

    <!-- 地图模块 需要世界地图则放入世界地图 需要其他国家则放入其他国家的地图 -->
    <div class="prev"> 
      <router-link to='/world'>
        <a>fanhui</a>
      </router-link>
    </div>
      <ChinaMap :mapData="mapData"   style="width: 100%; height: 100%;"> </ChinaMap>

    </div>
</div>
</template>

<script>
// 导入 相应的模块
import ChinaMap from './ChinaMap.vue';
import Rank from './Rank.vue';

export default {
  components:{

  ChinaMap,
  Rank,
 
  },
  props: {
    mapData: {
      type: Array,
      //required: true
      default:() =>[

      ]
    },
  },
  data(){
    return{
      dataChart:[
        
      ],
      headerChart:['省份', '人数（人）']
      
    }
  },
  methods:{
 
  }


}
</script>

<style>
.left-box{
border: 1px solid blue; 
};
.prev{
  height: 3px;
  display: inline;
  color: aqua;
}

</style>