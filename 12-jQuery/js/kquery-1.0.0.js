/*
* @Author: TomChen
* @Date:   2018-06-03 11:37:17
* @Last Modified by:   TomChen
* @Last Modified time: 2018-06-05 20:43:35
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
	//核心函数
	init:function(selector){
		selector = kQuery.trim(selector);
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
		//处理字符串	
		}else if(kQuery.isString(selector)){
			//HTML代码处理
			if(kQuery.isHTML(selector)){
				var tmpDom = document.createElement('div');
				tmpDom.innerHTML = selector;
				// console.log(tmpDom.children);
				/*
				for(var i = 0;i<tmpDom.children.length;i++){
					this[i] =  tmpDom.children[i];
				}
				this.length = tmpDom.children.length;
				*/
				[].push.apply(this,tmpDom.children);
			//选择器处理	
			}else{
				var doms = document.querySelectorAll(selector);
				// console.log(doms);
				/*
				for(var i = 0;i<doms.length;i++){
					this[i] = doms[i];
				}
				this.length = doms.length;
				*/
				[].push.apply(this,doms);
			}	
		}
		else if(kQuery.isArray(selector)){
			//由于apply转伪数组有兼容问题(IE8以下不兼容),所以把所有传入的数组转换成真数组
			var tmpArr = [].slice.call(selector);
			
			//把转换后的真数组转换成伪数组
			[].push.apply(this,tmpArr);
		}else{
			this[0] = selector;
			this.length = 1;
		}
		return this;
	},
	selector: "",
	length: 0,
	jquery:'1.0.0',
	//以下方法在调用时是kquery对象调用,所以方法内部的this指向调用的kquery对象
	push: [].push,
	sort: [].sort,
	splice: [].splice,
	toArray:function(){
		return [].slice.call(this);
	},
	get:function(num){
		if(arguments.length == 1){
			//正数
			if(num>=0){
				return this[num];
			//负数	
			}else{
				// -1 4 = 3
				// -2 4 = 2
				return this[this.length + num]
			}
		}else{
			return this.toArray();
		}
	},
	eq:function(num){
		if(arguments.length == 1){
			return kQuery(this.get(num));
		}else{
			return new kQuery();
		}
	},
	first:function(){
		return this.eq(0);
	},
	last:function(){
		return this.eq(-1);
	},
	each:function(fn){
		return kQuery.each(this,fn);
	},
	map:function(fn){
		return kQuery(kQuery.map(this,fn));
	}	
}

kQuery.extend = kQuery.fn.extend  = function(obj){
	for(key in obj){
		this[key] = obj[key];
	}
}

//kQuery的静态方法
kQuery.extend({
	isFunction:function(str){
		return typeof str === 'function';
	},
	isString:function(str){
		return typeof str === 'string';
	},
	isHTML:function(str){
		return str.charAt(0) == '<' && str.charAt(str.length-1) == '>' && str.length >= 3;
	},
	isArray:function(str){
		return kQuery.isObject(str) && length in str 
	},
	isObject:function(str){
		return typeof str === 'object';
	},
	trim:function(str){
		if(kQuery.isString(str)){
			//用正则去掉字符串的前后空格
			return str.replace(/^\s+|\s+$/g,'');
		}else{
			return str;
		}	
	},
	each:function(arr,fn){
		if(kQuery.isArray(arr)){
			for(var i = 0;i<arr.length;i++){
				// console.log(i,arr[i]);
				var res = fn.call(arr[i],i,arr[i]);
				if(res == false){
					break;
				}else if(res == true){
					continue;
				}
			}
		}else{
			for(key in arr){
				// console.log(key,arr[key]);
				var res = fn.call(arr[key],key,arr[key]);
				if(res == false){
					break;
				}else if(res == true){
					continue;
				}				
			}
		}
		return arr;
	},
	map:function(arr,fn){
		var retArr = [];
		if(kQuery.isArray(arr)){
			for(var i = 0;i<arr.length;i++){
				var res = fn(arr[i],i);
				if(res){
					retArr.push(res);
				}
			}
		}else{
			for(key in arr){
				var res = fn(arr[key],key);
				if(res){
					retArr.push(res);
				}
			}
		}
		return retArr;
	}
});



kQuery.fn.init.prototype = kQuery.fn;


window.kQuery = window.$ = kQuery;

})(window);




