/*
* @Author: TomChen
* @Date:   2018-07-28 10:11:52
* @Last Modified by:   TomChen
* @Last Modified time: 2018-07-28 10:36:21
*/



class Wish{

	index(req,res,...args){
		// console.log('Wish index....');
		console.log(args);
		res.end('ok');
	}
};

module.exports = new Wish();