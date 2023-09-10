<template>
  
</template>

<script>
export default {

}

//构建容器并初始化DOM；
var myChart = echarts.init(document.getElementById("container"));
    //获取数据并加载;
    $.when(
        $.getJSON('data/data.json')
    ).done(function (res) {
        //获取数据集;
        var data = res;

        //获取年份;
        var years = [];
        for (var i = 0; i < data.length; ++i) {
            if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
                years.push(data[i][4]);
            }
        }

        //开始年份;
        var startIndex = 1;
        var startYear = years[startIndex];

        //图表配置项;
        var option = {
            title: {
                x: 'center',
                text: title,
                subtext: subtext,
                top: '2%',
                textStyle: {
                    fontSize: titleSize,
                    color: 'rgba(121,121,121, 0.9)'
                }
            },
            grid: {
                left: '5%',
                right: '5%',
                top: '15%',
                bottom: '10%',
                containLabel: true
            },
            xAxis: {
                max: 'dataMax',
                label: {
                    formatter: function (n) {
                        return Math.round(n);
                    }
                }
            },
            dataset: {
                source: rdata.slice(1).filter(function (d) {
                    return d[4] === startYear;
                })
            },
            yAxis: {
                type: 'category',
                inverse: true,
                max: maxData,//显示柱图数量
                axisLabel: {
                    show: true,
                    textStyle: {
                        fontSize: 14
                    },
                    formatter: function (value) {
                        return value;
                    }
                },
                animationDuration: 300,
                animationDurationUpdate: 300
            },
            series: [{
                realtimeSort: true,
                seriesLayoutBy: 'column',
                type: 'bar',
                itemStyle: {
                    color: function (param) {
                        return barColors[param.dataIndex] || '#5470c6';
                    }
                },
                encode: {
                    x: dimension,
                    y: 3
                },
                label: {
                    show: true,
                    precision: 1,
                    position: yPosition,//文本标签显示位置
                    valueAnimation: true,
                    fontFamily: 'monospace'
                }
            }],
            // Disable init animation.
            animationDuration: 0,
            animationDurationUpdate: updateFrequency,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear',
            graphic: {
                elements: [{
                    type: 'text',
                    right: "5%",
                    bottom: "15%",
                    style: {
                        text: startYear,
                        font: 'bolder 80px monospace',
                        fill: 'rgba(100, 100, 100, 0.25)'
                    },
                    z: 100
                }]
            }
        };

        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });

        //循环数据;
        for (var i = startIndex; i < years.length - 1; ++i) {
            (function (i) {
                setTimeout(function () {
                    updateYear(years[i + 1]);
                }, (i - startIndex) * updateFrequency);
            })(i);
        }

        //更新年份;
        function updateYear(year) {
            var source = data.slice(1).filter(function (d) {
                return d[4] === year;
            });
            option.series[0].data = source;
            option.graphic.elements[0].style.text = year;
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        }
    })

</script>


<style>

</style>