<script>
    //引入基本模板
    let echarts = require('echarts/lib/echarts')
    require('echarts-gl/dist/echarts-gl');
    // 引入组件
    require('echarts/lib/chart/map')
    // 引入地图js文件
    require('echarts/map/js/province/jiangsu')
    require('echarts/map/js/china')
    // 引入提示框
    require('echarts/lib/component/tooltip')
    // 引入标题组件
    require('echarts/lib/component/title')
    require('echarts/lib/component/legendScroll')
    export default {
        data() {
            return {
                img: require('../assets/img/photovoltaic.png')
            }
        },
        mounted() {
            this.mapInit();
            this.scatter();
            this.gl();
            // this.china();
        },
        methods: {
            // 场站置信出力分布图
            mapInit(){
                let myChart=echarts.init(document.getElementById("map"));
                let list = [
                    {
                        "areaName": "江苏xx",
                        "cityName":"江苏省",
                        "confidenceProbability": 0.41,
                        "latitude": 34.401,
                        "confidencePower": 20,
                        "longitude": 119.9526
                    },
                    {
                        "areaName": "江苏南京xx",
                        "cityName":"南京市",
                        "confidenceProbability": 50.23,
                        "latitude": 32.45,
                        "confidencePower": 20,
                        "longitude": 118.92
                    },
                    {
                        "areaName": "江苏镇江xx",
                        "cityName":"镇江市",
                        "confidenceProbability": 0.8,
                        "latitude": 32.0888,
                        "confidencePower": 40,
                        "longitude": 119.4225
                    },
                    {
                        "areaName": "江苏常州xx",
                        "cityName":"常州市",
                        "confidenceProbability": 12.4,
                        "latitude": 31.92,
                        "confidencePower": 120,
                        "longitude": 119.99
                    },
                    {
                        "areaName": "江苏无锡xx",
                        "cityName":"无锡市",
                        "confidenceProbability": 13.53,
                        "latitude": 31.5591,
                        "confidencePower": 80,
                        "longitude": 120.4113
                    },
                    {
                        "areaName": "江苏苏州xx",
                        "cityName":"苏州市",
                        "confidenceProbability": 8.47,
                        "latitude": 31.55,
                        "confidencePower": 139,
                        "longitude": 120.817
                    },
                    {
                        "areaName": "江苏徐州xx",
                        "cityName":"徐州市",
                        "confidenceProbability": 63,
                        "latitude": 34.0814,
                        "confidencePower": 100,
                        "longitude": 117.9255
                    },
                    {
                        "areaName": "江苏泰州xx",
                        "cityName":"泰州市",
                        "confidenceProbability": 11.8,
                        "latitude": 33.16,
                        "confidencePower": 120,
                        "longitude": 120.16
                    },
                    {
                        "areaName": "江苏南通xx",
                        "cityName":"南通市",
                        "confidenceProbability": 30.69,
                        "latitude": 32.06,
                        "confidencePower": 47,
                        "longitude": 121.03
                    },
                    {
                        "areaName": "江苏淮安xx",
                        "cityName":"淮安市",
                        "confidenceProbability": 0.64,
                        "latitude": 33.56,
                        "confidencePower": 160,
                        "longitude": 119.18
                    },
                    {
                        "areaName": "江苏盐城xx",
                        "cityName":"盐城市",
                        "confidenceProbability": 32.9,
                        "latitude": 33.5189,
                        "confidencePower": 200,
                        "longitude": 120.2789
                    },
                    {
                        "areaName": "江苏连云港xx",
                        "cityName":"连云港市",
                        "confidenceProbability": 34.8,
                        "latitude": 34.117,
                        "confidencePower": 0,
                        "longitude": 119.3315
                    },
                    {
                        "areaName": "江苏宿迁xx",
                        "cityName":"宿迁市",
                        "confidenceProbability": 45.6,
                        "latitude": 33.739,
                        "confidencePower": 0,
                        "longitude": 118.757
                    },
                    {
                        "areaName": "江苏扬州xx",
                        "cityName":"扬州市",
                        "confidenceProbability": 87.5,
                        "latitude": 33.13,
                        "confidencePower": 0,
                        "longitude": 119.38
                    }
                ];
                let data = [];
                let map = [];
                list.forEach((item) => {
                    if (item.cityName == "江苏省") {
                        return;
                    }
                    // data 存储散点的经纬度 
                    data.push(
                        {
                            value: [item.longitude, item.latitude, item.confidencePower],
                            name: item.areaName,
                            data: [item.confidencePower, item.confidenceProbability]
                        }
                    )

                    // map存贮具体的数值
                    map.push({
                        name: item.cityName,
                        value: item.confidencePower,
                        data: [item.confidencePower, item.confidenceProbability]
                    })
                });
                let option = {
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        formatter:function(params, ticket, callback){
                            return `置信出力值：` + params.data.data[0] + `MW` + `<br/>`+ `置信出力率：` + params.data.data[1] + `%`;
                        }
                    },
                    visualMap: {
                        min: 0,
                        max: 200,
                        calculable: true,
                        inRange: {
                            color: ['#50a3ba', '#eac736', '#d94e5d']
                        },
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    geo: {
                        show: true,
                        roam: true,
                        map: '江苏',
                        selectedMode: false,//是否允许选中多个区域，
                        markLine:{
                            lineStyle:{
                                color:'#fff'
                            }
                        },
                        regions:[
                            {name: '南京市', selected:true} // selected:true 默认选中
                        ],
                        label:{
                            normal: {
                                show: true,
                                color:'#fff'
                            },
                            emphasis:{
                                show: true,
                                color:'#FFFF0F'
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: '#667684',
                                borderWidth: 2,
                                areaColor:'#12202D',
                                shadowColor: 'rgba(88,175,190, 0.8)',
                                shadowBlur: 6,
                                shadowOffsetY:5,
                            },
                            emphasis:{
                                areaColor:'rgba(88,175,190, 0.8)',
                            }
                        }
                    },
                    series:[
                        {
                            name: '江苏',
                            type:"scatter",
                            // showEffectOn: 'render',
                            coordinateSystem: 'geo',
                            symbol:'image://'+this.img,
                            symbolSize:[30, 20],
                            // 设置散点的大小
                            // symbolSize: 12,
                            // 设置散点的颜色
                            itemStyle: {
                                normal: {
                                    shadowBlur: 10,
                                    shadowColor: 'rgba(25, 100, 150, 0.5)',
                                    shadowOffsetY: 5,
                                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                        offset: 0,
                                        color: 'rgb(129, 227, 238)'
                                    }, {
                                        offset: 1,
                                        color: 'rgb(25, 183, 207)'
                                    }])
                                }
                            },
                            data: data
                        },
                        // 配置地图
                        {
                            name: 'map',
                            type: 'map',
                            mapType: '江苏', // 自定义扩展图表类型
                            geoIndex: 0,
                            roam: true,
                            showLegendSymbol: false,
                            // aspectScale: 0.75, // 长宽比
                            itemStyle:{
                                normal:{
                                    label:{
                                        show:true
                                    },
                                },
                                emphasis:{
                                    label:{
                                        show:true
                                    }
                                }
                            },
                            data: map
                        }
                    ]
                };
                myChart.setOption(option);
            }
        }
    }
</script>