// console.log('script start')

// async function async1() {
//   await async2()
//   console.log('async1 end')
// }
// async function async2() {
//   console.log('async2 end')
// }
// async1()

// setTimeout(function() {
//   console.log('setTimeout')
// }, 0)

// new Promise(resolve => {
//   console.log('Promise')
//   resolve()
// })
//   .then(function() {
//     console.log('promise1')
//   })
//   .then(function() {
//     console.log('promise2')
//   })

// console.log('script end')


//  script start
//  async2 end
//  Promise
//  script end
//  async1 end
//  promise1
//  promise2
//  setTimeout

console.clear();

//加入两个nextTick()的回调函数
process.nextTick(function () {
  console.log('nextTick延迟执行1');
});
process.nextTick(function () {
  console.log('nextTick延迟执行2');
})
//加入两个setImmediate()的回调函数
setImmediate(function () {
 console.log('setImmediate延迟执行1');
 //进入下次循环
  process.nextTick(function () {
      console.log("强势插入！！");
  });
});
setImmediate(function () {
  console.log("setImmediate延迟执行2");
});
console.log("正常执行");


// 正常执行
// nextTick延迟执行1
// nextTick延迟执行2
// setImmediate延迟执行1
// 强势插入！！
// setImmediate延迟执行2