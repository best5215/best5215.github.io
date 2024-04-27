// 卫星分布
var data = {
    id: 'multipleBarsLines',
    legendBar: ['北星座', '南星座'],
    symbol: ' ', //数值是否带百分号        --默认为空 ''
    legendLine: ['东星座', '西星座'],
    xAxis: ['2014', '2015', '2016', '2017', '2018',
        '2019'
    ],
    yAxis: [
        [8, 10, 10, 11, 4, 13],
        [10, 7, 8, 8, 7, 9]
    ],
    lines: [
        [10, 10, 9, 11, 7, 4],
        [6, 12, 12, 2, 4, 4]
    ],
    barColor: ['#009883', '#e66922'], //柱子颜色 必填参数
    lineColor: ['#fd6665', '#fba73b'], // 折线颜色
}

var myData = (function test() {
    let yAxis = data.yAxis || []
    let lines = data.lines || []
    let legendBar = data.legendBar || []
    let legendLine = data.legendLine || []
    var symbol = data.symbol || ' '
    let seriesArr = []
    let legendArr = []
    yAxis && yAxis.forEach((item, index) => {
        legendArr.push({
            name: legendBar && legendBar.length > 0 && legendBar[index]
        })
        seriesArr.push({
            name: legendBar && legendBar.length > 0 && legendBar[index],
            type: 'bar',
            barGap: '0.5px',
            data: item,
            barWidth: data.barWidth || 12,
            label: {
                normal: {
                    show: false,
                    formatter: '{c}' + symbol,
                    position: 'top',
                    textStyle: {
                        color: '#000',
                        fontStyle: 'normal',
                        fontFamily: '微软雅黑',
                        textAlign: 'left',
                        fontSize: 11,
                    },
                },
            },
            itemStyle: { //图形样式
                normal: {
                    barBorderRadius: 0,
                    borderWidth: 1,
                    borderColor: '#ddd',
                    color: data.barColor[index]
                },
            }
        })
    })

    lines && lines.forEach((item, index) => {
        legendArr.push({
            name: legendLine && legendLine.length > 0 && legendLine[index]
        })
        seriesArr.push({
            name: legendLine && legendLine.length > 0 && legendLine[index],
            type: 'line',
            data: item,
            itemStyle: {
                normal: {
                    color: data.lineColor[index],
                    lineStyle: {
                        width: 2,//折线宽度
                        type: 'solid',
                    }
                }
            },
            label: {
                normal: {
                    show: false, //折线上方label控制显示隐藏
                    position: 'top',
                }
            },
            symbol: 'circle',
            symbolSize: 5
        })
    })

    return {
        seriesArr,
        legendArr
    }
})()

option1 = {
    //设置图表标题
    title: {
        show: true,
        text: data.title,
        subtext: data.subTitle,
        link: '1111'
    },
    //图表提示框组件
    tooltip: {
        //触发方式，x轴
        trigger: 'axis',
        formatter: function (params) {
            var time = '';
            var str = '';
            for (var i of params) {
                time = i.name.replace(/\n/g, '') + '<br/>';
                if (i.data == 'null' || i.data == null) {
                    str += i.seriesName + '：无数据' + '<br/>'
                } else {
                    str += i.seriesName + '：' + i.data + symbol + '%<br/>'
                }

            }
            return time + str;
        },
        axisPointer: {
            type: 'none'
        },
    },
    //图例组件
    legend: {
        // right: data.legendRight || '30%',
        top: 0,
        right: 10,
        itemGap: 16,
        itemWidth: 10,
        itemHeight: 10,
        data: myData.legendArr,
        textStyle: {
            color: '#fff',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 12,
        }
    },
    //网格配置，可以控制图表大小
    grid: {
        x: 0,
        y: 30,
        x2: 0,
        y2: 20
    },
    xAxis: {
        //类目轴
        type: 'category',
        data: data.xAxis,
        axisTick: {
            show: false,
        },
        axisLine: {
            show: false,
        },
        axisLabel: {       //轴标
            show: true,
            interval: '0',
            textStyle: {
                lineHeight: 5,
                padding: [2, 2, 0, 2],
                height: 50,
                fontSize: 12,
                color: '#fff',
            },
            rich: {
                Sunny: {
                    height: 50,
                    // width: 60,
                    padding: [0, 5, 0, 5],
                    align: 'center',
                },
            },
            formatter: function (params, index) {
                var newParamsName = "";
                var splitNumber = 5;
                var paramsNameNumber = params && params.length;
                if (paramsNameNumber && paramsNameNumber <= 4) {
                    splitNumber = 4;
                } else if (paramsNameNumber >= 5 && paramsNameNumber <= 7) {
                    splitNumber = 4;
                } else if (paramsNameNumber >= 8 && paramsNameNumber <= 9) {
                    splitNumber = 5;
                } else if (paramsNameNumber >= 10 && paramsNameNumber <= 14) {
                    splitNumber = 5;
                } else {
                    params = params && params.slice(0, 15);
                }

                var provideNumber = splitNumber; //一行显示几个字
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber) || 0;
                if (paramsNameNumber > provideNumber) {
                    for (var p = 0; p < rowNumber; p++) {
                        var tempStr = "";
                        var start = p * provideNumber;
                        var end = start + provideNumber;
                        if (p == rowNumber - 1) {
                            tempStr = params.substring(start, paramsNameNumber);
                        } else {
                            tempStr = params.substring(start, end) + "\n";
                        }
                        newParamsName += tempStr;
                    }

                } else {
                    newParamsName = params;
                }
                params = newParamsName
                return '{Sunny|' + params + '}';
            },
            color: '#687284',
        }
    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#F1F3F5',
                type: 'solid'
            },
            interval: 2
        },
        splitNumber: 4,
    },
    series: myData.seriesArr
}

