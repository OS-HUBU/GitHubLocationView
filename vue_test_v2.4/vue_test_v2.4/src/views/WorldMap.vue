<!-- 获取地图矢量数据  注册地图数据 配置geo -->
<template>
  <div class='mapChart' ref='chart' >
</div>


</template>
<script>

import * as echarts from 'echarts/core'
import { color } from 'echarts/core'

//地图数据导入
import worldMapJson from '@/assets/world.json'
import scatterData from '@/assets/scatter_world_data.json'
export default {
  props: {
    mapData: {
      type: Array, 
      default:() => [

      ]
    },
  },
data(){
return {
    yearData:2008,
    timeLineIndex:0,

}
},

watch:{
  timeLineIndex: function(newval){
    this.sendTimeChange()
    //console.log('监听变化',newval)
    // console.log('newval',newval)
    // console.log('oldval',oldval)
  }
},

methods: {
  initChart () {

    //年份数据
    const startYear = 2008;
    const endYear = 2022;
    const yearArray = [];

    for (let year = startYear; year <= endYear; year++) {
      yearArray.push(year);
    }
    //地图散点数据
    const  defaultData = scatterData
    var myChart = echarts.init(this.$refs.chart);

    const _this = this;
 
    
    myChart.showLoading(); //加载动画

    echarts.registerMap('world', worldMapJson) // 注册地图
    
    myChart.hideLoading() //关闭加载动画
  

    
    // 散点的坐标数据
    let option = {

      visualMap:{
        type:'piecewise',
        pieces:[
        { min: 50000, max: 1000000, label: '＞50000', color: '#5E001F' },
        { min: 10000, max: 49999, label: '10000-49999', color: '#B71234' },
        { min: 5000, max: 9999, label: '5000-9999', color: '#CC3044' },
        { min: 2000, max: 4999, label: '2000-4999', color: '#D95155' },
        { min: 1000, max: 1999, label: '1000-1499', color: '#EB7187' },
        { min: 500, max: 999, label: '500-999', color: '#D17C8D' },
        { min: 200, max: 499, label: '200-499', color: '#E29D9C' },
        { min: 50, max: 199, label: '50-199', color: '#EFBDB3' },
        { min: 10, max: 49, label: '10-49', color: '#F1D5CF' },
        { min: 0, max: 9, label: '0-9', color: '#F4EDF6' }
          ],
        textStyle: {
            color: '#fff'
        },
        left:"13%",
       bottom: "10%",
       //top:"40%"
      },

      // 时间轴
      timeline: {
        data: yearArray,
        axisType: 'category',
        currentIndex:0,//默认选中时间轴的下标
        autoPlay: true,//是否自动播放
        playInterval: 3000,//切换时间，2*1000=2秒
        left: '10%',
        right: '10%',
        bottom: '3%',
        width: '80%',
        label: {
            normal: {
                textStyle: {
                    color: '#ddd'
                }
            },
            emphasis: {
                textStyle: {
                    color: '#fff'
                }
            }
        },
        symbolSize: 10,
        lineStyle: {
            color: '#777'
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
        emphasis: {
            color: '#aaa',
            borderColor: '#aaa'
        }
        },
        itemStyle:{
      
        emphasis : {
              color: '#D95155',   
          }
    }

      },


      // 提示框
      tooltip: {
        //触发方式
        trigger: 'item',

        showDelay: 0,
        textStyle: {
       
        fontFamily: '微软雅黑, Arial, sans-serif', // 设置字体为"微软雅黑"
        fontSize: 20 ,// 字体大小
        },
        transitionDuration: 0.2,
      
        formatter: function (params) {
       
          if(params.componentSubType ==='scatter'){
            return `${params.name}</br>开发者人数：${params.value[2]}人`
          }
          else{
            return params.name
          }
          
          },
        },
      //地图设置
      geo:[{
        //zlevel:1,//地图级别
        zoom:1.1,//缩放级别
        roam: true,
        
        // map 后面的参数和之前注册必须一样
        map: 'world',
        center: [15.83531246, 5.0267395887],
        label:{
          show:false
        },
        itemStyle: {
          normal: {
              opacity: 1,  //不透明度 
              //地图边界颜色
              borderColor: '#fffff',
              borderWidth: 1,
              //每个地图块的颜色
              areaColor: '#3B3B3B',

              // areaColor: {
              //     type: 'radial',
              //     x: 0.5,
              //     y: 0.5,
              //     r: 0.8,
              //     colorStops: [{
              //         offset: 0,
              //         color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
              //     }, {
              //         offset: 1,
              //         color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
              //     }],
              //     globalCoord: false // 缺省为 false
              // },
              //阴影颜色
              //shadowColor: 'rgba(128, 217, 248, 1)',
              // shadowColor: 'rgba(255, 255, 255, 1)',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10
          },
          emphasis: {
                            areaColor: '#181818',
                            borderWidth: 0
                        }
        }
        // itemStyle:{
          
        //   normal: {
        //   // borderColor: 'rgba(0, 0, 0, 0.7)',
        //   areaColor: '#3B3B3B',
        // 
        //   borderColor: '#fffff',
        //   //shadowColor: '#092f8f',
        //   //shadowBlur: 20,
        //   opacity: 1  //不透明度 
        //   },  
        // },
        //data : mapData,
        },
       
         
      ],
      //排行榜设置
    
      
      //数据设置
      series: [  
        //散点的配置
        {
              //散点的类型
              // type:"effectScatter",
              type:"scatter",
              //使用地理坐标系
              coordinateSystem: 'geo',
              //选择图层位置
              geoIndex: 0,
              //关联的散点数据
              data:defaultData[0].data,
              symbolSize:13,
              //散点的显示方式
              showEffectOn:'render',
              //配置特效的绘制方式
              // rippleEffect:{
              //   brushType:'stroke'
              // },
              label:{
                
                show:false,
                position:'right',
              
              },
              
              //高亮后的放大效果
              emphasis:{scale:true},
              
              zlevel:1
            
            },
       
         // 地图配置

        //  {
        //   zoom:1.1,
        //   name: 'world map',
        //   type: 'map',
        //   roam: true,
        //   // map 后面的参数和之前注册必须一样
        //   map: 'world',
        //   geoIndex: [0],
        //   // emphasis: {
        //   //   label: {
        //   //     show: true,
        //   //     color:'#ffffff',
        //   //     // nameMap: cityMap, 
              
        //   //   }
        //   // },
        //   itemStyle: {
        //       normal: {
        //         borderColor: '#fffff',
        //         borderWidth: 1,
        //       //每个地图块的颜色
        //         areaColor: '#3B3B3B',
        //       },
        //       emphasis: {
        //           areaColor: '#2B91B7'
        //       }
        //   },
        //   animation: false,
        //   //nameMap: cityMap,  
        //   // itemStyle:{
        //   //   normal: {
        //   //   // borderColor: 'rgba(0, 0, 0, 0.7)',
        //   //   areaColor: '#3B3B3B',
        //   //   borderColor: '#fffff',
        //   //   //shadowColor: '#092f8f',
        //   //   //shadowBlur: 20,
        //   //   opacity: 1  //不透明度 
        //   //   },  
        //   // },
        //    data : counData,
        // },
      ],
     
    

    }
    

//捕捉georoam事件，使下层的geo随着上层的geo一起缩放拖曳
    //   myChart.on('georoam',function(params){
    //     var option =myChart.getOption();//获得option对象
    //       if(params.zoom!=null&&params.zoom!=undefined){ //捕捉到缩放时
    //         option.series[1].zoom=option.geo[0].zoom;//下层geo的缩放等级跟着上层的geo一起改变
	  //         option.series[1].center=option.geo[0].center;//下层的geo的中心位置随着上层geo一起改变
    //       }else{//捕捉到拖曳时
    //         option.series[1].center=option.geo[0].center;//下层的geo的中心位置随着上层geo一起改变
    //       }
    //       myChart.setOption(option)
    // });

    myChart.setOption(option)
    
    myChart.on('timelinechanged', function (timeLineIndex) {
                 
                  var option =myChart.getOption();//获得option对象
                  //console.log(typeof option.series[1])
                  option.series[0].data = defaultData[timeLineIndex.currentIndex].data
                    _this.timeLineIndex = timeLineIndex.currentIndex
                    //console.log(_this.timeLineIndex)
                  // _this.$emit('timelineChanged', String(timeLineIndex.currentIndex));
                  //console.log('timelineChanged', timeLineIndex.currentIndex)
                  myChart.setOption(option)

              });


    myChart.on('click',function(worldParam){
      if(worldParam.name=='China'){
        _this.$router.push({
          path: "/china",
        })
        //var option = myChart.getOption();
        //option.geo.map = worldParam.name;
        
       // myChart.clear();
      

        // myChart.setOption(option,true); 
            }
            else if(worldParam.componentType === 'timeline'){
              //
              _this.timeLineIndex = worldParam.name-2008
              var option =myChart.getOption();//获得option对象
              
              option.series[0].data = defaultData[worldParam.name-2008].data
              myChart.setOption(option)
            }
            else{
            
           //

      }
    });

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

<style  >
/* .mapChart{
  border: 1px solid red;
} */
</style>
