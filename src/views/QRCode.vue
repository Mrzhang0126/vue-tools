// 二维码组件
<template>
  <div>
    <!--插件1 qrcode -->
    <div class="main">
      <canvas id="QRCode"></canvas>
 	 	  <button @click="getQRCode()">点击生成二维码</button>
    </div>

    <!--插件2 qrcodejs2 -->
    <div class="qrcode" ref="qrCodeUrl"></div>

    <!--插件3 vue-qr -->
    <vue-qr :logoSrc="imageUrl" text="xxx" :size="200"></vue-qr>
  </div>
</template>

<script>
import QRCode from 'qrcode';
// import QRCode from 'qrcodejs2';
import vueQr from 'vue-qr';

export default {
  data() {
    return {
      QRCodeMsg: "", //生成二维码信息
      imageUrl: require("../assets/logo.png"),
    }
  },
  components: {
    vueQr
  },
  // 通过监听获取数据
  watch: {
    QRCodeMsg(val) {
      // 获取页面的canvas
      var msg = document.getElementById("QRCode");
      // 将获取到的数据（val）画到msg（canvas）上
      QRCode.toCanvas(msg, val, function(error) {
        console.log(error);
      });
    }
  },
  mounted() {
    this.creatQrCode();
  },
  methods:{
    getQRCode() {
    //生成的二维码为URL地址
      // this.QRCodeMsg = window.location.href;
      console.log(window.location.href);
      this.QRCodeMsg = 'https://www.baidu.com/';
    },
    creatQrCode() {
      let qrcode = new QRCode(this.$refs.qrCodeUrl, {
          text: 'https://developer.mozilla.org/zh-CN/', // 需要转换为二维码的内容
          width: 100,
          height: 100,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
      })
      
    },
  }
}
</script>

<style scoped>
  .main{
    width:9px;
    height:9px;
  }
 /* 限制画布大小 */
  #QRCode{
    width:10px;
    height:10px;
  }


  .qrcode{
    display: inline-block;
  }
  .qrcode img {
    width: 132px;
    height: 132px;
    /* 设置白色背景色 */
    background-color: #fff; 
    /* 利用padding的特性，挤出白边 */
    padding: 6px;
    box-sizing: border-box;
  }

</style>