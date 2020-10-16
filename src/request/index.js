import axios from 'axios';
// import qs from 'qs';

export default function request(param) {
  return new Promise(((resolve, reject) => {
    const instance = axios.create({
      baseURL: '',
      timeout: 5000
    })

    // 添加请求拦截器
    instance.interceptors.request.use((config) => {
      return config;
    }, (error => {
      return Promise.reject(error);
    }))

    // 添加响应拦截器
    instance.interceptors.response.use((response) => {
      return response.data;
    }, (error => {
      return Promise.reject(error);
    }))

    // 发送网络请求
    instance(param).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err)
    })
  }))
}
