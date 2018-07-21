/*
* @Author: TomChen
* @Date:   2018-07-21 10:49:01
* @Last Modified by:   TomChen
* @Last Modified time: 2018-07-21 11:02:06
*/
//定义

// console.log(module);
/*
console.log(module.exports)
console.log(exports);
console.log(module.exports === exports);
*/

let str1 = 'Hello';

let obj1 = {name:"Tom",age:18};

let fn = ()=>{
	console.log('fn....');
}

/*
module.exports.obj1 = obj1;
module.exports.fn = fn;
console.log('module.exports::',module.exports)
*/
exports.obj1 = obj1;
exports.fn = fn;

