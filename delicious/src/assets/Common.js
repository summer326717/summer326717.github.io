//////去重
export function qxFun(array, element) {
  let newqcArr = [];
  array.map((v, i) => {
    let flag = false;
    newqcArr.map((vv, ii) => {
      if (v[element] === vv[element]) {
        flag = true;
      }
    })
    if (!flag) {
      newqcArr.push(v);
    }
  })
  return newqcArr;
}
//////数组去重的两种方法
const qcArr2 = [1, 1, 2, 2, 3, 4, 5];
const a = [...new Set(qcArr2)];
const b = Array.from(new Set(qcArr2));
//console.log(a);
//console.log(b);

/////浮点数bug
//////+
export function addFun(a, b) {
  var c, d, e;
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  return e = Math.pow(10, Math.max(c, d)), (mulFun(a, e) + mulFun(b, e)) / e;
}
//////-
export function subFun(a, b) {
  var c, d, e;
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  return e = Math.pow(10, Math.max(c, d)), (mulFun(a, e) - mulFun(b, e)) / e;
}
//////*
export function mulFun(a, b) {
  var c = 0,
    d = a.toString(),
    e = b.toString();
  try {
    c += d.split(".")[1].length;
  } catch (f) { }
  try {
    c += e.split(".")[1].length;
  } catch (f) { }
  return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
//////÷
export function divFun(a, b) {
  var c, d, e = 0,
    f = 0;
  try {
    e = a.toString().split(".")[1].length;
  } catch (g) { }
  try {
    f = b.toString().split(".")[1].length;
  } catch (g) { }
  return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mulFun(c / d, Math.pow(10, f - e));
}

//使用export定义函数时，引用时使用{}，使用export default定义函数时，直接引入改函数。

//////获取随机数
export function getUuid(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    var r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
}

/*
* 获取当月第一天
* @param [formatStr]
* reutrn Date/String
* */
Date.prototype.getFirstDateOfMonth = function (formatStr) {
  var year = this.getFullYear();
  var month = this.getMonth();
  if (formatStr) {
    return new Date(year, month, 1).format(formatStr);
  }
  return new Date(year, month, 1);
};
/*
 * 获取当月最后一天
 * @param [formatStr]
 * reutrn Date/String
 * */
Date.prototype.getLastDateOfMonth = function (formatStr) {
  var year = this.getFullYear();
  var month = this.getMonth() + 1;
  if (formatStr) {
    return new Date(year, month, 0).format(formatStr);
  }
  return new Date(year, month, 0);
};

/*引入百度api */
export function MP(ak) {
  return new Promise(function (resolve, reject) {
    window.init = function () {
      resolve(BMap)
    }
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=" + ak + "&callback=init";
    script.onerror = reject;
    document.head.appendChild(script);
  })
}