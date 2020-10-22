<template>
  <div class="container">
  <video-player  class="video-player vjs-custom-skin"
                 ref="videoPlayer"
                 :options="playerOptions"
                 :playsinline="true"

                 @play="onPlayerPlay($event)"
                 @pause="onPlayerPause($event)"
                 @ended="onPlayerEnded($event)">
  </video-player>
  </div>
</template>

<script>
// 方式二   组件内引用
import { videoPlayer } from 'vue-video-player';
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
import '@/assets/video.css';
  export default {
    name: "VideoPlayer",
    components: { videoPlayer },
    data() {
      return {
        playerOptions: {
          live: true,
          playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选择的播放速度
          autoplay : false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop : false, // 视频一结束就重新开始。
          preload : 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN', // 'zh-CN' 'en'
          aspectRatio : '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid : true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [
            {
              type: "video/mp4",
              src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
            }
            // {
            //   type: "video/mp4",
            //   src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
            // }
          ],
          poster: "https://file.digitaling.com/eImg/uimages/20150907/1441607120885946.gif", //你的封面地址
          // width: document.documentElement.clientWidth,
          notSupportedMessage : '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          // controlBar: {
          //   timeDivider : true,//当前时间和持续时间的分隔符
          //   durationDisplay : true,//显示持续时间
          //   remainingTimeDisplay : false,//是否显示剩余时间功能
          //   fullscreenToggle : true,  //全屏按钮
          //   currentTimeDisplay: true, // 当前时间
          //   volumeControl: true, // 声音控制键
          //   playToggle: true, // 暂停和播放键
          //   progressControl: true, // 进度条
          // }
        }
      }
    },
    mounted() {
      console.log('this is current player instance object', this.player)
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      // ...player event
      onPlayerEnded(player) {
        // console.log('player ended!', player)
      },
      // onPlayerWaiting(player) {},
      // onPlayerPlaying(player) {},
      // onPlayerLoadeddata(player) {},
      // onPlayerTimeupdate(player) {},
      // onPlayerCanplay(player) {},
      // onPlayerCanplaythrough(player) {},
      // // or listen state event
      // playerStateChanged(playerCurrentState) {
      //   // console.log('player current update state', playerCurrentState)
      // },

      // // player is ready
      // playerReadied(player) {
      //   console.log('the player is readied', player)
      //   // you can use it to do something...
      //   // player.[methods]
      // }
    }
  }
</script>

<style scoped>
  .container {
    width: 500px;
    height: 500px;
    margin: 0 auto;
  }

  /* 播放按钮换成圆形 */
  /* .video-js .vjs-big-play-button{
    
    height: 2em;
    width: 2em;
    line-height: 2em;
    border-radius: 1em;
  } */
</style>
