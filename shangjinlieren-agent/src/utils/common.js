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
