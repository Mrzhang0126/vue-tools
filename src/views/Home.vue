<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <el-checkbox-group
      v-model="checkedCities"
      :min="1"
      :max="4">
      <el-checkbox v-for="city in cities" :label="city" :key="city" style="display:block;">{{city}}</el-checkbox>
    </el-checkbox-group>
    <GMap :map-height="400" :map-width="800"></GMap>


    <el-button style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
      Export Excel
    </el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column  prop="date"  label="日期"  width="180"></el-table-column>
      <el-table-column  prop="name"  label="姓名"  width="180"></el-table-column>
      <el-table-column  prop="address" label="地址"></el-table-column>
    </el-table>

    <VideoPlayer></VideoPlayer>
  </div>
</template>

<script>
// @ is an alias to /src
import {formatDate} from '@/utils/index'
// import HelloWorld from '@/components/HelloWorld.vue'
const cityOptions = ['上海', '北京', '广州', '深圳'];
import GMap from "../components/GMap";
import VideoPlayer from "@/components/VideoPlayer"
export default {
  name: 'Home',
  components: {
    // HelloWorld,
    GMap,
    VideoPlayer
  },
  data() {
    return {
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      tableData: [
        { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'},
        { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄'},
        { date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄'},
        { date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄'},
        { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1520 弄'},
        { date: '2016-05-05', name: '王小虎', address: '上海市普陀区金沙江路 1521 弄'},
        { date: '2016-05-06', name: '王小虎', address: '上海市普陀区金沙江路 1522 弄'}
      ]
    };
  },
   mounted() {
    let time = new Date().getTime();
    console.log(time);

    let str = formatDate(new Date(time), 'yyyy-MM-dd hh:mm:ss');
    console.log(str);
    console.log(new Date(str));
  },
  methods: {
    handleDownload() {
      import('@/utils/Export2Excel').then((excel) => {
        const tHeader = [ '日期', '姓名', '地址']
        const filterVal = ['date', 'name', 'address']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          // filename: '',
          // autoWidth: true,
          // bookType: 'xlsx'
        })
      }).catch((err) => {
        console.log('导出有错误', err);
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') { // 用于处理时间（如无，可以忽略）
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
      
    }
  }
}
</script>
