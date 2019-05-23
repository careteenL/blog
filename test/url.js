var qs = require('qs')

var a = 'url=https://wximg.qq.com/wxp/moment-preview/mp/html/index-v2.html?token=YAvXZYvbFdVgGrf1MXRIz73a2jVoaSTD/tQCgWSo/O5At3480DUgzgpmCXF1LNNJ91+1yQ2Uuhw='

var b = 'url=https://wximg.qq.com/wxp/moment-preview/mp/html/index-v2.html?token=YAvXZYvbFdVgGrf1MXRIz73a2jVoaSTD%2FtQCgWSo%2FO5At3480DUgzgpmCXF1LNNJ91%2B1yQ2Uuhw%3D&nickname=%E6%90%9C%E7%8B%90%E7%84%A6%E7%82%B9%E7%BA%BF%E4%B8%8A%E5%94%AE%E6%A5%BC%E5%A4%84&headimg=http%3A%2F%2Fwx.qlogo.cn%2Fmmhead%2FQ3auHgzwzM6zSFyIxf9RTiaTWOC6prOldqlqOR5TicexywQkCRKib6l3Q%2F0&sign=504677977'

var r = qs.parse(b)

console.log(r)

var bcopy = 'https://wximg.qq.com/wxp/moment-preview/mp/html/index-v2.html?token=YAvXZYvbFdVgGrf1MXRIz73a2jVoaSTD%2FtQCgWSo%2FO5At3480DUgzgpmCXF1LNNJ91%2B1yQ2Uuhw%3D&nickname=%E6%90%9C%E7%8B%90%E7%84%A6%E7%82%B9%E7%BA%BF%E4%B8%8A%E5%94%AE%E6%A5%BC%E5%A4%84&headimg=http%3A%2F%2Fwx.qlogo.cn%2Fmmhead%2FQ3auHgzwzM6zSFyIxf9RTiaTWOC6prOldqlqOR5TicexywQkCRKib6l3Q%2F0&sign=504677977'

var reg = new RegExp("(^|&)" + "url" + "=([^&]*)(&|$)", "i");

// var regnew = /(^|&)url=([^&]*)(&|$)/i

var bb = `url=${encodeURIComponent(bcopy)}`
// console.log(bb)

// decodeURIComponent(window.location.search.substr(1).match(reg)[2])
var result = decodeURIComponent(bb.match(reg)[2])
console.log(result)
