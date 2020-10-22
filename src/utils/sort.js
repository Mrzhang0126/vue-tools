
/*
  本文参考网址: https://zhuanlan.zhihu.com/p/114851128
*/


// 1.冒泡排序

function bubbleSort (arr) {
	for(let j = arr.length - 1; j >=0; j--) {
		for(let i = 0; i < j; i++) {
			if(arr[j] > arr[j+1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
			}
		}
	}
	return arr;
}

// 或者如下:
function bubbleSort (arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}



// 2.选择排序

function selectionSort (arr) {
  let min = 0
  for (let i = 0; i < arr.length - 1; i++) {
    min = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j
      }
    }
    if (i !== min) {
      ;[arr[i], arr[min]] = [arr[min], arr[i]]
    }
  }
  return arr
}


// 3.插入排序

function insertionSort (arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i
    let temp = arr[i]
    //插入操作
    while (j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1]
      j--
    }
    arr[j] = temp
  }
  return arr
}


// 4.希尔排序

//复杂度为被证明，猜测 为 O (N ^1.3)
function shellSort(arr) {
  //获取增量
  let gap = Math.floor(arr.length / 2)
  //增量等于1 即为 插入排序 原始。 一定会将数组排好 这个时候结束循环
  while (gap >= 1) {
    //进行插入排序
    for (let i = gap; i < arr.length; i++) {
      let j = i
      let temp = arr[i]
      while (j > gap - 1 && arr[j - gap] > temp) {
        arr[j] = arr[j - gap]
        j -= gap
      }
      arr[j] = temp
    }
    //缩小增量
    gap = Math.floor(gap / 2)
  }
  return arr
}


// 5.快速排序
 // 5.1快速排序（阮一峰）
function quickSort(arr) {
  if (arr.length <= 1) { return arr; }
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
}


// 5.2快速排序优化（掌握）

