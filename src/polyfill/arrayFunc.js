/**
 * 数组扁平化 arr.flat(Depth)
*/
function flattenArray(array,deep = 1){
	return deep>1? 
			array.reduce((acc,val)=>{
				Array.isArray(val)? flattenArray(val,deep-1) : [];
			})
			:array.slice();
}

/** * 数组 reduce 的实现 */ 
Array.prototype.reduce = function (callback, initValue) {
	if(typeof callback !="function"){
      throw new Error("callback is not a function");
    }
  var result = !!(initValue==undefined)||initValue==0? initVlaue : this[0];
  for(let i=initValue?0:1,len=this.length; i<len; i++){
    result = callback(this[i],i,this);
  }
  return result;
};