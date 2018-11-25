/**
 * @desc 完整promise
 */ 
let Promise = require('./3.6.promise.js')

// catch
let p = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve('xxx')
  }, 1000)
})
p.then((data) => {
  console.log(`p success then ${data}`)
}).then((data) => {
  throw new Error('just happy')
}).catch(err => {
  console.log(`p ${err}`)
})

// static resolve reject
let p2 = Promise.resolve(100)
p2.then(data => {
  console.log(`p2 ${data}`)
})
let p3 = Promise.reject(999)
p3.then(data => {
  console.log(`p3 ${data}`)
}).catch(err => {
  console.log(`p3 err ${err}`)
})

// finally
let p4 = Promise.resolve(100)
p4.then(data => {
  throw new Error('error p4')
}).finally(data => {
  console.log(`p4 ahhh`)
}).catch(err => {
  console.log(`p4 err ${err}`)
})

// all & race
const fs = require('fs')
const path = require('path')
const resolvePath = (file) => {
  return path.resolve(__dirname, '../callback/static/', file)
}
const read = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(resolvePath(file), 'utf8', (err, data) => {
      if(err) reject(err)
      resolve(data)
    })    
  })
}
// all
Promise.all([
  read('name.txt'),
  read('age.txt')
]).then(data => {
  console.log(`all ${data}`)
}).catch(err => {
  console.log(`all err ${err}`)
})
// race
Promise.race([
  read('name.txt'),
  read('age.txt')  
]).then(data => {
  console.log(`race ${data}`)
}).catch(err => {
  console.log(`race err ${err}`)
})
