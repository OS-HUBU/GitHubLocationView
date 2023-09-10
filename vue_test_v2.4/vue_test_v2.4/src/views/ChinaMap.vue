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


export default {
props:{
  mapData:{
    type:Array,
    default:() => []
  },
 
},

data(){
return {
  
}
},

methods: {
initChart () {
  
  const _this = this

  //数据散点的坐标
  const  defaultData = this.mapData

  //时间

  const startYear = 2008;
  const endYear = 2022;
  const yearArray = [];

  for (let year = startYear; year <= endYear; year++) {
    yearArray.push(year);
  }
  //数据转换成echats支持的格式：
  var transformedData = [];

    // 添加表头
    transformedData.push(["Population", "Country", "Year"]);

    // 遍历原始数据
    rankData.forEach(item => {
      var year = parseInt(item.year);

      item.data.forEach(d => {
        var country = d.name;
        var population = d.value;

        transformedData.push([population, country, year]);
      });
    });

    const dimension = 0;

    let source = transformedData.slice(1).filter(function (d) {
            return d[2] === startYear; //过滤符合当前年份信息
          })
  
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
      
       if(params.componentSubType ==='bar'){
       
        return `${params.data[1]}</br>开发者人数：${params.data[0]}人`
      }
      else{
        return params.name
      }
      
      },
    },

    //图注解
    visualMap: { 
       // calculable: true,
       type:'piecewise',
        pieces:[
        
        { min: 10000, max: 1000000, label: '＞10000', color: '#5E001F' },
        { min: 5000, max: 9999, label: '5000-9999', color: '#B71234' },
        { min: 2000, max: 4999, label: '2000-4999', color: '#CC3044' },
        { min: 1000, max: 1999, label: '1000-1999', color: '#D95155' },
        { min: 500, max: 999, label: '500-999', color: '#EB7187' },
        { min: 200, max: 499, label: '200-499', color: '#D17C8D' },
        { min: 100, max: 199, label: '100-199', color: '#E29D9C' },
        { min: 50, max: 99, label: '50-99', color: '#EFBDB3' },
        { min: 10, max: 49, label: '10-49', color: '#F1D5CF' },
        { min: 0, max: 9, label: '0-9', color: '#F4EDF6' }
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
      playInterval: 2500,//切换时间，2*1000=2秒
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
      center: [112.2363,35.8572],
      show: true,
      roam: true,
      //注册的地图名
      map: 'china',
      label:{
        show:false
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
   //排行榜设置
   title:[
        {
          text: '{larger|' + startYear + '}年\n中国各地区开发者数量TOP15',
          left: '75%',
          top:'5%',
          textStyle:{
            color:"#fff",
            rich: {
              larger: {
                fontSize: 40,
                fontWeight: 'bold'
            }
            }
          }
        }
      ],
  grid: {
            right: '1%',
            top: '15%',
            bottom: '10%',
            width: '20%'
        },

  dataset: {
    source: source  
  },  
    // x轴
    xAxis: {
        type: "value",
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
          
        },
        //不显示X轴刻度线和数字
        splitLine: { show: false },
        axisLabel: { show: false },
        dataset:{

        }
      },

      //y轴
    yAxis: {
        type: "category",
        //升序
        inverse: true,
        max:14,

        splitLine: { show: false },

        axisLine: {
            show: true,
            lineStyle: {
                color: '#ddd'
            }
        },

        //刻度线
        axisTick: {
            show: false,
            lineStyle: {
                color: '#ddd'
            }
        },
        //y轴坐标
        axisLabel: {
            interval: 0,
            textStyle: {
                color: '#ddd',
                fontSize:'20'
            }, 
            
        },
        //key和图间距
        offset: 10,
        //动画部分
        animationDuration: 300,
        animationDurationUpdate: 300,
        //key文字大小
        nameTextStyle: {
          fontSize: 5,
        },
        
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
      {
        realtimeSort:true,
        name:"开发者人数",
        type:"bar",
        data:source ,
        encode: {
            x: dimension,
            y: 3
          },
        barWidth: 14,
        barGap: 5,
        smooth: true,
        valueAnimation: true,
        itemStyle: {
          zlevel: 1.5,
          normal: {
            color:'#e66f32'
            
          },
          emphasis: {
            barBorderRadius: 4,
          },
        },
      }
      
    ]
  }
  myChart.setOption(option)

  myChart.on('timelinechanged', function (timeLineIndex) {
                 
                 var option =myChart.getOption();//获得option对象
                 //console.log(typeof option.series[1])
                 option.series[0].data = defaultData[timeLineIndex.currentIndex].data
                 let year = yearArray[timeLineIndex.currentIndex]
                 let source = transformedData.slice(1).filter(function (d) {
                     return d[2] === year;
                   });
                   option.series[1].data = source;
                   option.title[0].text = '{larger|' + year + '}年\n中国各地区开发者数量TOP15';
                 // _this.$emit('timelineChanged', String(timeLineIndex.currentIndex));
                 //console.log('timelineChanged', timeLineIndex.currentIndex)
                 myChart.setOption(option)
             });

},

// handleClick(event) {
//   const target = event.target;
//   const item = this.$refs.item;

//   if (target === item) {
//     // 鼠标点击到 item

//     // 
//     //console.log(item)
//   } else {
//     // 鼠标点击到其他地方
//     this.itemInfo = null;
//     this.$router.push({
//       path:"/"
//     })
//   }
// }


},

mounted(){
this.initChart()
}

}

</script>

<style >
.mapChart {
width: 80%;
height: 70%;
/* border: 1px solid red; */
}
</style>
