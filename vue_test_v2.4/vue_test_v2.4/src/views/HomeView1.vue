<template>
  <div class="content bg">
    <!-- 全屏容器 -->
    <dv-full-screen-container>  
      <HeaderModule :titleRange="titleRange"/>
      <MainView1  :mapData="mapData"  style="width: 100%; height: 65%;"></MainView1>
      <BottomView  :totalData="totalData" :lineTitle="titleRange"/>

    </dv-full-screen-container>
  </div>
</template>

<script>
 import HeaderModule from './HeaderModule.vue'  //头部标题
 import MainView1 from './MainView1.vue'  //中间部分
 import BottomView from './BottomView.vue'
 //
 import chinaData from '@/assets/china_response.json'

  const transformedData = [];
  const totalData = []
export default {
  name: 'HomeView1',
  components:{
     HeaderModule,//头部标题组件
     MainView1,    // 中间部分
     BottomView    // 底部折线图部分
   },
   
  data(){
    return{
      titleRange:'中国',
      mapData:[],
      totalData:[],
     
    }
  },
  methods:{
    getData(){
       for (let year in chinaData) {
      
          const dataItem = {
          year: year,
          data: []
          };
          totalData.push(chinaData[year].allUsers)
          for (let key in chinaData[year]) {
            
            const item = chinaData[year][key];
            const { 纬度, 经度, totalUsers, chName } = item;
            const value = [经度, 纬度, totalUsers];
            const dataEntry = {
              name: chName,
              value: value
            };
            dataItem.data.push(dataEntry);
          }
          transformedData.push(dataItem);

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
    this.totalData = totalData;
    this.rankData = processedData
   }
    
  },

  mounted(){
    this.getData()
  }
}
</script>
