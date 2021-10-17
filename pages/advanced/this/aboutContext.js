function getUrl() {
    console.log(this.document.URL);
}
var pseudoWindow = {
    document: {
        URL: "I'm fake URL"
    },
    getUrl1: getUrl,
    getUrl2: function (callback) {
        callback();
        this.func = callback;
        this.func();
    }
}
//这段代码带来的一个副作用是我们隐式地为 pseudoWindow 对象添加了一个新的属性 func ，如果我们想要通过回调的方式打印出 pseudoWindow 的 document.URL 属性，又不想对 pseudoWindow 对象造成任何影响，那么我们可以使用函数的 apply 方法。所有函数都有 apply 方法，它会将它接收的第一个参数设置为函数的上下文。
var pseudoWindow2 = {
    document: {
        URL: "I'm fake URL"
    },
    getUrl1: getUrl,
    getUrl2: function (callback) {
        callback();        
        callback.apply(this);
    }
}