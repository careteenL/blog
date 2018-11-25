/**
 * @desc 读取文件
 */ 
const fs = require('fs')

let schoolInfo = {}

fs.readFile('./static/name.txt', 'utf8', (err,data) => {
  schoolInfo['name'] = data
})
fs.readFile('./static/age.txt', 'utf8', (err, data) => {
  schoolInfo['age'] = data
})
console.log(schoolInfo)