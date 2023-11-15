<template>
  <div class="content bg">
    <!-- 全屏容器 -->
    <dv-full-screen-container >  
      <HeaderModule style="width: 100% height: 5%;"/>
      <div  style="width: 100%; height: 70%;  display: flex; justify-content: space-between; /*两端对齐*/ margin: 1px;">
        
        <WorldMap  style="flex: 0 1 70%;" > </WorldMap> 
        
        <div class="container">
          <div><i class="iconfont icon-diyimingdx" style="color: rgb(234, 51, 35);  font-size: 26px" ></i></div>
          <div><i class="iconfont icon-diermingdx" style="color: rgb(239, 134, 88);font-size: 26px"></i></div>
          <div><i class="iconfont icon-disanmingdx" style="color: rgb(236, 171, 124);font-size: 26px"></i></div>
          
       
        </div>

      
        <Rank :yearIndex="time_index"  :rankData="rankDataW" style="flex: 0 1 30%;" > </Rank>
      </div>

      <LineChart :totalData="totalData" :lineTitle="lineTitle"  :timeIndex="time_index" style="width: 100%; height: 25%" />

    </dv-full-screen-container>
  </div>
</template>

<script>
 import HeaderModule from './HeaderModule.vue'  //头部标题
 import WorldMap from './WorldMap.vue';
 import LineChart from './LineChart.vue';
 import Rank from './Rank.vue';
 

 //调api接口
 import { findAll } from '@/api/githubData'



 //导入本地数据
 import rankDataW from '@/assets/world_rank_data.json'
import '@/assets/icon/iconfont.css'


 

export default {
  name: 'HomeView',
  components:{
     HeaderModule,//头部标题组件
     WorldMap,// 中间部分
     Rank,
     LineChart //底部折线图

   },
  data(){
    return{
      lineTitle:'全球',
   
      totalData:[4632,14081,31564,61501, 102658, 155658, 215336,274483,339394,398759, 456409,517908,580489, 630102,665020],
      time_index:0,
      rankDataW:rankDataW
    }
  },
  methods:{

  },
  mounted(){
    this.$bus.$on('hello',(time_data)=>{
      this.time_index = time_data;
      //console.log('this.time_index',this.time_index)
      // console.log('接受到了数据',time_data)
    })
  },
  beforeDestroy() {
		this.$bus.$off('hello')
	}

}
</script>
<style scoped>
  .container{
    position: absolute;
    top: 170px;
    right:460px;

  }
</style>