//卫星任务统计
option3 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        icon: 'rect',
        itemWidth: 18,
        itemHeight: 7,
        itemGap: 13,
        right: '10px',
        top: '0px',
        textStyle: {
            fontSize: 12,
            color: '#fff'
        }
    },
    grid: {
        left: '0%',
        right: '0%',
        bottom: '5%',
        top: '10%',
        containLabel: true
    },
    xAxis: [
    {
        type: 'category',
        axisLine: {
            lineStyle: {
                color: '#57617B'
            }
        },
        axisLabel: {
            textStyle: {
                color:'#fff',
            },
        },
        data: ['2月', '3月', '4月', '5月', '6月', '7月', '8月','9月']
    }
    ],
    yAxis: [
    {
        type: 'value',
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#57617B'
            }
        },
        axisLabel: {
            margin: 10,
            textStyle: {
                fontSize: 14
            },
            textStyle: {
                color:'#fff',
            },
        },
        splitLine: {
            lineStyle: {
                color: '#57617B'
            }
        }
    }
    ],
    series: [
    {
        name: '数传任务',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
            focus: 'series'
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(137, 189, 27, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(137, 189, 27, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(137,189,27)'
            }
        },
        data: [120, 230, 101, 210, 90, 132, 134, 141]
    },
    {
        name: '观测任务',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
            focus: 'series'
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 136, 212, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(0, 136, 212, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(0,136,212)'
            }
        },
        data: [220, 182, 191, 234, 290, 330, 310,180]
    },
    {
        name: '轨控任务',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
            focus: 'series'
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(219, 50, 51, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(219, 50, 51, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(219,50,51)'
            }
        },
        data: [150, 232, 330, 154, 410, 201, 190, 320]
    }
    ]
};
//////////////////////卫星任务统计 end


//本月发生事件1
var color = ['#e9df3d', '#f79c19', '#21fcd6', '#08c8ff', '#df4131'];
var data = [{
    "name": "卫星分布",
    "value": 30
},
    {
        "name": "北星座",
        "value": 30
    },
    {
        "name": "南星座",
        "value": 42
    },
    {
        "name": "东星座",
        "value": 50
    },
    {
        "name": "西星座",
        "value": 34
    }
];

var max = data[0].value;
data.forEach(function (d) {
    max = d.value > max ? d.value : max;
});

var renderData = [{
    value: [],
    name: "告警类型TOP5",
    symbol: 'none',
    lineStyle: {
        normal: {
            color: '#ecc03e',
            width: 2
        }
    },
    areaStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0,
                [{
                    offset: 0,
                    color: 'rgba(203, 158, 24, 0.8)'
                }, {
                    offset: 1,
                    color: 'rgba(190, 96, 20, 0.8)'
                }],
                false)
        }
    }
}];


data.forEach(function (d, i) {
    var value = ['', '', '', '', ''];
    value[i] = max,
        renderData[0].value[i] = d.value;
    renderData.push({
        value: value,
        symbol: 'circle',
        symbolSize: 12,
        lineStyle: {
            normal: {
                color: 'transparent'
            }
        },
        itemStyle: {
            normal: {
                color: color[i],
            }
        }
    })
})
var indicator = [];

data.forEach(function (d) {
    indicator.push({
        name: d.name,
        max: max,
        color: '#fff'
    })
})

