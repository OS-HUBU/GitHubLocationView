<template>
  <div class='mapChart' ref='chart'> </div>
</template>
<script>
// 导包
import * as echarts from 'echarts/core'

//导入数据


export default {
  props:{
    yearIndex:{
      type:Number,
      default:() => 0
    },
 
    rankTitle:{
      type:String,
      default:() => '全球'
    },
  
    rankData:{
      type:Array,
      default:() => []
    }
    
  },
  
 
 

  data(){
    return{}
  },
watch:{
  yearIndex(curVal){
    //console.log('监听到了父组件传的值',curVal)
    this.yearIndex = curVal
    //console.log('this.yearIndex',this.yearIndex)
  }
},
  methods: {
  initChart(){
    const _this = this;
    const rankTitle = _this.rankTitle;
    const startYear = 2008;
    const endYear = 2022;
    const yearArray = [];

    for (let year = startYear; year <= endYear; year++) {
      yearArray.push(year);
    }

    let item_Colors = [
      '#F4EDF6','#F1D5CF','#EFBDB3','#E29D9C','#D17C8D','#EB7187','#D95155','#CC3044','#B71234','#5E001F' 
    ];

    var transformedData = [];

    // 添加表头
    transformedData.push(["Population", "Country", "Year"]);

    // 遍历原始数据
    _this.rankData.forEach(item => {
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
    //console.log(source)
  
    //注册echarts
    var myChart = echarts.init(this.$refs.chart);
    
    //样式设置

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
        if(params.componentSubType ==='bar'){
        
          return `${params.data[1]}</br>开发者人数：${params.data[0]}人`
        }
        else{
          return params.name
        }
        
        },
      },
      //表单设置

      title:[
        {
          text: '{larger|' + startYear + '}年\n'  + rankTitle+ '各地区开发者数量TOP15',
          left: '20%',
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
                left: '23%',
                top: '15%',
                bottom: '10%',
                width: {
                  min:1,
                  max:500
                }
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
      
      //数据
      series:[
      {
        realtimeSort:true,
        name:"开发者人数",
        type:"bar",
        data:source ,
        seriesLayoutBy: 'column',
        encode: {
            x: dimension,
            y: 3
          },
        barWidth: 15,
        barGap: 5,
        smooth: true,
        valueAnimation: true,
        itemStyle: {
          // zlevel: 1.5,
          color: function(param){
            let item_data = param.data[0];
            if(item_data < 10){
              //console.log(item_data);
              return item_Colors[0];
            }
            else if(item_data>=10 && item_data <50){
              return item_Colors[1];
            }
            else if(item_data>=50 && item_data <100){
              return item_Colors[2];
            }
            else if(item_data>=100 && item_data <200){
              return item_Colors[3];
            }
            else if(item_data>=200 && item_data <500){
              return item_Colors[4];
            }
            else if(item_data>=500 && item_data <1000){
              return item_Colors[5];
            }
            else if(item_data>=1000 && item_data <2000){
              return item_Colors[6];
            }
            else if(item_data>=2000 && item_data <5000){
              return item_Colors[7];
            }
            else if(item_data>=5000 && item_data <10000){
              return item_Colors[8];
            }
            else {
              return item_Colors[9];
            }
          }, 
        
        },
      }
      ]

    }
  myChart.setOption(option)

  var dataIndex = 0;
         
         function updateDataAndShowTip(){
          var option =myChart.getOption();//获得option对象
                 let year = yearArray[_this.yearIndex]
                 let source = transformedData.slice(1).filter(function (d) {
                     return d[2] === year;
                   });
                   option.series[0].data = source;
                   option.title[0].text = '{larger|' + year + '}年\n'+ rankTitle+'各地区开发者数量TOP15';
                 myChart.setOption(option)
            // dataIndex ++ ;
         }
        //  updateDataAndShowTip();

         var timer = setInterval(function() {
          
            updateDataAndShowTip();

            // 检查 dataIndex 的值是否超出范围，如果超出范围则重置为0
            // if (dataIndex >= 15) {
            //   dataIndex = 0;
            // }
          }, 1000);

  }
},
mounted(){
this.initChart()
}
}

</script>
<style scoped>

</style>