/*
* @Author: TomChen
* @Date:   2018-06-03 11:37:17
* @Last Modified by:   TomChen
* @Last Modified time: 2018-06-04 18:43:50
*/
//kQuery的基本结构是一个闭包
(function(window, undefined){
var 
	//kQuery的构造函数
	kQuery = function(selector){
		return new kQuery.fn.init(selector);
	};
//kQuery的原型对象
kQuery.fn = kQuery.prototype = {
	constructor:kQuery,
	init:function(selector){
		//布尔值是假的情况返回空的jquery对象
		if(!selector){
			return this;
		}
		//如是函数的话返回有document的jquery对象,当页面所有的DOM节点加载完毕后执行传入的函数
		else if(typeof selector === 'function'){
			document.addEventListener('DOMContentLoaded',function(){
				selector();
			});
			this[0] = document;
			this.length = 1;
			return this;
		}
	}
}

kQuery.fn.init.prototype = kQuery.fn;


window.kQuery = window.$ = kQuery;

})(window);




