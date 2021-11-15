/**
 * 数组扁平化 arr.flat(Depth)
*/
var c = [1, 2, [3, 4, [5, 6, [7, 8]]], 10];
Array.prototype.flatten = function () {
	return this.reduce(function (prev, cur) {
		var moreArr = [].concat(cur).some(Array.isArray); //判断cur是不是一个数组
		return prev.concat(moreArr ? cur.flatten() : cur);
	}, []);
};


/** * 数组 reduce 的实现 */
Array.prototype.reduce = function (callback, initValue) {
	if (typeof callback != "function") {
		throw new Error("callback is not a function");
	}
	var result = !!(initValue == undefined) || initValue == 0 ? initVlaue : this[0];
	for (let i = initValue ? 0 : 1, len = this.length; i < len; i++) {
		result = callback(this[i], i, this);
	}
	return result;
};