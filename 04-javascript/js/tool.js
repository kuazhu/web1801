/*
* @Author: TomChen
* @Date:   2018-04-25 20:20:10
* @Last Modified by:   TomChen
* @Last Modified time: 2018-04-25 20:20:54
*/

function animation(obj,opation,isLinear,fnEnd){
	clearInterval(obj.timer);
	var iSpeed = 0;
	obj.timer = setInterval(function(){
		var isStopAll = true;
		for(attr in opation){
			var curr = parseFloat(getComputedStyle(obj,false)[attr]);
			var isStop = false;
			if(attr == 'opacity'){
				curr = Math.round(curr*100)
			}
			
			if(isLinear){
				if(curr > opation[attr]){
					iSpeed = -10;
				}else{
					iSpeed = 10;
				}
				if(Math.abs(opation[attr] - curr) <= Math.abs(iSpeed)){
					isStop = true;
				}else{
					isStopAll = false;
				}					
			}else{
				iSpeed = (opation[attr] - curr)/10;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if(!iSpeed){
					isStop = true;
				}else{
					isStopAll = false;
				}
			}

			if(isStop){
				if(isLinear){
					if(attr == 'opacity'){
						obj.style[attr] = opation[attr] / 100;
					}else{
						obj.style[attr] = opation[attr] + 'px';	
					}		
				}
			}else{
				if(attr == 'opacity'){
					obj.style[attr] = (curr + iSpeed)/100 ;
				}else{
					obj.style[attr] = curr + iSpeed + 'px';
				}
			}
		}
		if(isStopAll){
			clearInterval(obj.timer);
			if(fnEnd){
				fnEnd();
			}
		}
	},30)
}