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

    <Child @loadedCompleted="loadedCompleted"></Child>
    <h3>===================================</h3>
    <!-- <el-select-tree  width="120px"  placeholder="请选择内容" :data="treeData"
      :disabled-values="disabledValues" v-model="value"></el-select-tree> -->
    <button @click="getData">结构data里面数据</button>
    <QRCode/>
  </div>
</template>

<script>
// @ is an alias to /src
import { formatDate, debounce} from '@/utils/index';
import { permissionTreeList } from '@/utils/other';
// import HelloWorld from '@/components/HelloWorld.vue'
const cityOptions = ['上海', '北京', '广州', '深圳'];
import GMap from "../components/GMap";
import VideoPlayer from "@/components/VideoPlayer";
import Child from './Child';
import ElSelectTree from 'el-select-tree';
import QRCode from './QRCode';

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    GMap,
    VideoPlayer,
    Child,
    ElSelectTree
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
      ],
      value: 2,
      treeData: [
        {
          value: 1,
          label: 'text1',
          children: [{ value: 5, label: 'text5' }, { value: 6, label: 'text6' }]
        },
        { value: 2, label: 'text2' },
        { value: 3, label: 'text3' },
        { value: 4, label: 'text5' }
      ],
      disabledValues: [3]
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
      
    },
    // 使用防抖函数
    loadedCompleted: debounce(function() {
      setTimeout(() => {
        console.log('-----setTimeout-----');
      },0)
    }),

    getData() {
      const arr = [1, 3, 8, 9];
      const temp = [...arr]
      const { checkedCities, treeData, value } = this;
      console.log(...checkedCities)
      console.log(...treeData)
      console.log(value)
      console.log(temp)
     }
  }
}
</script>
