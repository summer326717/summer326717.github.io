import { axiosPost } from '../assets/serviceApi'

export function checkNull (e) {
  if (e === '' || e === null || e === undefined || e.toString().trim().length === 0) {
    return false
  } else {
    return true
  }
}

export function getAgentList () {
  return new Promise((resolve, reject) => {
    let json = {
      allData: 'Y',
      agentId: null,
      mobile: null,
      name: null,
      pageNo: null,
      pageSize: null,
      sortType: null
    }
    axiosPost('/back/queryAgentInfoList', json).then((res) => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export function changeTime (t) {
  let time = new Date(t)
  return time.getFullYear() + '-' + checkT(time.getMonth() + 1) + '-' + checkT(time.getDate()) + ' ' + checkT(time.getHours()) + ':' + checkT(time.getMinutes()) + ':' + checkT(time.getSeconds())
}

export function checkT (e) {
  return e > 9 ? e : '0' + e
}
// 加
export function addNum (a, b) {
  var c, d, e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  return e = Math.pow(10, Math.max(c, d)), (mulNum(a, e) + mulNum(b, e)) / e
}
// 减
export function subNum (a, b) {
  var c, d, e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  return e = Math.pow(10, Math.max(c, d)), (mulNum(a, e) - mulNum(b, e)) / e
}
// 乘
export function mulNum (a, b) {
  var c = 0
  var d = a.toString()
  var e = b.toString()
  try {
    c += d.split('.')[1].length
  } catch (f) {}
  try {
    c += e.split('.')[1].length
  } catch (f) {}
  return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c)
}
// 除
export function divNum (a, b) {
  var c, d
  var e = 0
  var f = 0
  try {
    e = a.toString().split('.')[1].length
  } catch (g) {}
  try {
    f = b.toString().split('.')[1].length
  } catch (g) {}
  return c = Number(a.toString().replace('.', '')), d = Number(b.toString().replace('.', '')), mulNum(c / d, Math.pow(10, f - e))
}