function quickSort(arr) {
  quick(arr, 0, arr.length - 1)
  return arr
}
function quick(arr, left, right) {
  if (arr.length > 1) {
    let index = partition(arr, left, right)
    // 两半局部有序分开  递归排序 分而治之
    if (left < index - 1) {
      quick(arr, left, index - 1)
    }
    if (index < right) {
      quick(arr, index, right)
    }
  }
}
function partition(arr, left, right) {
  //将数组 以pivot 为标准 划分为 两半 局部有序的
  let pivot = arr[Math.floor((left + right) / 2)];
  let i = left;
  let j = right;
  while (i <= j) {
    while (arr[i] < pivot) {
      i++;
    }
    while (arr[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(arr, i, j);
      i++;
      j--;
    }
  }
  return i;
}
function swap(arr, i, j) {
  ;[arr[i], arr[j]] = [arr[j], arr[i]];
}


// 5.3快速排序优化（了解）
function quickSort(array) {
  function swap(array, i, j) {
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }

  function partition(array, left, right) {
      var index = left;
      var pivot = array[right]; // 取最后一个数字当做基准值，这样方便遍历
      for (var i = left; i < right; i++) {
          if (array[i] < pivot) {
              swap(array, index, i);
              index++;
          }
      }
      swap(array, right, index);
      return index;
  }

  function sort(array, left, right) {
      if (left > right) {
          return;
      }
      var storeIndex = partition(array, left, right);
      sort(array, left, storeIndex - 1);
      sort(array, storeIndex + 1, right);
  }

  sort(array, 0, array.length - 1);
  return array;
}


// 6.1归并排序

export function mergeSort(arr) {
  //分而治之
  //先分
  if (arr.length > 1) {
    //将数组 分成两半 递归进行 直到 数组长度 小于等于 1
    let middle = Math.floor(arr.length / 2)
    let left = mergeSort(arr.slice(0, middle))
    let right = mergeSort(arr.slice(middle, arr.length))
    //然后 合并排序
    arr = merge(left, right)
  }
  //将结果返回
  return arr
}

function merge(left, right) {
  //将左右两个数组 合并 排序
  //i 指向 左数组   j 指向右数组
  let i = 0
  let j = 0
  //将结果有序的push 进 result 中
  let result = []

  while (i < left.length && j < right.length) {
    //排序
    result.push(left[i] < right[j] ? left[i++] : right[j++])
  }

  //合并 =>将 左右 数组 剩余的部分 concat
  return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}


// 6.2归并排序(js算法书籍)

function mergeSortRec(array){ 
  let length = array.length; 
  if(length === 1) { 
     return array; 
  } 
  let mid = Math.floor(length / 2), 
  left = array.slice(0, mid), 
  right = array.slice(mid, length); 
  return merge(mergeSortRec(left), mergeSortRec(right)); 
}

function merge(left, right){ 
 let result = [], 
 il = 0, 
 ir = 0; 

 while(il < left.length && ir < right.length) { 
    if(left[il] < right[ir]) { 
       result.push(left[il++]); 
    } else{ 
      result.push(right[ir++]); 
    } 
  } 
  while (il < left.length){ 
    result.push(left[il++]); 
  } 
  while (ir < right.length){ 
    result.push(right[ir++]); 
  } 
  return result; 
}


// 7.计数排序

function countingSort(arr) {
  let count = [] //计数
  let result = [] //结果
  arr.forEach((el) => {
    //将每个数字 以索引 存入 count中
    if (!count[el]) {
      count[el] = 0
    }
    count[el]++
  })

  count.forEach((el, i) => {
    //将count 取出
    if (el && el > 0) {
      for (let j = 0; j < el; j++) {
        result.push(i)
      }
    }
  })
  return result
}



// 8.基数排序

function radixSort(arr) {
  if (arr.length < 2) {
    return arr
  }
  //找到最大值
  let max = -Infinity
  arr.forEach((el) => (el > max ? (max = el) : null))
  //求他的位数
  let digit = (max + '').length
  //循环计数排序
  let count = []
  for (let i = 0; i < digit; i++) {
    //按 个位排序, 十位排序 ,百位排序 ....
    arr.forEach((el) => {
      let str = el + ''
      let temp = +str[str.length - 1 - i]
      if (isNaN(temp)) {
        temp = 0
      }
      if (Array.isArray(count[temp])) {
        count[temp].push(el)
      } else {
        count[temp] = [el]
      }
    })
    arr = []
    count.forEach((el) => {
      if (Array.isArray(el)) {
        el.forEach((e) => {
          arr.push(e)
        })
      }
    })
    count = []
  }
  return arr
}



// 9.堆排序

function heapSort (arr) {
	// 初始化大顶堆，从第一个非叶子结点开始
	for(let i = Math.floor(arr.length / 2 - 1); i >=0; i--) {
		adjustHeap(arr, i, arr.length);
	}
	
	// 排序，每一次for循环找出一个当前最大值，数组长度减1
	for(let i = Math.floor(arr.length - 1); i > 0; i--) {
		swap(arr, 0, i);
		adjustHeap(arr, 0, i);
	}
	return arr;
}

function adjustHeap(arr, i, length) {
	let temp = arr[i];
	
	for(let j = 2 * i + 1; j < length; j = 2 * j + 1) {
		temp = arr[i];
		if(j + 1 < length && arr[j] < arr[j + 1]) {
			j++;
		}
		if(temp < arr[j]) {
			swap(arr, i, j);
			i = j;
		} else {
			break;
		}
	}
}

function swap(arr, i , j) {
	let temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}








/*
	深拷贝
*/

// 1、函数递归（掌握）

function deepClone(obj) {
	if(obj === null) return null;
	if(typeof obj !== 'object') return obj;
	if(obj instanceof RegExp) {
		return new RegExp(obj);
	}
	if(obj instanceof Date) {
		return new Date(obj);
	}
	
	let newObj = new obj.constructor;
	//let newObj = new Object();
	for(let key in obj) {
		if(obj.hasOwnProperty(key)) {
			newObj[key] = deepClone(obj[key]);
		}
	}
	return newObj;
}












