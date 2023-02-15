const numberList = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '壹', '贰', '叁', '肆', '伍', '陸', '柒', '捌', '玖', '拾']
function leftZero(str) {
  if (str != null && str != '' && str != 'undefined') {
    if (str.length == 2) {
      return `00${str}`
    }
  }
  return str;
}
// 中文转unicode
function unicode(str) {
  let value = '';
  for (let i = 0; i < str.length; i++) {
    // eslint-disable-next-line radix
    value += `\\u${leftZero(parseInt(str.charCodeAt(i)).toString(16))}`
  }
  return value
}

// unicode转中文
function reconvert(str) {
  str = str.replace(/(\\u)(\w{1,4})/gi, function ($0) {
    return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g, '$2')), 16)))
  })
  str = str.replace(/(&#x)(\w{1,4});/gi, function ($0) {
    return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, '$2'), 16))
  })
  str = str.replace(/(&#)(\d{1,6});/gi, function ($0) {
    // eslint-disable-next-line radix
    return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, '$2')))
  })
  return str
}


let unicodeStr = ''
let unicodeArray = []
for (const item of numberList.values()) {
  const unicodeValue = unicode(item)
  unicodeArray.push(unicodeValue)
  unicodeStr = unicodeStr + unicodeValue + '|'
}
console.log(unicodeStr)

let chineseStr = ''
for (const item of unicodeArray.values()) {
  let chineseValue = reconvert(item)
  chineseStr = chineseStr + chineseValue + '|'
}
console.log(chineseStr)
