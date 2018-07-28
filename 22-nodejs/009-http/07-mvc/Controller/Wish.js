/*
* @Author: TomChen
* @Date:   2018-07-28 10:11:52
* @Last Modified by:   TomChen
* @Last Modified time: 2018-07-28 11:26:59
*/
const wish = require('../Model/Wish.js');
const swig = require('swig');

class Wish{

	//显示许愿墙页面
	index(req,res,...args){
		wish.get((err,data)=>{
			if(!err){
				let template = swig.compileFile(__dirname+'/../View/Wish/index.html');
				let html = template({
				   data:data
				});
				res.setHeader('Content-Type','text/html;charset=UTF-8');
				res.end(html);	
			}else{
				console.log(err);
			}
		});	
	}

	del(){

	}
	
	add(){

	}
}	

module.exports = new Wish();