/*
* @Author: TomChen
* @Date:   2018-07-28 10:38:06
* @Last Modified by:   TomChen
* @Last Modified time: 2018-07-28 10:39:42
*/
class Index{
	index(req,res,...args){
		res.end('index page');
	}
}

module.exports = new Index();