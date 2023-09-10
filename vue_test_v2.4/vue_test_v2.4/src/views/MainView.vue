

<!-- 大屏的主要显示内容 包括地图和右边的排行榜 -->
<template>
          <div class="module-box">
            <!-- 左侧占80% -->
            <div  style="flex:0 1 100%" >

            <!-- 地图模块 需要世界地图则放入世界地图 需要其他国家则放入其他国家的地图 -->
          
              <!-- <WorldMap style="width: 100%; height: 90%;"> </WorldMap> -->
              <WorldMap style="width: 100%; height: 100%;"> </WorldMap>
           

            </div>

          
      </div>
</template>

<script>
// 导入 相应的模块

import WorldMap from './WorldMap.vue';

import rankData from '@/assets/world_rank_data.json'


export default {
  components:{

    WorldMap,
    
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
        {}
      ],
      currentIndex:0,
      rankData: rankData
    }
  },
 
}
</script>

<style>
.left-box{
  border: 1px solid blue; 
}
</style>