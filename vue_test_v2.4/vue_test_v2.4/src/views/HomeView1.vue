<template>
  <div class="content bg">
    <!-- 全屏容器 -->
    <dv-full-screen-container>  
      <HeaderModule :titleRange="titleRange" style="width: 100% height: 5%;"/>
      <!-- <MainView1  :mapData="mapData"  style="width: 100%; height: 65%;"></MainView1>  -->
      <div class="module-box" style="width: 100%; height: 70%;">
        
        <div class="prev" > 
          <router-link to='/world'>
              <i class="iconfont icon-fanhui" style="font-size: 30px; font-weight: 500;color: #aca7a7; position: relative; left: 10px;"></i>
          </router-link>
        </div>

        
          <ChinaMap  style="flex: 0 1 70%;" > </ChinaMap>
        
        
        <div class="container">
          <div><i class="iconfont icon-diyimingdx" style="color: rgb(234, 51, 35);  font-size: 25px" ></i></div>
          <div><i class="iconfont icon-diermingdx" style="color: rgb(239, 134, 88);font-size: 25px"></i></div>
          <div><i class="iconfont icon-disanmingdx" style="color: rgb(236, 171, 124);font-size: 25px"></i></div>
        </div>
          <Rank :yearIndex="time_index" :rankTitle="titleRange" :rankData="rankDataC"  style="flex: 0 1 30%;" > </Rank>
        

      </div> 
      <LineChart  :totalData="totalData" :lineTitle="titleRange"  :timeIndex="time_index" style="width: 100%; height: 25%"/>

    </dv-full-screen-container>
  </div>
</template>

<script>
 import HeaderModule from './HeaderModule.vue'  //头部标题
 import ChinaMap from './ChinaMap.vue'
 import LineChart from './LineChart.vue'
 import Rank from './Rank.vue'

 //
 import rankDataC from '@/assets/china_rank_data.json'
 import '@/assets/icon/iconfont.css'

  const transformedData = [];
  
export default {
  name: 'HomeView1',
  components:{
     HeaderModule,//头部标题组件
     ChinaMap,
     Rank,
     LineChart,
    // 底部折线图部分
    
     
   },
   
  data(){
    return{
      titleRange:'中国',
      mapData:[],
      totalData:[75,286,811,2048,4534,8602,13152,17926,23531,27773,30756,33137,34523,35360,35794],
      time_index : 0,
      rankDataC:rankDataC
    }
  },
  methods:{
    
  },

  mounted(){
    this.$bus.$on('hello',(time_data)=>{
      this.time_index = time_data
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
    top: 171px;
    right:480px;

  }
  .prev{
    position: absolute;
    top: 70px;
    left:100px;
    z-index: 99;
  }
</style>
