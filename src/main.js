import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 方式一   全局引用
// import VueVideoPlayer from 'vue-video-player'
// import 'video.js/dist/video-js.css'
// // import 'vue-video-player/src/custom-theme.css'
// Vue.use(VueVideoPlayer, /* {
//   options: global default options,
//   events: global videojs events
// } */)

Vue.config.productionTip = false

let aa = require('./test')

new Vue({
  router,
  store,
  created() {
    console.log(aa.sum(1 , 2, (dd) => {
      console.log(dd)
    }))
  },
  render: h => h(App)
}).$mount('#app')


