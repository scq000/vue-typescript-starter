/**
 * 公用函数库
 */

/*eslint-disable*/
import Vue from 'vue';
// import { currency } from './currency';

const doc = document;
const win = window;
const eventBus = new Vue();

// 导出数据到excel 可通用.
const exportToExcel = (url, params) => {
  // data 包含 导出的url, 以及 params 参数
  const tmpForm = doc.createElement('form');
  // tmpForm.enctype = 'application/json';
  tmpForm.action = url;
  tmpForm.target = '_blank';
  tmpForm.method = 'post';
  tmpForm.style.display = 'none';
  Object.keys(params).forEach((key) => {
    const opt = doc.createElement('input');
    opt.name = key;
    opt.value = params[key];
    tmpForm.appendChild(opt);
  });
  doc.body.appendChild(tmpForm);
  tmpForm.submit();
};

const storeKey = 'jdy_yundinghuo_';

// 获取本地缓存数据
function getStore(key, bSession) {
  key = storeKey + key;
  const storage = (bSession ? win.sessionStorage : win.localStorage);
  if (storage) {
    let keyv = storage.getItem(key);
    keyv = (keyv == null ? '' : keyv);
    try {
      return JSON.parse(keyv);
    } catch (e) {
      return keyv;
    }
  }
  return '';
}

// 设置本地缓存数据
function setStore(key, keyv, bSession) {
  const resultKey = storeKey + key;
  const storage = (bSession ? win.sessionStorage : win.localStorage);
  if (storage) {
    if (typeof keyv === 'object') {
      keyv = JSON.stringify(keyv);
    }
    storage.setItem(resultKey, keyv);
  }
}

// 数值位不足补0
function formatNum(num, len) {
  let anum = `${num}`;
  for (let i = 0, alen = len - anum.length; i < alen; i++) {
    anum = `0${anum}`;
  }
  return anum;
}

// 编码自动加一
function newCode(code) {
  const check = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const str = code.split('').reverse().join('');
  let num = '';
  for (let i = 0, len = str.length; i < len; i++) {
    const anum = str.charAt(i);
    if (check.indexOf(anum) >= 0) {
      // 提取结尾数字部分
      num += anum;
      if (i > 15) {
        break;
      }
    } else {
      break;
    }
  }
  if (num !== '') {
    const numstr = num.split('').reverse().join('');
    const headStr = code.substring(0, code.length - numstr.length);
    const newNum = Number(numstr) + 1;
    return headStr + formatNum(newNum, numstr.length);
  }
  return '';
}


