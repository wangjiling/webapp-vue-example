const getHost = () => {
  // let host = document.domain.toLowerCase()
  // let apiHost = ''
  // if (host === 'www.test.com' || host === 'm.test.com') {
  //   apiHost = '//' + 'api.test.com'
  // } else {
  //   apiHost = getCurrentLocation()
  // }
  // return apiHost
  return '';
};

// 自定义判断元素类型JS
const toType = obj => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();


// 参数过滤函数
const filterNull = (o) => {
  for (let key in o) {
    if (o[key] == null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
      if (o[key].length === 0) {
        delete o[key]
      }
    }
  }
  return o
}

/*
* 处理金额，14.567 -> 14.56
*/
const formatAmount = (amount) => {
  return (parseInt(parseFloat(amount * 100).toPrecision(12)) / 100).toFixed(2)
}

const formatMoney = (s, n) => {
  n = n >= 0 && n <= 20 ? n : 2
  s = parseFloat((s + '').replace(/[^\d-]/g, '')).toFixed(n) + ''
  let l = s.split('.')[0].split('').reverse()
  let r = s.split('.')[1]
  let t = ''
  let result
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
  }
  result = t.split('').reverse().join('')
  if (r !== undefined) {
    result += ('.' + r)
  }
  return result
}

/*
 * 格式化手机号3-4-4，空格隔开
 * @param phoneNumber {string | number}用户输入的手机号
 * */
const formatPhoneSeparate = (phoneNumber) => {
  phoneNumber += ''
  return trimAllSpace(phoneNumber).replace(/\D/g, '').substr(0, 11).replace(/^([\s\S]{3})([\s\S]{0,4})([\s\S]{0,4})$/, '$1 $2 $3').trim()
}

/*
 * 格式化身份证号3-3-4-4-4，空格隔开
 * @param idNumber {string | number}用户输入的身份证号
 * */
const formatIdSeparate = (idNumber) => {
  idNumber += ''
  return trimAllSpace(idNumber).substr(0, 18).replace(/^([\s\S]{3})([\s\S]{0,3})([\s\S]{0,4})([\s\S]{0,4})([\s\S]{0,4})$/, '$1 $2 $3 $4 $5').trim()
}

/*
 * 格式化银行卡号4-4-4-4-4，空格隔开
 * @param bankIdNumber {string | number}用户输入的身份证号
 * */
const formatCardIdSeparate = (bankIdNumber) => {
  bankIdNumber += ''
  return trimAllSpace(bankIdNumber).replace(/\D/g, '').substr(0, 20).replace(/^([\s\S]{4})([\s\S]{0,4})([\s\S]{0,4})([\s\S]{0,4})([\s\S]{0,4})$/, '$1 $2 $3 $4 $5').trim()
}

/*
 * 去除字符串中所有空格
 * */
const trimAllSpace = (str) => {
  return str.replace(/\s*/g, '')
}

// 身份证号码验证
const testIdCard = (num) => {
  if (!num) {
    return false
  }
  num = num.toUpperCase()
  // 身份证号码18位，前17位为数字，最后一位是校验位，可能为数字或字符X。
  if (!((/^\d{17}([0-9]|X)$/).test(num))) {
    return false
  }
  return true
}

// 银行卡号长度验证
const testCardId = (num) => {
  if (!num) {
    return false
  }
  // 银行卡号为数字且≥16 位
  if (!((/^\d{16,}$/).test(num))) {
    return false
  }
  return true
}

// 手机号验证
const testPhoneNum = (num) => {
  if (!num) {
    return false
  }
  // 是否首位为 1 且为 11 位的数字
  if (!((/^1\d{10}$/).test(num))) {
    return false
  }
  return true
}

const getDomainName = (url) => {
  const arr = url.split('/')
  const result = arr[0] + '//' + arr[2]
  return result
}

const getCurrentLocation = () => {
  return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
}

const isWX = /micromessenger/i.test(window.navigator.userAgent)

export default {
  getHost,
  toType,
  filterNull,
  formatMoney,
  formatAmount,
  formatPhoneSeparate,
  formatIdSeparate,
  formatCardIdSeparate,
  trimAllSpace,
  testIdCard,
  testCardId,
  testPhoneNum,
  getDomainName,
  getCurrentLocation,
  isWX,
};
