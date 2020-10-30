function getCurrentCity() { // 获取当前位置
        const self = this;
        AMap.plugin('AMap.Geolocation',  function () {
          const geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000
          });

          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', onComplete);
          AMap.event.addListener(geolocation, 'error', onError);

          function onComplete (data) {
            // data是具体的定位信息
            const city = data.addressComponent.city;
            // console.log(data);
            self.getCurrentWeather(city);
          }
          function onError (data) {
            console.log('定位失败错误：', data);
          }
        });
}


function getCurrentWeather(cityName) { // 根据城市获取天气
        this.$axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" + cityName)
          .then((res) => {
            const result = res.data.data;
            console.log(result);
            const weatherArr = result.forecast;
            this.weather = weatherArr[0].type;
          })
          .catch((error) => {
            console.log(error);
          });
 }
