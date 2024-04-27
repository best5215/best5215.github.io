// var map = new BMapGL.Map("centremap");    // 创建Map实例
// map.centerAndZoom(new BMapGL.Point(118.5, 27.5), 5);  // 初始化地图,设置中心点坐标和地图级别
// map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
// map.setMapType(BMAP_EARTH_MAP);      // 设置地图类型为地球模式
// // map.setMapType(BMAP_NORMAL_MAP);     // 设置地图类型为标准模式
// var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
// map.addControl(scaleCtrl);
// var zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
// map.addControl(zoomCtrl);
// var cityCtrl = new BMapGL.CityListControl();  // 添加城市列表控件
// map.addControl(cityCtrl);
// var point = new BMapGL.Point(116.404, 39.915);
// var marker = new BMapGL.Marker(point);        // 创建标注
// map.addOverlay(marker);   // 将标注添加到地图中ff
// map.addEventListener('click', function (e) {
//     alert('点击的经纬度：' + e.latlng.lng + ', ' + e.latlng.lat);
//     //var mercator = map.lnglatToMercator(e.latlng.lng, e.latlng.lat);
//     //alert('点的墨卡托坐标：' + mercator[0] + ', ' + mercator[1]);
// });

// visual1.js

// 等待DOM加载完成后执行初始化地图的代码
document.addEventListener("DOMContentLoaded", async function () {
    var map = new BMapGL.Map("centremap");    // 创建Map实例
    map.centerAndZoom(new BMapGL.Point(118.5, 27.5), 5);  // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    map.setMapType(BMAP_EARTH_MAP);      // 设置地图类型为地球模式

    // 添加比例尺控件
    var scaleCtrl = new BMapGL.ScaleControl();
    var scaleCtrl = new BMapGL.ScaleControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        offset: new BMapGL.Size(50, 35)
    });
    map.addControl(scaleCtrl);

    // 添加缩放控件
    var zoomCtrl = new BMapGL.ZoomControl();
    map.addControl(zoomCtrl);

    // 添加城市列表控件
    var cityCtrl = new BMapGL.CityListControl();
    var cityCtrl = new BMapGL.CityListControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        offset: new BMapGL.Size(10, 70)
    });
    map.addControl(cityCtrl);

    // 创建北京的标注
    var point = new BMapGL.Point(116.404, 39.915);
    var marker1 = new BMapGL.Marker(point);
    map.addOverlay(marker1);   // 将标注添加到地图中

    var enableMarker = false; // 是否启用标记点功能，默认为关闭
    var address = await getPosition(point);
    // 创建点标记
    var marker = new BMapGL.Marker(point, {
        enableDragging: true
    });
    var opts = {
        width : 250,  // 信息窗口宽度
        height: 100,  // 信息窗口高度
    }
    // 创建图文信息窗口
    var sContent = getContent(point, address);
    // 在地图上添加点标记
    map.addOverlay(marker)
    // 创建信息窗口对象
    var infoWindow = new BMapGL.InfoWindow(sContent, opts);
    // 打开信息窗口
    marker.openInfoWindow(infoWindow);

    map.addEventListener('click', async function(e) {
        if (enableMarker) {
            console.log(e)
            console.log('点击的经纬度：' + e.latlng.lng + ', ' + e.latlng.lat);
            var mercator = map.lnglatToMercator(e.latlng.lng, e.latlng.lat);
            console.log('点的墨卡托坐标：' + mercator[0] + ', ' + mercator[1]);
            // map.clearOverlays();
            

            // 获取点击点的坐标
            var {lng, lat} = e.latlng;
            var point = new BMapGL.Point(lng, lat); // 创建地理坐标点
            var address = await getPosition(point);

            // 创建标注对象
            var marker = new BMapGL.Marker(point, {
                enableDragging: true
            });
            // 将标注添加到地图上
            map.addOverlay(marker);

            console.log('address222', address)
            sContent = getContent(point, address);
            // 创建信息窗口对象
            var infoWindow = new BMapGL.InfoWindow(sContent, opts);
            // 打开信息窗口
            marker.openInfoWindow(infoWindow);
        } else {
            return;
        }
    });

    // 处理地址解析异步操作
    function getPosition(point) {
        return new Promise((resolve, reject) => {
            let geoc = new BMapGL.Geocoder(); // // 处理地址解析和逆解析
            geoc.getLocation(point, (result) => {
                let addr = result.addressComponents;
                var full_address = addr.province + addr.city + addr.district + addr.street + addr.streetNumber;
                return resolve(full_address);
            });
        });
    }

    function getContent(point, address) {
        return `<div style='padding-left:10px'>
          经度: ${point.lng}<br>
          纬度: ${point.lat}<br>
          地址: ${address}</div>`;
    }

    var drawingManager = new BMapGLLib.DrawingManager(map, {
        isOpen: false,
        drawingMode: BMAP_DRAWING_POLYGON,
        enableDrawingTool: true,
        drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_LEFT,
        },
        polygonOptions: {
            strokeWeight: 2,
            strokeColor: '#ff0000',
            fillColor: '#00ff00',
            fillOpacity: 0.6
        }
    });

    // 监听绘制完成事件
    drawingManager.addEventListener('overlaycomplete', function(e) {
        var polygon = e.overlay;
        var path = polygon.getPath(); // 获取多边形的路径（顶点坐标数组）

        // 输出顶点坐标到控制台
        console.log("Polygon Vertices:");
        path.forEach(function(point, index) {
            console.log("Vertex " + (index + 1) + ": " + point.lng + ", " + point.lat);
        });
    });

    // // 存储绘制的图形
    // var drawnShapes = [];
    // // 监听绘制完成事件
    // drawingManager.addEventListener('overlaycomplete', function(e) {
    //     var shape = e.overlay;
    //     drawnShapes.push(shape); // 将绘制的图形添加到数组中
    //
    //     // 将绘制的多边形数据转换为 GeoJSON 格式
    //     var geoJsonFeatures = drawnShapes.map(function(shape) {
    //         var points = shape.getPath().map(function(point) {
    //             return [point.lng, point.lat];
    //         });
    //         return {
    //             type: 'Feature',
    //             geometry: {
    //                 type: 'Polygon',
    //                 coordinates: [points]
    //             },
    //             properties: {}
    //         };
    //     });
    //
    //     // 构建 GeoJSON 对象
    //         var geoJsonData = {
    //             type: 'FeatureCollection',
    //             features: geoJsonFeatures
    //         };
    //
    //     // 将 GeoJSON 数据转换为 JSON 字符串
    //         var geoJsonString = JSON.stringify(geoJsonData);
    //
    //     // 创建下载链接并触发下载
    //         var blob = new Blob([geoJsonString], { type: 'application/json' });
    //         var url = URL.createObjectURL(blob);
    //         var a = document.createElement('a');
    //         a.href = url;
    //         a.download = 'map_data.geojson';
    //         a.click();
    // });
});

