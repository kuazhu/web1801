/*
* @Author: TomChen
* @Date:   2018-06-03 11:37:17
* @Last Modified by:   TomChen
* @Last Modified time: 2018-06-03 11:57:32
*/
//kQuery的基本结构是一个闭包
//
(function(window, undefined){
var 
	//kQuery的构造函数
	kQuery = function(){
		return new kQuery.fn.init();
	};
//kQuery的原型对象
kQuery.fn = kQuery.prototype = {
	constructor:kQuery,
	init:function(){

	}
}

kQuery.fn.init.prototype = kQuery.fn;


window.kQuery = window.$ = kQuery;

})(window);




