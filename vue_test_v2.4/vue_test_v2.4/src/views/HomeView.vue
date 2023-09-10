<template>
  <div class="content bg">
    <!-- 全屏容器 -->
    <dv-full-screen-container >  
      <HeaderModule style="width: 100% height: 100px;"/>
      <!-- <div>

      <el-button type="primary" @click="getData">获取数据</el-button>

      </div> -->
      <WorldMap :mapData="mapData"   style="width: 100%; height: 65%;"> </WorldMap>
      
      <BottomView :totalData="totalData"     style="width: 100%; height: 100vh;"/>

    </dv-full-screen-container>
  </div>
</template>

<script>
 import HeaderModule from './HeaderModule.vue'  //头部标题
 import MainView from './MainView.vue'  //中间部分
 import WorldMap from './WorldMap.vue';
 import BottomView from './BottomView.vue'

 //调api接口
 import { findAll } from '@/api/githubData'


 //导入本地数据
import originalData from '@/assets/response.json'

 const transformedData = [];
  const totalData = []

export default {
  name: 'HomeView',
  components:{
     HeaderModule,//头部标题组件
     MainView,    // 中间部分
     BottomView ,  // 底部折线图部分
     WorldMap
   },
  data(){
    return{
      mapData:[],
      totalData:[4632,14081,31564,61501, 102658, 155658, 215336,274483,339394,398759, 456409,517908,580489, 630102,665020],
      rankData:[],
    }
  },
  methods:{
   getData(){
    // findAll().then(response =>{
    //   console.log('response.data',response.data)
         

    //   for (let year in originalData) {
    //   const dataItem = {
    //     year: year,
    //     data: []
    //   };
    //   for (let key in originalData[year]) {
    //     const item = originalData[year][key];
    //     const { 纬度, 经度, totalUsers, chName } = item;
    //     const value = [经度, 纬度, totalUsers];
    //     const dataEntry = {
    //       name: chName,
    //       value: value
    //     };
    //     dataItem.data.push(dataEntry);
    //   }
    //   transformedData.push(dataItem);
    // }

    // console.log(transformedData);

   
    // })
    
   

    

    for (let year in originalData) {
      
          const dataItem = {
          year: year,
          data: []
          };
          //totalData.push(originalData[year].allUsers)
          for (let key in originalData[year]) {
            
            const item = originalData[year][key];
            const { 纬度, 经度, totalUsers, chName } = item;
            const value = [经度, 纬度, totalUsers];
            const dataEntry = {
              name: chName,
              value: value
            };
            dataItem.data.push(dataEntry);
          }
          transformedData.push(dataItem);
     
      
        // console.log('hello ')
         
        
     
      
    }
    const processedData =  transformedData.map(item => ({
        ...item,
        data: item.data.map(dataItem => ({
          ...dataItem,
          value: dataItem.value[2]
        })).sort((a, b) => b.value - a.value)
      }));
     // console.log( 'processedData' ,processedData);

    this.mapData = transformedData;
    
    this.rankData = processedData
   },
   
  },
  mounted(){
    this.getData()
  }

}
</script>
