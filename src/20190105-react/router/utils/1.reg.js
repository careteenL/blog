let pathToRegexp = require('path-to-regexp');
/* let regexp = pathToRegexp('/user', [], { end: true });
console.log(regexp);
console.log(regexp.test('/user'));
console.log(regexp.test('/user/'));
console.log(regexp.test('/user/1')); */

/* let regexp = pathToRegexp('/user', [], { end: false });
console.log(regexp);
console.log(regexp.test('/user'));
console.log(regexp.test('/user/'));
console.log(regexp.test('/users'));
console.log(regexp.test('/user/add'));
console.log(('/user//////').match(regexp)); */

/**
(?=pattern)	    正向肯定查找(前瞻),后面必须跟着什么
(?!pattern)	    正向否定查找(前瞻)，后面不能跟着什么
(?<=pattern)	反向肯定条件查找(后顾),不捕获
(?<!pattern)	反向否定条件查找（后顾）
 */
/* console.log('1a'.match(/\d(?=[a-z])/));
console.log('1@'.match(/\d(?![a-z])/));
console.log('a1'.match(/(?<=[a-z])\d/));
console.log('$1'.match(/(?<![a-z])\d/)); */

let params = [];
//路径参数
let regexp = pathToRegexp('/user/:id/:age', params, { end: true });
let paramsNames = params.map(item => item.name);//[ 'id', 'age' ]
let matched = '/user/1/100'.match(regexp);
console.log('paramsNames', paramsNames);
console.log('matched', matched, matched.length);
console.log('input', Object.getOwnPropertyDescriptor(matched, 'input'));
let [url, ...values] = matched;
console.log('url', url);
console.log('values', values);
let params2 = values.reduce((memo, value, index) => {
    memo[paramsNames[index]] = value;
    return memo;
}, {});//{id:'myid',age:10}
console.log(params2);
//params = {id:100,age:100}
/*console.log('====================');
let str = '/member/?:path/?:tag'; */
/* let regexp2 = pathToRegexp(/xx/, params, { end: true });
console.log(params.map(item => item.name));
console.log(regexp2);
console.log(regexp2.test('xx'));
console.log('/member/xxx'.match(regexp2)); */


