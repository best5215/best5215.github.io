option8 = {
    backgroundColor: '#000',
    globe: {
        // 地图纹理
        show: true,
        baseTexture: '../images/earth.jpg',
        shading: 'lambert',
        // 地图背景
        environment: '../images/earthbackground.jpg',
        atmosphere: {
            show: true,
        },
        //color模式下light不作用
        light: {
            ambient: {
                //环境光强度
                intensity: 1,
            },
            main: {
                //主光源强度
                intensity: 0,
            },
        },
    },
    series: [
        {
        type: 'lines3D',
        coordinateSystem: 'globe',
        blendMode: 'lighter',
        lineStyle: {
            normal: {
                opacity: 1,
                color: "#00FEFF",
                width: 1,
            },
        },
        effect: {
            show: true,
            period: 4, //特效动画的时间，单位为 s
            trailLength: 0.2, //特效尾迹的长度。0~1数值越大尾迹越长
            color: "#64f2ff",
            symbol: "arrow", //箭头图标
            symbolSize: 10, //图标大小
        },
        data: [
            // {
            //     coords: [
            //         [121.4737, 31.23041, 100], //上海
            //         [117.150024, 39.114174, 100], //天津
            //         // [-77.013222, 38.913611, 100], //美国
            //         // [120.52, 30.4, 100], //上海
            //     ]
            // },
            // {
            //     coords: [
            //         [-77.013222, 38.913611, 100], //美国
            //         [117.150024, 39.114174, 100], //天津
            //     ]
            // }
        ],
        silent: false
    },
        {
            type: 'scatter3D',
            coordinateSystem: 'globe',
            blendMode: 'lighter',
            symbolSize: 8,
            itemStyle: {
                color: 'red', // 将标记点设置为红色
            },
            data: [{
                value: [116.4074, 39.90421], // 北京的经纬度坐标
                name:'北京',
                description: '北京是中国的首都'
            },{
                value: [139.69, 35.69], //东京的经纬度坐标
                name:'东京',
                description: '东京是日本的首都'
            },{
                value: [1.5, 51.30], //伦敦的经纬度坐标
                name:'伦敦',
                description: '伦敦是英国的首都'
            },{
                value: [121.4737, 31.23041], //上海的经纬度坐标
                name:'上海',
                // description: '伦敦是英国的首都'
            }],
            silent: false
        }],
    tooltip: {
        z:999,
        // 在提示框中显示名称和描述信息
        formatter: function (params) {
            if (params.componentType === 'series' && params.seriesType === 'scatter3D') {
                var data = params.data;
                if (data) {
                    var name = data.name;
                    var description = data.description;
                    return '名称：' + name + '<br>' + '描述：' + description;
                }
            }
            return '';
        }
    }
};