// // 获取日期区间 今日 本周 本月
// function getDateStr() {
//
// }
//
// day 是在当前日期上进行加减
function getDay(iday, dateStr) {
  let date = new Date();
  if (dateStr) {
    date = new Date(dateStr);
  }
  date.setDate(date.getDate() + iday);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${date.getFullYear()}-${month < 10 ? '0' : ''
     }${month}-${day < 10 ? '0' : ''}${day}`;
}

function format(date, fmt) {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  for (const k in o) { if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length))); }
  return fmt;
}

// js小数乘法计算
function calcMul(arg1, arg2) {
  let m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {
  }
  try {
    m += s2.split('.')[1].length;
  } catch (e) {
  }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
}

// js小数加法计算
function calcAdd(num1, num2) {
  let sq1,
    sq2,
    m;
  try {
    sq1 = num1.toString().split('.')[1].length;
  } catch (e) {
    sq1 = 0;
  }
  try {
    sq2 = num2.toString().split('.')[1].length;
  } catch (e) {
    sq2 = 0;
  }
  m = Math.pow(10, Math.max(sq1, sq2));
  return (calcMul(num1, m) + calcMul(num2, m)) / m;
}

// 比较两个对象是否一样 return true 表示一样， false 表示不一样
function compareData(srcObj, curObj) {
  if (typeof srcObj !== 'object') {
    return srcObj === curObj;
  }
  const keys1 = Object.keys(srcObj);
  const keys2 = Object.keys(curObj);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key in srcObj) {
    const item = srcObj[key];
    let check = true;
    if (typeof item === 'object') {
      check = compareData(item, curObj[key]);
    } else {
      check = item === curObj[key];
    }
    if (!check) {
/*      console.log(key);
      console.log(item);
      console.log(curObj[key]); */
      return false;
    }
  }
  return true;
}

// 根据模块id区隔 来存储页面内的各种数据
// function memoryData(memoryid, key, keyv) {
//   const memoryKey = 'memoryKey';
//   let memoryStoreid = memoryid;
//   if (typeof memoryid === 'object') {
//     memoryStoreid = memoryid.$route.path;
//   }
//   const memoryObj = getStore(memoryKey) || {};
//   const storeObj = memoryObj[memoryStoreid] || {};
//   if (memoryObj[memoryStoreid] === undefined) {
//     memoryObj[memoryStoreid] = storeObj;
//   }
//   if (keyv !== undefined) {
//     storeObj[key] = keyv;
//     setStore(memoryKey, memoryObj);
//   } else {
//     return storeObj[key];
//   }
// }

//
// // 计算电子卡自定义规则的公式
// function calElectronic(val) {
//   const length = 3;
//   const previewData = [];
//   const flow = '0'.repeat(val.ecardSerialNumSize);
//   for (let i = 0; i < length; i++) {
//     const today = new Date();
//     const numStr = (i * val.ecardNumInterval).toString();
//     const yearStr = val.ecardYearSel === '1' ? today.getFullYear() : '';
//     const monthStr = val.ecardMonthSel === '1' ? format(today, 'MM') : '';
//     const dayStr = val.ecardDaySel === '1' ? format(today, 'dd') : '';
//     const dta = val.ecardPrefix + yearStr + monthStr + dayStr + (new Array(val.ecardSerialNumSize - numStr.length + 1).join('0') + numStr) + val.ecardPostfix;
//     previewData.push(dta);
//   }
//   return previewData;
// }
//

//
// // 获取 饿了么 日期组件的日期
// function getElPickDate(datestr) {
//   if (!datestr || datestr.length < 11) {
//     // 正常日期
//     return datestr || '';
//   }
//   let adate = JSON.stringify(datestr);
//   adate = adate.substring(1, 11);
//   return getDay(1, adate);
// }
//
// // 饿了么 日期组件的快捷方式
// function getPickDateOption() {
//   const today = getDay(0);
//   const now = new Date();
//   return [{
//     text: '最近一周',
//     onClick(picker) {
//       const start = getDay(-7);
//       picker.$emit('pick', [start, today]);
//     },
//   }, {
//     text: '最近一个月',
//     onClick(picker) {
//       const start = getDay(-30);
//       picker.$emit('pick', [start, today]);
//     },
//   }, {
//     text: '最近三个月',
//     onClick(picker) {
//       const start = getDay(-90);
//       picker.$emit('pick', [start, today]);
//     },
//   }, {
//     text: '今天',
//     onClick(picker) {
//       picker.$emit('pick', [today, today]);
//     },
//   }, {
//     text: '本周',
//     onClick(picker) {
//       const iday = now.getDay(); // 今天本周的第几天  周日:0 周一:1
//       const inum = iday === 0 ? 6 : iday - 1;
//       const start = getDay(-inum);
//       const end = getDay(6, start);
//       picker.$emit('pick', [start, end]);
//     },
//   }, {
//     text: '本月',
//     onClick(picker) {
//       const imonth = now.getMonth();
//       const iyear = now.getFullYear();
//       const start = new Date(iyear, imonth, 1);
//       const end = new Date(new Date(iyear, imonth + 1, 1) - 86400000);
//       picker.$emit('pick', [start, end]);
//     },
//   }];
// }
//
// function isIEBrower() {
//   const userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
//   const isOpera = userAgent.indexOf('Opera') > -1; // 判断是否Opera浏览器
//   const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera; // 判断是否IE浏览器
//   const isEdge = userAgent.indexOf('Trident/7.0;') > -1 && !isIE; // 判断是否IE的Edge浏览器
//   const result = isIE || isEdge;
//   return result;
// }
//
// // 设置dom节点可拖动:  handle 操作移动的dom, dom 是要移动的视图，需绝对布局
// function setMoveable(handle, dom) {
//   let domxs = 0;
//   let domx = 0;
//   let domys = 0;
//   let domy = 0;
//   let start = false;
//   const isIE = isIEBrower();
//   const mousedown = (ev) => {
//     if (ev.target === handle) {
//       if (isIE) {
//         domxs = ev.offsetX;
//         domys = ev.offsetY;
//       } else {
//         domx = ev.pageX - ev.offsetX;
//         domy = ev.pageY - ev.offsetY;
//       }
//       start = true;
//       doc.addEventListener('mouseup', mouseup);
//       doc.addEventListener('mousemove', mousemove);
//     } else {
//       start = false;
//     }
//   };
//   let mouseup = (ev) => {
//     start = false;
//     doc.removeEventListener('mousemove', mousemove);
//     doc.removeEventListener('mousedown', mousedown);
//     doc.removeEventListener('mouseup', mouseup);
//   };
//   let mousemove = (ev) => {
//     const leftbtnOnClick = ev.buttons === void 0 ? true : (ev.buttons === 1);
//     if (start && leftbtnOnClick) {
//       if (isIE) {
//         domx = ev.pageX - domxs;
//         domy = ev.pageY - domys;
//       } else {
//         domx += ev.movementX;
//         domy += ev.movementY;
//         if (domy < 0) {
//           domy = 0;
//         }
//       }
//       dom.style.cssText = `left:${domx}px;top:${domy}px;margin-top:0;margin-left:0`;
//     }
//   };
//   dom.addEventListener('mousedown', mousedown);
// }
//
// /*
// * 记住table的列宽 以数组的形式保存起来.
// * tableid 表格的标识id
// * columnObj 列对象
// * */
// function keepTableColumnWidth(tableid, columnObj) {
//   const columns = getStore(tableid) || [];
//   if (columnObj) {
//     const key = columnObj.property;
//     if (key) {
//       const width = columnObj.width;
//       let bexist = false;
//       for (const item of columns) {
//         if (item.key === key) {
//           item.width = width;
//           bexist = true;
//         }
//       }
//       if (!bexist) {
//         columns.push({
//           key,
//           width,
//         });
//       }
//       setStore(tableid, columns);
//     }
//   } else {
//     if (columnObj === '') {
//       setStore(tableid, '');
//       return [];
//     }
//     return columns;
//   }
// }
//


//
// // 表格数据 合计列计算  param： table组件原本参数 ， fields 需要合计的字段信息{ name:字段名, type:字段类型 0 数字 1金额}
// function getTableSum(param, fields) {
//   fields = fields || [];
//   const { columns, data } = param;
//   const sums = [];
//   columns.forEach((column, index) => {
//     const field = fields.find(item => item.name === column.property);
//     if (field && data.length > 0) {
//       const values = data.map(item => item[field.name]);
//       let sum = 0;
//       for (let item of values) {
//         item += '';
//         item = item.replace(/,/g, '');
//         const value = Number(item);
//         const tmp = !isNaN(value) ? value : 0;
//         sum = calcAdd(sum, tmp);
//       }
//       if (field.type === 1 && sum) {
//         sum = currency(sum, '', 2);
//       } else {
//         sum = currency(sum, '', 0);
//       }
//       sums[index] = sum === '0' ? '' : sum;
//     } else {
//       sums[index] = '';
//     }
//   });
//
//   sums[0] = '合计';
//   return sums;
// }

export { eventBus, exportToExcel, getStore, setStore, formatNum, newCode, calcAdd, calcMul, getDay, compareData };
