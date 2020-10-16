
// 数组去重
export function uniqueArray(arr) {
  return Array.from(new Set(arr));
}

// 防抖函数 (优化取消功能)
export function debounce(fn, delay) {
  let timer = null;
  return function() {
    if(timer) clearTimeout(timer);

    const _this = this;
    const _arguments = arguments;

    timer = setTimeout(function() {
      fn.apply(_this, _arguments);
    }, delay)
  }
}

// 节流函数
export function throttle(fn, interval) {
  let last = 0;
  return function() {
    const _this = this;
    const _arguments = arguments;

    let now = new Date().getTime();
    if(now - last > interval) {
      fn.apply(_this, _arguments);
      last = now;
    }
  }
}

// 深拷贝 
// export function deepClone(obj) {
//   if(obj === null) return null;
//   if(typeof obj !== 'object') return obj;
//   if(obj instanceof RegExp) {
//     return new RegExp(obj);
//   }
//   if(obj instanceof Date) {
//     return new Date(obj);
//   }

//   let newObj = new obj.constructor;
// 	//let newObj = new Object();
// 	for(let key in obj) {
// 		if(obj.hasOwnProperty(key)) {
// 			newObj[key] = deepClone(obj[key]);
// 		}
// 	}
// 	return newObj;
// }
 // 深拷贝 
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone');
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  })
  return targetObj;
}

// 时间戳格式化为日期字符串
export function formatDate(date, fmt) {
  fmt = fmt || 'yyyy-MM-dd hh-mm-ss';

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}

//
function formatTimeStamp(str) {}
