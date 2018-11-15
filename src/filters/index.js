export default {
  tag: (value) => {
    if (!value) return []
    return value.split('#')
  },
  bankNo: (value) => {
    let bankNo = value ? '' + value.replace(/\s*/g, '') : ''
    if (!bankNo && bankNo.length <= 3) return ''
    return bankNo.slice(-4)
  },
  dayOrYear: (value) => {
    return value === 1 ? '年' : '天'
  },
  currency: (value, n) => {
    n = n >= 0 && n <= 20 ? n : 2
    value = parseFloat((value + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
    let l = value.split('.')[0].split('').reverse()
    let r = value.split('.')[1]
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
  },
  formatNumber: (number, precision) => {
    let usePrecision = Math.round(Math.abs(precision))
    usePrecision = isNaN(usePrecision) ? 0 : usePrecision

    let negative = number < 0 ? '-' : ''
    let base = (usePrecision || precision === 0) ? parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) + '' : parseInt(Math.abs(number || 0), 10) + ''
    let mod = base.length > 3 ? base.length % 3 : 0

    // Format the number:
    return (usePrecision || precision === 0) ? (negative + (mod ? base.substr(0, mod) + ',' : '') + base.substr(mod).replace(/(\d{3})(?=\d)/g, '$1' + ',') + (usePrecision ? ('.' + toFixed(Math.abs(number), usePrecision).split('.')[1]) : ''))
      : (negative + (mod ? base.substr(0, mod) + ',' : '') + base.substr(mod).replace(/(\d{3})(?=\d)/g, '$1' + ',') + ((Math.abs(number) + '').split('.')[1] ? '.' + (Math.abs(number) + '').split('.')[1] : ''))
  },
  formatPhone: phone => {
    if (phone && phone.length === 11) {
      return phone.substring(0, 3) + '****' + phone.substring(7)
    }
  }
}

const toFixed = (value, precision) => {
  let exponentialForm = Number(value + 'e' + precision)
  let rounded = Math.round(exponentialForm)
  return Number(rounded + 'e-' + precision).toFixed(precision)
}