// option33 = {
//     tooltip: {
//         show: true,
//         trigger: "item"
//     },
//     radar: {
//         center: ["50%", "50%"],//偏移位置
//         radius: "80%",
//         startAngle: 40, // 起始角度
//         splitNumber: 4,
//         shape: "circle",
//         splitArea: {
//             areaStyle: {
//                 color: 'transparent'
//             }
//         },
//         axisLabel: {
//             show: false,
//             fontSize: 20,
//             color: "#000",
//             fontStyle: "normal",
//             fontWeight: "normal"
//         },
//         axisLine: {
//             show: true,
//             lineStyle: {
//                 color: "rgba(255, 255, 255, 0.5)"
//             }
//         },
//         splitLine: {
//             show: true,
//             lineStyle: {
//                 color: "rgba(255, 255, 255, 0.5)"
//             }
//         },
//         indicator: indicator
//     },
//     series: [{
//         type: "radar",
//         data: renderData
//     }]
// }

// option31 = {
//     tooltip: {
//         show: true,
//         trigger: "item"
//     },
//     radar: {
//         center: ["50%", "50%"],//偏移位置
//         radius: "80%",
//         startAngle: 40, // 起始角度
//         splitNumber: 4,
//         shape: "circle",
//         splitArea: {
//             areaStyle: {
//                 color: 'transparent'
//             }
//         },
//         axisLabel: {
//             show: false,
//             fontSize: 20,
//             color: "#000",
//             fontStyle: "normal",
//             fontWeight: "normal"
//         },
//         axisLine: {
//             show: true,
//             lineStyle: {
//                 color: "rgba(255, 255, 255, 0.5)"
//             }
//         },
//         splitLine: {
//             show: true,
//             lineStyle: {
//                 color: "rgba(255, 255, 255, 0.5)"
//             }
//         },
//         indicator: indicator
//     },
//     series: [{
//         type: "radar",
//         data: renderData
//     }]
// }

