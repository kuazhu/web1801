/*
* @Author: TomChen
* @Date:   2018-06-03 11:37:17
* @Last Modified by:   TomChen
* @Last Modified time: 2018-06-04 19:19:12
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
		else if(kQuery.isFunction(selector)){
			document.addEventListener('DOMContentLoaded',function(){
				selector();
			});
			this[0] = document;
			this.length = 1;
			return this;
		//处理字符串	
		}else if(kQuery.isString(selector)){
			//HTML代码处理
			if(kQuery.isHTML(selector)){
				var tmpDom = document.createElement('div');
				tmpDom.innerHTML = selector;
				// console.log(tmpDom.children);
				for(var i = 0;i<tmpDom.children.length;i++){
					this[i] =  tmpDom.children[i];
				}
				this.length = tmpDom.children.length;
				return this;
			//选择器处理	
			}else{
				var doms = document.querySelectorAll(selector);
				// console.log(doms);
				for(var i = 0;i<doms.length;i++){
					this[i] = doms[i];
				}
				this.length = doms.length;
				return this;
			}	
		}
	}
}

kQuery.isFunction = function(str){
	return typeof str === 'function';
}

kQuery.isString = function(str){
	return typeof str === 'string';
}
kQuery.isHTML = function(str){
	return str.charAt(0) == '<' && str.charAt(str.length-1) == '>' && str.length >= 3;
}
kQuery.fn.init.prototype = kQuery.fn;


window.kQuery = window.$ = kQuery;

})(window);




