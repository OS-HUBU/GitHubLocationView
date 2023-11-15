<!-- 获取地图矢量数据  注册地图数据 配置geo -->
<template>
      
  <div class='mapChart' ref='chart'>
    
  </div>
</template>
<script>

import router from '@/router';
import axios from 'axios'
import * as echarts from 'echarts/core'
import ChinaMapJson from '@/assets/china.json'
import rankData from '@/assets/china_rank_data.json'
import scatterData from '@/assets/scatter_china_data.json'



export default {
props:{
  mapData:{
    type:Array,
    default:() => []
  },

 
},

data(){
return {
  yearData: 2008,
  timeLineIndex: 0,
}
},

watch:{
  timeLineIndex: function(newval){
    this.sendTimeChange()
  }
},

methods: {
initChart () {
  
  const _this = this

  //数据散点的坐标
  const  defaultData = scatterData
  // console.log(defaultData)
  // console.log(scatterData)

  //时间

  const startYear = 2008;
  const endYear = 2022;
  const yearArray = [];

  for (let year = startYear; year <= endYear; year++) {
    yearArray.push(year);
  }

  //
  let item_Colors = [
  '#F4EDF6','#F1D5CF','#EFBDB3','#E29D9C','#D17C8D','#EB7187','#D95155','#CC3044','#B71234','#5E001F' 
  ];


  var myChart = echarts.init(this.$refs.chart);
  myChart.showLoading(); //加载动画
  echarts.registerMap('china',ChinaMapJson) 
  myChart.hideLoading() //关闭加载动画
    
  let option = {
    tooltip: {
    //触发方式
    trigger: 'item',
    showDelay: 0,
    textStyle: {
    fontFamily: '微软雅黑, Arial, sans-serif', // 设置字体为"微软雅黑"
    fontSize: 20,// 字体大小
    },
    transitionDuration: 0.2,
  
    formatter: function (params) {
 
      if(params.componentSubType ==='scatter'){
        var number = params.value
        return `${params.name}</br>开发者人数：${params.value[2]}人`
      }
      else{
       
        return params.name
      }
      
      },
    },
    //
    
    //图注解
    visualMap: { 
       // calculable: true,
       type:'piecewise',
        pieces:[
        
        { min: 10000, max: 1000000, label: '＞10000', color: item_Colors[9] },
        { min: 5000, max: 9999, label: '5000-9999', color: item_Colors[8] },
        { min: 2000, max: 4999, label: '2000-4999', color: item_Colors[7] },
        { min: 1000, max: 1999, label: '1000-1999', color: item_Colors[6] },
        { min: 500, max: 999, label: '500-999', color: item_Colors[5] },
        { min: 200, max: 499, label: '200-499', color: item_Colors[4] },
        { min: 100, max: 199, label: '100-199', color: item_Colors[3] },
        { min: 50, max: 99, label: '50-99', color: item_Colors[2] },
        { min: 10, max: 49, label: '10-49', color:item_Colors[1] },
        { min: 0, max: 9, label: '0-9', color: item_Colors[0] }
        ],
        textStyle: {
            color: '#fff'
        },
        left:"15%",
        bottom: "10%",
      },

    // 时间轴配置
    timeline: {
      //时间轴索引
      seriesIndex: 0,
      data: yearArray,
      axisType: 'category',
      autoPlay: true,//是否自动播放
      playInterval: 3000,//切换时间，2*1000=2秒
      left: '10%',
      right: '10%',
      bottom: '3%',
      width: '80%',
      label: {
          normal: {
              textStyle: {
                  color: '#ddd',
                  fontSize:18
              }
            
          },

        
      },
      symbolSize: 10,
      lineStyle: {
        color: '#555', 
      },
      checkpointStyle: {

          color: '#D95155',
          borderWidth: 2,
          
      },
      controlStyle: {
          showNextBtn: true,
          showPrevBtn: true,
          normal: {
              color: '#666',
              borderColor: '#666'
          },
          emphasis : {
              color: '#5E001F',
              borderColor: '#5E001F'
          }
      },
      itemStyle:{
      
        emphasis : {
              color: '#D95155',   
          }
      }

    },


    geo: {
      zoom:1.2,
      //显示地理坐标系组件
      center: [100.2363,33.8572],
      show: true,
      roam: true,
      //注册的地图名
      map: 'china',
      label:{
        show:true,
        color:'#ffffb8'
      },
      //取消高亮状态
      emphasis:{
        disabled:false
      },
      selectedMode: false,//是否允许选中多个区域，
      
      
        itemStyle: {
        normal: {
            opacity: 1,  //不透明度 
            //地图边界颜色
            borderColor: '#fffff',
            borderWidth: 1,
            //每个地图块的颜色
            areaColor: '#3B3B3B',

            
            shadowOffsetX: -2,
            shadowOffsetY: 2,
            shadowBlur: 10
        },
        emphasis: {
                          areaColor: '#181818',
                          borderWidth: 0
                      }
      }
    
  },
   
 

    series: [
      //散点的配置
      {
        // name: 'china',

        //散点的类型
        type:"scatter",
        //使用地理坐标系
        coordinateSystem: 'geo',
        //关联的散点数据
        data:defaultData[0].data,
        //指定数据所在位置
        //encode:{value:2},
        //散点的大小
        symbolSize:13,
        //散点的显示方式
   
        //配置特效的绘制方式
        // rippleEffect:{
        //   brushType:'stroke'
        // },
        label:{
          //显示标签
          show:false,
          position:'right'
        },
        
        //高亮后的放大效果
        emphasis:{scale:true},

        zlevel:1
       
      },
      //柱状图数据

    ]
  }
  myChart.setOption(option)

  myChart.on('timelinechanged', function (timeLineIndex) {
                 
                 var option =myChart.getOption();//获得option对象
                 //console.log(typeof option.series[1])
                 option.series[0].data = defaultData[timeLineIndex.currentIndex].data 
                 _this.timeLineIndex = timeLineIndex.currentIndex
                 myChart.setOption(option)
             });

  myChart.on('click',function(param){
    if(param.componentType === 'timeline'){
      _this.timeLineIndex = param.name-2008
      var option =myChart.getOption();//获得option对象
              
      option.series[0].data = defaultData[param.name-2008].data
      myChart.setOption(option)
    }
  })
},

sendTimeChange(){
    //console.log('发送时间轴变化')
    this.$bus.$emit('hello',this.timeLineIndex)
  }
},

mounted(){
this.initChart()
}

}

</script>

<style scoped>
/* .mapChart {
  border: 1px solid red;

} */
</style>
