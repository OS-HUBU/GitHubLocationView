<template>
  <!-- 折线图 -->

  
    <div class="lineChart" ref="chart" style="width: 100% ; height: 350px;">
    </div>



</template>

<script>

import * as echarts from 'echarts/core'






const startYear = 2008;
const endYear = 2022;
const yearArray = [];

for (let year = startYear; year <= endYear; year++) {
  yearArray.push(year.toString());
}


export default {
  props:{
    totalData:{
      type:Array,
      default:() => ['3018', '4009', '5010', '5511', '6012', '7613', '8014', '9015', '10016', '12017', '14018', '16019', '20020', '20521', '25002']
    } ,
    lineTitle:{
      type:String,
      default:() =>'全球'
    }
  },
  data(){
    return {
      xData:yearArray,
      name:'全球'
    }
  },
  mounted(){
    this.initChart(); //绘制图表
  },
  methods: {
      initChart(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.$refs.chart);
        const _this = this;
        let minValue= _this.totalData[0]
        let maxValue = _this.totalData[this.totalData.length-1]
        // console.log(minValue, maxValue)
        //具体配置项
        var option = {

            title: {
                text: '2008年-2022年 Github'+this.lineTitle+'开发者人数变化',
                textStyle:{
                  color:"#fff",
                  fontFamily:"微软雅黑",
                  fontSize:24
                } ,
                left: '9.5%',  
                top:'5%',  
              },

            tooltip: {
                trigger: 'axis',
                textStyle: {
                  fontFamily: '微软雅黑, Arial, sans-serif', // 设置字体为"微软雅黑"
                  fontSize:20
                },
                axisPointer: {
                  animation: false
                }
              },

            xAxis: {
                type: 'category',
                data:this.xData,
                splitLine: {
                  show: false
                },
                //坐标轴颜色
                axisLabel: {
                  textStyle: {
                    color: '#fff', // 设置坐标轴标签的颜色
                    fontFamily: 'Arial', // 设置坐标轴标签的字体
                    fontSize: 20,
                  }
                }
              },
            
            yAxis: {
              interval:Math.floor((maxValue - minValue) / 10),// 设置刻度间隔为50000
              //scale: true, // 开启自适应坐标轴
                min: Math.floor(minValue / 10)* 10,
                max: Math.ceil(maxValue / 100) * 100,
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                  show: false
                },
                position: 'right',

                axisLabel: {
                  textStyle: {
                    color: '#fff', // 设置坐标轴标签的颜色
                    fontFamily: 'Arial' ,// 设置坐标轴标签的字体
                    fontSize:16
                  }
                }
              },

            animation: true,
            animationDuration: 40000,

            series: [
                {
                  name: this.lineTitle+'开发者总数',
                  type: 'line',
                  showSymbol: false,
                  
                  data: this.totalData,
                  lineStyle:{
                    color:'#bc3e48',
                  },
                  // endLabel: {
                  // show: true,
                  // formatter: function (params) {
                   
                  //   return populationData[params.currentIndex];
                  //   }
                  // }
                }
  ]
        };

        // 使用刚指定的配置项和数据显示图表。
        
       
          myChart.setOption(option);
      }
    },
}
</script>

<style>
.lineChart{
  background-color: rgba(255, 255, 255, 0.05);
}
</style>