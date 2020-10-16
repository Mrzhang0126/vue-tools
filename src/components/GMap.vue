/*
    参考网址：
      https://lbs.amap.com/api/javascript-api/example/event/event-state
      https://lbs.amap.com/api/javascript-api/reference/core
*/
<template>
  <div id="container" :style="{width: mapWidth + 'px',height: mapHeight + 'px', margin: '35px auto'}">
    <div id="iCenter"></div>
  </div>
</template>

<script>
  import AMap from 'AMap' //引入高德地图AMap
  export default {
    name: "GMap",
    props: {
      mapWidth: {
        type: Number,
        default: 300
      },
      mapHeight: {
        type: Number,
        default: 300
      }
    },
    data() {
      return {
        lnglat: {
          lng: '',
          lat: ''
        },
        markerList: []
      }
    },
    mounted() {
      this.initGMap();
    },
    methods: {
      initGMap() { // 初始化地图
        const _this = this;
        const map = new AMap.Map('container', { // 'container'是对应盒子的id
          // center: [116.397428, 39.90923],
          resizeEnable: true, // 自适应大小
          zoom: 13 // 初始视窗
        })

        // 用户定位
        const mapObj = new AMap.Map('iCenter');
        mapObj.plugin('AMap.Geolocation', function () {
          const geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
          });
          mapObj.addControl(geolocation);
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', function (data) {
            console.log(data);
            const lng = data.position.getLng(); // 定位成功返回的经度
            const lat = data.position.getLat(); // 定位成功返回的纬度
            console.log(lng,lat);
            const marker = new AMap.Marker({
              map: map,
              position: new AMap.LngLat(lng, lat),// 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            });
            // _this.markerList.push(marker);
          });
          AMap.event.addListener(geolocation, 'error', function (data) {
            if(data.info == 'FAILED') {
              alert('获取您当前位置失败!');
            }
          });
        })

        AMap.event.addListener(map,'click',function (e) { //添加点击事件,传入对象名，事件名，回调函数
          console.log(e);

          let zoom = Math.floor(Math.random() * 7) + 11;
          // let lng =  Math.floor(e.lnglat.lng * 589828) / 1e6;
          // let lat =  Math.floor(e.lnglat.lat * 514923) / 1e6;
          let lng =  e.lnglat.lng;
          let lat =  e.lnglat.lat;
          // map.setZoomAndCenter(zoom, [lng, lat]); //同时设置地图层级与中心点
          map.setCenter([lng, lat]); //设置地图中心点
          console.log(`当前层级已设为${zoom}级，中心点已设为 ${lng.toFixed(6)},${lat.toFixed(6)}`);
        });
        // 移动事件
        // map.on('moveend', function (e) {
        //   let center = map.getCenter(); //获取当前地图级别
        //   console.log('moveend', center)
        // });

        // 拖拽事件
        map.on('dragend', function (e) {
          let center = map.getCenter(); //获取当前地图级别
          console.log('dragend', center);
          // if (_this.markerList.length > 0) {
          //   _this.markerList.forEach(item=> {
          //     map.remove(item);
          //   })
          //   _this.markerList = [];
          // }
          // let marker = new AMap.Marker({
          //   position: new AMap.LngLat(center.lng, center.lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          // });
          // map.add(marker);
          // _this.markerList.push(marker);
        });

        // 组合了旋转、倾斜、复位、缩放在内的地图控件
        // map.plugin(["AMap.ControlBar"],function(){
        //   let controlBar = new AMap.ControlBar({
        //     position: {top: "5px", right: "5px"},
        //     showZoomBar: true,
        //     showControlButton: true
        //   })
        //   map.addControl(controlBar)
        // });

        // 比例尺插件。位于地图右下角，用户可控制其显示与隐藏。
        map.plugin(["AMap.Scale"],function(){
          let scale = new AMap.Scale();
          map.addControl(scale);
        });

        // 地图类型切换插件
        // map.plugin(["AMap.MapType"],function(){
        //   var type= new AMap.MapType({
        //     defaultType:0 //使用2D地图
        //   });
        //   map.addControl(type);
        // });

        //加载鹰眼
        // map.plugin(["AMap.OverView"],function(){
        //   let view = new AMap.OverView();
        //   map.addControl(view);
        // });

        // 地图操作工具条插件。可支持方向导航、位置定位、视野级别缩放、视野级别选择等操作。
        map.plugin(["AMap.ToolBar"],function(){
          let tool = new AMap.ToolBar();
          map.addControl(tool);
        });

      }
    }
  }
</script>

<style scoped>

</style>
