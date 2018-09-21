function coverStarsToArray(stars){
  var arr = [];
  var num = stars.toString().substring(0,1);
  for(var i = 1;i<=5;i++){
    if(i<=num){
      arr.push(1);
    }else{
      arr.push(0);
    }
  }
  return arr;
}

module.exports = {
  coverStarsToArray: coverStarsToArray
}