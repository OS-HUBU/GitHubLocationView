<template>
  <div class="rankChart " ref="chart" ></div>
</template>

<script>
import * as echarts from 'echarts/core'
import axios from 'axios';
import { color } from 'echarts/core';
 
export default {  
  data(){
    return {
      name:'全球',
      time:'2019',
      years:[2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
    }
      },
    props:{
      rankData:{
        type:Array,
        default:() =>[

        ]
      },
      currentIndex: {
        type: Number,
        default: 0
    }
    } ,
    watch: {
    currentIndex(newIndex) {
    // 在这里处理 currentIndex 的变化
   // console.log('子组件 Received currentIndex:', newIndex);
    // 其他操作...
    this.updateYear(this.years[newIndex]);
  }
},
  methods:{
    initChart(){
      const _this = this;
      //绑定组件
     // console.log('rank 组件接收到的',this.currentIndex)
      const rankData = this.rankData
      //console.log('rankData',rankData[0].year)
    var myChart = echarts.init(this.$refs.chart);
    
    
    // 确定年份
    // var years = [];
    // for (var i = 0; i < rankData.length; ++i) {
    //     if (years.length === 0 || years[years.length - 1] !== rankData[rankData.length-1].year) {
    //         years.push(rankData[i].year);
    //     }
    // }
   
    
    // 获取年份
    // var years = rankData.map(item => item.year);
    var years = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
      //开始年份;
    var startIndex = 0;
    var startYear = years[startIndex];
    //console.log(startYear)

    //转换成echarts需要的数据
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

      const countData = transformedData
      const dimension = 0;
      const updateFrequency = 3500;

     let source =  countData.slice(1).filter(function (d) {
            return d[2] === startYear; //过滤信息
          })
   

    var option = {
     
      //柱状图标题
      title:[
        {
          text:  startYear+'年开发者人数排行',
          left: '10%',
          top:'0 %',
          textStyle:{
            color:"#fff"
          }
        }
      ],
       
    
      //
      tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
      //图表位置
      grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
      //数据来源
      dataset: {
      source: countData.slice(1).filter(function (d) {
        return d[2] === startYear; //过滤信息
        })
        
      }, 
      
      // 轴
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

          max:15,

          splitLine: { show: false },

          axisLine: {
              show: false,
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
      //具体数据
        series:[
          {
            //柱状图自动排序，排序自动让Y轴名字跟着数据动
            realtimeSort:true,
            name:"开发者人数",
            type:"bar",
           // data:transformedData,
            encode: {
                x: dimension,
                y: 3
              },
            barWidth: 14,
            barGap: 5,
            smooth: true,
            valueAnimation: true,
            // label: {
            //   normal: {
            //     show: false,
            //     position: "right",
            //     valueAnimation: true,
            //     offset: [5, -2],
            //     textStyle: {
            //       color: "#fff",
            //       fontSize: 18,
            //     },
            //   },
            // },

            itemStyle: {
              normal: {
                color:'#e66f32'
                // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                //   { offset: 1, color: "#f8b862" },
                //   { offset: 0, color: '#e66f32' },
                // ]),
              },
              emphasis: {
                barBorderRadius: 4,
              },
            },

            



          }
        ],
        //动态滚动
        // dataZoom:[
        //   {
        //     yAxisIndex: [0],
        //     type:"slider",
        //     show:false,
        //     startValue:0,
        //     endValue:6,
        //     realtime: true,
        //     borderColor: '#005e79',
        //     radiusAxisIndex: 10,
        //     fillerColor: '#009ecb',
        //     backgroundColor: '#005e79',

        // },
        // {
        //     type: "inside",
        //     yAxisIndex: 0,
        //     zoomOnMouseWheel: false, //滚轮是否触发缩放
        //     moveOnMouseMove: true, //鼠标滚轮触发滚动
        //     moveOnMouseWheel: true,
        //   },

        // ],
//动画
        // animationDuration: 0,
        // animationDurationUpdate: 3000,
        // animationEasing: "linear",
        // animationEasingUpdate: "linear",

           // Disable init animation.
      animationDuration: 0,
      animationDurationUpdate: updateFrequency,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear',
      graphic: {
        elements: [
          {
            type: 'text',
            right: 160,
            bottom: 60,
            style: {
              text: startYear,
              font: 'bolder 80px monospace',
              fill: 'rgba(100, 100, 100, 0.25)'
            },
            z: 100
          }
        ]
      }
    };
   
      

  myChart.setOption(option)
      // for (let i = startIndex; i < years.length - 1; ++i) {
      //   (function (i) {
      //     setTimeout(function () {
      //       updateYear(years[i+1]);
      //     }, (i - startIndex) * updateFrequency);
      //   })(i);
      // }
     
      },
      updateYear(year){
        console.log('year',year);
        let source = countData.slice(1).filter(function (d) {
          return d[2] === year;
        });
        option.series[0].data = source;
        option.graphic.elements[0].style.text = year;
        option.title[0].text = year+'年\n全球各国开发者数量TOP15';
        
        myChart.setOption(option);
      }
  },
  mounted(){
    this.initChart()
  }
    
}
  
</script>

<style>
.rankChart{
  height: 100%;
  width:80%;
  background-color: rgba(255, 255, 255, 0.05);
 /* border: 1px solid rgb(0, 174, 255);  */
}

</style>