option5_1 = {
    tooltip: {//鼠标指上时的标线
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#fff'
            }
        }
    },
    legend: {
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: ['信号强度', '数据传输速率', '任务成功率'],
        right: '10px',
        top: '0px',
        textStyle: {
            fontSize: 12,
            color: '#fff'
        }
    },
    grid: {
        x: 35,
        y: 25,
        x2: 8,
        y2: 25,
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#57617B'
            }
        },
        axisLabel: {
            textStyle: {
                color: '#fff',
            },
        },
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    }],
    yAxis: [{
        type: 'value',
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#57617B'
            }
        },
        axisLabel: {
            margin: 10,
            textStyle: {
                fontSize: 14
            },
            textStyle: {
                color: '#fff',
            },
        },
        splitLine: {
            lineStyle: {
                color: '#57617B'
            }
        }
    }],
    series: [{
        name: '信号强度',
        type: 'line',
        smooth: true,
        lineStyle: {
            normal: {
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(137, 189, 27, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(137, 189, 27, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(137,189,27)'
            }
        },
        data: [75, 82, 79, 75, 85, 72, 78, 68, 72, 76, 80, 83]
    }, {
        name: '数据传输速率',
        type: 'line',
        smooth: true,
        lineStyle: {
            normal: {
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 136, 212, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(0, 136, 212, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(0,136,212)'
            }
        },
        data: [64.2, 61.0, 67.5, 72.1, 63.7, 58.5, 61.9, 61.8, 66.7, 67.6, 72.9, 63]
        // data: [97.3, 99.2, 96.3, 100.0, 99.6, 90.6, 90.0, 91.5, 89.8, 87.5, 90.4, 84.9]
    }, {
        name: '任务成功率',
        type: 'line',
        smooth: true,
        lineStyle: {
            normal: {
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(219, 50, 51, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(219, 50, 51, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(219,50,51)'
            }
        },
        data: [97.3, 99.2, 96.3, 100.0, 99.6, 90.6, 90.0, 91.5, 89.8, 87.5, 90.4, 84.9]
        // data: [94.2, 91.0, 87.5, 92.1, 93.7, 88.5, 91.9, 91.8, 86.7, 87.6, 62.9, 0]
    },]
};
option5_2 = {
    tooltip: {//鼠标指上时的标线
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#fff'
            }
        }
    },
    legend: {
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: ['信号强度', '数据传输速率', '任务成功率'],
        right: '10px',
        top: '0px',
        textStyle: {
            fontSize: 12,
            color: '#fff'
        }
    },
    grid: {
        x: 35,
        y: 25,
        x2: 8,
        y2: 25,
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#57617B'
            }
        },
        axisLabel: {
            textStyle: {
                color: '#fff',
            },
        },
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    }],
    yAxis: [{
        type: 'value',
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#57617B'
            }
        },
        axisLabel: {
            margin: 10,
            textStyle: {
                fontSize: 14
            },
            textStyle: {
                color: '#fff',
            },
        },
        splitLine: {
            lineStyle: {
                color: '#57617B'
            }
        }
    }],
    series: [{
        name: '信号强度',
        type: 'line',
        smooth: true,
        lineStyle: {
            normal: {
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(137, 189, 27, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(137, 189, 27, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(137,189,27)'
            }
        },
        data: [65, 68, 70, 67, 66, 64, 69, 71, 68, 67, 63, 66]
    }, {
        name: '数据传输速率',
        type: 'line',
        smooth: true,
        lineStyle: {
            normal: {
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 136, 212, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(0, 136, 212, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(0,136,212)'
            }
        },
        data: [74.2, 61.0, 57.5, 62.1, 43.7, 48.5, 61.9, 51.8, 46.7, 77.6, 52.9, 50]
        // data: [17.3, 89.2, 89.3, 95, 85.6, 95.6, 91.0, 91.5, 85.8, 84.5, 90.4, 10.9]
    }, {
        name: '任务成功率',
        type: 'line',
        smooth: true,
        lineStyle: {
            normal: {
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(219, 50, 51, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(219, 50, 51, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(219,50,51)'
            }
        },
        data: [97.3, 89.2, 89.3, 95, 85.6, 95.6, 91.0, 91.5, 85.8, 84.5, 90.4, 90.9]
        // data: [74.2, 61.0, 57.5, 62.1, 43.7, 48.5, 61.9, 51.8, 46.7, 77.6, 52.9, 10]
    },]
};
option5_3 = {
    tooltip: {//鼠标指上时的标线
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#fff'
            }
        }
    },
    legend: {
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: ['信号强度', '数据传输速率', '任务成功率'],
        right: '10px',
        top: '0px',
        textStyle: {
            fontSize: 12,
            color: '#fff'
        }
    },
    grid: {
        x: 35,
        y: 25,
        x2: 8,
        y2: 25,
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#57617B'
            }
        },
        axisLabel: {
            textStyle: {
                color: '#fff',
            },
        },
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    }],
    yAxis: [{
        type: 'value',
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#57617B'
            }
        },
        axisLabel: {
            margin: 10,
            textStyle: {
                fontSize: 14
            },
            textStyle: {
                color: '#fff',
            },
        },
        splitLine: {
            lineStyle: {
                color: '#57617B'
            }
        }
    }],
    series: [{
        name: '信号强度',
        type: 'line',
        smooth: true,
        lineStyle: {
            normal: {
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(137, 189, 27, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(137, 189, 27, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(137,189,27)'
            }
        },
        data: [82, 75, 68, 72, 65, 70, 60, 65, 70, 78, 72, 80]
    }, {
        name: '数据传输速率',
        type: 'line',
        smooth: true,
        lineStyle: {
            normal: {
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 136, 212, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(0, 136, 212, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(0,136,212)'
            }
        },
        data: [54.2, 51.0, 57.5, 42.1, 43.7, 38.5, 47.9, 41.8, 46.7, 37.6, 42.9, 60]
        // data: [87.3, 89.2, 89.3, 90.0, 89.6, 90.6, 95.0, 90.5, 89.8, 97.5, 90.4, 94.9]
    }, {
        name: '任务成功率',
        type: 'line',
        smooth: true,
        lineStyle: {
            normal: {
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(219, 50, 51, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(219, 50, 51, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(219,50,51)'
            }
        },
        data: [87.3, 89.2, 89.3, 90.0, 89.6, 90.6, 95.0, 90.5, 89.8, 97.5, 90.4, 94.9]
        // data: [74.2, 71.0, 77.5, 62.1, 53.7, 58.5, 81.9, 41.8, 66.7, 57.6, 42.9, 90]
    },]
};

option6 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        icon: 'rect',
        itemWidth: 18,
        itemHeight: 7,
        itemGap: 13,
        right: '10px',
        top: '0px',
        textStyle: {
            fontSize: 12,
            color: '#fff'
        }
    },
    grid: {
        left: '0%',
        right: '0%',
        bottom: '5%',
        top: '10%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: '#57617B'
                }
            },
            axisLabel: {
                textStyle: {
                    color:'#fff',
                },
            },
            data: ['2月', '3月', '4月', '5月', '6月', '7月', '8月','9月']
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#57617B'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 14
                },
                textStyle: {
                    color:'#fff',
                },
            },
            splitLine: {
                lineStyle: {
                    color: '#57617B'
                }
            }
        }
    ],
    series: [
        {
            name: '数传任务',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
                focus: 'series'
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(137, 189, 27, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(137, 189, 27, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(137,189,27)'
                }
            },
            data: [141, 120, 132, 90, 101, 230, 134, 210]
        },
        {
            name: '观测任务',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
                focus: 'series'
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0, 136, 212, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(0, 136, 212, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(0,136,212)'
                }
            },
            data: [220, 182, 191, 234, 290, 330, 310,180]
        },
        {
            name: '轨控任务',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
                focus: 'series'
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(219, 50, 51, 0.3)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(219, 50, 51, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(219,50,51)'
                }
            },
            data: [320, 190, 410, 154, 232, 330, 201, 150]
        }
    ]
};


















