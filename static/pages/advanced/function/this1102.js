var a = 1;
function B() {
	var a = 2;
	setTimeout("C()", 1000);
	setTimeout(C, 2000);
	function C() {
		alert("a=" + a);
	}
}
function C() {
	alert("a=" + a);
}
B();

function Timer() {
	this.s1 = 0;
	this.s2 = 0;
	setInterval(() => {
		this.s1++;
		console.log(this.s1);
	}, 1000);
	setInterval(function () {
		this.s2++;
		console.log(this.s2);
	}, 1000);
}
var timer1 = new Timer();
setTimeout(console.log('s1:', timer1.s1++), 3100);
setTimeout(console.log('s2:', timer1.s2++), 3100);
var timer2 = new Timer();
setTimeout(console.log('timer2.s1:', timer2.s1++), 3100);
setTimeout(console.log('timer2.s2:', timer2.s2++), 3100);

(function () {
	var a = b = 3;
})()
console.log(typeof a)
console.log(typeof b)

var x = 1;
var obj = {
	x: 2,
	cid: {
		// x:3,
		func: function () {
			console.log(this);
			return this.x;
		}
	}
}
var fn = obj.cid.func;
console.log(fn());
console.log(obj.cid.func());
var innerObj = obj.cid;
console.log(innerObj.func());