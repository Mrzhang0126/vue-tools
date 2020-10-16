// 1. 数据类型判断
const _toString = Object.prototype.toString;
function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}

// 2. 利用闭包构造map缓存数据
function makeMap (str, expectsLowerCase) {
  // 构建闭包集合map
  let map = Object.create(null);
  let list = str.split(',');
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}
// 利用闭包，每次判断是否是内置标签只需调用isHTMLTag
// let isHTMLTag = makeMap('html,body,base,head,link,meta,style,title')
// console.log('res', isHTMLTag('body')) // true


// 3. 二维数组扁平化
// 3.1 先看lodash中的flatten
_.flatten([1, [2, [3, [4]], 5]])
// 得到结果为  [1, 2, [3, [4]], 5]

// 3.2 vue中
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 3.3 es6中 等价于
function simpleNormalizeChildren (children) {
   return [].concat(...children)
}

// 4. 方法拦截

// 重写push等方法，然后再把原型指回原方法
const ARRAY_METHOD = [ 'push', 'pop', 'shift', 'unshift', 'reverse',  'sort', 'splice' ];
const array_methods = Object.create(Array.prototype);
ARRAY_METHOD.forEach(method => {
  array_methods[method] = function () {
    // 拦截方法
    console.log('调用的是拦截的 ' + method + ' 方法，进行依赖收集');
    return Array.prototype[method].apply(this, arguments);
  }
});

// 6. 执行一次
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

// 7. 浅拷贝
function looseEqual (a, b) {
  if (a === b) { return true }
  let isObjectA = isObject(a);
  let isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      let isArrayA = Array.isArray(a);
      let isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        let keysA = Object.keys(a);
        let keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}