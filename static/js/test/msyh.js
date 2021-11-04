// var len = 7;
// var num = 2211131;
// var f = ['2','1','1','1', '1', '1', '1', '1', '1'];
var len = 3
var num = 999
var f = ['1', '1', '1', '1', '1', '1', '1', '1', '1']
function getMaxNum(len,num,fx){
    var arr = Array.from(num.toString());
	var result = [];
	var isReplace = null;
	arr.forEach(function(d,i,arr){
		if(d <= fx[d-1] && isReplace!==false){
			result.push(fx[d-1]);
			isReplace = true;
		}else {
			result.push(d);
			if(isReplace) isReplace = false;
		}
	});
	var res = result.reduce(function(mutiple,j){
		return mutiple = mutiple*10 + parseInt(j);
	},0);
	return res;
}
getMaxNum(len,num,f);