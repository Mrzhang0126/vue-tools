import axios from 'axios';
import qs from 'qs';
import { BASE_URL, TIMEOUT } from './config';

import { Toast } from 'vant';
import store from '@/store/index';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
});

// 请求拦截器
instance.interceptors.request.use(config => {
  // 1.发送网络请求时, 在界面的中间位置显示Loading的组件

  // 2.某一些请求要求用户必须携带token, 如果没有携带, 那么直接跳转到登录页面
  const token = store.state.token;        
  token && (config.headers.Authorization = token);       
  // 3.params/data序列化的操作

  return config;
}, error => {
  return Promise.error(error);    
});


// 响应拦截器
instance.interceptors.response.use(response  => {

  return response.data;
}, error  => {
  if (error  && error.response) {
    switch (error.response.status) {
      case 400:
        console.log("请求错误");
        break;

      /**
       *  401: 未登录
       *  未登录则跳转登录页面，并携带当前页面的路径
       *  在登录成功后返回当前页面，这一步需要在登录页操作。
       */
      case 401:
        // router.replace({                        
        //   path: '/login',                        
        //   query: { 
        //     redirect: router.currentRoute.fullPath 
        //   }
        // });
        break;

        /**
         *  403 token过期
            登录过期对用户进行提示
            清除本地token和清空vuex中token对象
            跳转登录页面
         */
        case 403:
        //   Toast({
        //     message: '登录过期，请重新登录',
        //     duration: 1000,
        //     forbidClick: true
        // });

        // 清除token
        // localStorage.removeItem('token');
        // store.commit('loginSuccess', null);

        // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
        // setTimeout(() => {                        
        //     router.replace({                            
        //         path: '/login',                            
        //         query: { 
        //             redirect: router.currentRoute.fullPath 
        //         }                        
        //     });                    
        // }, 1000);                    
        break;

         /**
          * 404请求不存在
          */
        case 404:
          // Toast({
          //     message: '网络请求不存在',
          //     duration: 1500,
          //     forbidClick: true
          // });
          break; 
      default:
      //   Toast({
      //     message: error.response.data.message,
      //     duration: 1500,
      //     forbidClick: true
      // });
        break;
    }
    return Promise.reject(error.response);
  }
});

// export function get(url, params){    
//   return new Promise((resolve, reject) =>{        
//       axios.get(url, {            
//           params: params        
//       }).then(res => {
//           resolve(res.data);
//       }).catch(err =>{
//           reject(err.data)        
//   })    
// });}


/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
// export function post(url, params) {
//   return new Promise((resolve, reject) => {
//        axios.post(url, QS.stringify(params))
//       .then(res => {
//           resolve(res.data);
//       })
//       .catch(err =>{
//           reject(err.data)
//       })
//   });
// }

// export default instance;