// var marker;
// map.addEventListener('click', function (e1) {
//     marker = new BMapGL.Marker(e1.point);
//     map.addOverlay(marker);
//     var infoWindow = new BMapGL.InfoWindow("坐标：" + e1.point.lng + ", " + e1.point.lat, {
//         offset: new BMapGL.Size(250, 120),
//         enableMessage: true
//     });
//     console.log(1); // 在信息窗口弹出时输出 true 到控制台
//
//     marker.addEventListener('click', function () {
//         map.openInfoWindow(infoWindow, e1.point);
//         console.log(2); // 在信息窗口弹出时输出 true 到控制台
//     },{passive: true });
// }, {passive: true });


// // 点击删除按钮时执行的操作
// document.getElementById('deleteButton').addEventListener('click', function() {
//     // 删除绘制的图形
//     drawnShapes.forEach(function(shape) {
//         map.removeOverlay(shape);
//     });
//     // 清空数组
//     drawnShapes = [];
//     // 隐藏保存和删除按钮
//     document.getElementById('saveButton').style.display = 'none';
//     document.getElementById('deleteButton').style.display = 'none';
// });


//     // 将绘制的多边形数据转换为 GeoJSON 格式
//     var geoJsonFeatures = drawnShapes.map(function(shape) {
//         var points = shape.getPath().map(function(point) {
//             return [point.lng, point.lat];
//         });
//         return {
//             type: 'Feature',
//             geometry: {
//                 type: 'Polygon',
//                 coordinates: [points]
//             },
//             properties: {}
//         };
//     });
//
// // 构建 GeoJSON 对象
//     var geoJsonData = {
//         type: 'FeatureCollection',
//         features: geoJsonFeatures
//     };
//
// // 将 GeoJSON 数据转换为 JSON 字符串
//     var geoJsonString = JSON.stringify(geoJsonData);
//
// // 创建下载链接并触发下载
//     var blob = new Blob([geoJsonString], { type: 'application/json' });
//     var url = URL.createObjectURL(blob);
//     var a = document.createElement('a');
//     a.href = url;
//     a.download = 'map_data.geojson';
//     a.click();

//     var drawingManager = new BMapGLLib.DrawingManager(map, {
//         isOpen: true,  // 开启绘制模式
//         drawingMode: BMAP_DRAWING_POLYGON,  // 默认绘制模式为多边形
//         enableDrawingTool: true,  // 不显示绘制工具栏
//         polygonOptions: {
//             strokeWeight: 2,  // 线宽度
//             strokeColor: '#ff0000',  // 线颜色
//             fillColor: '#00ff00',    // 填充颜色
//             fillOpacity: 0.3  // 填充透明度
//         }
//     });
// // 监听绘制结束事件
//     drawingManager.addEventListener('polygoncomplete', function(polygon) {
//         // 显示保存和删除按钮
//         document.getElementById('saveButton').style.display = 'block';
//         document.getElementById('deleteButton').style.display = 'block';
//
//         // 保存绘制的多边形对象
//         var drawnPolygon = polygon;
//
//         // 点击保存按钮时执行的操作
//         document.getElementById('saveButton').addEventListener('click', function() {
//             // 这里可以将绘制的多边形对象保存到数据库或其他位置
//             alert('多边形已保存');
//         });
//
//         // 点击删除按钮时执行的操作
//         document.getElementById('deleteButton').addEventListener('click', function() {
//             // 删除绘制的多边形对象
//             map.removeOverlay(drawnPolygon);
//             // 隐藏保存和删除按钮
//             document.getElementById('saveButton').style.display = 'none';
//             document.getElementById('deleteButton').style.display = 'none';
//         });
//     });
